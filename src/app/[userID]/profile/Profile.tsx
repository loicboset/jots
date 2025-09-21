"use client";

/* eslint-disable max-len */
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import AchievementsList from "./_parts/AchievementsList";
import ConnectGithub from "./_parts/ConnectGithub";
import ExportButton from "./_parts/ExportButton";
import ExtensionToken from "./_parts/ExtensionToken";
import Features from "./_parts/Features";
import Insights from "./_parts/Insights";
import PersonalInfo from "./_parts/PersonalInfo";

type Props = {
  email: string;
};

const Profile = ({ email }: Props): React.ReactElement => {
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
            <h2 className="font-medium text-2xl mb-2">Your Profile</h2>
          </div>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="space-y-12">
            {/* ACCOUNT INFO */}
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 md:pb-6 md:grid-cols-3">
              <div>
                <h2 className="text-base/7 font-semibold text-white">
                  Account
                </h2>
                <p className="mt-1 text-sm/6 text-gray-400">
                  This is your account information.
                </p>
              </div>
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm/6 font-medium text-white"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                      <input
                        id="email"
                        name="email"
                        type="text"
                        value={email}
                        disabled
                        className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-gray-500 mb-6" />

            {/* PERSONAL INFO */}
            <PersonalInfo />
            <hr className="border-gray-500 mb-6" />

            {/* GITHUB OAUTH CONNECTION */}
            <ConnectGithub />
            <hr className="border-gray-500 mb-6" />

            {/* VS CODE TOKEN GENERATOR */}
            <ExtensionToken />
            <hr className="border-gray-500 mb-6" />

            {/* FEATURES */}
            <Features />
            <hr className="border-gray-500 mb-6" />

            {/* INSIGHTS */}
            <Insights />
            <hr className="border-gray-500 mb-6" />

            {/* ACHIEVEMENTS */}
            <AchievementsList />
            <hr className="border-gray-500 mb-6" />

            {/* EXPORT ENTRIES */}
            <ExportButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
