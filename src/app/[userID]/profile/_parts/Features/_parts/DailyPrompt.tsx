'use client';

import Toggle from '@/components/ui/Toggle/index';
import InfoTooltip from '@/components/ui/tooltips/InfoTooltip';
import { useUserContext } from '@/context/UserProvider';
import { useUpsertUserSettings, useUserSettings } from '@/services/user_settings';

const DailyPrompt = (): React.ReactElement => {
  // CONTEXT
  const { user } = useUserContext();

  // RQ
  const { data: settings } = useUserSettings();
  const { mutate: editUserSettings } = useUpsertUserSettings();

  // METHODS
  const handleToggleMoodChecks = (): void => {
    editUserSettings({
      user_id: user.userID,
      daily_prompt_enabled: !isDailyPromptEnabled,
    });
  };

  // VARS
  const isDailyPromptEnabled = settings?.daily_prompt_enabled ?? true;

  return (
    <div className="flex justify-between max-w-2xl">
      <div className="flex">
        <span className="block text-sm/6 font-medium text-white">Random Daily Prompt</span>
        <InfoTooltip message="Toggle on to get a random daily prompt." />
      </div>
      <Toggle enabled={isDailyPromptEnabled} onChange={handleToggleMoodChecks} />
    </div>
  );
};

export default DailyPrompt;
