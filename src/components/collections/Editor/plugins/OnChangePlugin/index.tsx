import { useEffect, useLayoutEffect, useState } from "react";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { SerializedEditorState } from "lexical";

import { useAchievements } from "@/context/AchievementsProvider";
import { useCalendarContext } from "@/context/CalendarContextProvider";
import { useUserContext } from "@/context/UserProvider";
import { useDeleteJournalEntry, useGetWeekStreakCount, useJournalEntries, useJournalEntry, useUpsertJournalEntry } from "@/services/journal_entries";
import { checkAchievements } from "@/utils/checkAchievements.ts/checkAchievements";
import useDebounce from "@/utils/hooks/useDebounce";

import isLexicalStateEmpty from "../../utils/isLexicalStateEmpty";

dayjs.extend(utc);

const OnChangePlugin = (): null => {
  // STATE
  const [newEditorState, setNewEditorState] = useState<SerializedEditorState | null>(null);

  // CONTEXT
  const { user } = useUserContext();
  const { calendar } = useCalendarContext();
  const { unlockAchievement } = useAchievements();

  // RQ
  const { mutate: upsertEntry } = useUpsertJournalEntry()
  const { mutate: deleteEntry } = useDeleteJournalEntry()
  const { data: entry } = useJournalEntry(user.userID, calendar.currentDate);
  const { data: entries = [] } = useJournalEntries();
  const { data: streak = 0 } = useGetWeekStreakCount();

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

    checkAchievements({stats: {totalEntries: entries.length, streak, day: dayjs.utc(calendar.currentDate).format('dddd')}, unlock:  unlockAchievement})

    return (): void => {
      setNewEditorState(null);
    }
  // avoid infinite loop
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
