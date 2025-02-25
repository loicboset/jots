import { useEffect } from 'react';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $insertNodeToNearestRoot, mergeRegister } from '@lexical/utils';
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  INSERT_PARAGRAPH_COMMAND,
  TextNode,
} from 'lexical';

import { $createCollapsibleContainerNode } from '@/components/Editor/nodes/CollapsibleContainerNode';
import { $createCollapsibleContentNode } from '@/components/Editor/nodes/CollapsibleContentNode';
import { $createCollapsibleTitleNode } from '@/components/Editor/nodes/CollapsibleTitleNode';
import { useCategories } from '@/services/categories';

type Props = {
  userID: string;
};

const TransformPlugin = ({ userID }: Props): null => {
  // RQ
  const { data: categories = [], isLoading } = useCategories(userID);

  // HOOKS
  const [editor] = useLexicalComposerContext();

  // EFFECTS
  useEffect(() => {
    if (isLoading) return;

    return mergeRegister(
      editor.registerCommand(
        INSERT_PARAGRAPH_COMMAND,
        () => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const node = selection.anchor.getNode();
            const textContent = node.getTextContent();
            if (node.__type === 'text' && textContent.startsWith('#')) {
              editor.update(() => {
                const categoryName = textContent.slice(1).trim();
                const category = categories.find((category) => category.name === categoryName);
                const color = category?.color || 'white';
                const containerNode = $createCollapsibleContainerNode(true, categoryName, color);

                const titleNode = $createCollapsibleTitleNode();
                const paragraph = $createParagraphNode();
                titleNode.append(paragraph);
                const textNode = new TextNode(textContent);
                paragraph.append(textNode);

                const contentNode = $createCollapsibleContentNode();
                const contentParagraph = $createParagraphNode();
                contentNode.append(contentParagraph);

                $insertNodeToNearestRoot(containerNode.append(titleNode, contentNode));

                contentParagraph.select();

                node.remove();
              });
            }
          }

          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [editor, isLoading]);

  return null;
};

export default TransformPlugin;
