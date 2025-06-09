import OpenAI from "openai";

import getUserID from "../_utils/getUserID";
import createAndStoreAssistant from "./_utils/createAndStoreAssistant";
import createAndStoreThread from "./_utils/createAndStoreThread";
import uploadJournalEntriesToVectorStore from "./_utils/uploadJournalEntriesToVectorStore";
import { createClient } from "@/lib/supabase/server";

type ChatbotRequest = {
  userMessage: string;
  threadID?: string;
  assistantID?: string;
};

const openai = new OpenAI();

export async function GET(): Promise<Response> {
  const userID = await getUserID();
  if (!userID) {
    return new Response("Unauthorized", { status: 401 });
  }

  const supabase = await createClient();

  const { data: threadRow } = await supabase.from("user_threads").select("thread_id").eq("user_id", userID).single();

  const { data: assistantRow } = await supabase
    .from("assistants")
    .select("assistant_id")
    .eq("user_id", userID)
    .single();

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  return new Response(
    JSON.stringify({
      threadID: threadRow?.thread_id || null,
      assistantID: assistantRow?.assistant_id || null,
    }),
    { status: 200, headers }
  );
}

export async function POST(request: Request): Promise<Response> {
  const req = await request.json();
  const { userMessage } = req as ChatbotRequest;

  const userID = await getUserID();
  if (!userID) {
    return new Response("Unauthorized", { status: 401 });
  }

  const threadID = req?.threadID || (await createAndStoreThread(userID));
  const assistantID = req?.assistantID || (await createAndStoreAssistant(userID));
  console.log(" threadID", threadID);
  console.log(" assistantID", assistantID);

  const vectoreStoreID = await uploadJournalEntriesToVectorStore(userID);
  console.log(" vectoreStoreID", vectoreStoreID);

  await openai.beta.assistants.update(assistantID, {
    tool_resources: { file_search: { vector_store_ids: [vectoreStoreID] } },
  });

  await openai.beta.threads.messages.create(threadID, {
    role: "user",
    content: userMessage,
  });

  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();

  console.log("running thread");
  openai.beta.threads.runs
    .stream(threadID, { assistant_id: assistantID })
    .on("textDelta", (delta) => {
      console.log("  sending...");
      writer.write(encoder.encode(delta.value));
    })
    .on("end", () => {
      writer.close();
    })
    .on("error", (err) => {
      console.log(" err", err);
      writer.write(encoder.encode("[Error occurred]\n"));
      writer.close();
    });

  console.log("sending streaming response");
  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
}
