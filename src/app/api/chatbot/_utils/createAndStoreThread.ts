import OpenAI from "openai";

import { createClient } from "@/lib/supabase/server";

const openai = new OpenAI();

const createAndStoreThread = async (userID: string): Promise<string> => {
  const thread = await openai.beta.threads.create();

  const supabase = await createClient();
  const { error } = await supabase.from("user_threads").insert({
    user_id: userID,
    thread_id: thread.id,
  });

  if (error) {
    console.log("error:", error);
    throw new Response("Failed to create thread", { status: 500 });
  }

  return thread.id;
};

export default createAndStoreThread;
