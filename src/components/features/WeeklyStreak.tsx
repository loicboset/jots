import { useGetWeekStreakCount } from "@/services/journal_entries";
import { weekly_streak_messages } from "@/week-streaks-sentences.json";

const WeeklyStreak = (): React.ReactElement | null => {
  const { data: streak = 0, isLoading } = useGetWeekStreakCount();

  if (isLoading) return null;

  return (
    <div className="flex flex-col gap-1 border-2 border-indigo-300 rounded-lg px-4 py-2 bg-indigo-500 w-full">
      {streak > 0 && (
        <p className="text-sm font-bold">🔥 {streak} week streak</p>
      )}
      <p className="text-xs text-gray-50">
        {
          weekly_streak_messages[
            Math.min(streak, weekly_streak_messages.length - 1)
          ]
        }
      </p>
    </div>
  );
};

export default WeeklyStreak;
