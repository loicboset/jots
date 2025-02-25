import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";
import { useCategories } from "@/services/categories";

type Props = {
  userID: string;
};

const NavBar = ({ userID }: Props): React.ReactElement => {
  // ROUTER
  const router = useRouter();

  // RQ
  const { data: categories = [] } = useCategories(userID);

  // METHODS
  const handleLogout = async (): Promise<void> => {
    const client = createClient();
    await client.auth.signOut();
    router.push('/');
  };

  return (
    <div className="bg-gray-600/30 flex flex-col justify-between text-lg border-r border-white/10 text-white p-8">
      <ul className="space-y-4">
        {categories.map((cat) => (
          <li key={cat.name} className="flex items-center space-x-2">
            <span style={{ backgroundColor: cat.color }} className="h-2 w-2 rounded-full" />
            <span className="whitespace-nowrap text-ellipsis">#{cat.name}</span>
          </li>
        ))}
      </ul>

      <button onClick={handleLogout} className="text-left cursor-pointer">Logout</button>
    </div>
  );
};

export default NavBar;
