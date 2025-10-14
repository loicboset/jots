import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

import { Chatbot } from "@/types/api/chatbot";

// GET JOURNAL ENTRY
const getChatbot = async (): Promise<Chatbot> => {
  const { data } = await axios.get("/api/chatbot");
  return data;
};

const useChatbot = (): UseQueryResult<Chatbot, Error> =>
  useQuery({
    queryKey: ["chatbot"],
    queryFn: () => getChatbot(),
    gcTime: 0,
  });

export { useChatbot };
