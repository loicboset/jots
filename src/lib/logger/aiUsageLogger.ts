import * as Sentry from "@sentry/node";

import { createClient } from "@/lib/supabase/server";

type UsageType = "AI_PROMPT" | "WEEKLY_DIGEST";

const MODELS_COST = {
  "gpt-4o": { input: 2.5 / 1_000_000, output: 10 / 1_000_000 },
  "gpt-4o-mini": { input: 0.15 / 1_000_000, output: 0.6 / 1_000_000 },
};

type AiLogData = {
  userID: string;
  type: UsageType;
  model: keyof typeof MODELS_COST;
  inputTokens: number;
  outputTokens: number;
};

const aiUsageLogger = async (args: AiLogData): Promise<void> => {
  const { userID, type, model, inputTokens, outputTokens } = args;

  try {
    const supabase = await createClient();

    const inputCost = inputTokens * MODELS_COST[model].input;
    const outputCost = outputTokens * MODELS_COST[model].output;
    const totalCost = inputCost + outputCost;

    const { error } = await supabase.from("user_ai_usage").insert({
      user_id: userID,
      type,
      model,
      input_tokens: inputTokens,
      output_tokens: outputTokens,
      cost: totalCost,
    });

    if (error) throw error;
  } catch (error) {
    Sentry.captureException(error);
  }
};

export default aiUsageLogger;
