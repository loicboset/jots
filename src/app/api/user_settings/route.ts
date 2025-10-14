import { createClient } from "@/lib/supabase/server";
import { UpsertUserSettings } from "@/types/payload/user_settings";

export async function GET(): Promise<Response> {
  const supabase = await createClient();

  const { data: settings } = await supabase
    .from("user_settings")
    .select("*")
    .single();

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  return new Response(JSON.stringify(settings), { status: 200, headers });
}

export async function PUT(request: Request): Promise<Response> {
  const supabase = await createClient();

  const req = await request.json();
  const {
    user_id,
    role,
    experience,
    goal,
    mood_checks_enabled,
    daily_prompt_enabled,
    timezone,
    career_coach_mode,
  } = req as UpsertUserSettings;

  const { data } = await supabase
    .from("user_settings")
    .upsert(
      {
        user_id,
        role,
        experience,
        goal,
        mood_checks_enabled,
        daily_prompt_enabled,
        timezone,
        career_coach_mode,
      },
      { onConflict: "user_id" },
    )
    .select();

  return new Response(JSON.stringify(data), { status: 200 });
}
