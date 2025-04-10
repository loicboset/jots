import { JSX, useState } from "react";

import dayjs from "dayjs";
import { Modifiers, getDefaultClassNames, DayPicker } from "react-day-picker";

import { useCalendarContext } from "@/context/CalendarContextProvider";
import { useUserContext } from "@/context/UserProvider";
import { useJournalEntriesDates } from "@/services/journal_entries";

import './index.css';

const Calendar = (): JSX.Element => {
  // STATE
  const [selected, setSelected] = useState<Date>(new Date());
  const [date, setDate] = useState<Date>(new Date())

  // CONTEXT
  const { calendar, setCalendar } = useCalendarContext();
  const { user: { userID } } = useUserContext();

  // RQ
  const { data: entries = [] } = useJournalEntriesDates(userID, date);

  // METHODS
  const handleSetSelected = (modifiers: Modifiers, selectedDate?: Date): void => {
    if (modifiers.selected || !selectedDate) return;
    setSelected(selectedDate)

    const year = selectedDate.getFullYear()
    const month = selectedDate.getMonth() + 1;
    const day = selectedDate.getDate();

    const formattedDate = new Date(`${year}-${month}-${day}`)
    setCalendar({ ...calendar, currentDate: formattedDate });
  };

  const handleOnMonthChange = (date: Date): void => {
    setDate(date);
  };

  // VARS
  const defaultClassNames = getDefaultClassNames();
  const filledDays = entries.map(({ date }) => dayjs(date).toDate());

  return (
    <DayPicker
      animate
      weekStartsOn={1}
      modifiers={{
        filled: filledDays
      }}
      modifiersClassNames={{
        filled: "filled-day"
      }}
      mode="single"
      selected={selected}
      onSelect={(selectedDate, triggerDate, modifiers): void => handleSetSelected(modifiers, selectedDate)}
      classNames={{
        day: `${defaultClassNames.day} text-xs`,
        weekdays: `${defaultClassNames.weekdays} text-xs`,
        caption_label: `${defaultClassNames.caption_label} text-sm`,
      }}
      onMonthChange={handleOnMonthChange}
    />
  );
};

export default Calendar;
