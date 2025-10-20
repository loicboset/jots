'use client';

import { useUserContext } from '@/context/UserProvider';

import Editor from '@/components/collections/Editor';
import PromptsLibraryModal from '@/components/features/PromptsLibraryModal';
import EditorWrapper from '@/components/collections/EditorWrapper';
import App from '@/components/App';

const Journaling = (): React.ReactElement => {
  // CONTEXT
  const { user } = useUserContext();

  return (
    <App>
      <EditorWrapper userID={user.userID}>
        <Editor userID={user.userID} />
        <PromptsLibraryModal />
      </EditorWrapper>
    </App>
  );
};

export default Journaling;
