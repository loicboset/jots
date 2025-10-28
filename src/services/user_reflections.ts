import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
} from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { UserReflection } from '@/types/api/user_reflections';
import { CreateUserReflection } from '@/types/payload/user_reflections';

// GET USER_REFLECTION
const getUserReflection = async (id: number): Promise<UserReflection> => {
  const { data } = await axios.get(`/api/user_reflection?id=${id}`);
  return data;
};

const useUserReflection = (id: number): UseQueryResult<UserReflection, Error> =>
  useQuery({
    queryKey: ['user_reflection', id],
    queryFn: () => getUserReflection(id),
  });

// GET USER_REFLECTIONS
const getUserReflections = async (date: Date): Promise<UserReflection[]> => {
  const { data } = await axios.get(`/api/user_reflections?date=${date}`);
  return data;
};

const useUserReflections = (date: Date): UseQueryResult<UserReflection[], Error> =>
  useQuery({
    queryKey: ['user_reflections', date],
    queryFn: () => getUserReflections(date),
  });

// CREATE USER_REFLECTION
const createUserReflection = async (body: CreateUserReflection): Promise<AxiosResponse> => {
  const data = await axios.post('/api/user_reflections', body);
  return data;
};

const useCreateUserReflection = (): UseMutationResult<
  AxiosResponse,
  AxiosError,
  CreateUserReflection
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUserReflection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user_reflections'] });
      queryClient.invalidateQueries({ queryKey: ['user_activity_dates'] });
    },
  });
};

export { useUserReflection, useUserReflections, useCreateUserReflection };
