import OpenAI from "openai";

import { createClient } from "@/lib/supabase/server";

const openai = new OpenAI();

const uploadJournalEntriesToVectorStore = async (userID: string): Promise<string> => {
  const supabase = await createClient();

  // 1. Fetch journal entries
  const { data: entries, error } = await supabase.from("journal_entries").select("content").eq("user_id", userID);

  if (error) throw new Error(`Failed to fetch journal entries: ${error}`);

  // 2. Combine text
  const combinedText = entries.map((e) => e.content).join("\n\n---\n\n");

  // 3. Create in-memory File (browser-compatible)
  const blob = new Blob([combinedText], { type: "text/plain" });
  const file = new File([blob], `journal-${userID}.txt`, {
    type: "text/plain",
    lastModified: Date.now(),
  });

  // 4. Create vector store
  const vectorStore = await openai.vectorStores.create({
    name: "Journal Entries for user " + userID,
  });

  await openai.vectorStores.fileBatches.uploadAndPoll(vectorStore.id, { files: [file] });

  return vectorStore.id;
};

export default uploadJournalEntriesToVectorStore;
