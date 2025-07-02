import { useAchievements } from '@/context/AchievementsProvider';

import achievements from '../../../../../achievements.json';

const AchievementsList = (): React.ReactElement => {
  const { unlocked } = useAchievements();

  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <h2 className="text-base/7 font-semibold text-white">Achievements</h2>
        <p className="mt-1 text-sm/6 text-gray-400">
          Keep journaling to unlock all hidden achivements!
        </p>
      </div>
      {achievements.map((achievement) => {
        const isUnlocked = unlocked.some(unlockedAchievement => unlockedAchievement.achievement_id === achievement.id);
        const isHidden = achievement.hidden || !isUnlocked;

        return (
          <div key={achievement.id} className={`p-4 rounded-lg border ${isUnlocked ? 'border-green-500' : 'border-gray-300'}`}>
            <h3 className="font-bold">{isHidden ? '???' : achievement.name}</h3>
            <p>{isHidden ? 'Hidden Achievement' : achievement.description}</p>
          </div>
        );
      })}
    </div>
  );
}

export default AchievementsList;
