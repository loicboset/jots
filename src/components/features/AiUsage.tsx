import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";

import { useUserAiUsage } from "@/services/user_ai_usage";

const AiUsage = (): React.ReactElement => {
  // RQ
  const { data: usedTokens = 0 } = useUserAiUsage(dayjs().format("YYYY-MM-DD"));

  // VARS
  const tooltip = "You have 100 tokens per day to use on AI-features like /ai-prompt and the career coach chatbot.";

  return (
    <div className="w-full border-t border-gray-300 pt-4 flex justify-center space-x-2">
      <p className="text-sm text-center">
        {100 - usedTokens}/100 AI tokens
      </p>
      <QuestionMarkCircleIcon className="w-5" title={tooltip} />
    </div>
  );
};

export default AiUsage;
