'use client';

import Editor from "@/components/collections/Editor";
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

  return (
    <>
      <NavBar userID={userID} />
      <div className="w-full focus:outline-none flex flex-col p-8 pb-12">
        <div className="mb-8 pb-2 border-b border-gray-500">
          <p className="mb-2 font-medium text-lg">{calendar.currentDate.toDateString()}</p>
          <MotivationBooster />
        </div>
        <AppWrapper userID={userID}>
          <Editor userID={userID} />
        </AppWrapper>
      </div>
    </>
  );
};

export default App;
