import dayjs from 'dayjs';

import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request): Promise<Response> {
  const authHeader = request.headers.get('Authorization');

  const sevenDaysAgo = dayjs().subtract(7, 'day').format('YYYY-MM-DD');

  const supabase = await createClient(authHeader);

  const { data: journal_entries } = await supabase
    .from('journal_entries')
    .select('*')
    .gte('date', sevenDaysAgo);

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  return new Response(JSON.stringify(journal_entries || []), {
    status: 200,
    headers,
  });
}
