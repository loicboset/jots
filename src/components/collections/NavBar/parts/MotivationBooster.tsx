import { useEffect, useState } from "react";

import { useUserContext } from "@/context/UserProvider";
import { useMoodChecks } from "@/services/mood_checks";
import { useUserSettings } from "@/services/user_settings";
import { POSITIVE_SCORE_MOTIVATION_BOOSTERS, NEUTRAL_SCORE_MOTIVATION_BOOSTERS, NEGATIVE_SCORE_MOTIVATION_BOOSTERS } from "@/utils/constants"

const MotivationBooster = (): React.ReactElement | null => {

  // STATE
  const [motivationBoosterContent, setMotivationBoosterContent] = useState("");
  const [colorClass, setColorClass] = useState("bg-yellow-100 border-yellow-500");

  // METHODS
  const getMotivationBooster = (moodScore: number): string => {
    if (moodScore > 10) {
      return POSITIVE_SCORE_MOTIVATION_BOOSTERS[Math.floor(Math.random() * POSITIVE_SCORE_MOTIVATION_BOOSTERS.length)];
    }
    if (moodScore >= 8) {
      return NEUTRAL_SCORE_MOTIVATION_BOOSTERS[Math.floor(Math.random() * NEUTRAL_SCORE_MOTIVATION_BOOSTERS.length)];
    }
    return NEGATIVE_SCORE_MOTIVATION_BOOSTERS[Math.floor(Math.random() * NEGATIVE_SCORE_MOTIVATION_BOOSTERS.length)];
  }

  // CONTEXT
  const { user } = useUserContext();

  // RQ
  const { data: userSettings } = useUserSettings(user?.userID);
  const { data: moodChecks } = useMoodChecks(user?.userID);

  // VARS
  const isMoodChecksEnabled = userSettings?.mood_checks_enabled;
  const isMinMoodChecksSaved = Array.isArray(moodChecks) && moodChecks.length >= 3;

  useEffect(() => {
    if (isMoodChecksEnabled && isMinMoodChecksSaved) {
      const totalMoodScore = moodChecks.slice(0, 3).reduce((sum, item) => sum + item.score, 0);
      const content = `${getMotivationBooster(totalMoodScore)}`;
      setMotivationBoosterContent(content);

      if (totalMoodScore > 10) {
        setColorClass("bg-green-100 border-green-500");
      } else if (totalMoodScore >= 8) {
        setColorClass("bg-yellow-100 border-yellow-500");
      } else {
        setColorClass("bg-blue-100 border-blue-500");
      }
    }
  }, [isMoodChecksEnabled, isMinMoodChecksSaved, moodChecks]);

  if (!motivationBoosterContent) return null;

  return (
    <div className={`my-4 p-4 ${colorClass} border-l-4 text-yellow-900 rounded shadow max-w-2xl mx-auto`}>
      <p className="font-bold text-sm mb-1">🌟 Motivation Booster</p>
      <p className="italic text-sm">{motivationBoosterContent}</p>
    </div>
  );
}

export default MotivationBooster;