import { createClient } from "@/lib/supabase/server";

export async function GET(): Promise<Response> {
  const supabase = await createClient();

  const { data: digests } = await supabase
    .from("digests")
    .select("*")
    .order("created_at", { ascending: false });

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  return new Response(JSON.stringify(digests), { status: 200, headers });
}
