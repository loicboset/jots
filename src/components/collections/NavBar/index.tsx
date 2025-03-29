import { useState } from "react";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import classNames from "classnames";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/buttons/Button";
import { createClient } from "@/lib/supabase/client";
import { useCategories } from "@/services/categories";

import DeleteCategoryButton from "./parts/DeleteCategoryButton";
import VersionNumber from "./parts/VersionNumber";
import { FILTER_CATEGORY_COMMAND, SHOW_ALL_CATEGORIES_COMMAND } from "../Editor/plugins/CollapsiblePlugin";

type Props = {
  userID: string;
};

const NavBar = ({ userID }: Props): React.ReactElement => {
  // STATE
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // ROUTER
  const router = useRouter();

  const [editor] = useLexicalComposerContext();

  // RQ
  const { data: categories = [] } = useCategories(userID);

  // METHODS
  const handleLogout = async (): Promise<void> => {
    const client = createClient();
    await client.auth.signOut();
    router.push('/');
  };

  const onSelectCategory = (categoryName: string): void => {
    if (categoryName === selectedCategory) {
      editor.dispatchCommand(SHOW_ALL_CATEGORIES_COMMAND, null);
      setSelectedCategory(null);
    } else {
      editor.dispatchCommand(FILTER_CATEGORY_COMMAND, categoryName);
      setSelectedCategory(categoryName);
    }
  }



  return (
    <div className={`
      bg-gray-600/30 flex flex-col justify-between border-r border-white/10 text-white p-8 max-w-1/5
    `}>
      <ul className="space-y-4">
        {categories.map((cat) => (
          <li
            key={cat.name}
            className={classNames(
              'flex items-center relative group',
              selectedCategory === cat.name && 'bg-gray-600/40'
            )}
          >
            <div
              onClick={(): void => onSelectCategory(cat.name)}
              className="flex items-center space-x-2 cursor-pointer hover:bg-gray-600/40 p-1 pl-2 rounded-md w-full"
            >
              <span style={{ backgroundColor: cat.color }} className="h-2 w-2 rounded-full" />
              <span className="whitespace-nowrap overflow-hidden text-ellipsis select-none">#{cat.name}</span>
            </div>
            <DeleteCategoryButton id={cat.id} />
          </li>
        ))}
      </ul>

      <div className="flex flex-col space-y-4">
        <Button onClick={(): void => router.push(`/${userID}/profile`)} color="white">Profile</Button>

        <Button onClick={handleLogout} color="white">Logout</Button>

        <VersionNumber />
      </div>
    </div>
  );
};

export default NavBar;
