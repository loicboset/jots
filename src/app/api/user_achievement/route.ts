import { createClient } from "@/lib/supabase/server";
import { UpsertUserAchievement } from "@/types/payload/user_achievements";

export async function PUT(request: Request): Promise<Response> {
  const supabase = await createClient();

  const req = await request.json();
  const { user_id, achievement_id } = req as UpsertUserAchievement;
  const { data } = await supabase.from("user_achievements").upsert({ user_id, achievement_id }).select();

  return new Response(JSON.stringify(data), { status: 200 });
}