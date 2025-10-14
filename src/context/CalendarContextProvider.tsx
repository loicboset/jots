"use client";

import { useContext, createContext, ReactNode } from "react";

export type CalendarData = {
  currentDate: Date;
};

type Props = {
  value: {
    calendar: CalendarData;
    setCalendar: (user: CalendarData) => void;
  };
  children: ReactNode;
};

// context
const CalendarContext = createContext<Props["value"] | undefined>(undefined);

const CalendarContextProvider = ({
  children,
  value,
}: Props): React.ReactElement => (
  <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>
);

// create a hook to use the global context
const useCalendarContext = (): Props["value"] => {
  const globalUserState = useContext(CalendarContext);

  if (globalUserState === undefined) {
    throw new Error("Context must be used within a Provider");
  }

  return globalUserState;
};

export { CalendarContextProvider, useCalendarContext };
