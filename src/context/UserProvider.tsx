'use client'

import { useContext, createContext, ReactNode } from 'react';

type CurrentAuthenticatedUser = {
  userID: string;
};

type Props = {
  user: CurrentAuthenticatedUser;
  children: ReactNode;
};

// context
const UserContext = createContext<CurrentAuthenticatedUser>({} as CurrentAuthenticatedUser);

const UserContextProvider = ({ children, user }: Props): React.ReactElement => (
  <UserContext.Provider value={user}>{children}</UserContext.Provider>
);

// create a hook to use the global context
const useUserContext = (): CurrentAuthenticatedUser => {
  const globalUserState = useContext(UserContext);

  if (globalUserState === undefined) {
    throw new Error('Context must be used within a Provider');
  }

  return globalUserState;
};

export { UserContextProvider, useUserContext };
