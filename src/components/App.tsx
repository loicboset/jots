'use client';

import { useState } from 'react';

import { Bars3Icon } from '@heroicons/react/24/outline';
import Script from 'next/script';

import BugReportButton from '@/components/features/BugReportButton';
import { useCalendarContext } from '@/context/CalendarContextProvider';

import EditorWrapper from './collections/EditorWrapper';
import MotivationBooster from './collections/MotivationBooster';
import NavBar from './collections/NavBar';
import ChatbotWrapper from './features/ChatbotWrapper';
import { useUserContext } from '@/context/UserProvider';

type Props = {
  children: React.ReactNode;
};

const App = ({ children }: Props): React.ReactElement => {
  // CONTEXT
  const { calendar } = useCalendarContext();
  const { user } = useUserContext();

  // STATE
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSetSidebarOpen = (open: boolean): void => setSidebarOpen(open);

  return (
    <div className="flex h-dvh">
      <NavBar sidebarOpen={sidebarOpen} handleSetSidebarOpen={handleSetSidebarOpen} />

      <div className="w-full focus:outline-none flex flex-col p-8 pb-12">
        <div className="mb-8 pb-2 border-b border-gray-500">
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
        <EditorWrapper userID={user.userID}>{children}</EditorWrapper>
      </div>
      <Script src="https://tally.so/widgets/embed.js" strategy="lazyOnload" />
      <BugReportButton />
      <ChatbotWrapper />
    </div>
  );
};

export default App;
