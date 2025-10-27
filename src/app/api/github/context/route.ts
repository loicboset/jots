import { decrypt } from '@/lib/crypto';
import { createClient } from '@/lib/supabase/server';
import { GitHubPR } from '@/types/github';

export const runtime = 'nodejs';

export async function GET(): Promise<Response> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.id) return new Response('Unauthorized', { status: 401 });

  const { data: userSettings } = await supabase
    .from('user_settings')
    .select('github_token_encrypted')
    .eq('user_id', user.id)
    .single();
  if (!userSettings?.github_token_encrypted) return new Response('No token', { status: 403 });

  const token = decrypt(userSettings.github_token_encrypted);

  // GraphQL query for viewer's latest PRs and last few commits
  const query = `
    query {
      viewer {
        pullRequests(first: 8, orderBy: {field: UPDATED_AT, direction: DESC}) {
          nodes {
            number
            title
            url
            bodyText
            updatedAt
            repository { nameWithOwner }
            commits(last: 4) {
              nodes {
                commit {
                  oid
                  messageHeadline
                  message
                  url
                  committedDate
                }
              }
            }
          }
        }
      }
    }
  `;

  const resp = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  const json = await resp.json();
  if (json.errors) {
    console.error('GitHub GraphQL errors', json.errors);
    return new Response(JSON.stringify([]), { status: 200 });
  }

  const prs = (json.data?.viewer?.pullRequests?.nodes ?? []) as GitHubPR[];
  return new Response(JSON.stringify(prs), { status: 200 });
}
