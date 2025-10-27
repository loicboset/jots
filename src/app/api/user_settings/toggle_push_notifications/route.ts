import { createClient } from '@/lib/supabase/server';

export async function PATCH(request: Request): Promise<Response> {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user || !user.id) {
    return new Response('Unauthorized', { status: 401 });
  }

  const req = await request.json();
  const { is_push_notifications_active } = req;

  const { data, error: supError } = await supabase
    .from('user_settings')
    .update({ is_push_notifications_active })
    .eq('user_id', user.id);

  console.log(' supError', supError);
  return new Response(JSON.stringify(data), { status: 200 });
}
