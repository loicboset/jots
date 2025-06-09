import { createClient } from "@/lib/supabase/server";

function extractTextFromLexicalJSON(node: any): string {
  console.log(" node", node);
  if (!node) return "";

  if (node.text) return node.text;

  if (Array.isArray(node.children)) {
    return node.children.map(extractTextFromLexicalJSON).join(" ");
  }

  return "";
}

function lexicalToPlainText(editorState: any): string {
  console.log(" editorState", editorState);
  return extractTextFromLexicalJSON(editorState.root).trim();
}

const getJournalEntries = async (userID: string): Promise<string> => {
  const supabase = await createClient();

  // 1. Fetch journal entries
  const { data: entries, error } = await supabase.from("journal_entries").select("date, content").eq("user_id", userID);

  if (error) throw new Error(`Failed to fetch journal entries: ${error}`);

  const result = entries.map((e) => `Journal entry of ${e.date}:\n${lexicalToPlainText(e.content)}`).join("\n\n");
  console.log(" result", result);
  return result;
};

export default getJournalEntries;
