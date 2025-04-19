import { useEffect, useLayoutEffect, useState } from "react";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { SerializedEditorState } from "lexical";

import { useCalendarContext } from "@/context/CalendarContextProvider";
import { useUserContext } from "@/context/UserProvider";
import { useDeleteJournalEntry, useJournalEntry, useUpsertJournalEntry } from "@/services/journal_entries";
import useDebounce from "@/utils/hooks/useDebounce";

import isLexicalStateEmpty from "../../utils/isLexicalStateEmpty";

dayjs.extend(utc);

const OnChangePlugin = (): null => {
  // STATE
  const [newEditorState, setNewEditorState] = useState<SerializedEditorState | null>(null);

  // CONTEXT
  const { user } = useUserContext();
  const { calendar } = useCalendarContext();

  // RQ
  const { mutate: upsertEntry } = useUpsertJournalEntry()
  const { mutate: deleteEntry } = useDeleteJournalEntry()
  const { data: entry } = useJournalEntry(user.userID, calendar.currentDate);

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
    if (!debouncedNewEditorState || isLexicalStateEmpty(debouncedNewEditorState)) return;

    upsertEntry({
      user_id: user.userID,
      content: debouncedNewEditorState,
      date: dayjs.utc(dayjs(calendar.currentDate).format('YYYY-MM-DD'), 'YYYY-MM-DD').toDate(),
    })

    return (): void => {
      setNewEditorState(null);
    }

  }, [calendar.currentDate, debouncedNewEditorState, upsertEntry, user.userID])

  useEffect(() => {
    if (!debouncedNewEditorState) return;

    if (isLexicalStateEmpty(debouncedNewEditorState) && entry?.id) {
      deleteEntry(entry.id);
      return;
    }

    return (): void => {
      setNewEditorState(null);
    }
  }, [debouncedNewEditorState, deleteEntry, entry?.id]);

  return null;
};

export default OnChangePlugin;
