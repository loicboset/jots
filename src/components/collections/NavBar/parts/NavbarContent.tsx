'use client';

import { XMarkIcon } from "@heroicons/react/24/outline";
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
      <div className="flex justify-between w-full">
        <Button href={`/${user.userID}/profile`} color="white">Profile</Button>
        <Button onClick={handleLogout} color="white">Logout</Button>
      </div>
    </>
  )
}

export default NavbarContent;