import { useMutation, UseMutationResult, useQueryClient, useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

import { UserPushSubscription } from "@/types/api/push_subscriptions";
import { UpsertPushSubscriptionPayload } from "@/types/payload/push_subscription";

const PUSHSUBSCRIPTIONS = "push_subscriptions";

// GET PUSH SUBSCRIPTION
const getPushSubscriptions = async (): Promise<UserPushSubscription[]> => {
  const { data } = await axios.get(`/api/push_subscriptions`);
  return data;
};

const useUserPushSubscriptions = (): UseQueryResult<UserPushSubscription[], Error> => {
  return useQuery({ queryKey: [PUSHSUBSCRIPTIONS], queryFn: () => getPushSubscriptions() });
};

// ------ UPSERT PUSH SUBSCRIPTION ------
const upsertPushSubscription = async (payload: UpsertPushSubscriptionPayload): Promise<UserPushSubscription> => {
  const { data } = await axios.put(`/api/push_subscriptions`, payload);
  return data;
};

const useUpsertPushSubscription = (): UseMutationResult<
  UserPushSubscription,
  Error,
  UpsertPushSubscriptionPayload,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: upsertPushSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PUSHSUBSCRIPTIONS] });
    },
  });
};

export { useUserPushSubscriptions, useUpsertPushSubscription };
