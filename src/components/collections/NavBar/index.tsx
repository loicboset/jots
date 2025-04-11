import { useRouter } from "next/navigation";

import Button from "@/components/ui/buttons/Button";
import MoodSlider from "@/components/ui/MoodSlider";
import { createClient } from "@/lib/supabase/client";


import "react-day-picker/style.css";
import Calendar from "./parts/Calendar";

type Props = {
  userID: string;
};

const bgColor = "rgb(40 40 40)";

const NavBar = ({ userID }: Props): React.ReactElement => {
  // ROUTER
  const router = useRouter();

  // METHODS
  const handleLogout = async (): Promise<void> => {
    const client = createClient();
    await client.auth.signOut();
    router.push('/');
  };

  return (
    <div
      className="p-4 m-4 rounded-2xl flex flex-col justify-between items-center"
      style={{ backgroundColor: bgColor }}
    >
      <div className="rounded-2xl p-2">
        <Calendar />
      </div>
      <MoodSlider />
      <div className="flex justify-between w-full">
        <Button onClick={(): void => router.push(`/${userID}/profile`)} color="white">Profile</Button>
        <Button onClick={handleLogout} color="white">Logout</Button>
      </div>
    </div>
  );
};

export default NavBar;
