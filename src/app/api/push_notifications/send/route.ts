import { createClient } from '@/lib/supabase/server';

import sendPushNotification from './_utils/sendPushNotification';

export async function GET(request: Request): Promise<Response | undefined> {
  const { searchParams } = new URL(request.url);
  const userID = searchParams.get('user_id');

  if (!userID) {
    return new Response('User ID is required', { status: 400 });
  }

  try {
    const supabase = await createClient();

    const { data: push_subscriptions = [], error } = await supabase
      .from('push_subscriptions')
      .select('auth, endpoint, p256dh')
      .eq('user_id', userID);
    if (error) {
      console.log(' error', error);
      return new Response(`Error fetching push subscriptions: ${error}`, { status: 500 });
    }
    if (!push_subscriptions || push_subscriptions.length === 0) {
      return new Response('No push subscriptions found', { status: 500 });
    }

    await Promise.all(
      push_subscriptions.map((subscription) =>
        sendPushNotification({
          subscription: {
            endpoint: subscription.endpoint,
            keys: {
              auth: subscription.auth,
              p256dh: subscription.p256dh,
            },
          },
        }),
      ),
    );

    return new Response('Push notifications sent successfully', { status: 200 });
  } catch (error) {
    console.log(' error', error);
    return new Response('Error sending push notifications', { status: 500 });
  }
}
