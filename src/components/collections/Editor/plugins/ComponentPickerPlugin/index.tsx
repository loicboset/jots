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
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  LexicalEditor,
  TextNode,
} from 'lexical';
import * as ReactDOM from 'react-dom';

import './ComponentPicker.css'
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
  })
]

// TODO: only show this option if user has a min 5 day streak, add as condition below when streaks are live
const getAiPromptOption = (editor: LexicalEditor): ComponentPickerOption[] => [
  new ComponentPickerOption('AI Prompt', {
    icon: <SparklesIcon className="icon paragraph" />,
    keywords: ['ai', 'prompt', 'aiprompt'],
    onSelect: (): void =>
      editor.update(() => {
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
]

export default function ComponentPickerMenuPlugin(): JSX.Element {
  // eslint-disable-next-line max-len
  const { value: isaipromptenabledValue, loading: isaipromptenabledLoading  } = useFeatureFlag("isaipromptenabled", false);

  const [editor] = useLexicalComposerContext();
  const [queryString, setQueryString] = useState<string | null>(null);

  const checkForTriggerMatch = useBasicTypeaheadTriggerMatch('/', {
    minLength: 0,
  });

  const options = useMemo(() => {
    const baseOptions = getBaseOptions(editor);
    const aiPromptOption = getAiPromptOption(editor);

    const allowedOptions =
      (isaipromptenabledValue && !isaipromptenabledLoading) ? [...baseOptions, ...aiPromptOption] : baseOptions

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

  }, [editor, queryString, isaipromptenabledValue, isaipromptenabledLoading]);

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
