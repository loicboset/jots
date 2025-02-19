import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createParagraphNode, TextNode } from 'lexical';
import { useEffect } from 'react';
import { CustomParagraphNode } from '../../nodes/CustomParagraphNode';
import { $createCollapsibleContainerNode } from '../CollapsiblePlugin/CollapsibleContainerNode';
import { $createCollapsibleContentNode } from '../CollapsiblePlugin/CollapsibleContentNode';
import { $createCollapsibleTitleNode } from '../CollapsiblePlugin/CollapsibleTitleNode';
import { $insertNodeToNearestRoot } from '@lexical/utils';

const TransformPlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const removeTransform = editor.registerNodeTransform(CustomParagraphNode, (paragraphNode) => {
      editor.update(() => {
        const text = paragraphNode.getTextContent();
        if (text === '#todo') {
          const title = $createCollapsibleTitleNode();

          const paragraph = $createParagraphNode();
          paragraph.append(new TextNode(text));

          const contentParagraph = $createParagraphNode();

          $insertNodeToNearestRoot(
            $createCollapsibleContainerNode(true).append(
              title.append(paragraph),
              $createCollapsibleContentNode().append(contentParagraph),
            ),
          );

          contentParagraph.select();

          paragraphNode.remove();
        }
      });
    });

    return () => {
      removeTransform();
    };
  }, [editor]);

  return null;
};

export default TransformPlugin;
