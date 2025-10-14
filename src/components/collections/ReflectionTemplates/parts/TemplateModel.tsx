import { Template } from "..";

type Props = {
  template: Template;
};

const TemplateModel = ({ template }: Props): React.ReactElement => (
  <div>
    <p>You selected the {template.label} template.</p>
  </div>
);

export default TemplateModel;
