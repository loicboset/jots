type JournalEntry = {
  id: number;
  user_id: string;
  date: string;
  content: string;
  created_at: string;
};

type JournalEntryDate = {
  date: string;
};

export type { JournalEntry, JournalEntryDate };
