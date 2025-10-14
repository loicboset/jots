import type { JSX } from "react";
import { useEffect } from "react";

import { $isCodeNode, registerCodeHighlighting } from "@lexical/code";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $findMatchingParent } from "@lexical/utils";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  ElementNode,
  KEY_ARROW_DOWN_COMMAND,
  KEY_ARROW_UP_COMMAND,
  LexicalNode,
} from "lexical";

import "./CodeHighlight.css";

export default function CodeHighlightPlugin(): JSX.Element | null {
  // HOOKS
  const [editor] = useLexicalComposerContext();

  // EFFECTS
  useEffect(() => registerCodeHighlighting(editor), [editor]);

  useEffect(() => {
    const $onEscapeUp = (): boolean => {
      const selection = $getSelection();
      if ($isRangeSelection(selection) && selection.anchor.offset === 0) {
        const container = $findMatchingParent(
          selection.anchor.getNode(),
          $isCodeNode,
        );

        if ($isCodeNode(container)) {
          const parent = container.getParent<ElementNode>();
          if (
            parent !== null &&
            parent.getFirstChild<LexicalNode>() === container &&
            selection.anchor.key ===
              container.getFirstDescendant<LexicalNode>()?.getKey()
          ) {
            container.insertBefore($createParagraphNode());
          }
        }
      }

      return false;
    };

    const $onEscapeDown = (): boolean => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        const container = $findMatchingParent(
          selection.anchor.getNode(),
          $isCodeNode,
        );
        if ($isCodeNode(container)) {
          const parent = container.getParent<ElementNode>();
          if (
            parent !== null &&
            parent.getLastChild<LexicalNode>() === container
          ) {
            const lastDescendant = container.getLastDescendant<LexicalNode>();

            if (
              lastDescendant !== null &&
              selection.anchor.key === lastDescendant.getKey() &&
              selection.anchor.offset === lastDescendant.getTextContentSize()
            ) {
              const paragraph = $createParagraphNode();
              container.insertAfter(paragraph);
            }
          }
        }
      }

      return false;
    };

    editor.registerCommand(
      KEY_ARROW_UP_COMMAND,
      $onEscapeUp,
      COMMAND_PRIORITY_LOW,
    );
    editor.registerCommand(
      KEY_ARROW_DOWN_COMMAND,
      $onEscapeDown,
      COMMAND_PRIORITY_LOW,
    );
  }, [editor]);

  return null;
}
