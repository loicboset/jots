'use client';

import { Suspense } from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation"

import queryClient from "@/lib/tanstackQuery/client";

import OnboardingStep from "./OnboardingStep";

const Onboarding = (): React.ReactElement => {
  // RL
  const searchParams = useSearchParams()
  const userID = searchParams?.get('user_id');

  if (!userID) redirect('/login');

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link href="/">
            <h1 className="text-indigo-500 text-5xl font-semibold tracking-tight text-pretty text-center">DevLog</h1>
          </Link>
        </div>
      </div>

      <div className="flex w-1/2 mx-auto">
        <OnboardingStep userID={userID} />
      </div>
    </QueryClientProvider>
  );
};

const OnboardingWrapper = (): React.ReactElement => {

  return (
    <Suspense>
      <Onboarding />
    </Suspense>
  )
}

export default OnboardingWrapper;
