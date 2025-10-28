import { createClient } from '@/lib/supabase/server';
import { EditUserSkills } from '@/types/payload/user_skills';

import getUserID from '../_utils/getUserID';

export async function GET(): Promise<Response> {
  const supabase = await createClient();

  const { data } = await supabase.from('user_skills').select('skill, score').gt('score', 0);

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  return new Response(JSON.stringify(data), { status: 200, headers });
}

export async function PUT(request: Request): Promise<Response> {
  const supabase = await createClient();

  const userID = await getUserID();
  if (!userID) {
    return new Response('Unauthorized', { status: 401 });
  }

  const req = await request.json();
  const { skill, delta } = req as EditUserSkills;

  const { data } = await supabase
    .from('user_skills')
    .select('score')
    .eq('user_id', userID)
    .eq('skill', skill);

  if (!data || data.length === 0) {
    const { error: insertError } = await supabase.from('user_skills').insert({
      user_id: userID,
      skill,
      score: delta || 0,
      updated_at: new Date(),
    });

    if (insertError) {
      return new Response(insertError.message, { status: 500 });
    }
  } else {
    const currentScore = data[0].score;
    const { error: updateError } = await supabase
      .from('user_skills')
      .update({ score: currentScore + delta, updated_at: new Date() })
      .eq('user_id', userID)
      .eq('skill', skill);

    if (updateError) {
      return new Response(updateError.message, { status: 500 });
    }
  }

  await supabase.from('skill_logs').insert({ user_id: userID, skill, delta });

  return new Response('success', { status: 200 });
}
