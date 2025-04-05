import { SerializedEditorState } from "lexical";

type CreateJournalEntry = {
  user_id: string;
  content: SerializedEditorState;
  date: Date;
};

export type { CreateJournalEntry };
