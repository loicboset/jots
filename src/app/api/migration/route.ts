import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const userID = searchParams.get("user_id");

  const supabase = await createClient();

  const { data: journal_entry } = await supabase
    .from("journal_entries")
    .select("content, date")
    .eq("user_id", userID)
    .is("new_date", null);

  const newEntries: { content: any; date: string }[] = [];

  journal_entry?.forEach((entry) => {
    const root = {
      root: {
        children: [],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "root",
        version: 1,
      },
    };
    const content = JSON.parse(entry.content).children[1];
    content.children.forEach((child: never) => root.root.children.push(child));
    newEntries.push({ date: entry.date, content: root });
  });

  console.log("newEntries", newEntries);

  for (const newEntry of newEntries) {
    const { error } = await supabase
      .from("journal_entries")
      .update({ content: newEntry.content, new_date: newEntry.date })
      .eq("date", newEntry.date)
      .eq("user_id", userID);

    if (error) {
      console.log("error", error);
    }
  }

  return new Response("success", { status: 200 });
}
