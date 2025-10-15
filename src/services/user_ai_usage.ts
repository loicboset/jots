import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

// GET USER SETTINGS
const getUserAiUsage = async (date: string): Promise<number> => {
  const { data } = await axios.get(`/api/user_ai_usage?date=${date}`);
  return data;
};

const useUserAiUsage = (date: string): UseQueryResult<number, Error> =>
  useQuery({
    queryKey: ['user_ai_usage'],
    queryFn: () => getUserAiUsage(date),
  });

export { useUserAiUsage };
