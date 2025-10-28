import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

type UserActivityDate = {
  date: string;
};

// GET JOURNAL ENTRIES DATES
const getUserActivityDates = async (userID: string, from?: string): Promise<UserActivityDate[]> => {
  const { data } = await axios.get(
    `/api/aggregate/user_activity_dates?user_id=${userID}&from=${from}`,
  );
  return data;
};

const useUserActivityDates = (
  userID: string,
  from?: string,
): UseQueryResult<UserActivityDate[], Error> =>
  useQuery({
    queryKey: ['user_activity_dates', userID, from],
    queryFn: () => getUserActivityDates(userID, from),
    enabled: !!from,
  });

export { useUserActivityDates };
