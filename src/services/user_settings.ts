import { useMutation, useQuery, useQueryClient, UseQueryResult, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";

import { UserSettings } from "@/types/api/user_settings";
import { UpsertUserSettings } from "@/types/payload/user_settings";

// GET USER SETTINGS
const getUserSettings = async (userID: string): Promise<UserSettings> => {
  const { data } = await axios.get(`/api/user_settings?user_id=${userID}`);
  return data;
};

const useUserSettings = (userID: string): UseQueryResult<UserSettings, Error> => {
  return useQuery({ queryKey: ["user_settings"], queryFn: () => getUserSettings(userID) });
};

// UPSERT USER SETTINGS
const upsertUserSettings = async (body: UpsertUserSettings): Promise<void> => {
  const { data } = await axios.put("/api/user_settings", body);
  return data;
};

const useUpsertUserSettings = (): UseMutationResult<void, Error, UpsertUserSettings, unknown> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: upsertUserSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_settings"] });
    },
  });
};

export { useUserSettings, useUpsertUserSettings };
