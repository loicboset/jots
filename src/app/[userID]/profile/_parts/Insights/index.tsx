import MoodChart from "@/components/ui/charts/MoodChart";
import { useUserContext } from "@/context/UserProvider";
import { useMoodChecks } from "@/services/mood_checks";

const Insights = (): React.ReactElement => {
  // CONTEXT
  const { user } = useUserContext();

  // RQ
  const { data: moodChecks } = useMoodChecks(user?.userID, 7);

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
      <div>
        <h2 className="text-base/7 font-semibold text-white">Insights</h2>
        <p className="mt-1 text-sm/6 text-gray-400">
          Gain insights in your journaling patterns.
        </p>
      </div>

      <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
        <div className="sm:col-span-4">
          <MoodChart data={moodChecks} />
        </div>
      </div>
    </div>
  );
};

export default Insights;