import dayjs from 'dayjs';

import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const userID = searchParams.get('user_id');
  const from = searchParams.get('from');

  const to = dayjs(from).endOf('month').format('YYYY-MM-DD');

  const supabase = await createClient();

  const { data: entriesData } = await supabase
    .from('journal_entries')
    .select('date')
    .eq('user_id', userID)
    .gte('date', from)
    .lte('date', to);

  const entries = entriesData || [];

  const { data: reflectionsData = [] } = await supabase
    .from('user_reflections')
    .select('date')
    .eq('user_id', userID)
    .gte('date', from)
    .lte('date', to);

  const reflections = reflectionsData || [];

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  return new Response(JSON.stringify([...entries, ...reflections]), {
    status: 200,
    headers,
  });
}
