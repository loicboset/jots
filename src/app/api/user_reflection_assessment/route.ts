import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const supabase = await createClient();

  const { data: userReflection } = await supabase
    .from('user_reflection_assessments')
    .select('id, user_reflection_id, score, user_reflection_assessment_details (trait, score)')
    .eq('user_reflection_id', id)
    .single();

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  return new Response(JSON.stringify(userReflection), {
    status: 200,
    headers,
  });
}
