import OpenAI from 'openai';

import { createClient } from '@/lib/supabase/server';

type Response = {
  chatID: string | null;
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
};

const getChat = async (userID: string): Promise<Response> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('chats')
    .select('chat_id, messages')
    .eq('user_id', userID)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch chat data: ${error.message}`);
  }

  return {
    chatID: data?.chat_id || null,
    messages: data?.messages
      ? (JSON.parse(data.messages) as OpenAI.Chat.Completions.ChatCompletionMessageParam[])
      : [],
  };
};

export default getChat;
