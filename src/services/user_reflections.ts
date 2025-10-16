import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
} from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { UserReflection } from '@/types/api/user_reflections';
import { CreateUserReflection, UpdateUserReflection } from '@/types/payload/user_reflections';

// GET USER_REFLECTIONS
const getUserReflections = async (): Promise<UserReflection[]> => {
  const { data } = await axios.get('/api/user_reflections');
  return data;
};

export const useUserReflections = (): UseQueryResult<UserReflection[], Error> =>
  useQuery({
    queryKey: ['user_reflections'],
    queryFn: getUserReflections,
  });

// CREATE USER_REFLECTION
const createUserReflection = async (body: CreateUserReflection): Promise<AxiosResponse> => {
  const { data } = await axios.post('/api/user_reflections', body);
  return data;
};

export const useCreateUserReflection = (): UseMutationResult<
  AxiosResponse,
  AxiosError,
  CreateUserReflection
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUserReflection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user_reflections'] });
    },
  });
};

// UPDATE USER_REFLECTION
const updateUserReflection = async (body: UpdateUserReflection): Promise<UserReflection> => {
  const { data } = await axios.patch(`/api/user_reflections/${body.id}`, body);
  return data;
};

export const useUpdateUserReflection = (): UseMutationResult<
  UserReflection,
  Error,
  UpdateUserReflection
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserReflection,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user_reflections'] });
      queryClient.invalidateQueries({
        queryKey: ['user_reflection', data.id],
      });
    },
  });
};
