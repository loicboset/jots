import { createClient } from '@/lib/supabase/server';
import { UpsertPushSubscriptionPayload } from '@/types/payload/push_subscription';

export async function GET(): Promise<Response> {
  const supabase = await createClient();

  const { data, error } = await supabase.from('push_subscriptions').select();

  if (error) {
    return new Response('Error querying push subscription', { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}

export async function PUT(request: Request): Promise<Response> {
  const supabase = await createClient();

  const req = await request.json();

  const { user_id, endpoint, auth, p256dh, browser, os } = req as UpsertPushSubscriptionPayload;
  const { data, error } = await supabase
    .from('push_subscriptions')
    .upsert({ user_id, endpoint, auth, p256dh, browser, os })
    .select();

  if (error) {
    return new Response('Error creating push subscription', { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}
