import classNames from 'classnames';

type Props = {
  value?: number;
  onChange: (score: number) => void;
  disabled?: boolean;
};

const ScoreInput = ({ value, onChange, disabled }: Props): React.ReactElement => {
  // VARS
  const scores = [0, 1, 2, 3, 4, 5];

  return (
    <div className="mt-2 flex items-center gap-x-3">
      {scores.map((score) => (
        <div key={score} className="flex rounded-full outline -outline-offset-1 outline-gray-400">
          <button
            type="button"
            onClick={(): void => onChange(score)}
            disabled={disabled}
            className={classNames(
              'size-8 appearance-none rounded-full forced-color-adjust-none checked:outline-2',
              'checked:outline-offset-2 focus-visible:outline-3 focus-visible:outline-offset-3',
              'border border-gray-300 hover:bg-gray-500',
              'flex items-center justify-center text-sm font-medium text-white',
              'cursor-pointer',
              value === score ? 'bg-gray-500' : 'bg-gray-900',
            )}
          >
            {score}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ScoreInput;
