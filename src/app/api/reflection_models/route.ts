import { createClient } from '@/lib/supabase/server';

export async function GET(): Promise<Response> {
  const supabase = await createClient();

  const { data: userReflections } = await supabase
    .from('reflection_models')
    .select('id, name, reflection_model_questions(id, order, question)');

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  return new Response(JSON.stringify(userReflections), {
    status: 200,
    headers,
  });
}
