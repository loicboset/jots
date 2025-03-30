'use client';

import { JSX } from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigCatProvider, createConsoleLogger, LogLevel } from "configcat-react";

import queryClient from "@/lib/tanstackQuery/client";


type Props = {
  children: React.ReactNode;
};

const LayoutWrapper = ({ children }: Props): JSX.Element => {
  // VARS
  const logger = createConsoleLogger(LogLevel.Info);

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigCatProvider sdkKey={process.env.NEXT_PUBLIC_CONFIGCAT_SDK_KEY!} options={{ logger }}>
        {children}
      </ConfigCatProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default LayoutWrapper;
