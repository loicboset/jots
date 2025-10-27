import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

type Churn = {
  totalUsers: number;
  totalActiveUsers: number;
  droppedUsers: number;
  avgEntriesBeforeChurn: number;
};

// GET CHURN
const getChurn = async (): Promise<Churn> => {
  const { data } = await axios.get(`/api/admin/churn`);
  return data;
};

const useChurn = (): UseQueryResult<Churn, AxiosError> =>
  useQuery({ queryKey: ['admin/churn'], queryFn: () => getChurn() });

type Retention = {
  totalUsers: number;
  retention: Record<number, number>; // e.g. {7: 0.42, 14: 0.27, ...}
};

// GET RETENTION
const getRetention = async (): Promise<Retention> => {
  const { data } = await axios.get(`/api/admin/retention`);
  return data;
};

const useRetention = (): UseQueryResult<Retention, AxiosError> =>
  useQuery({ queryKey: ['admin/retention'], queryFn: () => getRetention() });

export { useChurn, useRetention };
