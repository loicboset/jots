import { useEffect } from 'react';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $findMatchingParent, $insertFirst, mergeRegister } from '@lexical/utils';
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_LOW,
  createCommand,
  ElementNode,
  INSERT_PARAGRAPH_COMMAND,
  KEY_BACKSPACE_COMMAND,
  RootNode,
  TextNode,
} from 'lexical';

import '../CollapsiblePlugin/Collapsible.css';

import {
  $createDayContentNode,
} from '@/components/Editor/nodes/DayContentNode';
import formatDate from '@/utils/datetime/formatDate';

import {
  $createDayContainerNode,
  $isDayContainerNode,
} from '../../nodes/DayContainerNode';
import {
  $createDayTitleNode,
  $isDayTitleNode,
} from '../../nodes/DayTitleNode';


export const INSERT_COLLAPSIBLE_COMMAND = createCommand<void>();

const DayContainerPlugin = (): null => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const today = new Intl.DateTimeFormat("en-US").format(new Date());

    const removeTransform = editor.registerNodeTransform(RootNode, (root) => {
      const children = root.getChildren();
      const hasTodayContainer = children.find((child) => {
        if ($isDayContainerNode(child) && child.getDate() === today) {
          return true;
        }
      });
      if (!hasTodayContainer) {
        const title = $createDayTitleNode();

        const paragraph = $createParagraphNode();
        paragraph.append(new TextNode(`@${formatDate(new Date())}`));

        const contentParagraph = $createParagraphNode();

        $insertFirst(
          root,
          $createDayContainerNode(true, today).append(
            title.append(paragraph),
            $createDayContentNode().append(contentParagraph),
          ),
        );

        contentParagraph.select();
      }

      children.forEach((child) => {
        if (!$isDayContainerNode(child)) {
          child.remove();
        }
      })

    });

    mergeRegister(
      editor.registerCommand(
        KEY_BACKSPACE_COMMAND,
        (event) => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const titleNode = $findMatchingParent(selection.anchor.getNode(), (node) => $isDayTitleNode(node));
            if ($isDayTitleNode(titleNode)) {
              event.preventDefault();
              return true;
            }
          }

          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      editor.registerCommand(
        INSERT_PARAGRAPH_COMMAND,
        () => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const titleNode = $findMatchingParent(selection.anchor.getNode(), (node) => $isDayTitleNode(node));

            if ($isDayTitleNode(titleNode)) {
              const container = titleNode.getParent<ElementNode>();
              if (container && $isDayContainerNode(container)) {
                titleNode.getNextSibling()?.selectEnd();
                return true;
              }
            }
          }

          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    )

    return (): void => {
      removeTransform();
    }
  }, [editor]);


  return null;
}

export default DayContainerPlugin;
