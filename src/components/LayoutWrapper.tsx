'use client';

import { JSX } from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigCatProvider, createConsoleLogger, LogLevel } from "configcat-react";
import { ErrorBoundary } from 'react-error-boundary';

import { PostHogProvider } from '@/app/providers'
import queryClient from "@/lib/tanstackQuery/client";



type Props = {
  children: React.ReactNode;
};

const LayoutWrapper = ({ children }: Props): JSX.Element => {
  // VARS
  const logger = createConsoleLogger(LogLevel.Info);

  return (
    <ErrorBoundary fallback={<div>Something went wrong.</div>}>
      <QueryClientProvider client={queryClient}>
        <ConfigCatProvider sdkKey={process.env.NEXT_PUBLIC_CONFIGCAT_SDK_KEY!} options={{ logger }}>
          <PostHogProvider>
            {children}
          </PostHogProvider>
        </ConfigCatProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default LayoutWrapper;
