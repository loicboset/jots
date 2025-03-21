import { useEffect } from "react";

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

type Props = {
  userID: string;
};

const AiPromptNodePlugin = ({ userID }: Props): null => {
  // HOOKS
  const [editor] = useLexicalComposerContext();

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


  const { data: entries = [], isLoading } = useJournalEntries(userID);

  let paragraphContent = 'testing...'
  if (!isLoading) {
    paragraphContent = entries
    .map(entry => JSON.parse(entry.content)?.children?.[1]?.children || []) // Safely access nested properties
    .flat()
    .slice(0, 30) // Limit to the first 30 objects to not overload the OpenAI tokens
    .map(obj => (obj.type === 'paragraph' && obj.children?.length ? obj.children[0].text : ''))
    .join(' ');
    console.log('TEXT CONTENT!', paragraphContent)
  }

  useEffect(() => {
    // Register listener for new nodes
    return editor.registerMutationListener(AiPromptNode, (mutations) => {
      mutations.forEach(async (mutation, _nodeKey) => {
        if (mutation === "created") {
          try {
            const { prompt } = await getAiPrompt(paragraphContent)
            console.log('PROMPT:', prompt)

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
    });
  }, [editor]);

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