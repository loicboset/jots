import { useState } from 'react';

import TemplateButton from './parts/TemplateButton';
import TemplateModel from './parts/TemplateModel';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import IconButton from '@/components/ui/buttons/IconButton';

export type Template = { id: string; label: string; model: string };

const ReflectionTemplate = (): React.ReactElement => {
  // STATE
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  // METHODS
  const handleSetTemplate = (template: Template): void => {
    setSelectedTemplate(template);
  };

  // VARS
  const templates: Template[] = [
    { id: 'process_event', label: 'Process an event 🧩', model: 'bain_5r' },
    {
      id: 'learn_from_mistake_or_success',
      label: 'Learn from mistake/success 🧠',
      model: 'kolb',
    },
    {
      id: 'think_through',
      label: 'Think through project/decision 🧪',
      model: 'kolb',
    },
    { id: 'freestyle', label: 'Freestyle ✍', model: 'simple_prompt' },
    { id: 'understand_myself', label: 'Understand myself ❤️', model: 'boud' },
    { id: 'learn_from_content', label: 'Learn from content 📚', model: 'boud' },
  ];

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="text-center text-lg font-medium">
        {selectedTemplate ? (
          <div className="flex items-center justify-center">
            <IconButton onClick={(): void => setSelectedTemplate(null)}>
              <ArrowLeftIcon className="inline w-5 h-5 mr-2" />
            </IconButton>
            <span>{selectedTemplate.label}</span>
          </div>
        ) : (
          <span>What do you want to get clarity on?</span>
        )}
      </div>

      {selectedTemplate ? (
        <TemplateModel template={selectedTemplate} />
      ) : (
        <div className="flex flex-col flex-1 overflow-auto md:grid md:grid-cols-2 gap-10 mt-10 max-w-3xl mx-auto">
          {templates.map((template, index) => (
            <TemplateButton
              key={template.label}
              index={index}
              template={template}
              handleSetTemplate={handleSetTemplate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReflectionTemplate;
