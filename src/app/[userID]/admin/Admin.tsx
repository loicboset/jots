/* eslint-disable max-len */
"use client";
import {
  ArrowLeftIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

import { useChurn, useRetention } from "@/services/admin";

const Admin = (): React.ReactElement => {
  // RQ
  const { data: churn } = useChurn();
  const { data: retention } = useRetention();

  // METHODS
  const formatChurn = (value: number): string => (value * 100).toFixed(2) + "%";

  return (
    <div className="pb-10">
      <div className="flex p-4 backdrop-blur-xs justify-between items-center sticky top-0 z-10 border-b border-gray-900">
        <Link href="/">
          <h1 className="text-3xl text-indigo-500">Jots</h1>
        </Link>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex mb-4 relative justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 mb-4 absolute top-0 left-0 hover:text-gray-400 hover:font-medium"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span>back</span>
          </Link>

          <div className="text-center mb-4 max-w-1/2">
            <h2 className="font-medium text-2xl mb-2">Admin Dashboard</h2>
          </div>
        </div>
        {/* classify dropped (last entry > 14 days ago) */}
        <div className="mx-auto max-w-4xl flex flex-col gap-6">
          <div className="border border-gray-700 rounded-lg p-6">
            <p className="text-xl fond-bold mb-4">
              Average Engagement Before Churn
            </p>
            <p className="text-gray-200 flex items-center gap-2">
              <span>Total users: </span>
              <span>{churn ? churn.totalUsers : "Loading..."}</span>
            </p>
            <p className="text-gray-200 flex items-center gap-2">
              <span>Total active users: </span>
              <span>{churn ? churn.totalActiveUsers : "Loading..."}</span>
              <QuestionMarkCircleIcon
                className="w-5"
                title="with at least one journal entry"
              />
            </p>
            <p className="text-gray-200 flex items-center gap-2">
              <span>Dropped users: </span>
              <span>{churn ? churn.droppedUsers : "Loading..."}</span>
              <QuestionMarkCircleIcon
                className="w-5"
                title="Classified as dropped -> last entry > 14 days ago"
              />
            </p>
            <p className="text-gray-200">
              Average entries before churn:{" "}
              {churn ? churn.avgEntriesBeforeChurn : "Loading..."}
            </p>
          </div>
          <div className="border border-gray-700 rounded-lg p-6">
            <p className="text-xl fond-bold mb-4">Retention Rate</p>
            <p className="text-gray-200">
              7 days:{" "}
              {retention ? formatChurn(retention.retention[7]) : "Loading..."}
            </p>
            <p className="text-gray-200">
              14 days:{" "}
              {retention ? formatChurn(retention.retention[14]) : "Loading..."}
            </p>
            <p className="text-gray-200">
              21 days:{" "}
              {retention ? formatChurn(retention.retention[21]) : "Loading..."}
            </p>
            <p className="text-gray-200">
              30 days:{" "}
              {retention ? formatChurn(retention.retention[30]) : "Loading..."}
            </p>
            <p className="text-gray-200">
              60 days:{" "}
              {retention ? formatChurn(retention.retention[60]) : "Loading..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
