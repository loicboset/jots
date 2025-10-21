import App from '@/components/App';
import TemplateHeader from './parts/TemplateHeader';

type Props = {
  params: Promise<{ id: number }>;
};

const ReflectionDone = async ({ params }: Props): Promise<React.ReactElement> => {
  // PROPS
  const id = (await params).id;

  return (
    <App>
      <div className="flex flex-col overflow-hidden">
        <TemplateHeader reflectionID={id} />
      </div>
    </App>
  );
};

export default ReflectionDone;
