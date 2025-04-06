import dayjs from "dayjs";

import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const userID = searchParams.get("user_id");
  const date = searchParams.get("date");

  const from = dayjs(date).startOf("month").format("YYYY-MM-DD");
  const to = dayjs(date).endOf("month").format("YYYY-MM-DD");

  const supabase = await createClient();

  const { data: journal_entries } = await supabase
    .from("journal_entries")
    .select("date")
    .eq("user_id", userID)
    .gte("date", from)
    .lte("date", to);

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  return new Response(JSON.stringify(journal_entries || []), { status: 200, headers });
}
