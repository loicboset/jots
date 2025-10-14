import classNames from "classnames";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const CircularButton = ({
  children,
  onClick,
  size = "md",
  className,
}: Props): React.ReactElement => {
  // VARS
  const sizes = {
    sm: "p-1",
    md: "p-2",
    lg: "p-3",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        "rounded-full bg-indigo-600 text-white shadow-xs cursor-pointer",
        "hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
        sizes[size],
        className,
      )}
    >
      {children}
    </button>
  );
};

export default CircularButton;
