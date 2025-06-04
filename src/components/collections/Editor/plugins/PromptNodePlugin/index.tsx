import { useEffect } from "react";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $createTextNode,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  DELETE_CHARACTER_COMMAND,
  KEY_ARROW_LEFT_COMMAND,
  KEY_ARROW_RIGHT_COMMAND,
} from "lexical";

import { $isPromptNode, PromptNode } from "../../nodes/PromptNode";

const PromptNodePlugin = (): null => {
  // HOOKS
  const [editor] = useLexicalComposerContext();

  // EFFECTS
  useEffect(() => {
    // replace the prompt node with its first child (e.g. when user types)
    const remove = editor.registerNodeTransform(PromptNode, (node) => {
      const firstChild = node.getFirstChild();
      if (firstChild) node.replace(firstChild);
    });

    return remove;
  }, [editor]);

  useEffect(() => {
    const replacePromptNode = (): boolean => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return false;

      const node = selection.anchor.getNode();
      const isPromptNode = $isPromptNode(node);
      if (isPromptNode) {
        node.replace($createTextNode());
        return true;
      }

      return false;
    };

    const nextPrompt = (event: KeyboardEvent): boolean => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return false;

      const node = selection.anchor.getNode();
      const isPromptNode = $isPromptNode(node);
      if (isPromptNode) {
        node.nextPrompt();
        if (selection.isCollapsed() && selection.anchor.offset === 0) {
          event.preventDefault();
        }
        return true;
      }

      return false;
    }

    const previousPrompt = (event: KeyboardEvent): boolean => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return false;

      const node = selection.anchor.getNode();
      const isPromptNode = $isPromptNode(node);
      if (isPromptNode) {
        node.previousPrompt();
        if (selection.isCollapsed() && selection.anchor.offset === 0) {
          event.preventDefault();
        }
        return true;
      }

      return false;
    }

    return mergeRegister(
      editor.registerCommand(
        DELETE_CHARACTER_COMMAND,
        () => replacePromptNode(),
        COMMAND_PRIORITY_LOW
      ),

      editor.registerCommand(KEY_ARROW_RIGHT_COMMAND, nextPrompt, COMMAND_PRIORITY_LOW),
      editor.registerCommand(KEY_ARROW_LEFT_COMMAND, previousPrompt, COMMAND_PRIORITY_LOW),
    )
  }, [editor])

  return null;
}

export default PromptNodePlugin;
