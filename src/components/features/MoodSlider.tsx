import Spinner from "@/components/ui/loaders/Spinner";
import { useUserContext } from "@/context/UserProvider";
import { useMoodCheck, useUpsertMoodCheck } from "@/services/mood_checks";
import { useUserSettings } from "@/services/user_settings";

import IconButton from "../ui/buttons/IconButton";

const moodLabels = [
  { icon: "😞", score: 1 },
  { icon: "😐", score: 2 },
  { icon: "🙂", score: 3 },
  { icon: "😀", score: 4 },
  { icon: "🤩", score: 5 },
];

const MoodSlider = (): React.ReactElement => {
  // METHODS
  const onSubmitMoodCheck = (score: number): void => {
    upsertMoodCheck({ user_id: user.userID, score });
  };

  // CONTEXT
  const { user } = useUserContext();

  // RQ
  const { data: settings } = useUserSettings();
  const { data: moodCheck, isLoading } = useMoodCheck(user?.userID);
  const { mutate: upsertMoodCheck, status } = useUpsertMoodCheck();

  // VARS
  const isMoodChecksEnabled = settings?.mood_checks_enabled ?? true;
  const currentMood =
    moodCheck &&
    moodLabels.find((mood) => mood.score === moodCheck.score)?.icon;
  const isDisabled = ["pending", "success"].includes(status);

  if (!isMoodChecksEnabled) return <div></div>;

  if (isLoading) return <Spinner size="small" />;

  return (
    <div className="flex flex-col items-center space-y-2">
      {currentMood ? (
        <span
          className="text-sm font-medium text-center"
          title={`Your daily mood check was submitted. This score will help tailor
            motivation boosters/messages for your daily writing habit.`}
        >
          Daily Mood Check: {currentMood} (submitted)
        </span>
      ) : (
        <span
          className="text-sm font-medium"
          title={`
            Select your mood from 1 (low) to 5 (high).
            This score will help tailor motivation boosters/messages for your daily writing habit.
            You can toggle this off at any time from your profile settings.
          `}
        >
          How is your mood today? 👀
        </span>
      )}
      {!currentMood && (
        <div>
          {moodLabels.map((mood) => (
            <IconButton
              key={mood.score}
              className="flex justify-between text-sm"
              onClick={() => onSubmitMoodCheck(mood.score)}
              disabled={isDisabled}
            >
              {mood.icon}
            </IconButton>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoodSlider;
