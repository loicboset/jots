import { createClient } from "@/lib/supabase/server";

import lexicalToPlainText from "../../_utils/lexicalToPlainText";

const getJournalEntries = async (
  userID: string,
  limit: number,
): Promise<string | null> => {
  const supabase = await createClient();

  const { data: entries = [] } = await supabase
    .from("journal_entries")
    .select("content")
    .eq("user_id", userID)
    .limit(limit)
    .order("created_at", { ascending: false });

  if (!entries || entries.length === 0) return null;

  const result = entries
    .map((e) => `\n${lexicalToPlainText(e.content)}`)
    .join("\n\n");

  return result;
};

export default getJournalEntries;
