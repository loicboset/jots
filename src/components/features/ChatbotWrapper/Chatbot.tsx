import { useEffect, useState } from "react";

import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import OpenAI from "openai";
import Markdown from 'react-markdown'

import Button from "@/components/ui/buttons/Button";
import { useChatbot } from "@/services/chatbot";
import { useUserAiUsage } from "@/services/user_ai_usage";
import { MAX_AI_TOKENS } from "@/utils/constants";

import "./Chatbot.css"

const Chatbot = (): React.ReactElement => {
  // STATE
  const [messages, setMessages] = useState<OpenAI.Chat.Completions.ChatCompletionMessageParam[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // RQ
  const queryClient = useQueryClient();
  const { data: chatbot, isLoading: isLoadingChatbot } = useChatbot();
  const { data: usedTokens = 0 } = useUserAiUsage(dayjs().format("YYYY-MM-DD"));

  useEffect(() => {
    if (isLoadingChatbot) return;
    if (messages.length === 0 && chatbot) {
      setMessages(chatbot.messages)
    }
  }, [chatbot, isLoadingChatbot, messages]);

  // METHODS
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);

    const res = await fetch("/api/chatbot", {
      method: "POST",
      body: JSON.stringify({ userMessage, chatID: chatbot?.chatID }),
      headers: { "Content-Type": "application/json" },
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder("utf-8");
    let botReply = "";

    while (true) {
      const { value, done } = await reader!.read();
      if (done) break;
      const chunk = decoder.decode(value);
      botReply += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return [...prev.slice(0, -1), { role: "assistant", content: botReply }];
        }
        return [...prev, { role: "assistant", content: chunk }];
      });
    }

    queryClient.invalidateQueries({ queryKey: ['user_ai_usage'] });
    queryClient.invalidateQueries({ queryKey: ['chatbot'] });
    setIsLoading(false);
  };

  // VARS
  const isAiUsageExceeded = usedTokens >= MAX_AI_TOKENS;
  const isDisabled = isLoading || isLoadingChatbot || isAiUsageExceeded;

  const tooltip = `
    We are experimenting with this chatbot!

    You can play around with it, but kindly note that the conversations you have with it might not be retained when we move on to a future version.
  `;


  return (
    <div className="fixed bottom-24 right-6 w-xl bg-gray-700 text-gray-300 rounded-xl shadow-xl flex flex-col h-[500px] border border-gray-200">
      <div className="bg-indigo-600 border-b border-gray-200 text-white text-lg font-semibold p-4 rounded-t-xl">
        Coach Chatbot (experimental <QuestionMarkCircleIcon className="ml-1 w-5 text-white inline" title={tooltip} />)
      </div>

      <div
        className="flex-1 overflow-y-auto p-4 space-y-3"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`markdown p-3 text-sm rounded-lg text-gray-200 max-w-[75%] ${msg.role === 'user'
                ? 'bg-indigo-500'
                : 'bg-gray-500'
                }`}
            >
              <Markdown>{msg.content as string}</Markdown>
            </div>
          </div>
        ))}
      </div>

      <form
        className="p-4 flex flex-col gap-2 border-t"
        onSubmit={handleSubmit}
      >
        <textarea
          rows={3}
          className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Ask anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isDisabled}
        />
        <Button
          type="submit"
          isDisabled={isDisabled}
        >
          {isLoading ? "Sending..." : "Send"}
        </Button>
      </form>
    </div>
  );
};

export default Chatbot;
