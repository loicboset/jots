'use client';

import Editor from "@/components/collections/Editor";
import NavBar from "@/components/collections/NavBar";

import AppWrapper from "./collections/AppWrapper";


type Props = {
  userID: string;
}

const App = ({ userID }: Props): React.ReactElement => {
  return (
    <AppWrapper userID={userID}>
      <NavBar userID={userID} />
      <Editor userID={userID} />
    </AppWrapper>
  );
};

export default App;
