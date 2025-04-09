'use client';

/* eslint-disable max-len */
import Link from "next/link";

import Toggle from '@/components/ui/Toggle/index'
import InfoTooltip from "@/components/ui/tooltips/InfoTooltip";
import { useUserContext } from "@/context/UserProvider";
import { useUpsertUserSettings, useUserSettings } from "@/services/user_settings";

import PersonalInfo from "./_parts/PersonalInfo";

type Props = {
  email: string;
}

const Profile = ({ email }: Props): React.ReactElement => {
  // CONTEXT
  const { user } = useUserContext();

  // RQ
  const { data: settings } = useUserSettings(user?.userID);
  const { mutate: editUserSettings } = useUpsertUserSettings();

  const isMoodChecksEnabled = settings?.mood_checks_enabled ?? true;

  const toggleMoodChecks = (): void => {
    editUserSettings({ user_id: user.userID, mood_checks_enabled: !isMoodChecksEnabled });
  };

  return (
    <div className="h-screen">
      <div className='flex p-4 backdrop-blur-xs justify-between items-center sticky top-0 z-10 border-b border-gray-900'>
        <Link href="/">
          <h1 className='text-3xl text-indigo-500'>DevLog</h1>
        </Link>
      </div>


      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="mx-auto max-w-4xl">

          <div className="space-y-12">
            {/* ACCOUNT INFO */}
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
              <div>
                <h2 className="text-base/7 font-semibold text-white">Account</h2>
                <p className="mt-1 text-sm/6 text-gray-400">
                  This is your account information.
                </p>
              </div>

              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                <div className="sm:col-span-4">
                  <label htmlFor="email" className="block text-sm/6 font-medium text-white">
                    Email address
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                      <input
                        id="email"
                        name="email"
                        type="text"
                        value={email}
                        disabled
                        className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PERSONAL INFO */}
            <PersonalInfo />
          </div>
          <hr className="border-gray-500 mb-6" />
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
              <Toggle state={isMoodChecksEnabled} toggleSwitch={toggleMoodChecks} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Profile