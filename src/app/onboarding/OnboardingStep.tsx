import { useState } from "react";

import { redirect } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

import Button from "@/components/ui/buttons/Button";
import { useUpsertUserSettings } from "@/services/user_settings";
import { UpsertUserSettings } from "@/types/payload/user_settings";

import steps from "./steps";

type FormValues = Omit<UpsertUserSettings, 'user_id'>;

type Props = {
  userID: string;
};

const OnboardingStep = ({ userID }: Props): React.ReactElement => {
  // STATE
  const [step, setStep] = useState(1);

  // RQ
  const { mutate: editUserSettings } = useUpsertUserSettings();

  // RHF
  const { register, control, getValues, handleSubmit } = useForm<FormValues>();

  // METHODS
  const handlePrevious = (): void => setStep(step - 1);

  const handleSkipAll = (): void => {
    const values = getValues()
    editUserSettings({ user_id: userID, ...values })
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
                <CreatableSelect
                  isClearable
                  className="text-black"
                  options={options}
                  value={options.find((option) => option.value === value)}
                  onChange={(option): void => onChange(option?.value)}
                  placeholder="Select or type..."
                />
              )}
            />

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
