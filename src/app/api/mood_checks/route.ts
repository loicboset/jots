import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const userID = searchParams.get("user_id");
  const limitParam = searchParams.get("limit");

  const limit = limitParam ? parseInt(limitParam, 10) : 3;

  const supabase = await createClient();

  const { data: mood_checks } = await supabase
    .from("mood_checks")
    .select("*")
    .eq("user_id", userID)
    .order("created_at", { ascending: false })
    .limit(limit);

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  return new Response(JSON.stringify(mood_checks), { status: 200, headers });
}
