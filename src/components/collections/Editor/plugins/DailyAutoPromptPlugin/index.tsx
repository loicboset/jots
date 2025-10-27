import { useEffect } from 'react';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import dayjs from 'dayjs';
import { $getRoot, $isParagraphNode } from 'lexical';

import { $createSkilledPromptNode } from '@/components/collections/Editor/nodes/SkilledPromptNode';
import {
  $createSkilledPromptWrapperNode,
  SkilledPromptWrapperNode,
} from '@/components/collections/Editor/nodes/SkilledPromptWrapperNode';
import { prompts } from '@/prompts';
import { useUserSettings } from '@/services/user_settings';
import useCalendarStore from '@/stores/useCalendarStore';

const getTodayKey = (): string => {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  return `jots-prompt-dismissed-${today}`;
};

const DailyAutoPromptPlugin = (): null => {
  // STORE
  const { selectedDate } = useCalendarStore();

  // RQ
  const { data: userSettings } = useUserSettings();

  // HOOKS
  const [editor] = useLexicalComposerContext();

  // EFFECTS
  useEffect(() => {
    if (!userSettings) return;

    if (!userSettings.daily_prompt_enabled) return;

    const isTodaySelected = dayjs(selectedDate).isSame(dayjs(), 'day');
    if (!isTodaySelected) return;

    const key = getTodayKey();
    const wasDismissed = localStorage.getItem(key) === 'true';

    if (wasDismissed) return;

    editor.update(() => {
      const root = $getRoot();
      const children = root.getChildren();

      const hasOnlyEmptyParagraph =
        children.length === 1 &&
        $isParagraphNode(children[0]) &&
        children[0].getTextContent().trim() === '';

      if (hasOnlyEmptyParagraph) {
        root.clear(); // Remove default empty paragraph

        let randomPrompt = { text: '', skill: '' };
        if (userSettings.goal === 'Learn AI skills') {
          const aiPrompts = prompts.filter((item) => item.skill === 'AI');
          randomPrompt = aiPrompts[Math.floor(Math.random() * aiPrompts.length)];
        } else {
          randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
        }
        const wrapper = $createSkilledPromptWrapperNode(randomPrompt.text, randomPrompt.skill);
        const paragraph = $createSkilledPromptNode();
        wrapper.append(paragraph);
        root.append(wrapper);
      }
    });

    // Listen for deletion of the node
    return editor.registerMutationListener(SkilledPromptWrapperNode, (mutations) => {
      for (const [, mutation] of mutations) {
        if (mutation === 'destroyed') {
          localStorage.setItem(key, 'true');
        }
      }
    });
  }, [editor, selectedDate, userSettings]);

  return null;
};

export default DailyAutoPromptPlugin;
