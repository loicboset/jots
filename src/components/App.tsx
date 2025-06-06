'use client';

import { useEffect, useState } from "react";

import { Bars3Icon } from "@heroicons/react/24/outline";
import Script from 'next/script';

import Editor from "@/components/collections/Editor";
import BugReportButton from "@/components/features/BugReportButton";
import { useCalendarContext } from "@/context/CalendarContextProvider";
import { PushNotificationsPlugin } from "@/packages";

import AppWrapper from "./collections/AppWrapper";
import MotivationBooster from "./collections/MotivationBooster";
import NavBar from "./collections/NavBar";
import ChatbotWrapper from "./features/ChatbotWrapper";
import ScreenSizeRenderer from "./ui/wrappers/ScreenSizeRenderer";

type Props = {
  userID: string;
}

type ExtendedNavigator = Navigator & {
  standalone?: boolean;
}

const App = ({ userID }: Props): React.ReactElement => {
  // CONTEXT
  const { calendar } = useCalendarContext();

  // STATE
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSetSidebarOpen = (open: boolean): void => setSidebarOpen(open);

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      registerServiceWorker()
    }
  }, [])

  const registerServiceWorker = async (): Promise<void> => {
    await navigator.serviceWorker.register('./sw.js', {
      scope: '/',
      updateViaCache: 'none',
    })
  }


  // VARS
  let displayMode = "browser";
  const mqStandAlone = "(display-mode: standalone)";
  if (
    (window.navigator as ExtendedNavigator)?.standalone ||
    window.matchMedia(mqStandAlone).matches
  ) {
    displayMode = "standalone";
  }

  return (
    <>
      <NavBar sidebarOpen={sidebarOpen} handleSetSidebarOpen={handleSetSidebarOpen} />
      {displayMode === "standalone" && (
        <ScreenSizeRenderer maxWidth="md">
          <PushNotificationsPlugin />
        </ScreenSizeRenderer>
      )}
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
      <ChatbotWrapper />
    </>
  );
};

export default App;
