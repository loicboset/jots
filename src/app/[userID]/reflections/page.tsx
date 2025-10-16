'use client';

import { useUserContext } from '@/context/UserProvider';

import AppWrapper from '@/components/collections/AppWrapper';
import App from '@/components/App';
import ReflectionTemplate from '@/components/collections/ReflectionTemplates';

const Journaling = (): React.ReactElement => {
  // CONTEXT
  const { user } = useUserContext();

  return (
    <App userID={user.userID}>
      <AppWrapper userID={user.userID}>
        <ReflectionTemplate />
      </AppWrapper>
    </App>
  );
};

export default Journaling;
