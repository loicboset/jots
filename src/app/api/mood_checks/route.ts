import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const userID = searchParams.get('user_id');

  const supabase = await createClient();

  const { data: mood_checks } = await supabase
    .from('mood_checks')
    .select('*')
    .eq('user_id', userID)
    .order('created_at', { ascending: false })
    .limit(3);

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  return new Response(JSON.stringify(mood_checks), { status: 200, headers });
}