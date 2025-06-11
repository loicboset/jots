import { createClient } from "@/lib/supabase/server";

import getUserID from "../_utils/getUserID";

const MUTLIPLIER = 10_000;

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  const userID = await getUserID();
  if (!userID) return new Response("Unauthorized", { status: 401 });

  const supabase = await createClient();
  const { data: usage } = await supabase
    .from("user_ai_usage")
    .select("cost")
    .eq("user_id", userID)
    .eq("date", date)
    .neq("type", "WEEKLY_DIGEST");

  const currentCost = usage?.reduce((prev, curr) => prev + curr.cost, 0) || 0;
  const usedTokens = Math.min(Math.floor(currentCost * MUTLIPLIER), 100);

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  return new Response(JSON.stringify(usedTokens), { status: 200, headers });
}
