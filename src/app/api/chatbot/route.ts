import OpenAI from "openai";

import aiUsageLogger from "@/lib/logger/aiUsageLogger";

import getUserID from "../_utils/getUserID";
import getChat from "./_utils/getChat";
import getJournalEntries from "./_utils/getJournalEntries";
import saveChat from "./_utils/saveChat";

type ChatbotRequest = {
  userMessage: string;
};

const openai = new OpenAI();

const MODEL = "gpt-4o-mini";
// const MODEL = "gpt-4.1-mini";

export async function GET(): Promise<Response> {
  const userID = await getUserID();
  if (!userID) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { messages, chatID } = await getChat(userID);

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const conversation = messages.filter((msg) => msg.role === "user" || msg.role === "assistant");

  return new Response(
    JSON.stringify({
      messages: conversation,
      chatID,
    }),
    { status: 200, headers }
  );
}

export async function POST(request: Request): Promise<Response> {
  const req = await request.json();
  const { userMessage } = req as ChatbotRequest;

  const userID = await getUserID();
  if (!userID) return new Response("Unauthorized", { status: 401 });

  let chatID = req?.chatID || null;
  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [];

  if (chatID) {
    const { messages: previousMessages } = await getChat(userID);
    messages.push(...previousMessages, { role: "user", content: userMessage });
  } else {
    const journalEntries = await getJournalEntries(userID);
    messages.push(
      {
        role: "system",
        content: `
          You are a software engineering career coach - this is your strict boundary.
          Use my journal entries to provide relevant answers.
          Keep answers under 200 words.
        `,
      },
      {
        role: "system",
        content: `Here are my journal entries:\n\n${journalEntries}`,
      },
      { role: "user", content: userMessage }
    );
  }

  const stream = await openai.chat.completions.create({
    model: MODEL,
    messages,
    stream: true,
    stream_options: { include_usage: true },
  });

  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();

  let fullResponse = "";

  (async (): Promise<void> => {
    for await (const chunk of stream) {
      if (!chatID) chatID = chunk.id;

      if (chunk?.usage) {
        await aiUsageLogger({
          userID,
          type: "CHATBOT",
          model: MODEL,
          inputTokens: chunk.usage?.prompt_tokens ?? 0,
          inputCachedTokens: chunk.usage?.prompt_tokens_details?.cached_tokens ?? 0,
          outputTokens: chunk.usage?.completion_tokens ?? 0,
        });
      } else {
        const content = chunk.choices[0]?.delta?.content || "";
        fullResponse += content;
        await writer.write(encoder.encode(content));
      }
    }
    messages.push({ role: "assistant", content: fullResponse });
    if (chatID) await saveChat(userID, chatID, messages);
    writer.close();
  })();

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
}
