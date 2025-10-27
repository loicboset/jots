import webPush from 'web-push';

import { UserPushSubscription } from '@/types/api/push_subscriptions';

export async function POST(request: Request): Promise<Response> {
  webPush.setVapidDetails(
    process.env.ENV_URL as string,
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY as string,
    process.env.VAPID_PRIVATE_KEY as string,
  );

  if (request.method === 'POST') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { subscription } = request.body as any;

    const payload = JSON.stringify({
      title: 'Jots',
      body: 'A new reminder is available!',
      redirectLink: '/',
    });

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const { endpoint, auth, p256dh } = subscription as UserPushSubscription;

    try {
      await webPush.sendNotification(
        {
          endpoint: endpoint,
          keys: {
            auth: auth,
            p256dh: p256dh,
          },
        },
        payload,
      );
      return new Response('success', { status: 200, headers });
    } catch (error) {
      return Response.json(`Error sending notification: ${error}`, { status: 500 });
    }
  } else {
    return Response.json('Method not allowed', { status: 405 });
  }
}
