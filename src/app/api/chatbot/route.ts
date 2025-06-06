import OpenAI from "openai";

import { createClient } from "@/lib/supabase/server";

const openai = new OpenAI();

export async function POST(request: Request): Promise<Response> {
  const req = await request.json();
  const { userMessage } = req;

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user || !data.user.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Get or create thread
  const { data: threadRow } = await supabase
    .from("user_threads")
    .select("thread_id")
    .eq("user_id", data.user.id)
    .single();

  let threadId = threadRow?.thread_id;
  console.log(" threadId", threadId);

  if (!threadId) {
    const thread = await openai.beta.threads.create();
    console.log("thread created:", thread);
    threadId = thread.id;

    const { error } = await supabase.from("user_threads").insert({
      user_id: data.user.id,
      thread_id: threadId,
    });

    if (error) {
      console.log("error:", error);
      return new Response("Failed to create thread", { status: 500 });
    }
  }

  // Retrieve
  const { data: assistantRow } = await supabase
    .from("assistants")
    .select("assistant_id")
    .eq("user_id", data.user.id)
    .single();

  let assistantId = assistantRow?.assistant_id;
  console.log(" assistantId", assistantId);

  if (!assistantId) {
    const assistant = await openai.beta.assistants.create({
      name: "Dev Career Coach",
      instructions:
        "You are a software engineering career coach. You help the user with career-related questions, based on their professional journal entries.",
      model: "gpt-4o",
    });

    console.log("assistant created:", assistant);
    const { error } = await supabase
      .from("assistants")
      .insert({ assistant_id: assistant.id, name: "Dev Career Coach", user_id: data.user.id });

    if (error) {
      console.log("error:", error);
      return new Response("Failed to create assistant", { status: 500 });
    }

    assistantId = assistant.id;
  }

  await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: userMessage,
  });

  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();

  openai.beta.threads.runs
    .stream(threadId, { assistant_id: assistantId })
    .on("textDelta", (delta) => {
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

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
}
