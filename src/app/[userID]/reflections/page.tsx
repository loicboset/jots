'use client';

import App from '@/components/App';
import TemplateLink from './parts/TemplateLink';
import { TEMPLATES } from '@/utils/constants';
import { useUserReflections } from '@/services/user_reflections';
import Link from 'next/link';
import { useCalendarContext } from '@/context/CalendarContextProvider';

const Reflection = (): React.ReactElement => {
  // CONTEXT
  const { calendar } = useCalendarContext();

  // RQ
  const { data = [] } = useUserReflections(calendar.currentDate);

  return (
    <App>
      <div className="flex flex-col overflow-hidden">
        {data.length > 0 && (
          <div className="text-center text-lg font-medium mb-2">
            <span>
              {data.length}{' '}
              <Link href={`reflections/done`} className="text-blue-500 hover:text-blue-700">
                reflections done
              </Link>{' '}
              !
            </span>
          </div>
        )}
        <div className="text-center text-lg font-medium">
          <span>What do you want to get clarity on?</span>
        </div>

        <div className="flex flex-col flex-1 overflow-auto md:grid md:grid-cols-2 gap-10 mt-10 max-w-3xl mx-auto">
          {TEMPLATES.map((template, index) => (
            <TemplateLink key={template.label} index={index} template={template} />
          ))}
        </div>
      </div>
    </App>
  );
};

export default Reflection;
