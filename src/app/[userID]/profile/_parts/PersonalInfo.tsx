/* eslint-disable max-len */
'use client';

import { useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';

import Button from '@/components/ui/buttons/Button';
import CreatableSelect from '@/components/ui/selects/CreatableSelects';
import { useUserContext } from '@/context/UserProvider';
import { useUpsertUserSettings, useUserSettings } from '@/services/user_settings';
import { UpsertUserSettings } from '@/types/payload/user_settings';
import { GOALSOPTIONS, ROLESOPTIONS } from '@/utils/constants';

type FormValues = Omit<UpsertUserSettings, 'user_id'>;

const PersonalInfo = (): React.ReactElement => {
  // CONTEXT
  const { user } = useUserContext();

  // RQ
  const { data: settings } = useUserSettings();
  const { mutate: editUserSettings } = useUpsertUserSettings();

  // RHF
  const { register, control, handleSubmit, setValue } = useForm<FormValues>();

  // EFFECTS
  useEffect(() => {
    // set default values
    setValue('role', settings?.role);
    setValue('experience', settings?.experience);
    setValue('goal', settings?.goal);
  }, [setValue, settings?.experience, settings?.goal, settings?.role]);

  // METHODS
  const handleSave = (formValues: FormValues): void => {
    editUserSettings({ user_id: user.userID, ...formValues });
  };

  // VARS
  const rolesOptions = ROLESOPTIONS.map((o) => ({ label: o, value: o }));
  const goalOptions = GOALSOPTIONS.map((o) => ({ label: o, value: o }));

  return (
    <form
      className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 md:pb-6 md:grid-cols-3"
      onSubmit={handleSubmit(handleSave)}
    >
      <div>
        <h2 className="text-base/7 font-semibold text-white">Profile</h2>
        <p className="mt-1 text-sm/6 text-gray-400">
          This is your personal information. We use this to tailor the AI responses to your needs.
        </p>
      </div>

      <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
        <div className="sm:col-span-4">
          <label htmlFor="role" className="block text-sm/6 mb-2 font-medium text-white">
            Role
          </label>
          <Controller
            name={'role'}
            control={control}
            render={({ field: { onChange, value } }): React.ReactElement => (
              <CreatableSelect
                isClearable
                options={rolesOptions}
                value={value ? { label: value, value } : undefined}
                onChange={(option): void => onChange(option?.value)}
                placeholder="Select or type a new one..."
              />
            )}
          />
        </div>

        <div className="sm:col-span-4">
          <label htmlFor="experience" className="block text-sm/6 font-medium text-white">
            Experience (in years)
          </label>
          <div className="mt-2">
            <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
              <input
                {...register('experience')}
                type="number"
                className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
              />
            </div>
          </div>
        </div>

        <div className="sm:col-span-4">
          <label htmlFor="goal" className="block text-sm/6 mb-2 font-medium text-white">
            Goal
          </label>
          <Controller
            name={'goal'}
            control={control}
            render={({ field: { onChange, value } }): React.ReactElement => (
              <CreatableSelect
                isClearable
                options={goalOptions}
                value={value ? { label: value, value } : undefined}
                onChange={(option): void => onChange(option?.value)}
                placeholder="Select or type a new one..."
              />
            )}
          />
        </div>
      </div>
      <div className="sm:col-span-4 flex justify-end">
        <Button type="submit">Edit</Button>
      </div>
    </form>
  );
};

export default PersonalInfo;
