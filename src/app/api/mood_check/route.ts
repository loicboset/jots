import { createClient } from "@/lib/supabase/server";
import { UpsertMoodCheck } from "@/types/payload/mood_checks";

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const userID = searchParams.get("user_id");
  const today = new Date().toISOString().split("T")[0];

  const supabase = await createClient();

  const { data: mood_check } = await supabase
    .from("mood_checks")
    .select("*")
    .eq("user_id", userID)
    .filter("created_at", "gte", `${today}T00:00:00`)
    .filter("created_at", "lt", `${today}T23:59:59`)
    .single();

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  return new Response(JSON.stringify(mood_check), { status: 200, headers });
}

export async function PUT(request: Request): Promise<Response> {
  const supabase = await createClient();

  const req = await request.json();
  const { user_id, score } = req as UpsertMoodCheck;
  const { data } = await supabase
    .from("mood_checks")
    .upsert({ user_id, score })
    .select();

  return new Response(JSON.stringify(data), { status: 200 });
}
