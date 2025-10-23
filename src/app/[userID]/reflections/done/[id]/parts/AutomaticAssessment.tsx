import { useParams } from 'next/navigation';

const AutomaticAssessment = (): React.ReactElement => {
  // ROUTER
  const params = useParams<{ id: string }>();
  console.log('🚀 ~ params:', params);

  return (
    <div>
      <p>Automatic</p>
    </div>
  );
};

export default AutomaticAssessment;
