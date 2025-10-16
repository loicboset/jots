import { createClient } from '@/lib/supabase/server';

import getUserID from '../_utils/getUserID';
import { CreateUserReflection } from '@/types/payload/user_reflections';

export async function POST(request: Request): Promise<Response> {
  const supabase = await createClient();

  const userID = await getUserID();
  if (!userID) {
    return new Response('Unauthorized', { status: 401 });
  }

  const req = await request.json();
  const { reflectionModelID, status, answers } = req as CreateUserReflection;
  const { data: userReflection, error } = await supabase
    .from('user_reflections')
    .insert({
      user_id: userID,
      reflection_model_id: reflectionModelID,
      status,
    })
    .select('id')
    .single();

  if (error) {
    console.error('Error creating user reflection:', error);
    return new Response(error.message, { status: 500 });
  }

  if (!userReflection) {
    return new Response('User reflection not created', { status: 500 });
  }

  const { error: answersError } = await supabase.from('user_reflection_answers').insert(
    answers.map((answer, index) => ({
      user_reflection_id: userReflection.id,
      question: answer.question,
      answer: answer.answer,
      order: index + 1,
    })),
  );

  if (answersError) {
    console.error('Error inserting user reflection answers:', answersError);
    return new Response(answersError.message, { status: 500 });
  }

  return new Response('Success', { status: 200 });
}
