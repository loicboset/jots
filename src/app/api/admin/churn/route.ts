import { createClient } from '@supabase/supabase-js';

import getUserEmail from '../../_utils/getUserEmail';

export async function GET(): Promise<Response> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!, // service key, bypasses RLS
  );

  const allowedUsers = ['loic.boset@gmail.com', 'j.zouzou@icloud.com'];

  const userEmail = await getUserEmail();

  if (!userEmail) {
    return new Response('Not authenticated', { status: 401 });
  }
  if (!allowedUsers.includes(userEmail)) {
    return new Response('Not authorized', { status: 401 });
  }

  const {
    data: { users },
  } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });

  // Step 1: get entries grouped by user
  const { data, error } = await supabase
    .from('journal_entries')
    .select('user_id, created_at')
    .order('created_at', { ascending: true });

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  // Step 2: group entries per user
  const userMap: Record<string, { count: number; last: Date }> = {};

  data.forEach((entry) => {
    const userId = entry.user_id;
    const created = new Date(entry.created_at);

    if (!userMap[userId]) {
      userMap[userId] = { count: 0, last: created };
    }

    userMap[userId].count += 1;
    if (created > userMap[userId].last) {
      userMap[userId].last = created;
    }
  });

  // Step 3: classify dropped (last entry > 14 days ago)
  const now = new Date();
  const droppedUsers = Object.values(userMap).filter(
    (u) => (now.getTime() - u.last.getTime()) / (1000 * 60 * 60 * 24) > 14,
  );

  // Step 4: compute KPI (average entries before churn)
  const avg =
    droppedUsers.length > 0
      ? droppedUsers.reduce((sum, u) => sum + u.count, 0) / droppedUsers.length
      : 0;

  const result = {
    totalUsers: users.length,
    totalActiveUsers: Object.keys(userMap).length,
    droppedUsers: droppedUsers.length,
    avgEntriesBeforeChurn: avg,
  };

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  return new Response(JSON.stringify(result), { status: 200, headers });
}
