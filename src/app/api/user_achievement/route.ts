import { createClient } from "@/lib/supabase/server";
import { UpsertUserAchievement } from "@/types/payload/user_achievements";

import getUserID from "../_utils/getUserID";

export async function PUT(request: Request): Promise<Response> {
  const supabase = await createClient();

  const userID = await getUserID();
  if (!userID) {
    return new Response("Unauthorized", { status: 401 });
  }

  const req = await request.json();
  const { achievement_id } = req as UpsertUserAchievement;
  const { data } = await supabase
    .from("user_achievements")
    .upsert({ user_id: userID, achievement_id })
    .select();

  return new Response(JSON.stringify(data), { status: 200 });
}
