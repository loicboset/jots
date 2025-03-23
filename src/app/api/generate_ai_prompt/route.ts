import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request): Promise<Response> {
  try {
    const paragraphContent = await request.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            // eslint-disable-next-line max-len
            `You are an insightful prompt generator, skilled in generating clear and engaging prompts. These prompts should be concise and insightful and concise in length, no more than one sentence. The goal of these prompts is to inspire and motivate devs to keep writing journaling notes. The past notes written by the user will be used as a source of truth to generate these prompts from and will be passed inside the end user content.`,
        },
        {
          role: "user",
          content: paragraphContent,
        },
      ],
    });

    const messageContent = completion.choices[0].message.content;

    const prompt = messageContent ?? "We are unable to generate a prompt for you. Please try again later.";

    return Response.json({ prompt });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
