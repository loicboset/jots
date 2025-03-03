'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import Editor from "@/components/collections/Editor";
import NavBar from "@/components/collections/NavBar";

import AppWrapper from "./collections/AppWrapper";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
})

type Props = {
  userID: string;
}

const App = ({ userID }: Props): React.ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppWrapper userID={userID}>
        <NavBar userID={userID} />
        <Editor userID={userID} />
      </AppWrapper>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider >
  );
};

export default App;
