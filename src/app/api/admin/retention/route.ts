import { createClient } from "@supabase/supabase-js";

import getUserEmail from "../../_utils/getUserEmail";

export async function GET(): Promise<Response> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY! // service key, bypasses RLS
  );

  const allowedUsers = ["loic.boset@gmail.com", "j.zouzou@icloud.com"];

  const userEmail = await getUserEmail();

  if (!userEmail) {
    return new Response("Not authenticated", { status: 401 });
  }
  if (!allowedUsers.includes(userEmail)) {
    return new Response("Not authorized", { status: 401 });
  }

  // Step 1: fetch all entries
  const { data, error } = await supabase
    .from("journal_entries")
    .select("user_id, created_at")
    .order("created_at", { ascending: true });

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  // Step 2: group by user with first journaling date
  type UserData = { first: Date; days: number[] };
  const users: Record<string, UserData> = {};

  data.forEach((entry) => {
    const userId = entry.user_id;
    const created = new Date(entry.created_at);

    if (!users[userId]) {
      users[userId] = { first: created, days: [] };
    }

    if (created < users[userId].first) users[userId].first = created;

    const dayOffset = Math.floor((created.getTime() - users[userId].first.getTime()) / (1000 * 60 * 60 * 24));
    if (!users[userId].days.includes(dayOffset)) {
      users[userId].days.push(dayOffset);
    }
  });

  const totalUsers = Object.keys(users).length;
  const checkpoints = [7, 14, 21, 30, 60];
  const retention: Record<number, number> = {};

  // Step 3: calculate retention at each checkpoint
  checkpoints.forEach((d) => {
    const retained = Object.values(users).filter((u) => u.days.some((day) => day >= d)).length;
    retention[d] = totalUsers > 0 ? retained / totalUsers : 0;
  });

  // Step 4: return result
  const result = {
    totalUsers,
    retention, // {7:0.42, 14:0.27, ...}
  };

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  return new Response(JSON.stringify(result), { status: 200, headers });
}
