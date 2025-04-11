import { useEffect } from "react";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $insertFirst, mergeRegister } from "@lexical/utils";
import dayjs from "dayjs";
import {
  $createParagraphNode,
  $createTextNode,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  DELETE_CHARACTER_COMMAND,
  KEY_ARROW_DOWN_COMMAND,
  KEY_ARROW_UP_COMMAND,
  KEY_ENTER_COMMAND,
  $isRootNode,
  $isElementNode,
} from "lexical";

import { useCalendarContext } from "@/context/CalendarContextProvider";
import { useMoodChecks } from "@/services/mood_checks";
import { useUserSettings } from "@/services/user_settings";
import { POSITIVE_SCORE_MOTIVATION_BOOSTERS, NEUTRAL_SCORE_MOTIVATION_BOOSTERS, NEGATIVE_SCORE_MOTIVATION_BOOSTERS } from "@/utils/constants"

import { $createMotivationBoosterNode, $isMotivationBoosterNode, MotivationBoosterNode } from "../../nodes/MotivationBoosterNode";

type Props = {
  userID: string;
};

const getMotivationBooster = (moodScore: number): string => {
  if (moodScore > 10) {
    return POSITIVE_SCORE_MOTIVATION_BOOSTERS[Math.floor(Math.random() * POSITIVE_SCORE_MOTIVATION_BOOSTERS.length)];
  }

  if (moodScore >= 8) {
    return NEUTRAL_SCORE_MOTIVATION_BOOSTERS[Math.floor(Math.random() * NEUTRAL_SCORE_MOTIVATION_BOOSTERS.length)];
  }

  return NEGATIVE_SCORE_MOTIVATION_BOOSTERS[Math.floor(Math.random() * NEGATIVE_SCORE_MOTIVATION_BOOSTERS.length)];
}

const MotivationBoosterNodePlugin = ({ userID }: Props): null => {
  // HOOKS
  const [editor] = useLexicalComposerContext();

  // CONTEXT
  const { calendar } = useCalendarContext();

  // RQ
  const { data: userSettings } = useUserSettings(userID);
  const { data: moodChecks } = useMoodChecks(userID);

  // VARS
  const isMoodChecksEnabled = userSettings?.mood_checks_enabled;
  const isMinMoodChecksSaved = Array.isArray(moodChecks) && moodChecks.length >= 3;
  const isToday = dayjs(calendar.currentDate).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD');

  // EFFECTS
  useEffect(() => {
    editor.update(() => {
      if (isMoodChecksEnabled && isMinMoodChecksSaved && isToday) {
        const totalMoodScore = moodChecks.slice(0, 3).reduce((sum, item) => sum + item.score, 0);
        const motivationBoosterContent = `Motivation booster: ${getMotivationBooster(totalMoodScore)}`;
        const editorState = editor.getEditorState();
        const nodes = editorState._nodeMap;
        nodes.forEach((node) => {
          const isRootNode = $isRootNode(node);
          if (!isRootNode) return;
          const topLevelNodes = node.getChildren();

          let motivationBoosterAlreadyCreated = false

          const paragraph = $createParagraphNode();
          const motivationBooster = $createMotivationBoosterNode(motivationBoosterContent);
          paragraph.append(motivationBooster);

          for (const topNode of topLevelNodes) {
            if ($isElementNode(topNode)) {
              const children = topNode.getChildren?.() ?? []

              for (const child of children) {
                if ($isMotivationBoosterNode(child)) {
                  child.replace(motivationBooster);
                  motivationBoosterAlreadyCreated = true
                  break;
                }
              }

              if (motivationBoosterAlreadyCreated) break;

            }
          }

          if (!motivationBoosterAlreadyCreated) {
            paragraph.append(motivationBooster);

            $insertFirst(
              node,
              paragraph
            );
          }
        })
      }
    })
  }, [editor, isMoodChecksEnabled, isMinMoodChecksSaved, moodChecks, isToday]);

  useEffect(() => {
    // replace the motivation booster node with its first child (e.g. when user types)
    const remove = editor.registerNodeTransform(MotivationBoosterNode, (node) => {
      const firstChild = node.getFirstChild();
      if (firstChild) node.replace(firstChild);
    });

    return remove;
  }, [editor]);

  useEffect(() => {
    const replaceMotivationBoosterNode = (): boolean => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return false;

      const node = selection.anchor.getNode();
      const isMotivationBoosterNode = $isMotivationBoosterNode(node);
      if (isMotivationBoosterNode) {
        node.replace($createTextNode());
        return true;
      }

      return false;
    };

    return mergeRegister(
      editor.registerCommand(
        DELETE_CHARACTER_COMMAND,
        () => replaceMotivationBoosterNode(),
        COMMAND_PRIORITY_LOW
      ),

      editor.registerCommand(KEY_ARROW_DOWN_COMMAND, replaceMotivationBoosterNode, COMMAND_PRIORITY_LOW),
      editor.registerCommand(KEY_ARROW_UP_COMMAND, replaceMotivationBoosterNode, COMMAND_PRIORITY_LOW),
      editor.registerCommand(KEY_ENTER_COMMAND, replaceMotivationBoosterNode, COMMAND_PRIORITY_LOW),
    )
  }, [editor])

  return null;
}

export default MotivationBoosterNodePlugin;