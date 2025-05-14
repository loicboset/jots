'use client';

import { useState } from "react";

import { Bars3Icon } from "@heroicons/react/24/outline";
import Script from 'next/script';

import Editor from "@/components/collections/Editor";
import BugReportButton from "@/components/ui/buttons/BugReportButton";
import { useCalendarContext } from "@/context/CalendarContextProvider";

import AppWrapper from "./collections/AppWrapper";
import MotivationBooster from "./collections/MotivationBooster";
import NavBar from "./collections/NavBar";

type Props = {
  userID: string;
}

const App = ({ userID }: Props): React.ReactElement => {
  // CONTEXT
  const { calendar } = useCalendarContext();

  // STATE
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSetSidebarOpen = (open: boolean): void => setSidebarOpen(open);

  return (
    <>
      <NavBar sidebarOpen={sidebarOpen} handleSetSidebarOpen={handleSetSidebarOpen} />
      <div className="w-full focus:outline-none flex flex-col p-8 pb-12">
        <div className="mb-8 pb-2 border-b border-gray-500">
          <div className="flex items-center space-x-2 mb-2">
            <button type="button" onClick={() => handleSetSidebarOpen(true)} className="text-gray-50 md:hidden">
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
            <p className="font-medium text-lg">{calendar.currentDate.toDateString()}</p>
          </div>
          <MotivationBooster />
        </div>
        <AppWrapper userID={userID}>
          <Editor userID={userID} />
        </AppWrapper>
      </div>
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="lazyOnload"
      />
      <BugReportButton />
    </>
  );
};

export default App;
