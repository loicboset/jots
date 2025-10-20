'use client';

import App from '@/components/App';
import ReflectionTemplate from '@/components/collections/ReflectionTemplates';
import { useUserReflections } from '@/services/user_reflections';

const Reflection = (): React.ReactElement => {
  // RQ
  const { data: userReflections = [] } = useUserReflections();

  return (
    <App>
      {userReflections.map((reflection) => (
        <div key={reflection.id}>{reflection.status}</div>
      ))}
      <ReflectionTemplate />
    </App>
  );
};

export default Reflection;
