import OpenAI from "openai";

type Chatbot = {
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
  chatID: string;
};

export type { Chatbot };
