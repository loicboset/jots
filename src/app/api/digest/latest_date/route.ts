import { createClient } from "@/lib/supabase/server";

export async function GET(): Promise<Response> {
  const supabase = await createClient();

  const { data } = await supabase.from("digests").select("date").order("id", { ascending: false }).limit(1).single();

  return new Response(JSON.stringify(data?.date), { status: 200, headers: { "Content-Type": "application/json" } });
}
