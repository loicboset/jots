import { JournalEntry } from '@/types/api/journal_entries';
import { CreateJournalEntry } from '@/types/payload/journal_entries';
import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

// GET JOURNAL ENTRIES
const getJournalEntries = async (userID: string) => {
  const { data } = await axios.get(`/api/journal_entries?user_id=${userID}`);
  return data;
};

const useJournalEntries = (userID: string): UseQueryResult<JournalEntry[], Error> => {
  return useQuery({ queryKey: ['journal_entries'], queryFn: () => getJournalEntries(userID) });
};

// POST JOURNAL ENTRY
const postJournalEntry = async (body: CreateJournalEntry) => {
  const { data } = await axios.post('/api/journal_entries', body);
  return data;
};

const useUpsertJournalEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postJournalEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journal_entries'] });
    },
  });
};

export { useJournalEntries, useUpsertJournalEntry };
