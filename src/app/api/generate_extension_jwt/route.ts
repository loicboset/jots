import jwt from 'jsonwebtoken';

import { createClient } from '@/lib/supabase/server';

const JWT_SECRET = process.env.EXTENSION_JWT_SECRET!;

export async function POST(): Promise<Response> {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const token = jwt.sign(
    {
      sub: user.id,
      role: 'extension_user',
      aud: 'extension',
    },
    JWT_SECRET,
    { expiresIn: '7d' },
  );

  // Clean up old tokens first
  await supabase.from('extension_tokens').delete().eq('user_id', user.id);

  // Insert the new token
  // TODO: support expires_at column
  const { error: insertError } = await supabase
    .from('extension_tokens')
    .upsert({ user_id: user.id, token }, { onConflict: 'user_id' });

  if (insertError) {
    console.error('Extension token insert failed:', insertError);
    return new Response('Failed to store extension token', { status: 500 });
  }

  return Response.json({ token }, { status: 200 });
}
