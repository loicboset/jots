'use client';

import { useEffect, useState } from "react";

import { CalendarContextProvider, CalendarData } from "@/context/CalendarContextProvider";
import { CurrentAuthenticatedUser, UserContextProvider } from "@/context/UserProvider";
import { createClient } from "@/lib/supabase/client";

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>): React.ReactElement => {
  // STATE
  const [user, setUser] = useState<CurrentAuthenticatedUser>();
  const [calendar, setCalendar] = useState<CalendarData>({ currentDate: new Date() });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    createClient().auth.getUser().then(({ data, error }) => {
      if (error) {
        console.error('Error fetching user:', error);
      } else {
        setUser({ userID: data.user.id });
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center text-white">Loading...</div>;
  } else if (!user) {
    return <div className="flex h-screen items-center justify-center text-white">User not found</div>;
  }

  return (
    <UserContextProvider value={{ user, setUser }}>
      <CalendarContextProvider value={{ calendar, setCalendar }}>
        {children}
      </CalendarContextProvider>
    </UserContextProvider>
  );
}

export default RootLayout