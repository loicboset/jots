import dayjs from "dayjs";

import { createClient } from "@/lib/supabase/server";
import { CreateDigest } from "@/types/payload/digests";

import extractText from "./_utils/extractText";
import generateDigest from "./_utils/generateDigest";

export async function POST(request: Request): Promise<Response> {
  const req = await request.json();
  const { date } = req as CreateDigest;

  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user || !data.user.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { data: existingDigest } = await supabase.from("digests").select("id").eq("date", date).single();

  if (existingDigest) {
    return new Response("Digest already exists", { status: 409 });
  }

  const sevenDaysAgo = dayjs(date).subtract(7, "day").format("YYYY-MM-DD");
  const twoWeeksAgo = dayjs(date).subtract(14, "day").format("YYYY-MM-DD");

  const { data: last_week_entries = [] } = await supabase
    .from("journal_entries")
    .select("date, content")
    .gte("date", sevenDaysAgo)
    .lt("date", date)
    .order("date", { ascending: false });

  console.log(" last_week_entries", last_week_entries);
  if (last_week_entries && last_week_entries.length === 1) {
    return new Response("Not enough entries to generate digest", { status: 200 });
  }

  const { data: week_before_entries = [] } = await supabase
    .from("journal_entries")
    .select("date, content")
    .gte("date", twoWeeksAgo)
    .lt("date", sevenDaysAgo)
    .order("date", { ascending: false });

  const { data: settings } = await supabase.from("user_settings").select("role, experience, goal").single();

  const entries = [];
  if (week_before_entries) entries.push(...week_before_entries);

  const formattedEntries: { date: string; content: string }[] = [];

  entries?.map((entry) => {
    const text: string[] = extractText(entry.content.root.children);
    const content = text.join(" // ");
    formattedEntries.push({ date: entry.date, content });
  });

  const digest = await generateDigest({ entries: formattedEntries, settings });

  if (!digest) {
    return new Response("Error generating digest", { status: 500 });
  }

  await supabase.from("digests").insert({ date, content: digest, type: "week", user_id: data.user.id });

  return new Response();
}
