import { createClient } from "@/lib/supabase/server";
import { UpsertUserSettings } from "@/types/payload/user_settings";

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const userID = searchParams.get("user_id");

  const supabase = await createClient();

  const { data: settings = [] } = await supabase.from("user_settings").select("*").eq("user_id", userID);

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  return new Response(JSON.stringify(settings), { status: 200, headers });
}

export async function PUT(request: Request): Promise<Response> {
  const supabase = await createClient();

  const req = await request.json();
  const { user_id, role, experience, goal } = req as UpsertUserSettings;

  const { data } = await supabase.from("user_settings").upsert({ user_id, role, experience, goal }).select();

  return new Response(JSON.stringify(data), { status: 200 });
}
