import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { useCreateJournalEntry } from "@/services/journal_entries";
import { SerializedLexicalNode } from "lexical";

type ExtendedNode = SerializedLexicalNode & {
  date: string;
}

type Props = {
  userID: string;
}

const OnDayEntryChangePlugin = ({ userID }: Props) => {
  // RQ
  // const {} = useJournalEntries();
  const { mutate: createJournalEntry } = useCreateJournalEntry();

  // HOOKS
  const [editor] = useLexicalComposerContext();

  // EFFECTS
  useEffect(() => {
    const removeUpdateListener = editor.registerUpdateListener(({ editorState }) => {
      const state = editorState.toJSON();
      const days = state.root.children;
      days.forEach((day) => {
        if (day.type !== 'day-container') return;
        createJournalEntry({
          user_id: userID,
          content: JSON.stringify(day),
          date: (day as ExtendedNode).date
        })
      });


    });

    return () => {
      removeUpdateListener();
    };
  }, [createJournalEntry, editor, userID]);

  return null;
};

export default OnDayEntryChangePlugin;
