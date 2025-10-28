import AppLayout from '@/components/AppLayout';
import TemplateModel from '@/app/[userID]/reflections/[template]/TemplateModel';
import { TEMPLATES } from '@/utils/constants';

import TemplateHeader from './TemplateHeader';

type Props = {
  params: Promise<{ template: string }>;
};

const Template = async ({ params }: Props): Promise<React.ReactElement> => {
  // PROPS
  const template = (await params).template;

  // VARS
  const templateName = TEMPLATES.find((t) => t.id === template)?.label || 'Template';

  return (
    <AppLayout>
      <div className="flex flex-col overflow-hidden">
        <TemplateHeader templateName={templateName} />
        <TemplateModel templateID={template} />
      </div>
    </AppLayout>
  );
};

export default Template;
