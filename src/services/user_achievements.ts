import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";
import axios from "axios";

import { UserAchievement } from "@/types/api/user_achievements";
import { UpsertUserAchievement } from "@/types/payload/user_achievements";

// GET USER_ACHIEVEMENTS
const getUserAchievements = async (): Promise<UserAchievement[]> => {
  const { data } = await axios.get("/api/user_achievements");
  return data;
};

const useUserAchievements = (): UseQueryResult<UserAchievement[], Error> =>
  useQuery({
    queryKey: ["user_achievements"],
    queryFn: () => getUserAchievements(),
  });

// UPSERT USER_ACHIEVEMENT
const upsertUserAchievement = async (
  body: UpsertUserAchievement,
): Promise<UserAchievement> => {
  const { data } = await axios.put("/api/user_achievement", body);
  return data;
};

const useUpsertUserAchievement = (): UseMutationResult<
  UserAchievement,
  Error,
  UpsertUserAchievement,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: upsertUserAchievement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_achievements"] });
    },
  });
};

export { useUserAchievements, useUpsertUserAchievement };
