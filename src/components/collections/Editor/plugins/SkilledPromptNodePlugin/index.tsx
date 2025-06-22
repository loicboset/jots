import { useEffect } from "react";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  KEY_ENTER_COMMAND,
  KEY_ARROW_DOWN_COMMAND,
  KEY_ARROW_UP_COMMAND,
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  COMMAND_PRIORITY_LOW,
  KEY_BACKSPACE_COMMAND,
  $createLineBreakNode,
} from "lexical";

import { useEditUserSkills } from "@/services/user_skills";

import { $isSkilledPromptNode, SkilledPromptNode } from "../../nodes/SkilledPromptNode";
import { $isSkilledPromptWrapperNode } from "../../nodes/SkilledPromptWrapperNode";

import './index.css'

export default function SkilledPromptPlugin(): null {
  // RQ
  const { mutate: editSkills } = useEditUserSkills();

  // HOOKS
  const [editor] = useLexicalComposerContext();

  // EFFECTS
  useEffect(() => {
    const remove = editor.registerMutationListener(SkilledPromptNode, (mutations) => {
      mutations.forEach(async (mutation, nodeKey) => {
        const node = editor.getElementByKey(nodeKey);
        const skill = node?.parentElement?.dataset['skill'];
        if (!node || !skill) return;

        const addSkill = node.textContent?.trim() !== '' && node.dataset['has_text'] === 'false';
        const removeSkill = node.textContent?.trim() === '' && node.dataset['has_text'] === 'true';
        if (mutation === 'updated') {
          if (addSkill) {
            editSkills({ skill, delta: 1 })
          } else if (removeSkill) {
            editSkills({ skill, delta: -1 });
          }
        }
      }, { skipInitialization: true });
    });

    return remove;
  }, [editSkills, editor]);

  useEffect(() => {
    return editor.registerCommand(
      KEY_ENTER_COMMAND,
      (event) => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return false;

        const anchorNode = selection.anchor.getNode();
        const wrapper = anchorNode.getParents().find($isSkilledPromptWrapperNode);
        if (!wrapper) return false;

        if (event?.shiftKey) {
          editor.update(() => {
            const lineBreak = $createLineBreakNode();
            selection.insertNodes([lineBreak]);
          });
          return true;
        }

        editor.update(() => {
          const next = wrapper.getNextSibling();
          if (next) {
            next.selectStart();
          } else {
            const newParagraph = $createParagraphNode();
            wrapper.insertAfter(newParagraph);
            newParagraph.selectStart();
          }
        });

        return true;
      },
      COMMAND_PRIORITY_LOW
    );
  }, [editor]);


  useEffect(() => {
    return editor.registerCommand(
      KEY_BACKSPACE_COMMAND,
      () => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return false;
        const node = selection.anchor.getNode();

        if (!$isSkilledPromptNode(node)) return false;
        if (node.getTextContent().trim() === '') {
          const parent = node.getParent();
          if (parent) {
            editor.update(() => {
              node.remove();
              parent.remove();
            })
          }
        }

        return false;
      },
      COMMAND_PRIORITY_LOW
    );
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(KEY_ARROW_DOWN_COMMAND, () => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return false;
      const node = selection.anchor.getNode();
      const parent = node.getParent();
      const hasText = node.getTextContent().trim() !== '';

      if (!parent) return false;
      if (hasText && !$isSkilledPromptNode(parent)) return false;
      if (!hasText && !$isSkilledPromptWrapperNode(parent)) return false;

      let next;

      if ($isSkilledPromptWrapperNode(parent)) {
        next = parent.getNextSibling();
      } else if ($isSkilledPromptNode(parent)) {
        next = parent.getParent()?.getNextSibling();
      }

      if (next) {
        editor.update(() => {
          next.selectStart();
        });
        return true;
      } else {
        const newParagraph = $createParagraphNode();
        parent.insertAfter(newParagraph);
        newParagraph.selectStart();
      }

      return false;
    }, COMMAND_PRIORITY_LOW);
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(KEY_ARROW_UP_COMMAND, () => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return false;
      const node = selection.anchor.getNode();
      const parent = node.getParent();
      const hasText = node.getTextContent().trim() !== '';

      if (!parent) return false;
      if (hasText && !$isSkilledPromptNode(parent)) return false;
      if (!hasText && !$isSkilledPromptWrapperNode(parent)) return false;

      let previous;

      if ($isSkilledPromptWrapperNode(parent)) {
        previous = parent.getPreviousSibling();
      } else if ($isSkilledPromptNode(parent)) {
        previous = parent.getParent()?.getPreviousSibling();
      }

      if (previous) {
        editor.update(() => {
          previous.selectStart();
        });
        return true;
      } else {
        const newParagraph = $createParagraphNode();
        parent.getParent()?.insertBefore(newParagraph);
        newParagraph.selectStart();
      }

      return false;
    }, COMMAND_PRIORITY_LOW);
  }, [editor]);

  return null;
}
