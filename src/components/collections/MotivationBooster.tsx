import { useEffect, useState } from 'react';

import { useUserContext } from '@/context/UserProvider';
import { useMoodChecks } from '@/services/mood_checks';
import { useUserSettings } from '@/services/user_settings';
import {
  POSITIVE_SCORE_MOTIVATION_BOOSTERS,
  NEUTRAL_SCORE_MOTIVATION_BOOSTERS,
  NEGATIVE_SCORE_MOTIVATION_BOOSTERS,
} from '@/utils/constants';

const MotivationBooster = (): React.ReactElement | null => {
  // STATE
  const [motivationBoosterContent, setMotivationBoosterContent] = useState('');

  // METHODS
  const getMotivationBooster = (moodScore: number): string => {
    if (moodScore > 10) {
      return POSITIVE_SCORE_MOTIVATION_BOOSTERS[
        Math.floor(Math.random() * POSITIVE_SCORE_MOTIVATION_BOOSTERS.length)
      ];
    }
    if (moodScore >= 8) {
      return NEUTRAL_SCORE_MOTIVATION_BOOSTERS[
        Math.floor(Math.random() * NEUTRAL_SCORE_MOTIVATION_BOOSTERS.length)
      ];
    }
    return NEGATIVE_SCORE_MOTIVATION_BOOSTERS[
      Math.floor(Math.random() * NEGATIVE_SCORE_MOTIVATION_BOOSTERS.length)
    ];
  };

  // CONTEXT
  const { user } = useUserContext();

  // RQ
  const { data: userSettings } = useUserSettings();
  const { data: moodChecks } = useMoodChecks(user?.userID);

  // VARS
  const isMoodChecksEnabled = userSettings?.mood_checks_enabled;
  const isMinMoodChecksSaved = Array.isArray(moodChecks) && moodChecks.length >= 3;

  useEffect(() => {
    if (isMoodChecksEnabled && isMinMoodChecksSaved) {
      const totalMoodScore = moodChecks.slice(0, 3).reduce((sum, item) => sum + item.score, 0);
      const content = `${getMotivationBooster(totalMoodScore)}`;
      setMotivationBoosterContent(content);
    }
  }, [isMoodChecksEnabled, isMinMoodChecksSaved, moodChecks]);

  if (!motivationBoosterContent) return null;

  return (
    <p className="italic text-sm">
      <span className="font-bold">🌟 Motivation Booster: </span>
      {motivationBoosterContent}
    </p>
  );
};

export default MotivationBooster;
