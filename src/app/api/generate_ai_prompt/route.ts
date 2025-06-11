import OpenAI from "openai";

import aiUsageLogger from "@/lib/logger/aiUsageLogger";
import { createClient } from "@/lib/supabase/server";

import getUserID from "../_utils/getUserID";
import getJournalEntries from "./_utils/getJournalEntries";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(): Promise<Response> {
  try {
    const supabase = await createClient();

    const userID = await getUserID();
    if (!userID) {
      return new Response("Unauthorized", { status: 401 });
    }

    const journalEntries = await getJournalEntries(userID, 3);

    const { data: settings } = await supabase.from("user_settings").select("*").eq("user_id", userID).single();

    let content = `
      You are an insightful prompt generator, skilled in generating clear and engaging prompts.
      These prompts should be concise and insightful and concise in length, no more than one sentence.
      The goal of these prompts is to inspire and motivate devs to keep writing journaling notes.
      The past notes written by the user will be used as a source of truth to generate these prompts
      from and will be passed inside the end user content.
    `;

    if (settings) {
      content += ` *** `;
      if (settings.role) content += ` The user's role is ${settings.role}.`;
      if (settings.experience) content += ` The user's experience is ${settings.experience}.`;
      if (settings.goal) content += ` The user's goal is ${settings.goal}.`;
      content += ` *** `;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content,
        },
        {
          role: "user",
          content: journalEntries || "",
        },
      ],
    });

    await aiUsageLogger({
      userID: userID,
      type: "AI_PROMPT",
      model: "gpt-4o-mini",
      inputTokens: completion.usage?.prompt_tokens ?? 0,
      inputCachedTokens: completion.usage?.prompt_tokens_details?.cached_tokens ?? 0,
      outputTokens: completion.usage?.completion_tokens ?? 0,
    });

    const messageContent = completion.choices[0].message.content;

    const prompt = messageContent ?? "We are unable to generate a prompt for you. Please try again later.";

    return Response.json({ prompt });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
