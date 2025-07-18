import dayjs from "dayjs";

import { createClient } from "@/lib/supabase/server";

export async function GET(): Promise<Response> {
  const sevenDaysAgo = dayjs().subtract(7, "day").format("YYYY-MM-DD");

  const supabase = await createClient();

  const { data: journal_entries } = await supabase
    .from("journal_entries")
    .select("*")
    .gte("date", sevenDaysAgo)

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  return new Response(JSON.stringify(journal_entries || []), { status: 200, headers });
}