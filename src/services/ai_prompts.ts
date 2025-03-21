import axios from 'axios';

import { AiPromptResponse } from '@/types/api/ai_prompts';

export const getAiPrompt = async (body: string): Promise<AiPromptResponse> => {
  const { data } = await axios.post("/api/generate_ai_prompt", body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data;
};
