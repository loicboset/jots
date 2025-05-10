import { useMutation, useQuery, useQueryClient, UseQueryResult, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";

import { UserSettings } from "@/types/api/user_settings";
import { UpsertUserSettings } from "@/types/payload/user_settings";

// GET USER SETTINGS
const getUserSettings = async (): Promise<UserSettings> => {
  const { data } = await axios.get(`/api/user_settings`);
  return data;
};

const useUserSettings = (): UseQueryResult<UserSettings, Error> => {
  return useQuery({ queryKey: ["user_settings"], queryFn: () => getUserSettings() });
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

// TOGGLE PUSH NOTIFICATIONS
const togglePushNotification = async (isActive: boolean): Promise<void> => {
  const { data } = await axios.patch("/api/user_settings/toggle_push_notifications", {
    is_push_notifications_active: isActive,
  });
  return data;
};

const useTogglePushNotification = (): UseMutationResult<void, Error, boolean, unknown> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: togglePushNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_settings"] });
    },
  });
};

export { useUserSettings, useUpsertUserSettings, useTogglePushNotification };
