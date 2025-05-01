import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

import { createClient } from "@/lib/supabase/server";

dayjs.extend(isoWeek);

export async function GET(): Promise<Response> {
  const supabase = await createClient();

  const { data: journal_entries } = await supabase
    .from("journal_entries")
    .select("date")
    .lte("date", dayjs().format("YYYY-MM-DD"));

  const weeks = new Set<string>();

  if (journal_entries) {
    journal_entries.forEach((entry) => {
      const week = dayjs(entry.date).isoWeek().toString().padStart(2, "0");
      const year = dayjs(entry.date).year();
      weeks.add(`${year}-${week}`);
    });
  }

  let count = 0;
  let weekPointer;

  const sortedWeeks = Array.from(weeks).sort();

  for (const week of sortedWeeks) {
    if (!weekPointer) {
      weekPointer = week;
      count++;
      continue;
    }

    const [year, w] = weekPointer.split("-") as [string, string];
    const followingWeek = dayjs().set("y", Number(year)).isoWeek(Number(w)).add(1, "week");
    const followingW = followingWeek.isoWeek();
    const followingY = followingWeek.year();

    if (week === `${followingY}-${followingW}`) {
      weekPointer = week;
      count++;
    } else {
      weekPointer = week;
      count = 0;
    }
  }

  const currentWeek = dayjs().isoWeek();
  const currentYear = dayjs().year();
  const currentWeekDate = dayjs().set("year", currentYear).isoWeek(currentWeek);

  if (weekPointer) {
    const [lastYear, lastWeek] = weekPointer.split("-").map(Number);
    const lastWeekDate = dayjs().set("year", lastYear).isoWeek(lastWeek);

    const diffWeeks = currentWeekDate.diff(lastWeekDate, "week");

    if (diffWeeks > 1) {
      count = 0;
    }
  }
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  return new Response(JSON.stringify(count), { status: 200, headers });
}
