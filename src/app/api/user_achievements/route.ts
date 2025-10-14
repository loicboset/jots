import { createClient } from "@/lib/supabase/server";

export async function GET(): Promise<Response> {
  const supabase = await createClient();

  const { data: user_achievements } = await supabase
    .from("user_achievements")
    .select("*")
    .order("created_at", { ascending: false });

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  return new Response(JSON.stringify(user_achievements), {
    status: 200,
    headers,
  });
}
