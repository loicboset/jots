import { useEffect } from 'react';

import ReactTimezoneSelect, { ITimezoneOption } from 'react-timezone-select';

import { useEditTimezone, useUserSettings } from '@/services/user_settings';
import useToast from '@/utils/hooks/useToast';
import validateTimezone from '@/utils/validateTimezone';

const UserTimezone = (): React.ReactElement => {
  // RQ
  const { data: userSettings } = useUserSettings();
  const { mutate: editTimezone, status, error } = useEditTimezone();

  // HOOKS
  const [toast, setToast, clearToast] = useToast();

  // EFFECTS
  useEffect(() => {
    clearToast();

    if (status === 'success') {
      setToast({ message: 'Timezone updated!' });
    }

    if (status === 'error') {
      setToast({ type: 'error', message: 'Please try again or contact support' });
    }
  }, [status, error, setToast, clearToast]);

  // METHODS
  const handleUpdateTimezone = (tz: ITimezoneOption): void => {
    if (!userSettings) return;
    const validatedTimezone = validateTimezone(tz.value);

    editTimezone({
      timezone: validatedTimezone,
    });
  };

  return (
    <>
      {toast}

      <label htmlFor="first-name" className="text-sm font-semibold leading-6 text-gray-900">
        Timezone
      </label>
      <div className="mt-2">
        <ReactTimezoneSelect
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: 'black',
            }),
            input: (baseStyles) => ({
              ...baseStyles,
              color: 'white',
            }),
            singleValue: (baseStyles) => ({
              ...baseStyles,
              color: 'white',
            }),
            valueContainer: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: 'black',
              color: 'white',
            }),
            menu: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: 'black',
              border: '1px solid #4B5563',
            }),
            option: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: state.isFocused ? '#99a1af' : 'black',
            }),
          }}
          className="react-select-remove-ring text-white"
          value={userSettings?.timezone || 'UTC/UTC'}
          onChange={handleUpdateTimezone}
        />
      </div>
    </>
  );
};

export default UserTimezone;
