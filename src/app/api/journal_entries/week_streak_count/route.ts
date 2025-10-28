import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { createClient } from '@/lib/supabase/server';

dayjs.extend(isoWeek);

export async function GET(request: Request): Promise<Response> {
  const authHeader = request.headers.get('Authorization');
  const { searchParams } = new URL(request.url);
  const userIdParam = searchParams.get('user_id');

  const supabase = await createClient(authHeader);

  // --- Fetch journal entries ---
  const { data: journal_entries, error: journalError } = await supabase
    .from('journal_entries')
    .select('date')
    .lte('date', dayjs().format('YYYY-MM-DD'))
    .match(userIdParam ? { user_id: userIdParam } : {});

  // --- Fetch user reflections (only submitted if that’s desired) ---
  const { data: reflections, error: reflectionsError } = await supabase
    .from('user_reflections')
    .select('date, status')
    .lte('date', dayjs().toISOString())
    .in('status', ['draft', 'submitted'])
    .match(userIdParam ? { user_id: userIdParam } : {}); // optional filter

  if (journalError || reflectionsError) {
    console.error('Supabase errors:', { journalError, reflectionsError });
    return new Response('Error fetching data', { status: 500 });
  }

  // --- Build unified week set ---
  const weeks = new Set<string>();

  const addToWeeks = (dateString: string): void => {
    const d = dayjs(dateString);
    const week = String(d.isoWeek()).padStart(2, '0');
    const year = d.year();
    weeks.add(`${year}-${week}`);
  };

  journal_entries?.forEach((entry) => addToWeeks(entry.date));
  reflections?.forEach((reflection) => addToWeeks(reflection.date));

  // --- Compute streak ---
  let count = 0;
  let weekPointer;

  // Sorting using ISO-week-aware comparison (important for cross-year streaks)
  const sortedWeeks = Array.from(weeks).sort((a, b) => {
    const [ya, wa] = a.split('-').map(Number);
    const [yb, wb] = b.split('-').map(Number);
    return dayjs().set('year', ya).isoWeek(wa).diff(dayjs().set('year', yb).isoWeek(wb));
  });

  for (const week of sortedWeeks) {
    if (!weekPointer) {
      weekPointer = week;
      count++;
      continue;
    }

    const [year, w] = weekPointer.split('-') as [string, string];
    const followingWeek = dayjs().set('year', Number(year)).isoWeek(Number(w)).add(1, 'week');
    const followingW = followingWeek.isoWeek();
    const followingY = followingWeek.year();

    if (week === `${followingY}-${String(followingW).padStart(2, '0')}`) {
      weekPointer = week;
      count++;
    } else {
      // streak broken — start over from this new week
      weekPointer = week;
      count = 1;
    }
  }

  // --- Check if streak is still active ---
  const currentWeek = dayjs().isoWeek();
  const currentYear = dayjs().year();
  const currentWeekDate = dayjs().set('year', currentYear).isoWeek(currentWeek);

  if (weekPointer) {
    const [lastYear, lastWeek] = weekPointer.split('-').map(Number);
    const lastWeekDate = dayjs().set('year', lastYear).isoWeek(lastWeek);
    const diffWeeks = currentWeekDate.diff(lastWeekDate, 'week');

    // If user missed >1 week, streak is lost
    if (diffWeeks > 1) count = 0;
  }

  return new Response(JSON.stringify(count), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
