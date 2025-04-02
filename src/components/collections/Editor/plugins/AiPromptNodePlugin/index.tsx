import { useEffect, useMemo } from "react";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $getRoot,
  $createTextNode,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  DELETE_CHARACTER_COMMAND,
  KEY_ARROW_DOWN_COMMAND,
  KEY_ARROW_UP_COMMAND,
  KEY_ENTER_COMMAND,
} from "lexical";

import { getAiPrompt } from "@/services/ai_prompts";
import { useJournalEntries } from "@/services/journal_entries";

import { $isAiPromptNode, AiPromptNode } from "../../nodes/AiPromptNode";
import { $isDayContainerNode } from "../../nodes/DayContainerNode";

type Props = {
  userID: string;
};

const AiPromptNodePlugin = ({ userID }: Props): null => {
  // HOOKS
  const [editor] = useLexicalComposerContext();

  // RQ
  const { data: entries = [], isLoading } = useJournalEntries(userID);

  // VARS
  const textContent: string[] = useMemo(() => [], []);

  if (!isLoading) {
    entries.forEach((entry) => {
      const parsedEditorState = editor.parseEditorState(entry.content)

      parsedEditorState.read(() => {
        parsedEditorState._nodeMap.forEach((node) => {
          if ($isDayContainerNode(node)) {
            const textNodes = node.getAllTextNodes();
            textNodes.forEach((node) => textContent.push(node.getTextContent()));
          }
        })
      })
    })
  }

  // EFFECTS
  useEffect(() => {
    const findAiPromptNode = (node: any): AiPromptNode | null => {
      if ($isAiPromptNode(node)) {
        return node;
      }

      if (node.getChildren) {
        for (const child of node.getChildren()) {
          const found = findAiPromptNode(child);
          if (found) return found;
        }
      }
      return null;
    }

    // Register listener for new nodes
    return editor.registerMutationListener(AiPromptNode, (mutations) => {
      mutations.forEach(async (mutation, _nodeKey) => {
        if (mutation === "created") {
          const joinedEntries = textContent.join(' ');

          try {
            let prompt = '';
            if (textContent.length === 0) {
              prompt = `You haven't written anything yet. Start writing to get AI suggestions.`;
            } else {
              const result = await getAiPrompt(joinedEntries)
              prompt = result.prompt;
            }

            editor.update(() => {
              const root = $getRoot();
              const aiNode = findAiPromptNode(root);

              if (aiNode) {
                // Update the AiPromptNode with Ai content
                const writableNode = aiNode.getWritable();
                writableNode.__placeholder = prompt;
              }
            });
          } catch (error) {
            console.error("Error fetching AI prompt:", error);
          }
        }
      });
    }, { skipInitialization: true });
  }, [editor, textContent]);

  useEffect(() => {
    // replace the prompt node with its first child (e.g. when user types)
    const remove = editor.registerNodeTransform(AiPromptNode, (node) => {
      const firstChild = node.getFirstChild();
      if (firstChild) node.replace(firstChild);
    });

    return remove;
  }, [editor]);

  useEffect(() => {
    const replaceAiPromptNode = (): boolean => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return false;

      const node = selection.anchor.getNode();
      const isAiPromptNode = $isAiPromptNode(node);
      if (isAiPromptNode) {
        node.replace($createTextNode());
        return true;
      }

      return false;
    };

    return mergeRegister(
      editor.registerCommand(
        DELETE_CHARACTER_COMMAND,
        () => replaceAiPromptNode(),
        COMMAND_PRIORITY_LOW
      ),

      editor.registerCommand(KEY_ARROW_DOWN_COMMAND, replaceAiPromptNode, COMMAND_PRIORITY_LOW),
      editor.registerCommand(KEY_ARROW_UP_COMMAND, replaceAiPromptNode, COMMAND_PRIORITY_LOW),
      editor.registerCommand(KEY_ENTER_COMMAND, replaceAiPromptNode, COMMAND_PRIORITY_LOW),
    )
  }, [editor])

  return null;
}

export default AiPromptNodePlugin;