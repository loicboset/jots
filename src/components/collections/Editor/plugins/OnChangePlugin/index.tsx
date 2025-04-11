import { useEffect, useLayoutEffect, useState } from "react";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { SerializedEditorState } from "lexical";

import { useCalendarContext } from "@/context/CalendarContextProvider";
import { useUserContext } from "@/context/UserProvider";
import { useUpsertJournalEntry } from "@/services/journal_entries";
import useDebounce from "@/utils/hooks/useDebounce";

dayjs.extend(utc);

const OnChangePlugin = (): null => {
  // STATE
  const [newEditorState, setNewEditorState] = useState<SerializedEditorState | null>(null);

  // CONTEXT
  const { user } = useUserContext();
  const { calendar } = useCalendarContext();

  // RQ
  const { mutate: upsertEntry } = useUpsertJournalEntry()

  // HOOKS
  const [editor] = useLexicalComposerContext();
  const debouncedNewEditorState = useDebounce(newEditorState, 500);

  // EFFECTS
  useLayoutEffect(() => {
    return editor.registerUpdateListener(
      ({ editorState, dirtyElements, dirtyLeaves, prevEditorState, tags }) => {
        if (
          (dirtyElements.size === 0 && dirtyLeaves.size === 0) ||
          (tags.has('history-merge')) || prevEditorState.isEmpty()
        ) {
          return;
        }

        setNewEditorState(editorState.toJSON());
      },
    );
  }, [editor]);



  useEffect(() => {
    if (!debouncedNewEditorState) return;

    upsertEntry({
      user_id: user.userID,
      content: debouncedNewEditorState,
      date: dayjs.utc(dayjs(calendar.currentDate).format('YYYY-MM-DD'), 'YYYY-MM-DD').toDate(),
    })

    return (): void => {
      setNewEditorState(null);
    }

  }, [calendar.currentDate, debouncedNewEditorState, upsertEntry, user.userID])

  return null;
};

export default OnChangePlugin;
