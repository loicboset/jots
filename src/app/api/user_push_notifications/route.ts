import easyCron from "@/lib/easycron";
import { createClient } from "@/lib/supabase/server";
import { UpsertUserPushNotif } from "@/types/payload/user_push_notifications";

import toCron from "./_utils/toCron";

export async function GET(): Promise<Response> {
  const supabase = await createClient();

  const { data } = await supabase.from("user_push_notifications").select("*");

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  return new Response(JSON.stringify(data), { status: 200, headers });
}

export async function PUT(request: Request): Promise<Response> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const req = await request.json();
  const { days, time, timezone } = req as UpsertUserPushNotif;

  // 1. convert days and time to cron expression
  const cron_expression = toCron(days, time);

  // 2. check if user already has a cron job
  let cronJobID;

  const { data: existingCronJob } = await supabase
    .from("user_push_notifications")
    .select("cronjob_id")
    .eq("user_id", user.id)
    .single();

  if (existingCronJob?.cronjob_id) {
    // 2.1 update the existing cron job
    cronJobID = existingCronJob.cronjob_id;
    const { data, status } = await easyCron.update(
      cronJobID,
      cron_expression,
      timezone,
    );
    if (![200, 201].includes(status) || !data?.cron_job_id) {
      throw new Error(`Failed to update cron job: ${data?.message}`);
    }
  } else {
    // 2.2 create a new cron job
    const url = `${process.env.ENV_URL}/api/push_notifications/send?user_id=${user.id}`;
    const { data, status } = await easyCron.add(url, cron_expression, timezone);

    if (![200, 201].includes(status) || !data?.cron_job_id) {
      throw new Error(`Failed to create cron job: ${data?.message}`);
    }

    cronJobID = data.cron_job_id;
  }

  // 3. update the push notification reccord
  const { error } = await supabase
    .from("user_push_notifications")
    .upsert(
      { user_id: user.id, cron_expression, cronjob_id: cronJobID },
      { onConflict: "cronjob_id" },
    )
    .select();

  if (error) {
    return new Response("Error while creating push notif", { status: 500 });
  }

  return new Response("Success", { status: 200 });
}
