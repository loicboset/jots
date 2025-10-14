import { createClient } from "@/lib/supabase/server";

import lexicalToPlainText from "../../_utils/lexicalToPlainText";

const getJournalEntries = async (userID: string): Promise<string> => {
  const supabase = await createClient();

  // 1. Fetch journal entries
  const { data: entries, error } = await supabase.from("journal_entries").select("date, content").eq("user_id", userID);

  if (error) throw new Error(`Failed to fetch journal entries: ${error}`);

  const result = entries.map((e) => `Journal entry of ${e.date}:\n${lexicalToPlainText(e.content)}`).join("\n\n");
  return result;
};

export default getJournalEntries;
