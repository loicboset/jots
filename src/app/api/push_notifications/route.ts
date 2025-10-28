import axios from 'axios';

import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request): Promise<Response | undefined> {
  const { searchParams } = new URL(request.url);
  const userID = searchParams.get('user_id');

  const supabase = await createClient();

  const { data: push_subscriptions } = await supabase
    .from('push_subscriptions')
    .select('*')
    .eq('user_id', userID)
    .order('created_at', { ascending: false });

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  if (push_subscriptions) {
    if (push_subscriptions.length === 0) {
      return Response.json({ error: 'No push subscription found' }, { status: 500 });
    }

    for (const subscription of push_subscriptions) {
      try {
        await axios.post(`${process.env.ENV_URL}/api/push`, {
          subscription,
          userID,
        });
        return new Response('success', { status: 200, headers });
      } catch (error) {
        return Response.json(`Failed to send push notification: ${error}`, {
          status: 500,
        });
      }
    }
  }
}
