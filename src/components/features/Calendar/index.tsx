import { JSX, useEffect } from "react";

import dayjs from "dayjs";
import { Modifiers, getDefaultClassNames, DayPicker } from "react-day-picker";

import { useCalendarContext } from "@/context/CalendarContextProvider";
import { useUserContext } from "@/context/UserProvider";
import { useJournalEntriesDates } from "@/services/journal_entries";
import useCalendarStore from "@/stores/useCalendarStore";

import "react-day-picker/style.css";
import './index.css';

const Calendar = (): JSX.Element => {
  // STORE
  const selectedDate = useCalendarStore((state) => state.selectedDate);
  const setSelectedDate = useCalendarStore((state) => state.setSelectedDate);

  // CONTEXT
  const { calendar, setCalendar } = useCalendarContext();
  const { user: { userID } } = useUserContext();

  // RQ
  const { data: entries = [] } = useJournalEntriesDates(userID, selectedDate);

  // EFFECTS
  useEffect(() => {
    if (!selectedDate) {
      console.log('No selected date, setting to today');
      setSelectedDate(new Date());
    }
  }, [selectedDate, setSelectedDate]);

  // METHODS
  const handleSetSelected = (modifiers: Modifiers, selectedDate?: Date): void => {
    console.log('handleSetSelected')
    if (modifiers.selected || !selectedDate) return;
    setSelectedDate(selectedDate)

    const year = selectedDate.getFullYear()
    const month = selectedDate.getMonth() + 1;
    const day = selectedDate.getDate();

    const formattedDate = new Date(`${year}-${month}-${day}`)
    setCalendar({ ...calendar, currentDate: formattedDate });
  };

  // VARS
  const defaultClassNames = getDefaultClassNames();
  const filledDays = entries.map(({ date }) => dayjs(date).toDate());

  return (
    <DayPicker
      animate
      weekStartsOn={1}
      showOutsideDays
      modifiers={{
        filled: filledDays
      }}
      modifiersClassNames={{
        filled: "filled-day"
      }}
      mode="single"
      selected={selectedDate}
      onSelect={(selectedDate, triggerDate, modifiers): void => handleSetSelected(modifiers, selectedDate)}
      classNames={{
        day: `${defaultClassNames.day} text-xs`,
        weekdays: `${defaultClassNames.weekdays} text-xs`,
        caption_label: `${defaultClassNames.caption_label} text-sm`,
      }}
    />
  );
};

export default Calendar;
