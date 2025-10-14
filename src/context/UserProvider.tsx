"use client";

import { useContext, createContext, ReactNode } from "react";

export type CurrentAuthenticatedUser = {
  userID: string;
};

type Props = {
  value: {
    user: CurrentAuthenticatedUser;
    setUser: (user: CurrentAuthenticatedUser) => void;
  };
  children: ReactNode;
};

// context
const UserContext = createContext<Props["value"] | undefined>(undefined);

const UserContextProvider = ({
  children,
  value,
}: Props): React.ReactElement => (
  <UserContext.Provider value={value}>{children}</UserContext.Provider>
);

// create a hook to use the global context
const useUserContext = (): Props["value"] => {
  const globalUserState = useContext(UserContext);

  if (globalUserState === undefined) {
    throw new Error("Context must be used within a Provider");
  }

  return globalUserState;
};

export { UserContextProvider, useUserContext };
