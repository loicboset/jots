import Link from 'next/link';
import { useUserContext } from '@/context/UserProvider';
import { Template } from '@/utils/constants';

type Props = {
  index: number;
  template: Template;
};

const TemplateLink = ({ index, template }: Props): React.ReactElement => {
  // CONTEXT
  const { user } = useUserContext();

  return (
    <Link
      href={`/${user.userID}/reflections/${template.id}`}
      key={template.label}
      className={`
        border border-gray-300 rounded-xl p-4 hover:bg-gray-700 cursor-pointer
        max-w-max my-auto text-md font-medium
        ${index % 2 === 0 ? 'justify-self-start' : 'justify-self-end'}
      `}
    >
      {template.label}
    </Link>
  );
};

export default TemplateLink;
