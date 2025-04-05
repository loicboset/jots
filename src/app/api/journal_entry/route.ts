import { createClient } from "@/lib/supabase/server";
import { CreateJournalEntry } from "@/types/payload/journal_entries";

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const userID = searchParams.get("user_id");
  const date = new Date(searchParams.get("date") as string);
  const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  const supabase = await createClient();

  const { data: journal_entry } = await supabase
    .from("journal_entries")
    .select("*")
    .eq("user_id", userID)
    .eq("date", formattedDate)
    .single();

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  return new Response(JSON.stringify(journal_entry), { status: 200, headers });
}

export async function PUT(request: Request): Promise<Response> {
  const supabase = await createClient();

  const req = await request.json();
  const { user_id, content, date } = req as CreateJournalEntry;
  const { data } = await supabase.from("journal_entries").upsert({ user_id, content, date }).select();

  return new Response(JSON.stringify(data), { status: 200 });
}
