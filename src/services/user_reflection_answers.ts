import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";
import axios from "axios";

import { UserReflectionAnswer } from "@/types/api/user_reflection_answers";
import {
  CreateUserReflectionAnswer,
  UpdateUserReflectionAnswer,
} from "@/types/payload/user_reflection_answers";

// GET ANSWERS FOR A SPECIFIC REFLECTION
const getUserReflectionAnswers = async (
  userReflectionId: string,
): Promise<UserReflectionAnswer[]> => {
  const { data } = await axios.get(`/api/user_reflections/${userReflectionId}/answers`);
  return data;
};

export const useUserReflectionAnswers = (
  userReflectionId: string,
): UseQueryResult<UserReflectionAnswer[], Error> =>
  useQuery({
    queryKey: ["user_reflection_answers", userReflectionId],
    queryFn: () => getUserReflectionAnswers(userReflectionId),
    enabled: !!userReflectionId,
  });

// CREATE ANSWER
const createUserReflectionAnswer = async (
  body: CreateUserReflectionAnswer,
): Promise<UserReflectionAnswer> => {
  const { data } = await axios.post("/api/user_reflection_answers", body);
  return data;
};

export const useCreateUserReflectionAnswer = (): UseMutationResult<
  UserReflectionAnswer,
  Error,
  CreateUserReflectionAnswer
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUserReflectionAnswer,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["user_reflection_answers", data.user_reflection_id],
      });
    },
  });
};

// UPDATE ANSWER
const updateUserReflectionAnswer = async (
  body: UpdateUserReflectionAnswer,
): Promise<UserReflectionAnswer> => {
  const { data } = await axios.patch(`/api/user_reflection_answers/${body.id}`, body);
  return data;
};

export const useUpdateUserReflectionAnswer = (): UseMutationResult<
  UserReflectionAnswer,
  Error,
  UpdateUserReflectionAnswer
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserReflectionAnswer,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["user_reflection_answers", data.user_reflection_id],
      });
    },
  });
};
