import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  const supabase = await createClient();

  const { data } = await supabase.from("digests").select("*").eq("date", date).single();

  return new Response(JSON.stringify(data), { status: 200, headers: { "Content-Type": "application/json" } });
}
