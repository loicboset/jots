import axios from "axios";

const generateAiPrompt = async (): Promise<{ prompt: string }> => {
  const { data } = await axios.post("/api/generate_ai_prompt", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
};

export { generateAiPrompt };
