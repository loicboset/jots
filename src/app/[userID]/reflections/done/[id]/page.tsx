import App from '@/components/App';
import TemplateHeader from './parts/TemplateHeader';
import Reflection from './parts/Reflection';
import ReflectionSelfAssessment from './parts/ReflectionSelfAssessment';

type Props = {
  params: Promise<{ id: number }>;
};

const ReflectionDone = async ({ params }: Props): Promise<React.ReactElement> => {
  // PROPS
  const id = (await params).id;

  return (
    <App>
      <div className="flex flex-col gap-4 overflow-hidden">
        <TemplateHeader reflectionID={id} />
        <div className="flex-1 overflow-auto">
          <ReflectionSelfAssessment />
          <Reflection reflectionID={id} />
        </div>
      </div>
    </App>
  );
};

export default ReflectionDone;
