import { useCallback, useState } from 'react';

import Alert, { AlertProps } from '@/components/ui/notifications/Alert';

type UseAlertReturn = [
  alert: React.ReactElement | null | undefined,
  setAlert: (newAlertProps: AlertProps) => void,
  clearAlert: () => void,
];

/**
 * Use this hook to use an alert in your component
 * Possible use case: Form -> Reacting to API errors,
 * showing success, warning, info, error messages
 */

const useAlert = (initialAlertProps?: AlertProps): UseAlertReturn => {
  const [alertProps, setAlertProps] = useState<AlertProps | null>(initialAlertProps ?? null);

  const setAlert = useCallback((newAlertProps: AlertProps) => {
    setAlertProps(newAlertProps);
  }, []);

  const clearAlert = useCallback((): void => {
    setAlertProps(null);
  }, []);

  const alert = alertProps && <Alert {...alertProps} close={clearAlert} />;

  return [alert, setAlert, clearAlert];
};

export default useAlert;
