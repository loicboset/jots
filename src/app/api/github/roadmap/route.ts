export async function GET(): Promise<Response> {
  const query = `
    query {
      user(login: "loicboset") {
        projectV2(number: 2) {
          items(first: 20) {
            nodes {
              content {
                ... on Issue {
                  title
                  url
                  number
                  state
                }
              }
            }
          }
        }
      }
    }`;

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();
  const result = data.data.user.projectV2.items.nodes;
  return new Response(JSON.stringify(result), { status: 200 });
}
