'use client';

import Editor from "@/components/collections/Editor";
import { useCalendarContext } from "@/context/CalendarContextProvider";

import AppWrapper from "./collections/AppWrapper";
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
      <div className="w-full focus:outline-none  p-8">
        <p className="mb-8 font-medium text-lg">{calendar.currentDate.toDateString()}</p>
        <AppWrapper userID={userID}>
          <Editor userID={userID} />
        </AppWrapper>
      </div>
    </>
  );
};

export default App;
