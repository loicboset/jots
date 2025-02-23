import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState } from "react";
import { useCreateJournalEntry } from "@/services/journal_entries";
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
  // const {} = useJournalEntries();
  const { mutate: createJournalEntry } = useCreateJournalEntry();

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
      createJournalEntry({
        user_id: userID,
        content: JSON.stringify(day),
        date: (day as ExtendedNode).date
      })
    });

  }, [createJournalEntry, debouncedNewEditorState, userID])

  return null;
};

export default OnDayEntryChangePlugin;
