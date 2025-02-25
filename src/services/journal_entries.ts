import { useMutation, useQuery, useQueryClient, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import axios from 'axios';

import { JournalEntry } from '@/types/api/journal_entries';
import { CreateJournalEntry } from '@/types/payload/journal_entries';

// GET JOURNAL ENTRIES
const getJournalEntries = async (userID: string): Promise<JournalEntry[]> => {
  const { data } = await axios.get(`/api/journal_entries?user_id=${userID}`);
  return data;
};

const useJournalEntries = (userID: string): UseQueryResult<JournalEntry[], Error> => {
  return useQuery({ queryKey: ['journal_entries'], queryFn: () => getJournalEntries(userID) });
};

// POST JOURNAL ENTRY
const postJournalEntry = async (body: CreateJournalEntry): Promise<JournalEntry> => {
  const { data } = await axios.post('/api/journal_entries', body);
  return data;
};

const useUpsertJournalEntry = (): UseMutationResult<JournalEntry, Error, CreateJournalEntry, unknown> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postJournalEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journal_entries'] });
    },
  });
};

export { useJournalEntries, useUpsertJournalEntry };
