import { useGetWeekEntries } from "@/services/journal_entries";
import { countUncheckedListItems } from "@/utils/countUncheckedListItems/countUncheckedListItems";

const WeeklyTasks = (): React.ReactElement | null => {
  const { data: weekEntries, isLoading } = useGetWeekEntries()
  const unchecked = countUncheckedListItems(weekEntries)

  if (isLoading || unchecked === 0) return null;

  return (
    <div className="flex flex-col gap-1 border-2 border-orange-300 rounded-lg px-4 py-2 bg-orange-500 w-full">
      {unchecked && unchecked === 1 && (<p className="text-sm font-bold">☑️ {unchecked} task open this week</p>)}
      {unchecked && unchecked > 1 && (<p className="text-sm font-bold">☑️ {unchecked} tasks open this week</p>)}
    </div>
  );
};

export default WeeklyTasks;