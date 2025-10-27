/* eslint-disable prettier/prettier */
import type { JSX } from 'react';
import { useCallback, useMemo, useState } from 'react';
import * as React from 'react';

import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon';
import CodeBracketIcon from '@heroicons/react/24/outline/CodeBracketIcon';
import SparklesIcon from '@heroicons/react/24/outline/SparklesIcon';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  LexicalTypeaheadMenuPlugin,
  MenuOption,
  useBasicTypeaheadTriggerMatch,
} from '@lexical/react/LexicalTypeaheadMenuPlugin';
import { $setBlocksType } from '@lexical/selection';
import { useFeatureFlag } from 'configcat-react';
import dayjs from 'dayjs';
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  LexicalEditor,
  TextNode,
} from 'lexical';
import * as ReactDOM from 'react-dom';

import './ComponentPicker.css';
import { useUserAiUsage } from '@/services/user_ai_usage';
import { useUserSettings } from '@/services/user_settings';
import usePromptsLibraryStore from '@/stores/usePromptsLibraryStore';
import { MAX_AI_TOKENS } from '@/utils/constants';

import { $createAiPromptNode } from '../../nodes/AiPromptNode';
import { FETCH_GITHUB_CONTEXT_COMMAND } from '../../plugins/GitHubNodePlugin';

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
      onClick={onClick}
    >
      {option.icon}
      <span className="text">{option.title}</span>
    </li>
  );
};

// TODO: only show this option if user has a min 5 day streak, add as condition below when streaks are live
const getAiPromptOption = (
  editor: LexicalEditor,
  isAiUsageExceeded: boolean,
): ComponentPickerOption =>
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
  });

const getGitHubChipOption = (editor: LexicalEditor): ComponentPickerOption =>
  new ComponentPickerOption('Github', {
    icon: <CodeBracketIcon className="icon paragraph" />,
    keywords: ['github', 'prompt', 'pr', 'commit'],
    onSelect: (): void => {
      editor.dispatchCommand(FETCH_GITHUB_CONTEXT_COMMAND, undefined);
    },
  });

export default function ComponentPickerMenuPlugin(): JSX.Element {
  // STATE
  const [queryString, setQueryString] = useState<string | null>(null);

  // STORE
  const toggle = usePromptsLibraryStore((state) => state.toggle);
  const setSelection = usePromptsLibraryStore((state) => state.setSelection);

  // RQ
  const { data: usedTokens = 0 } = useUserAiUsage(dayjs().format('YYYY-MM-DD'));
  const { data: userSettings } = useUserSettings();

  // HOOKS
  const { value: isaipromptenabledValue, loading: isaipromptenabledLoading } = useFeatureFlag(
    'isaipromptenabled',
    false,
  );
  const { value: isgithubenabled, loading: isgithubenabledLoading } = useFeatureFlag(
    'isgithubenabled',
    false,
  );
  const [editor] = useLexicalComposerContext();

  // VARS
  const isAiUsageExceeded = usedTokens >= MAX_AI_TOKENS;
  const isGithubConnected = userSettings?.github_token_encrypted ?? false;

  const checkForTriggerMatch = useBasicTypeaheadTriggerMatch('/', {
    minLength: 0,
  });

  const options = useMemo(() => {
    const baseOptions = [];

    baseOptions.push(
      new ComponentPickerOption('Prompts Library', {
        icon: <Bars3Icon className="icon paragraph" />,
        keywords: ['prompts'],
        onSelect: (): void => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            setSelection(selection);
            toggle();
          }
        },
      }),
    );

    const aiPromptOption = getAiPromptOption(editor, isAiUsageExceeded);
    const gitHubChipOption = getGitHubChipOption(editor);

    const allowedOptions = [...baseOptions];

    if (isaipromptenabledValue && !isaipromptenabledLoading) {
      allowedOptions.push(aiPromptOption);
    }

    if (isgithubenabled && !isgithubenabledLoading && isGithubConnected) {
      allowedOptions.push(gitHubChipOption);
    }

    if (!queryString) {
      return allowedOptions;
    }

    const regex = new RegExp(queryString, 'i');

    return [
      ...allowedOptions.filter(
        (option) =>
          regex.test(option.title) || option.keywords.some((keyword) => regex.test(keyword)),
      ),
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    editor,
    isAiUsageExceeded,
    isaipromptenabledValue,
    isaipromptenabledLoading,
    isgithubenabled,
    isgithubenabledLoading,
    queryString,
  ]);

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
