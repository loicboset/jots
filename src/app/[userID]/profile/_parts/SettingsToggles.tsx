/* eslint-disable max-len */
'use client';

import Toggle from '@/components/ui/Toggle/index'
import InfoTooltip from "@/components/ui/tooltips/InfoTooltip";
import { useUserContext } from "@/context/UserProvider";
import { useUpsertUserSettings, useUserSettings } from "@/services/user_settings";

const SettingsToggles = (): React.ReactElement => {
  // CONTEXT
  const { user } = useUserContext();

  // RQ
  const { data: settings } = useUserSettings(user?.userID);
  const { mutate: editUserSettings } = useUpsertUserSettings();

  // METHODS
  const handleToggleMoodChecks = (): void => {
    editUserSettings({ user_id: user.userID, mood_checks_enabled: !isMoodChecksEnabled });
  };

  // VARS
  const isMoodChecksEnabled = settings?.mood_checks_enabled ?? true;

  return (
    <div>
      <div className="text-base/7 font-semibold text-white mb-8">
        Personalise your writing journey
      </div>
      <div className='flex justify-between max-w-2xl'>
        <div className='flex'>
          <span className="block text-sm/6 font-medium text-white">
            Enable daily mood checks
          </span>
          <InfoTooltip message='Enable daily mood checks. Toggle on to get personalied daily motivation boosters based on your mood levels to help with your writing!' />
        </div>
        <Toggle state={isMoodChecksEnabled} toggleSwitch={handleToggleMoodChecks} />
      </div>
    </div>
  );
};

export default SettingsToggles;