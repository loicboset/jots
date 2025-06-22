import type { JSX } from 'react';
import { useCallback, useMemo, useState } from 'react';
import * as React from 'react';

import SparklesIcon from "@heroicons/react/24/outline/SparklesIcon";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  LexicalTypeaheadMenuPlugin,
  MenuOption,
  useBasicTypeaheadTriggerMatch,
} from '@lexical/react/LexicalTypeaheadMenuPlugin';
import { $setBlocksType } from '@lexical/selection';
import { useFeatureFlag } from "configcat-react";
import dayjs from 'dayjs';
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  LexicalEditor,
  TextNode,
} from 'lexical';
import * as ReactDOM from 'react-dom';

import './ComponentPicker.css'
import { useUserContext } from '@/context/UserProvider';
import { useUserAiUsage } from '@/services/user_ai_usage';
import usePromptsLibraryStore from '@/stores/usePromptsLibraryStore';
import { MAX_AI_TOKENS } from '@/utils/constants';

import { $createAiPromptNode } from '../../nodes/AiPromptNode'
import { $createPromptNode } from '../../nodes/PromptNode';

class ComponentPickerOption extends MenuOption {
  // What shows up in the editor
  title: string;
  // Icon for display
  icon?: JSX.Element;
  // For extra searching.
  keywords: Array<string>;
  // TBD
  keyboardShortcut?: string;
  // What happens when you select this option?
  onSelect: (queryString: string) => void;

  constructor(
    title: string,
    options: {
      icon?: JSX.Element;
      keywords?: Array<string>;
      keyboardShortcut?: string;
      onSelect: (queryString: string) => void;
    },
  ) {
    super(title);
    this.title = title;
    this.keywords = options.keywords || [];
    this.icon = options.icon;
    this.keyboardShortcut = options.keyboardShortcut;
    this.onSelect = options.onSelect.bind(this);
  }
}

const ComponentPickerMenuItem = ({
  index,
  isSelected,
  onClick,
  onMouseEnter,
  option,
}: {
  index: number;
  isSelected: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  option: ComponentPickerOption;
}): JSX.Element => {
  let className = 'item';
  if (isSelected) {
    className += ' selected';
  }
  return (
    <li
      key={option.key}
      tabIndex={-1}
      className={className}
      ref={option.setRefElement}
      role="option"
      aria-selected={isSelected}
      id={'typeahead-item-' + index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}>
      {option.icon}
      <span className="text">{option.title}</span>
    </li>
  );
}

const getBaseOptions = (editor: LexicalEditor): ComponentPickerOption[] => [
  new ComponentPickerOption('Prompt', {
    icon: <i className="icon paragraph" />,
    keywords: ['prompt'],
    onSelect: (): void =>
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => {
            const paragraph = $createParagraphNode();
            const prompt = $createPromptNode();
            paragraph.append(prompt);
            return paragraph;
          });
        }
      }),
  }),
]

// TODO: only show this option if user has a min 5 day streak, add as condition below when streaks are live
const getAiPromptOption = (editor: LexicalEditor, isAiUsageExceeded: boolean): ComponentPickerOption =>
  new ComponentPickerOption('AI Prompt', {
    icon: <SparklesIcon className="icon paragraph" />,
    keywords: ['ai', 'prompt', 'aiprompt'],
    onSelect: (): void =>
      editor.update(() => {
        if (isAiUsageExceeded) {
          alert('You have exceeded your AI usage for today. Please try again tomorrow.');
          return;
        }
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => {
            const paragraph = $createParagraphNode();
            const prompt = $createAiPromptNode('Generating prompt with AI, please wait ...');
            paragraph.append(prompt);
            return paragraph;
          });
        }
      }),
  })


export default function ComponentPickerMenuPlugin(): JSX.Element {
  // CONTEXT
  const { user } = useUserContext();

  // STATE
  const [queryString, setQueryString] = useState<string | null>(null);

  // STORE
  const toggle = usePromptsLibraryStore((state) => state.toggle);
  const setSelection = usePromptsLibraryStore((state) => state.setSelection);

  // RQ
  const { data: usedTokens = 0 } = useUserAiUsage(dayjs().format("YYYY-MM-DD"));

  // HOOKS
  const { value: isaipromptenabledValue, loading: isaipromptenabledLoading } = useFeatureFlag("isaipromptenabled", false);
  const [editor] = useLexicalComposerContext();

  // VARS
  const isAiUsageExceeded = usedTokens >= MAX_AI_TOKENS;

  const checkForTriggerMatch = useBasicTypeaheadTriggerMatch('/', {
    minLength: 0,
  });

  const options = useMemo(() => {
    const baseOptions = getBaseOptions(editor);

    if (['be7fb9ac-457e-40cf-a5eb-1b268422a239', '207a52f2-4d6c-4aca-b30b-3b588625a959'].includes(user.userID)) {
      baseOptions.push(new ComponentPickerOption('Prompts', {
        icon: <i className="icon paragraph" />,
        keywords: ['prompts'],
        onSelect: (): void => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            setSelection(selection);
            toggle()
          }
        },
      }),)
    }

    const aiPromptOption = getAiPromptOption(editor, isAiUsageExceeded);

    const allowedOptions = [...baseOptions];

    if (isaipromptenabledValue && !isaipromptenabledLoading) {
      allowedOptions.push(aiPromptOption)
    }

    if (!queryString) {
      return allowedOptions;
    }

    const regex = new RegExp(queryString, 'i');

    return [
      ...allowedOptions.filter(
        (option) =>
          regex.test(option.title) ||
          option.keywords.some((keyword) => regex.test(keyword)),
      ),
    ];

  }, [editor, isAiUsageExceeded, isaipromptenabledValue, isaipromptenabledLoading, queryString]);

  const onSelectOption = useCallback(
    (
      selectedOption: ComponentPickerOption,
      nodeToRemove: TextNode | null,
      closeMenu: () => void,
      matchingString: string,
    ) => {
      editor.update(() => {
        nodeToRemove?.remove();
        selectedOption.onSelect(matchingString);
        closeMenu();
      });
    },
    [editor],
  );

  return (
    <>
      <LexicalTypeaheadMenuPlugin<ComponentPickerOption>
        onQueryChange={setQueryString}
        onSelectOption={onSelectOption}
        triggerFn={checkForTriggerMatch}
        options={options}
        menuRenderFn={(
          anchorElementRef,
          { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex },
        ) =>
          anchorElementRef.current && options.length
            ? ReactDOM.createPortal(
              <div className="typeahead-popover component-picker-menu">
                <ul>
                  {options.map((option, i: number) => (
                    <ComponentPickerMenuItem
                      index={i}
                      isSelected={selectedIndex === i}
                      onClick={() => {
                        setHighlightedIndex(i);
                        selectOptionAndCleanUp(option);
                      }}
                      onMouseEnter={() => {
                        setHighlightedIndex(i);
                      }}
                      key={option.key}
                      option={option}
                    />
                  ))}
                </ul>
              </div>,
              anchorElementRef.current,
            )
            : null
        }
      />
    </>
  );
}
