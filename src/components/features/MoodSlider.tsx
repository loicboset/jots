/* eslint-disable max-len */
import { Fragment, useState } from 'react'

import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import * as Slider from "@radix-ui/react-slider";

import Spinner from "@/components/ui/loaders/Spinner";
import { useUserContext } from "@/context/UserProvider";
import { useMoodCheck, useUpsertMoodCheck } from "@/services/mood_checks"
import { useUserSettings } from "@/services/user_settings";

const moodLabels = ["😞", "😐", "🙂", "😀", "🤩"];

const MoodSlider = (): React.ReactElement => {

  // STATE
  const [mood, setMood] = useState(3);

  // METHODS
  const handleMoodChange = (newMood: number): void => {
    setMood(newMood);
  };
  const onSubmitMoodCheck = (): void => {
    upsertMoodCheck({ user_id: user.userID, score: mood });
  }

  // CONTEXT
  const { user } = useUserContext();

  // RQ
  const { data: settings } = useUserSettings();
  const { data: moodCheck } = useMoodCheck(user?.userID);
  const { mutate: upsertMoodCheck } = useUpsertMoodCheck();

  // VARS
  const isMoodChecksEnabled = settings?.mood_checks_enabled ?? true;
  const isMoodCheckSubmitted = moodCheck !== undefined && Array.isArray(moodCheck) && moodCheck.length > 0;

  if (!isMoodChecksEnabled) return <div></div>;

  if (moodCheck === undefined) return <Spinner size="small" />;

  return (
    <div className="flex flex-col items-center space-y-2">
      {isMoodCheckSubmitted ? (
        <span
          className="text-sm font-medium"
          title="Your daily mood check was submitted. This score will help tailor motivation boosters/messages for your daily writing habit."
        >
          Daily Mood Check: {moodLabels[moodCheck[0].score - 1]} (submitted)
        </span>
      ) : (
        <span
          className="text-sm font-medium"
          title="Select your mood from 1 (low) to 5 (high). This score will help tailor motivation boosters/messages for your daily writing habit. You can toggle this off at any time from your profile settings."
        >
          Daily Mood Check: {moodLabels[mood - 1]}
        </span>
      )
      }
      {!isMoodCheckSubmitted && (
        <Fragment>
          <Slider.Root
            className="relative flex items-center w-60 h-5"
            defaultValue={[mood]}
            min={1}
            max={5}
            step={1}
            onValueChange={(val) => handleMoodChange(val[0])}
          >
            <Slider.Track className="bg-gray-300 rounded-full h-1 w-full hover:bg-gray-400 hover:cursor-pointer">
              <Slider.Range className="bg-black h-1 rounded-full" />
            </Slider.Track>
            <Slider.Thumb className="w-6 h-6 bg-black rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-gray-600 transition-transform transform hover:scale-110 hover:cursor-pointer" />
          </Slider.Root>
          <div className="flex justify-between w-60 text-sm">
            {moodLabels.map((label, index) => (
              <span key={index} className="text-center w-5">
                {label}
              </span>
            ))}
          </div>
          <button
            onClick={onSubmitMoodCheck}
            type="button"
            className="flex items-center mt-4 gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-medium shadow hover:cursor-pointer hover:shadow-md hover:scale-[1.03] transition-all duration-200 ease-in-out"
          >
            <PaperAirplaneIcon className="w-4 h-4 -rotate-45" />
            Submit
          </button>
        </Fragment>
      )}
    </div>
  );
}

export default MoodSlider;


