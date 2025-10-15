import Spinner from '../../loaders/Spinner';

type Props = {
  onClick?: (e: React.SyntheticEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  srOnlyText?: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
};

const IconButton = (props: Props): React.ReactElement => {
  // PROPS
  const { onClick, children, srOnlyText, className, disabled, loading } = props;

  // VARS
  const styles = `
    focus:outline-none text-gray-400 p-1.5 rounded-md
    focus:ring-inset focus:ring-0 focus:bg-grey-200 inline-flex items-center
    justify-center hover:text-gray-500 cursor-pointer
  `;

  return (
    <button
      type="button"
      className={`focus:ring-2 ${styles} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {loading ? <Spinner size="small" /> : children}
      <span className="sr-only">{srOnlyText}</span>
    </button>
  );
};

export default IconButton;
