import { createClient } from '@/lib/supabase/server';

import getUserID from '../_utils/getUserID';
import { CreateUserReflectionAssessment } from '@/types/payload/user_reflection_assessments';

// export async function GET(request: Request): Promise<Response> {
//   const { searchParams } = new URL(request.url);
//   const date = new Date(searchParams.get('date') as string);
//   const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

//   const supabase = await createClient();

//   const { data: userReflections } = await supabase
//     .from('user_reflections')
//     .select('*, user_reflection_answers(*)')
//     .eq('date', formattedDate)
//     .order('created_at', { ascending: false });

//   const headers = new Headers();
//   headers.append('Content-Type', 'application/json');

//   return new Response(JSON.stringify(userReflections), {
//     status: 200,
//     headers,
//   });
// }

export async function POST(request: Request): Promise<Response> {
  const supabase = await createClient();

  const userID = await getUserID();
  if (!userID) {
    return new Response('Unauthorized', { status: 401 });
  }

  const req = await request.json();
  const { reflectionID, score, details } = req as CreateUserReflectionAssessment;

  // 1. Insert new user reflection assessment
  const { data: assessment, error } = await supabase
    .from('user_reflection_assessments')
    .insert({
      user_reflection_id: reflectionID,
      score,
    })
    .select('id')
    .single();

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  if (!assessment) {
    return new Response('Failed to create assessment', { status: 500 });
  }

  // 2. Insert details if any
  if (details && details.length > 0) {
    const { error: assessmentDetailError } = await supabase
      .from('user_reflection_assessment_details')
      .insert(
        details.map((detail) => ({
          user_reflection_assessment_id: assessment.id,
          trait: detail.trait,
          score: detail.score,
        })),
      );

    if (assessmentDetailError) {
      return new Response(assessmentDetailError.message, { status: 500 });
    }
  }

  return new Response('Your score has been registered!', { status: 200 });
}
