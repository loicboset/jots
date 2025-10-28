import { useEffect } from 'react';

import { AxiosResponse, AxiosError } from 'axios';
import { SetToastProps } from './useToast';
import { AlertProps } from '@/components/ui/notifications/Alert';
import handleError from '../handleError';

type Params = {
  status: 'error' | 'idle' | 'pending' | 'success';
  data?: AxiosResponse;
  error: AxiosError | null;
  setterFn: ((arg: SetToastProps) => void) | ((arg: AlertProps) => void);
  clearFn?: () => void;
};

/**
For this hook to work, the format should be the following:
  200 success: return "Success message here", 200
  others: return json_error_response("Describre your error", error)
If you have to return an error message manually, use this format:
  return jsonify({"message": "Your message", "type": "danger"}), 500
Type can be 'warning' | 'danger' | 'success' (and 'info' if you're using a toast)
*/

const useStatusLogging = (params: Params): void => {
  const { status, data, error, setterFn, clearFn } = params;

  // EFFECTS
  useEffect(() => {
    if (clearFn) clearFn();
    if (status === 'success') {
      const message = data?.data || data || 'Success!'; // temporary fix
      setterFn({ message, timeOut: 5000 });
    } else if (status === 'error') {
      const type = (error?.response as AxiosResponse)?.data?.type || 'danger';
      setterFn({ type: type, message: handleError(error) });
    }
  }, [clearFn, data, error, setterFn, status]);
};

export default useStatusLogging;
