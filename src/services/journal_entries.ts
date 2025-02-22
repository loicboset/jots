import { JournalEntry } from '@/types/api/journal_entries';
import { CreateJournalEntry } from '@/types/payload/journal_entries';
import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

// GET JOURNAL ENTRIES
const getJournalEntries = async () => {
  const { data } = await axios.get('/api/journal_entries');
  return data;
};

const useJournalEntries = (): UseQueryResult<JournalEntry[], Error> => {
  return useQuery({ queryKey: ['journal_entries'], queryFn: getJournalEntries });
};

// POST JOURNAL ENTRY
const postJournalEntry = async (body: CreateJournalEntry) => {
  const { data } = await axios.post('/api/journal_entries', body);
  return data;
};

const useCreateJournalEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postJournalEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journal_entries'] });
    },
  });
};

export { useJournalEntries, useCreateJournalEntry };
