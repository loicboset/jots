'use client';

import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Calendar from "@/components/features/Calendar";
import MoodSlider from "@/components/features/MoodSlider";
import WeeklyStreak from "@/components/features/WeeklyStreak";
import Button from "@/components/ui/buttons/Button";
import { useUserContext } from "@/context/UserProvider";
import { createClient } from "@/lib/supabase/client";

import WeeklyDigestButton from "./WeeklyDigestButton";

type Props = {
  handleSetSidebarOpen?: (open: boolean) => void;
}

const NavbarContent = ({ handleSetSidebarOpen }: Props): React.ReactElement => {
  // ROUTER
  const router = useRouter();

  // CONTEXT
  const { user } = useUserContext();

  // METHODS
  const handleLogout = async (): Promise<void> => {
    const client = createClient();
    await client.auth.signOut();
    router.push('/');
  };

  return (
    <>
      <div className="absolute top-1 right-1 md:hidden">
        <button type="button" onClick={() => handleSetSidebarOpen?.(false)} className="-m-2.5 p-2.5">
          <span className="sr-only">Close sidebar</span>
          <XMarkIcon aria-hidden="true" className="size-6 text-white" />
        </button>
      </div>
      <div className="rounded-2xl p-2 mx-auto">
        <Calendar />
      </div>
      <div className="flex h-full flex-col gap-6 mt-6 items-center">
        <WeeklyStreak />
        <WeeklyDigestButton />
        <MoodSlider />
      </div>
      <div className="mb-2">
        <Link href={'https://discord.gg/YQP4wwbyfg'} target="_blank" className="flex">
          <p className="text-sm pr-2">Join our Discord!</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="size-8" viewBox="0 0 24 24">
            {/* eslint-disable-next-line max-len */}
            <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
          </svg>
        </Link>
      </div>
      <div className="flex justify-between w-full">
        <Button href={`/${user.userID}/profile`} color="white">Profile</Button>
        <Button onClick={handleLogout} color="white">Logout</Button>
      </div>
    </>
  )
}

export default NavbarContent;