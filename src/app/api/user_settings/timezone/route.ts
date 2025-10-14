import easyCron from "@/lib/easycron";
import { createClient } from "@/lib/supabase/server";
import { EditUserTimezone } from "@/types/payload/user_settings";

export async function PUT(request: Request): Promise<Response> {
  const supabase = await createClient();

  const req = await request.json();
  const { timezone } = req as EditUserTimezone;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user || !user.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  // 1. update user timezone in user_settings table
  await supabase
    .from("user_settings")
    .update({ timezone })
    .eq("user_id", user.id);

  // 2. check if any cron job exists for the user
  const { data: userPushNotif } = await supabase
    .from("user_push_notifications")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!userPushNotif) return new Response("Success", { status: 200 });

  // 3. if exists, update the cron job with the new timezone
  const { cronjob_id, expression } = userPushNotif;
  const { data, status } = await easyCron.update(
    cronjob_id,
    expression,
    timezone,
  );
  if (![200, 201].includes(status) || !data?.cron_job_id) {
    throw new Error(`Failed to update cron job: ${data?.message}`);
  }

  return new Response("Success", { status: 200 });
}
