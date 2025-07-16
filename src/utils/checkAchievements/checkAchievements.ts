import achievements from '@/achievements.json';

type Stats = {
  totalEntries: number;
  streak: number;
  day: string
  tasks: number;
};

type UnlockFunction = (id: string, name: string) => void;

type CheckAchievementsProps = {
  stats: Stats;
  unlock: UnlockFunction;
};

export const checkAchievements = ({ stats, unlock }: CheckAchievementsProps): void => {
  achievements.forEach(achievement => {
    const condition = achievement.condition;

    if (typeof(condition.value) === 'number' && condition.type === 'entries_count' && stats.totalEntries >= condition.value) {
      unlock(achievement.id, achievement.name);
    }

    if (typeof(condition.value) === 'number' && condition.type === 'streak' && stats.streak >= condition.value) {
      unlock(achievement.id, achievement.name);
    }

    if (Array.isArray(condition.value) && condition.type === 'day' && condition.value.includes(stats.day)) {
      unlock(achievement.id, achievement.name);
    }

    if (typeof(condition.value) === 'number' && condition.type === 'task' && stats.tasks >= condition.value) {
      unlock(achievement.id, achievement.name);
    }

    // add more conditions here. eg. mood score checks
  });
}
