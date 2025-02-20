import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  INSERT_PARAGRAPH_COMMAND,
  TextNode,
} from 'lexical';
import { useEffect } from 'react';
import { $createCollapsibleContainerNode } from '@/components/Editor/nodes/CollapsibleContainerNode';
import { $createCollapsibleTitleNode } from '@/components/Editor/nodes/CollapsibleTitleNode';
import { $createCollapsibleContentNode } from '@/components/Editor/nodes/CollapsibleContentNode';
import { $insertNodeToNearestRoot, mergeRegister } from '@lexical/utils';

const TransformPlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        INSERT_PARAGRAPH_COMMAND,
        () => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const node = selection.anchor.getNode();
            if (node.__type === 'text' && node.getTextContent().startsWith('#')) {
              editor.update(() => {
                const containerNode = $createCollapsibleContainerNode(true);

                const titleNode = $createCollapsibleTitleNode();
                const paragraph = $createParagraphNode();
                titleNode.append(paragraph);
                const textNode = new TextNode(node.getTextContent());
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
  }, [editor]);

  return null;
};

export default TransformPlugin;
