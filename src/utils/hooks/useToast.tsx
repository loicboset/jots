import { useCallback, useEffect, useState } from 'react';

import Toast, { ToastProps } from '@/components/ui/notifications/Alert/Toast';


export type SetToastProps = {
  type?: ToastProps['type'];
  message: ToastProps['message'];
  timeOut?: number;
};

type UseToastReturn = [
  toast: React.ReactElement | null | undefined,
  setToast: (newToastProps: SetToastProps) => void,
  clearToast: () => void,
];

/**
 * Use this hook to display a toast notification in your component
 * Possible use case: Form -> success or error message from API calls,
 * showing success, warning, info, error messages
 */

const useToast = (): UseToastReturn => {
  const [toastProps, setToastProps] = useState<SetToastProps | null>();
  const [show, setShow] = useState(false);

  const setToast = useCallback((newToastProps: SetToastProps) => {
    setToastProps(newToastProps);
    setShow(true);
  }, []);

  const clearToast = useCallback((): void => {
    setToastProps(null);
  }, []);

  useEffect(() => {
    if (toastProps?.timeOut) {
      const timer = setTimeout(() => {
        setShow(false);
      }, toastProps.timeOut);

      return (): void => clearTimeout(timer);
    }
  }, [toastProps?.timeOut, show]);

  const toast = toastProps && <Toast {...toastProps} close={clearToast} show={show} />;

  return [toast, setToast, clearToast];
};

export default useToast;
