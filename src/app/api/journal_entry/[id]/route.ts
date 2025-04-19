import { createClient } from "@/lib/supabase/server";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }): Promise<Response> {
  const { id } = await params;
  const supabase = await createClient();

  const { error } = await supabase.from("journal_entries").delete().eq("id", id);

  if (error) {
    return new Response("Error deleting journal entry", { status: 500 });
  }

  return new Response("Success", { status: 200 });
}
