'use client';

import Spinner from '@/components/ui/loaders/Spinner';
import { useUserReflection } from '@/services/user_reflections';

type Props = {
  reflectionID: number;
};

const Reflection = ({ reflectionID }: Props): React.ReactElement => {
  // RQ
  const { data: userReflection, isLoading } = useUserReflection(reflectionID);

  if (isLoading) {
    return <Spinner />;
  }

  if (!userReflection) {
    return <div>Oops! Looks like this one does not exist!</div>;
  }

  return (
    <div>
      {userReflection.user_reflection_answers.map((answer) => (
        <div key={answer.id} className="mb-4">
          <p className="text-md mb-2 font-semibold">{answer.question}</p>
          <textarea
            disabled
            defaultValue={answer.answer}
            rows={3}
            className="bg-gray-700 p-2 border border-gray-100 rounded-md text-white w-full"
          />
        </div>
      ))}
    </div>
  );
};

export default Reflection;
