import OpenAI from "openai";

import { createClient } from "@/lib/supabase/server";

const openai = new OpenAI();

const createAndStoreAssistant = async (userID: string): Promise<string> => {
  const assistant = await openai.beta.assistants.create({
    name: "Dev Career Coach",
    instructions: `
        You are a software engineering career coach.
        You help the user with career-related questions, based on their professional journal entries.
        Your response are max 200 words.
        `,
    model: "gpt-4o",
    tools: [{ type: "file_search" }],
  });

  const supabase = await createClient();
  const { error } = await supabase
    .from("assistants")
    .insert({ assistant_id: assistant.id, name: "Dev Career Coach", user_id: userID });

  if (error) {
    throw new Error(`Failed to create assistant: ${error}`);
  }

  return assistant.id;
};

export default createAndStoreAssistant;
