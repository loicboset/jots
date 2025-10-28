'use client';

import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { PushNotificationsPlugin } from '@/packages';
import ConfettiAnimation from '@/components/ui/Confetti';
import { AchievementsProvider } from '@/context/AchievementsProvider';
import { CalendarContextProvider, CalendarData } from '@/context/CalendarContextProvider';
import { CurrentAuthenticatedUser, UserContextProvider } from '@/context/UserProvider';
import { createClient } from '@/lib/supabase/client';
import CreatePeriodDigestPlugin from './_parts/CreatePeriodDigestPlugin';
import ScreenSizeRenderer from '@/components/ui/wrappers/ScreenSizeRenderer';

type ExtendedNavigator = Navigator & { standalone?: boolean };

const RootLayout = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  const [user, setUser] = useState<CurrentAuthenticatedUser>();
  const [calendar, setCalendar] = useState<CalendarData>({ currentDate: new Date() });
  const [isLoading, setIsLoading] = useState(true);
  const [displayMode, setDisplayMode] = useState<'browser' | 'standalone'>('browser');

  useEffect(() => {
    createClient()
      .auth.getUser()
      .then(({ data, error }) => {
        if (error) console.error('Error fetching user:', error);
        else {
          setUser({ userID: data.user.id });
        }
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.register('/sw.js', { scope: '/', updateViaCache: 'none' });
    }
  }, []);

  // ✅ Move window check into useEffect
  useEffect(() => {
    const mqStandAlone = '(display-mode: standalone)';
    if (
      (window.navigator as ExtendedNavigator)?.standalone ||
      window.matchMedia(mqStandAlone).matches
    ) {
      setDisplayMode('standalone');
    }
  }, []);

  if (isLoading)
    return <div className="flex h-dvh items-center justify-center text-white">Loading...</div>;
  if (!user)
    return <div className="flex h-dvh items-center justify-center text-white">User not found</div>;

  return (
    <UserContextProvider value={{ user, setUser }}>
      <AchievementsProvider>
        <ConfettiAnimation />
        <Toaster position="top-left" />
        <CalendarContextProvider value={{ calendar, setCalendar }}>
          <CreatePeriodDigestPlugin />
          {displayMode === 'standalone' && (
            <ScreenSizeRenderer maxWidth="md">
              <PushNotificationsPlugin />
            </ScreenSizeRenderer>
          )}
          {children}
        </CalendarContextProvider>
      </AchievementsProvider>
    </UserContextProvider>
  );
};

export default RootLayout;
