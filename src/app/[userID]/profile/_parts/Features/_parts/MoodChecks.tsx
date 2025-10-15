'use client';

import Toggle from '@/components/ui/Toggle/index';
import InfoTooltip from '@/components/ui/tooltips/InfoTooltip';
import { useUserContext } from '@/context/UserProvider';
import { useUpsertUserSettings, useUserSettings } from '@/services/user_settings';

const MoodChecks = (): React.ReactElement => {
  // CONTEXT
  const { user } = useUserContext();

  // RQ
  const { data: settings } = useUserSettings();
  const { mutate: editUserSettings } = useUpsertUserSettings();

  // METHODS
  const handleToggleMoodChecks = (): void => {
    editUserSettings({
      user_id: user.userID,
      mood_checks_enabled: !isMoodChecksEnabled,
    });
  };

  // VARS
  const isMoodChecksEnabled = settings?.mood_checks_enabled ?? true;

  return (
    <div className="flex justify-between max-w-2xl">
      <div className="flex">
        <span className="block text-sm/6 font-medium text-white">Daily Mood Checks</span>
        <InfoTooltip
          message={`
          Toggle on to get personalised daily motivation boosters based on your mood levels to help with your writing!
          `}
        />
      </div>
      <Toggle enabled={isMoodChecksEnabled} onChange={handleToggleMoodChecks} />
    </div>
  );
};

export default MoodChecks;
