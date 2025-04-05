import { useMutation, useQuery, useQueryClient, UseQueryResult, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";

import { JournalEntry } from "@/types/api/journal_entries";
import { CreateJournalEntry } from "@/types/payload/journal_entries";

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
const getJournalEntries = async (userID: string): Promise<JournalEntry[]> => {
  const { data } = await axios.get(`/api/journal_entries?user_id=${userID}`);
  return data;
};

const useJournalEntries = (userID: string): UseQueryResult<JournalEntry[], Error> => {
  return useQuery({ queryKey: ["journal_entries"], queryFn: () => getJournalEntries(userID) });
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
    },
  });
};

export { useJournalEntry, useJournalEntries, useUpsertJournalEntry };
