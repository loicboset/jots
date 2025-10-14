import { useState } from "react";

import TemplateButton from "./parts/TemplateButton";
import TemplateModel from "./parts/TemplateModel";

export type Template = { label: string; model: string };

const ReflectionTemplate = (): React.ReactElement => {
  // STATE
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  );

  // METHODS
  const handleSetTemplate = (template: Template): void => {
    setSelectedTemplate(template);
  };

  // VARS
  const templates: Template[] = [
    { label: "Process an event 🧩", model: "bain_5r" },
    { label: "Learn from mistake/success 🧠", model: "kolb" },
    { label: "Think through project/decision 🧪", model: "kolb" },
    { label: "Freestyle ✍", model: "simple_prompt" },
    { label: "Understand myself ❤️", model: "boud" },
    { label: "Learn from content 📚", model: "boud" },
  ];

  return (
    <div>
      <p className="text-center text-lg font-medium">
        {selectedTemplate ? (
          <span>{selectedTemplate.label}</span>
        ) : (
          <span>What do you want to get clarity on?</span>
        )}
      </p>

      {selectedTemplate ? (
        <TemplateModel template={selectedTemplate} />
      ) : (
        <div className="grid grid-cols-2 gap-10 mt-10 max-w-3xl mx-auto">
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
