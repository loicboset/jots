'use client';

import AppLayout from '@/components/AppLayout';
import { useUserReflections } from '@/services/user_reflections';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import ReflectionScore from './parts/ReflectionScore';
import { useCalendarContext } from '@/context/CalendarContextProvider';

const ReflectionsDone = (): React.ReactElement => {
  // CONTEXT
  const { calendar } = useCalendarContext();

  // RQ
  const { data: reflections = [] } = useUserReflections(calendar.currentDate);

  return (
    <AppLayout>
      <div className="flex flex-col overflow-hidden">
        <div className="flex items-center justify-center text-lg font-medium mb-4">
          <Link href={`../reflections`}>
            <ArrowLeftIcon className="inline w-5 h-5 mr-2" />
          </Link>
          <span className="flex-1 text-center">Reflections done 💪</span>
        </div>

        <div className="flex-1 flex flex-col gap-4 overflow-auto">
          {reflections.map((reflection) => (
            <Link
              key={reflection.id}
              href={`../reflections/done/${reflection.id}`}
              className="flex items-center justify-between border rounded-md p-4"
            >
              <p>{reflection.name}</p>
              <ReflectionScore score={reflection.user_reflection_assessments[0]?.score} />
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default ReflectionsDone;
