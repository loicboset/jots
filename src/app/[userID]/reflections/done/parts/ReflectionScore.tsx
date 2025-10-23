type Props = {
  score?: number;
};

const ReflectionScore = ({ score }: Props): React.ReactElement => {
  if (!score) {
    return (
      <div
        className="
        w-10 h-10 flex items-center justify-center rounded-full
        border border-gray-300 text-gray-400 font-semibold text-sm
      "
      >
        ...
      </div>
    );
  }

  // Clamp score between 1 and 5
  const clamped = Math.min(5, Math.max(1, score));

  // Map 1 → 0 (red hue), 5 → 120 (green hue)
  const hue = ((clamped - 1) / 4) * 120;
  const borderColor = `hsl(${hue}, 90%, 45%)`;

  return (
    <div
      style={{ borderColor: borderColor }}
      className={`
        w-10 h-10 flex items-center justify-center rounded-full
        border-2 text-white font-semibold text-sm
      `}
    >
      <span>{score || '...'}</span>
    </div>
  );
};

export default ReflectionScore;
