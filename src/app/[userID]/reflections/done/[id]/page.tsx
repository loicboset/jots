import AppLayout from '@/components/AppLayout';
import TemplateHeader from './parts/TemplateHeader';
import Reflection from './parts/Reflection';
import ReflectionAssessment from './parts/ReflectionAssessment';

type Props = {
  params: Promise<{ id: number }>;
};

const ReflectionDone = async ({ params }: Props): Promise<React.ReactElement> => {
  // PROPS
  const id = (await params).id;

  return (
    <AppLayout>
      <div className="flex flex-col gap-4 overflow-hidden">
        <TemplateHeader reflectionID={id} />
        <div className="flex-1 overflow-auto">
          <ReflectionAssessment />
          <Reflection reflectionID={id} />
        </div>
      </div>
    </AppLayout>
  );
};

export default ReflectionDone;
