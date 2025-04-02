import { useState } from "react";

import { useRouter } from "next/navigation";
import { DayPicker, getDefaultClassNames, Modifiers } from "react-day-picker";

import Button from "@/components/ui/buttons/Button";
import { useCalendarContext } from "@/context/CalendarContextProvider";
import { createClient } from "@/lib/supabase/client";


import "react-day-picker/style.css";
import "./index.css";



type Props = {
  userID: string;
};

const bgColor = "rgb(40 40 40)";

const NavBar = ({ userID }: Props): React.ReactElement => {
  // STATE
  const [selected, setSelected] = useState<Date>(new Date());

  // CONTEXT
  const { calendar, setCalendar } = useCalendarContext();

  // ROUTER
  const router = useRouter();

  // METHODS
  const handleLogout = async (): Promise<void> => {
    const client = createClient();
    await client.auth.signOut();
    router.push('/');
  };

  const handleSetSelected = (modifiers: Modifiers, selectedDate?: Date): void => {
    if (modifiers.selected || !selectedDate) return;
    setSelected(selectedDate)

    const year = selectedDate.getFullYear()
    const month = selectedDate.getMonth() + 1;
    const day = selectedDate.getDate();

    const formattedDate = new Date(`${year}-${month}-${day}`)
    setCalendar({ ...calendar, currentDate: formattedDate });
  };

  // VARS
  const defaultClassNames = getDefaultClassNames();

  return (
    <div
      className="p-4 m-4 rounded-2xl flex flex-col justify-between items-center"
      style={{ backgroundColor: bgColor }}
    >
      <div className="rounded-2xl p-2">
        <DayPicker
          animate
          mode="single"
          selected={selected}
          onSelect={(selectedDate, triggerDate, modifiers): void => handleSetSelected(modifiers, selectedDate)}
          classNames={{
            day: `${defaultClassNames.day} text-xs`,
            weekdays: `${defaultClassNames.weekdays} text-xs`,
            caption_label: `${defaultClassNames.caption_label} text-sm`,
          }}
        />
      </div>


      <div className="flex justify-between w-full">
        <Button onClick={(): void => router.push(`/${userID}/profile`)} color="white">Profile</Button>

        <Button onClick={handleLogout} color="white">Logout</Button>
      </div>
    </div>
  );
};

export default NavBar;
