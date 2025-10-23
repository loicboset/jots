'use client';

import { useUserContext } from '@/context/UserProvider';

import Editor from '@/components/collections/Editor';
import PromptsLibraryModal from '@/components/features/PromptsLibraryModal';
import EditorWrapper from '@/components/collections/EditorWrapper';
import AppLayout from '@/components/AppLayout';

const Journaling = (): React.ReactElement => {
  // CONTEXT
  const { user } = useUserContext();

  return (
    <AppLayout>
      <EditorWrapper userID={user.userID}>
        <Editor userID={user.userID} />
        <PromptsLibraryModal />
      </EditorWrapper>
    </AppLayout>
  );
};

export default Journaling;
