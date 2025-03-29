import { useState } from "react";

import { redirect } from "next/navigation";
import { Controller, useForm, useWatch } from "react-hook-form";
import Select from 'react-select';

import Button from "@/components/ui/buttons/Button";
import { useUserContext } from "@/context/UserProvider";
import { useUpsertUserSettings } from "@/services/user_settings";

import steps from "./steps";

type FormValues = {
  role?: string;
  experience?: number;
  goal?: string;
}

const OnboardingStep = (): React.ReactElement => {
  // STATE
  const [step, setStep] = useState(1);

  // CONTEXT
  const { userID } = useUserContext();
  console.log(' userID', userID);

  // RQ
  const { mutate: editUserSettings } = useUpsertUserSettings();

  // RHF
  const { register, control, getValues, handleSubmit } = useForm<FormValues>();
  const [role] = useWatch({ control, name: ['role'] });

  // METHODS
  const handlePrevious = (): void => setStep(step - 1);

  const handleSkipAll = (): void => {
    console.log('redirect to', `/${userID}`)
    redirect(`/${userID}`);
  }

  const handleSave = (): void => {
    const values = getValues()
    editUserSettings({ user_id: userID, ...values })
    setStep(step + 1);

    const isOnboardingOver = step >= steps.size;
    if (isOnboardingOver) redirect(`/${userID}`);
  }

  // VARS
  const stepData = steps.get(step);

  if (!stepData) return <p>Step not found.</p>

  const title = stepData.title;
  const options = stepData.input.options
    ? stepData.input.options.map((option) => ({ value: option, label: option }))
    : [];

  return (
    <form className="w-full flex flex-col" onSubmit={handleSubmit(handleSave)}>
      <p className="text-center text-2xl">{title}</p>

      <div className="my-4">
        {stepData.input.type === "select" ? (
          <div className="flex flex-col space-y-4">
            <Controller
              name={stepData.input.name}
              control={control}
              render={({ field: { onChange, value } }): React.ReactElement => (
                <Select
                  className="text-black"
                  options={options}
                  value={options.find((option) => option.value === value)}
                  onChange={(_symbol): void => onChange(_symbol?.value)}
                />
              )}
            />
            {role === 'Other' && (
              <div>
                <label htmlFor={stepData.input.name} className="block text-sm/6 font-medium text-white">
                  Other
                </label>
                <input
                  {...register(stepData.input.name)}
                  type="text"
                  className={`
                    block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1
                    -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2
                    focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6
                  `}
                />
              </div>
            )}
          </div>
        ) : (
          <input
            {...register(stepData.input.name)}
            type="number"
            className={`
              block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1
              -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2
              focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6
            `}
          />
        )}
      </div>

      <div className={`flex ${step > 1 ? "justify-between" : "justify-end"}`}>
        {step > 1 && <Button onClick={handlePrevious}>Previous</Button>}
        <div className="flex space-x-4">
          <Button type="submit">{step < steps.size ? "Next" : "Complete"}</Button>
          <Button color="white" onClick={handleSkipAll}>Skip all</Button>
        </div>
      </div>
    </form>
  );
};

export default OnboardingStep;
