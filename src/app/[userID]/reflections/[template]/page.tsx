import App from '@/components/App';
import TemplateModel from '@/components/collections/ReflectionTemplates/parts/TemplateModel';
import { TEMPLATES } from '@/utils/constants';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type Props = {
  params: Promise<{ template: string }>;
};

const Template = async ({ params }: Props): Promise<React.ReactElement> => {
  // PROPS
  const template = (await params).template;

  // VARS
  const templateName = TEMPLATES.find((t) => t.id === template)?.label || 'Template';

  return (
    <App>
      <div>
        <div className="text-center text-lg font-medium">
          <div className="flex items-center justify-center">
            <Link href={'/reflections'}>
              <ArrowLeftIcon className="inline w-5 h-5 mr-2" />
            </Link>
            <span>{templateName}</span>
          </div>
        </div>
        <TemplateModel templateID={template} />
      </div>
    </App>
  );
};

export default Template;
