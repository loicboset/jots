'use client';

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import { useDigests } from "@/services/digests";

import WeeklyDigest from "./WeeklyDigest";

const Digests = (): React.ReactElement => {
  // RQ
  const { data: digests = [] } = useDigests();

  return (
    <div className="h-screen">
      <div className='flex p-4 backdrop-blur-xs justify-between items-center sticky top-0 z-10 border-b border-gray-900'>
        <Link href="/">
          <h1 className='text-3xl text-indigo-500'>Jots</h1>
        </Link>
      </div>


      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex mb-4 relative justify-center">
          <Link href="/" className="flex items-center gap-2 mb-4 absolute top-0 left-0 hover:text-gray-400 hover:font-medium">
            <ArrowLeftIcon className="h-5 w-5" />
            <span>back</span>
          </Link>

          <div className="text-center mb-4 max-w-1/2">
            <h2 className="font-medium text-2xl mb-2">
              Your Weekly Digests
            </h2>
            <p className="text-sm text-gray-400">
              Every Monday, you get smart weekly reflections based on your journal entries and goals. The more you write, the more valuable it becomes.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl flex flex-col gap-10">
          {digests.map((digest) => (
            <WeeklyDigest key={digest.id} digest={digest} />
          ))}

          {digests.length === 0 && (
            <p className="text-md text-gray-200 text-center mt-10 border-t border-gray-500 p-4">
              Start journaling to receive your weekly digests!
            </p>
          )}
        </div>
      </div>
    </div>
  )
};

export default Digests