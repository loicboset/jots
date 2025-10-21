'use client';

import App from '@/components/App';
import TemplateLink from './parts/TemplateLink';
import { TEMPLATES } from '@/utils/constants';

const Reflection = (): React.ReactElement => (
  <App>
    <div className="flex flex-col overflow-hidden">
      <div className="text-center text-lg font-medium">
        <span>What do you want to get clarity on?</span>
      </div>

      <div className="flex flex-col flex-1 overflow-auto md:grid md:grid-cols-2 gap-10 mt-10 max-w-3xl mx-auto">
        {TEMPLATES.map((template, index) => (
          <TemplateLink key={template.label} index={index} template={template} />
        ))}
      </div>
    </div>
  </App>
);

export default Reflection;
