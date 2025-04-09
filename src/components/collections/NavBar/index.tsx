import { useState } from "react";

import { useRouter } from "next/navigation";

import Button from "@/components/ui/buttons/Button";
import MoodSlider from "@/components/ui/MoodSlider";
import { useUserContext } from "@/context/UserProvider";
import { createClient } from "@/lib/supabase/client";
import { useMoodCheck, useUpsertMoodCheck } from "@/services/mood_checks"
import { useUserSettings } from "@/services/user_settings";

import "react-day-picker/style.css";
import Calendar from "./parts/Calendar";

type Props = {
  userID: string;
};

const bgColor = "rgb(40 40 40)";

const NavBar = ({ userID }: Props): React.ReactElement => {
  // STATE
  const [mood, setMood] = useState(3);
  const handleMoodChange = (newMood: number): void => {
    setMood(newMood);
  };

  // CONTEXT
  const { user } = useUserContext();

  // RQ
  const { data: settings } = useUserSettings(user?.userID);
  const { data: moodCheck } = useMoodCheck(user?.userID);
  const { mutate: upsertMoodCheck } = useUpsertMoodCheck();
  const onSubmitMoodCheck = (): void => {
    upsertMoodCheck({ user_id: user.userID, score: mood });
  }

  // ROUTER
  const router = useRouter();

  // METHODS
  const handleLogout = async (): Promise<void> => {
    const client = createClient();
    await client.auth.signOut();
    router.push('/');
  };

  // VARS
  const isMoodChecksEnabled = settings?.mood_checks_enabled ?? true;

  return (
    <div
      className="p-4 m-4 rounded-2xl flex flex-col justify-between items-center"
      style={{ backgroundColor: bgColor }}
    >
      <div className="rounded-2xl p-2">
        <Calendar />
      </div>

      {isMoodChecksEnabled && <MoodSlider value={mood} onChange={handleMoodChange} savedValue={moodCheck} onSubmit={onSubmitMoodCheck} />}

      <div className="flex justify-between w-full">
        <Button onClick={(): void => router.push(`/${userID}/profile`)} color="white">Profile</Button>

        <Button onClick={handleLogout} color="white">Logout</Button>
      </div>
    </div>
  );
};

export default NavBar;
