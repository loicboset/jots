'use client';

import { useUserContext } from '@/context/UserProvider';

import AppWrapper from '@/components/collections/AppWrapper';
import App from '@/components/App';
import ReflectionTemplate from '@/components/collections/ReflectionTemplates';
import { useUserReflections } from '@/services/user_reflections';

const Journaling = (): React.ReactElement => {
  // CONTEXT
  const { user } = useUserContext();

  // RQ
  const { data: userReflections = [] } = useUserReflections();

  return (
    <App userID={user.userID}>
      <AppWrapper userID={user.userID}>
        {userReflections.map((reflection) => (
          <div key={reflection.id}>{reflection.status}</div>
        ))}
        <ReflectionTemplate />
      </AppWrapper>
    </App>
  );
};

export default Journaling;
