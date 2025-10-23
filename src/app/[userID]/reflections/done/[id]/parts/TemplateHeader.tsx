'use client';

import { useUserContext } from '@/context/UserProvider';
import { useReflectionModels } from '@/services/reflection_models';
import { useUserReflection } from '@/services/user_reflections';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type Props = {
  reflectionID: number;
};

const TemplateHeader = ({ reflectionID }: Props): React.ReactElement => {
  // CONTEXT
  const { user } = useUserContext();

  // RQ
  const { data: userReflection } = useUserReflection(reflectionID);
  const { data: reflectionModels = [] } = useReflectionModels();

  // VARS
  const reflectionModel = reflectionModels.find(
    (model) => model.id === userReflection?.reflection_model_id,
  );

  return (
    <div className="text-center text-lg font-medium mb-4">
      <div className="flex items-center justify-center text-lg font-medium mb-4">
        <Link href={`/${user.userID}/reflections/done`}>
          <ArrowLeftIcon className="inline w-5 h-5 mr-2" />
        </Link>
        <span className="flex-1 text-center">
          {reflectionModel?.name} - {userReflection?.name}
        </span>
      </div>
    </div>
  );
};

export default TemplateHeader;
