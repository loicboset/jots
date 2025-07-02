import React, { createContext, JSX, useContext, useState } from "react";

import { Howl } from "howler";
import toast from "react-hot-toast";

import { useUserAchievements, useUpsertUserAchievement } from "@/services/user_achievements";
import { UserAchievement } from "@/types/api/user_achievements";

import { useUserContext } from "./UserProvider";

type AchievementContextType = {
  unlocked: UserAchievement[];
  unlockAchievement: (id: string, name: string) => void;
  confetti: boolean;
};

const AchievementSound = new Howl({ src: ['/sounds/achievement.mp3'], volume: 0.1 });

const AchievementsContext = createContext<AchievementContextType | null>(null);

export const AchievementsProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  // CONTEXT
  const { user } = useUserContext();

  // RQ
  const { data: unlocked } = useUserAchievements(user?.userID);
  const { mutate: upsertUserAchievement } = useUpsertUserAchievement();

  const [confetti, setConfetti] = useState(false);

  const unlockAchievement = (id: string, name: string): void => {
    if (!unlocked) return
    if (!unlocked.some(row => row.achievement_id === id)) {
      AchievementSound.play();

      upsertUserAchievement({ user_id: user.userID, achievement_id: id });

      toast.success(`Achievement Unlocked: ${name}`, {
        duration: 8000,
        icon: '🏆',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });

      setConfetti(true);
      setTimeout(() => setConfetti(false), 4000);
    }
  };

  if (!unlocked) return <></>

  return (
    <AchievementsContext.Provider value={{ unlocked, unlockAchievement, confetti }}>
      {children}
    </AchievementsContext.Provider>
  );
};

export const useAchievements = (): AchievementContextType => {
  const context = useContext(AchievementsContext);
  if (!context) {
    throw new Error("useAchievements must be used within an AchievementsProvider");
  }
  return context;
};
