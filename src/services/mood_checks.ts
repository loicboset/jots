import { useMutation, useQuery, useQueryClient, UseQueryResult, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";

import { MoodCheck } from "@/types/api/mood_checks";
import { UpsertMoodCheck } from "@/types/payload/mood_checks";

// GET MOOD CHECK FOR TODAY
const getMoodCheck = async (userID: string): Promise<MoodCheck> => {
  const { data } = await axios.get(`/api/mood_check?user_id=${userID}`);
  return data;
};

const useMoodCheck = (userID: string): UseQueryResult<MoodCheck, Error> => {
  return useQuery({
    queryKey: ["mood_check"],
    queryFn: () => getMoodCheck(userID),
  });
};

// GET MOOD_CHECKS
const getMoodChecks = async (userID: string): Promise<MoodCheck[]> => {
  const { data } = await axios.get(`/api/mood_checks?user_id=${userID}`);
  return data;
};

const useMoodChecks = (userID: string): UseQueryResult<MoodCheck[], Error> => {
  return useQuery({ queryKey: ["mood_checks"], queryFn: () => getMoodChecks(userID) });
};

// UPSERT MOOD_CHECK
const upsertMoodCheck = async (body: UpsertMoodCheck): Promise<MoodCheck> => {
  const { data } = await axios.put("/api/mood_check", body);
  return data;
};

const useUpsertMoodCheck = (): UseMutationResult<MoodCheck, Error, UpsertMoodCheck, unknown> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: upsertMoodCheck,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mood_check"] });
    },
  });
};

export { useMoodCheck, useMoodChecks, useUpsertMoodCheck };