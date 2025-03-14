import {
  CheckCircleIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/solid';

export type AlertProps = {
  message?: string | React.ReactElement;
  actionText?: string;
  type?: 'warning' | 'danger' | 'info' | 'success' | string;
  onClick?: () => void;
  close?: () => void;
  isRemovable?: boolean;
};

const alertStyles = {
  success: {
    container: 'border-green-400 bg-green-50',
    text: 'text-green-700',
    btn: 'bg-green-50 text-green-500 hover:bg-green-100',
    actionBtn: 'hover:text-green-600',
    icon: 'text-green-400',
    focusRing: 'focus:ring-offset-green-50 focus:ring-green-600',
  },
  warning: {
    container: 'border-yellow-400 bg-yellow-50',
    text: 'text-yellow-700',
    btn: 'bg-yellow-50 text-yellow-500 hover:bg-yellow-100',
    actionBtn: 'hover:text-yellow-600',
    icon: 'text-yellow-400',
    focusRing: 'focus:ring-offset-yellow-50 focus:ring-yellow-600',
  },
  danger: {
    container: 'border-red-400 bg-red-50',
    text: 'text-red-700',
    btn: 'bg-red-50 text-red-500 hover:bg-red-100',
    actionBtn: 'hover:text-red-600',
    icon: 'text-red-400',
    focusRing: 'focus:ring-offset-red-50 focus:ring-red-600',
  },
  info: {
    container: 'border-blue-400 bg-blue-50',
    text: 'text-blue-700',
    btn: 'bg-blue-50 text-blue-500 hover:bg-blue-100',
    actionBtn: 'hover:text-blue-600',
    icon: 'text-blue-400',
    focusRing: 'focus:ring-offset-blue-50 focus:ring-blue-600',
  },
};

const Alert = (props: AlertProps): React.ReactElement | null => {
  // PROPS
  const { type = 'success', message, actionText, onClick, close, isRemovable = true } = props;

  // VARS
  const styles = alertStyles[type as keyof typeof alertStyles] || alertStyles.success;

  return (
    <div className={`p-4 border-l-4 rounded-md ${styles.container}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {type === 'success' && <CheckCircleIcon className={`w-5 h-5 ${styles.icon}`} aria-hidden="true" />}
          {type === 'info' && <InformationCircleIcon className={`w-5 h-5 ${styles.icon}`} aria-hidden="true" />}
          {type === 'danger' && <XCircleIcon className={`w-5 h-5 ${styles.icon}`} aria-hidden="true" />}
          {type === 'warning' && <ExclamationTriangleIcon className={`w-5 h-5 ${styles.icon}`} aria-hidden="true" />}
        </div>
        <div className="ml-3">
          <div style={{ overflowWrap: 'anywhere' }} className={`text-sm ${styles.text}`}>
            {message}{' '}
            {onClick && (
              <button
                onClick={onClick}
                type="button"
                className={`font-medium underline contents ${styles.actionBtn}`}
              >
                {actionText}
              </button>
            )}
          </div>
        </div>
        {isRemovable && (
          <div className="pl-3 ml-auto">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                className={`
                  inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2
                  ${styles.focusRing} ${styles.btn}
                `}
                onClick={close}
              >
                <span className="sr-only">Dismiss</span>
                <XMarkIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;
