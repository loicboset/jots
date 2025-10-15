import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';

import CircularButton from '@/components/ui/buttons/CircularButton';
import useModalContent from '@/utils/hooks/useModalContent';

import Chatbot from './Chatbot';

const ChatbotWrapper = (): React.ReactElement => {
  // HOOKS
  const [isOpen, toggle] = useModalContent();

  return (
    <>
      <CircularButton className="fixed bottom-4 right-4" size="lg" onClick={toggle}>
        <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
      </CircularButton>

      {isOpen && <Chatbot />}
    </>
  );
};

export default ChatbotWrapper;
