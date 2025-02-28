import TrashIcon from "@heroicons/react/24/outline/TrashIcon";

import IconButton from "@/components/ui/buttons/IconButton";
import { useDeleteCategory } from "@/services/categories";

type Props = {
  id: number
};

const DeleteCategoryButton = ({ id }: Props): React.ReactElement => {
  // RQ
  const { mutate: deleteCategory, status } = useDeleteCategory();

  // METHODS
  const handleDelete = async (): Promise<void> => {
    deleteCategory(id);
  };

  return (
    <div className="hidden group-hover:block absolute -right-6">
      <IconButton
        onClick={handleDelete}
        loading={status === 'pending'}
      >
        <TrashIcon className="h-4 text-red-500" />
      </IconButton>
    </div>
  );
};

export default DeleteCategoryButton;
