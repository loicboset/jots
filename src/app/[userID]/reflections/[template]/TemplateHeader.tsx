'use client';

import { useUserContext } from '@/context/UserProvider';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type Props = {
  templateName: string;
};

const TemplateHeader = ({ templateName }: Props): React.ReactElement => {
  // CONTEXT
  const { user } = useUserContext();

  return (
    <div className="text-center text-lg font-medium">
      <div className="flex items-center justify-center text-lg font-medium mb-4">
        <Link href={`/${user.userID}/reflections`}>
          <ArrowLeftIcon className="inline w-5 h-5 mr-2" />
        </Link>
        <span className="flex-1 text-center">{templateName}</span>
      </div>
    </div>
  );
};

export default TemplateHeader;
