import * as Sentry from '@sentry/node';

import { createClient } from '@/lib/supabase/server';

type UsageType = 'AI_PROMPT' | 'WEEKLY_DIGEST' | 'CHATBOT';

const MODELS_COST = {
  'gpt-4o': { input: 2.5 / 1_000_000, cached: 1.25 / 1_000_000, output: 10 / 1_000_000 },
  'gpt-4o-mini': { input: 0.15 / 1_000_000, cached: 0.075 / 1_000_000, output: 0.6 / 1_000_000 },
  'gpt-4.1-mini': { input: 0.4 / 1_000_000, cached: 0.1 / 1_000_000, output: 1.6 / 1_000_000 },
  'gpt-4.1': { input: 2 / 1_000_000, cached: 0.5 / 1_000_000, output: 8 / 1_000_000 },
};

type AiLogData = {
  userID: string;
  type: UsageType;
  model: keyof typeof MODELS_COST;
  inputTokens: number;
  inputCachedTokens: number;
  outputTokens: number;
};

const aiUsageLogger = async (args: AiLogData): Promise<void> => {
  const { userID, type, model, inputTokens, inputCachedTokens, outputTokens } = args;

  try {
    const supabase = await createClient();

    const nonCachedInputCost = (inputTokens - inputCachedTokens) * MODELS_COST[model].input;
    const cachedInputCost = inputCachedTokens * MODELS_COST[model].cached;
    const outputCost = outputTokens * MODELS_COST[model].output;
    const totalCost = nonCachedInputCost + cachedInputCost + outputCost;

    const { error } = await supabase.from('user_ai_usage').insert({
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
