import { useMutation, useQuery, useQueryClient, UseQueryResult, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";

import { UserAchievement } from "@/types/api/user_achievements";
import { UpsertUserAchievement } from "@/types/payload/user_achievements";

// GET USER_ACHIEVEMENTS
const getUserAchievements = async (userID: string): Promise<UserAchievement[]> => {
  const queryParams = new URLSearchParams({ user_id: userID });
  const { data } = await axios.get(`/api/user_achievements?${queryParams.toString()}`);
  return data;
};

const useUserAchievements = (userID: string): UseQueryResult<UserAchievement[], Error> => {
  return useQuery({ queryKey: ["user_achievements"], queryFn: () => getUserAchievements(userID) });
};

// UPSERT USER_ACHIEVEMENT
const upsertUserAchievement = async (body: UpsertUserAchievement): Promise<UserAchievement> => {
  const { data } = await axios.put("/api/user_achievement", body);
  return data;
};

const useUpsertUserAchievement = (): UseMutationResult<UserAchievement, Error, UpsertUserAchievement, unknown> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: upsertUserAchievement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_achievements"] });
    },
  });
};

export { useUserAchievements, useUpsertUserAchievement };