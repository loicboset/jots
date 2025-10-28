import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const supabase = await createClient();

  const { data: userReflection } = await supabase
    .from('user_reflections')
    .select('*, user_reflection_answers(*)')
    .eq('id', id)
    .single();

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  return new Response(JSON.stringify(userReflection), {
    status: 200,
    headers,
  });
}
