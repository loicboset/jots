import { createClient } from '@/lib/supabase/server';

export async function GET(): Promise<Response> {
  const supabase = await createClient();

  const { count } = await supabase
    .from('digests')
    .select('*', { count: 'exact', head: true })
    .eq('is_read', false);

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  return new Response(JSON.stringify(count), { status: 200, headers });
}
