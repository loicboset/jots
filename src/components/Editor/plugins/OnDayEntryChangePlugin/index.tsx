import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState } from "react";
import { useUpsertJournalEntry, useJournalEntries } from "@/services/journal_entries";
import { SerializedEditorState, SerializedLexicalNode } from "lexical";
import useDebounce from "@/utils/hooks/useDebounce";

type ExtendedNode = SerializedLexicalNode & {
  date: string;
}

type Props = {
  userID: string;
}

const OnDayEntryChangePlugin = ({ userID }: Props) => {
  // STATE
  const [newEditorState, setNewEditorState] = useState('');

  // RQ
  const { data: entries = [] } = useJournalEntries(userID);
  const { mutate: upsertJournalEntry } = useUpsertJournalEntry();

  // HOOKS
  const [editor] = useLexicalComposerContext();
  const debouncedNewEditorState = useDebounce(newEditorState, 500);

  // EFFECTS
  useEffect(() => {
    const removeUpdateListener = editor.registerUpdateListener(({ editorState }) => {
      setNewEditorState(JSON.stringify(editorState.toJSON()));
    });

    return () => {
      removeUpdateListener();
    };
  }, [editor]);

  useEffect(() => {
    if (!debouncedNewEditorState) return;


    const state = JSON.parse(debouncedNewEditorState) as SerializedEditorState;
    const days = state.root.children;
    days.forEach((day) => {
      if (day.type !== 'day-container') return;
      const existingEntry = entries.find((entry) => entry.date === (day as ExtendedNode).date);
      if (existingEntry && existingEntry.content === JSON.stringify(day)) return;

      upsertJournalEntry({
        user_id: userID,
        content: JSON.stringify(day),
        date: (day as ExtendedNode).date
      })
    });

  }, [upsertJournalEntry, debouncedNewEditorState, userID, entries])

  return null;
};

export default OnDayEntryChangePlugin;
