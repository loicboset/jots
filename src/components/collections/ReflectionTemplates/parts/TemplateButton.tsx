import { Template } from "..";

type Props = {
  index: number;
  template: Template;
  handleSetTemplate: (template: Template) => void;
};

const TemplateButton = ({
  index,
  template,
  handleSetTemplate,
}: Props): React.ReactElement => (
  <div
    key={template.label}
    onClick={(): void => handleSetTemplate(template)}
    className={`
        border border-gray-300 rounded-xl p-4 hover:bg-gray-700 cursor-pointer
        max-w-max my-auto
        ${index % 2 === 0 ? "justify-self-start" : "justify-self-end"}
      `}
  >
    <p className="text-md font-medium">{template.label}</p>
  </div>
);

export default TemplateButton;
