import { UserReflectionAssessment } from '@/types/api/user_reflection_assessments';
import { CreateUserReflectionAssessment } from '@/types/payload/user_reflection_assessments';
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
} from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';

// GET USER REFLECTION ASSESSMENT
const getUserReflectionAssessment = async (id: number): Promise<UserReflectionAssessment> => {
  const { data } = await axios.get(`/api/user_reflection_assessment?id=${id}`);
  return data;
};

const useUserReflectionAssessment = (id: number): UseQueryResult<UserReflectionAssessment, Error> =>
  useQuery({
    queryKey: ['user_reflection_assessment', id],
    queryFn: () => getUserReflectionAssessment(id),
  });

// // GET USER_REFLECTIONS
// const getUserReflections = async (date: Date): Promise<UserReflection[]> => {
//   const { data } = await axios.get(`/api/user_reflections?date=${date}`);
//   return data;
// };

// const useUserReflections = (date: Date): UseQueryResult<UserReflection[], Error> =>
//   useQuery({
//     queryKey: ['user_reflections', date],
//     queryFn: () => getUserReflections(date),
//   });

// CREATE USER_REFLECTION
const createUserReflectionAssessment = async (
  body: CreateUserReflectionAssessment,
): Promise<AxiosResponse> => {
  const data = await axios.post('/api/user_reflection_assessments', body);
  return data;
};

const useCreateUserReflectionAssessment = (): UseMutationResult<
  AxiosResponse,
  AxiosError,
  CreateUserReflectionAssessment
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUserReflectionAssessment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user_reflection_assessment'] });
    },
  });
};

export { useCreateUserReflectionAssessment, useUserReflectionAssessment };
