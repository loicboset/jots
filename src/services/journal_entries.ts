import { useMutation, useQuery, useQueryClient, UseQueryResult, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";

import { JournalEntry, JournalEntryDate } from "@/types/api/journal_entries";
import { CreateJournalEntry } from "@/types/payload/journal_entries";

type UseJournalEntriesParams = {
  limit?: number;
};

// GET JOURNAL ENTRY
const getJournalEntry = async (userID: string, date: Date): Promise<JournalEntry> => {
  const { data } = await axios.get(`/api/journal_entry?user_id=${userID}&date=${date}`);
  return data;
};

const useJournalEntry = (userID: string, date: Date): UseQueryResult<JournalEntry, Error> => {
  return useQuery({
    queryKey: ["journal_entry", date],
    queryFn: () => getJournalEntry(userID, date),
    gcTime: 0,
  });
};

// GET JOURNAL ENTRIES
const getJournalEntries = async (params?: UseJournalEntriesParams): Promise<JournalEntry[]> => {
  let url = `/api/journal_entries`;
  if (params?.limit) url += `?limit=${params.limit}`;

  const { data } = await axios.get(url);
  return data;
};

const useJournalEntries = (params?: UseJournalEntriesParams): UseQueryResult<JournalEntry[], Error> => {
  return useQuery({ queryKey: ["journal_entries"], queryFn: () => getJournalEntries(params) });
};

// UPSERT JOURNAL ENTRY
const upsertJournalEntry = async (body: CreateJournalEntry): Promise<JournalEntry> => {
  const { data } = await axios.put("/api/journal_entry", body);
  return data;
};

const useUpsertJournalEntry = (): UseMutationResult<JournalEntry, Error, CreateJournalEntry, unknown> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: upsertJournalEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journal_entry"] });
      queryClient.invalidateQueries({ queryKey: ["journal_entries/month/dates"] });
      queryClient.invalidateQueries({ queryKey: ["week_streak_count"] });
    },
  });
};

// DELETE JOURNAL ENTRY
const deleteJournalEntry = async (id: number): Promise<JournalEntry> => {
  const { data } = await axios.delete(`/api/journal_entry/${id}`);
  return data;
};

const useDeleteJournalEntry = (): UseMutationResult<JournalEntry, Error, number, unknown> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteJournalEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journal_entry"] });
      queryClient.invalidateQueries({ queryKey: ["journal_entries/month/dates"] });
      queryClient.invalidateQueries({ queryKey: ["week_streak_count"] });
    },
  });
};

// GET JOURNAL ENTRIES DATES
const getJournalEntriesDates = async (userID: string, date?: Date): Promise<JournalEntryDate[]> => {
  const { data } = await axios.get(`/api/journal_entries/month/dates?user_id=${userID}&date=${date}`);
  return data;
};

const useJournalEntriesDates = (userID: string, date?: Date): UseQueryResult<JournalEntryDate[], Error> => {
  return useQuery({
    queryKey: ["journal_entries/month/dates", userID, date],
    queryFn: () => getJournalEntriesDates(userID, date),
    enabled: !!date,
  });
};

// GET WEEK STREAK COUNT
const getWeekStreakCount = async (): Promise<number> => {
  const { data } = await axios.get("/api/journal_entries/week_streak_count");
  return data;
};

const useGetWeekStreakCount = (): UseQueryResult<number, Error> => {
  return useQuery({ queryKey: ["week_streak_count"], queryFn: () => getWeekStreakCount() });
};

export {
  useJournalEntry,
  useJournalEntries,
  useUpsertJournalEntry,
  useJournalEntriesDates,
  useDeleteJournalEntry,
  useGetWeekStreakCount,
};
