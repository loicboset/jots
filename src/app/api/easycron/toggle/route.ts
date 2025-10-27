import axios from 'axios';

import { EasyCronAddResponse } from '@/types/api/easycron';

export async function PATCH(request: Request): Promise<Response> {
  const req = await request.json();
  const { easycron_id, status } = req;

  const easyCronUrl = `https://api.easycron.com/v1/cron-jobs/${easycron_id}`;
  const body = { status };

  try {
    await axios.patch<EasyCronAddResponse>(easyCronUrl, body, {
      headers: { 'X-API-Key': process.env.EASY_CRON_API_KEY as string },
    });

    return new Response('success', { status: 200 });
  } catch (error) {
    return Response.json(`Error sending notification: ${error}`, { status: 500 });
  }
}
