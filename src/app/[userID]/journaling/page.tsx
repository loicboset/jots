'use client';

import { useUserContext } from '@/context/UserProvider';

import Editor from '@/components/collections/Editor';
import PromptsLibraryModal from '@/components/features/PromptsLibraryModal';
import AppWrapper from '@/components/collections/AppWrapper';
import App from '@/components/App';

const Journaling = (): React.ReactElement => {
  // CONTEXT
  const { user } = useUserContext();

  return (
    <App userID={user.userID}>
      <AppWrapper userID={user.userID}>
        <Editor userID={user.userID} />
        <PromptsLibraryModal />
      </AppWrapper>
    </App>
  );
};

export default Journaling;
