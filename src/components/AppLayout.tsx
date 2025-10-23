'use client';

import { useState } from 'react';

import { Bars3Icon } from '@heroicons/react/24/outline';
import Script from 'next/script';

import BugReportButton from '@/components/features/BugReportButton';
import { useCalendarContext } from '@/context/CalendarContextProvider';

import MotivationBooster from './collections/MotivationBooster';
import NavBar from './collections/NavBar';
import ChatbotWrapper from './features/ChatbotWrapper';
import LocationTabs from './ui/navigation/LocationTabs';
import { usePathname } from 'next/navigation';
import { Brain, NotebookPen } from 'lucide-react';

type Props = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: Props): React.ReactElement => {
  // CONTEXT
  const { calendar } = useCalendarContext();

  // ROUTER
  const pathname = usePathname();

  // STATE
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // METHODS
  const handleSetSidebarOpen = (open: boolean): void => setSidebarOpen(open);

  // VARS
  const tabs = [
    { name: 'Reflections', href: 'reflections', icon: Brain },
    { name: 'Journaling', href: 'journaling', icon: NotebookPen },
  ];

  const showTabs = pathname?.endsWith('/reflections') || pathname?.endsWith('/journaling');

  return (
    <div className="flex h-dvh">
      <NavBar sidebarOpen={sidebarOpen} handleSetSidebarOpen={handleSetSidebarOpen} />

      <div className="w-full focus:outline-none flex flex-col px-8 py-4 pb-12">
        <div className="pb-4 border-b border-gray-500">
          <div className="flex items-center space-x-2 mb-2">
            <button
              type="button"
              onClick={() => handleSetSidebarOpen(true)}
              className="text-gray-50 md:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
            <p className="font-medium text-lg">{calendar.currentDate.toDateString()}</p>
          </div>
          <MotivationBooster />
        </div>
        {showTabs && (
          <div className="mb-4 mt-4 sm:mt-0">
            <LocationTabs tabs={tabs} />
          </div>
        )}
        {children}
      </div>
      <Script src="https://tally.so/widgets/embed.js" strategy="lazyOnload" />
      <BugReportButton />
      <ChatbotWrapper />
    </div>
  );
};

export default AppLayout;
