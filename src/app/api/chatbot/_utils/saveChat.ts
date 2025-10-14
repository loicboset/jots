import OpenAI from "openai";

import { createClient } from "@/lib/supabase/server";

const saveChat = async (
  userID: string,
  chatID: string,
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
): Promise<void> => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("chats")
    .upsert(
      { user_id: userID, chat_id: chatID, messages: JSON.stringify(messages) },
      { onConflict: "chat_id, user_id" },
    );

  if (error) {
    throw new Error(`Failed to save chat data: ${error.message}`);
  }
};

export default saveChat;
