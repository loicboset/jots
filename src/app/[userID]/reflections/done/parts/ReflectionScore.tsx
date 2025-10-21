type Props = {
  score: number;
};

const ReflectionScore = ({ score }: Props): React.ReactElement => {
  // VARS
  const scoreColor: Record<number, string> = {
    1: 'border-red-500',
    2: 'border-orange-500',
    3: 'border-yellow-500',
    4: 'border-lime-500',
    5: 'border-green-500',
  };

  return (
    <div
      className={`
        w-8 h-8 flex items-center justify-center rounded-full
        border-2 text-white font-semibold ${scoreColor[score]}
      `}
    >
      <span>{score}</span>
    </div>
  );
};

export default ReflectionScore;
