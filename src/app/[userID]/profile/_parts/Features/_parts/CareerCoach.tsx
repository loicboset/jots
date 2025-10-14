import Select from "react-select";

import InfoTooltip from "@/components/ui/tooltips/InfoTooltip";
import { useUserContext } from "@/context/UserProvider";
import {
  useUpsertUserSettings,
  useUserSettings,
} from "@/services/user_settings";

const CareerCoach = (): React.ReactElement => {
  // CONTEXT
  const { user } = useUserContext(); // Uncomment if you need user context

  // HOOKS
  const { data: settings, isLoading } = useUserSettings();
  const { mutate: editSettings } = useUpsertUserSettings();

  // METHODS
  const handleChangeMode = (value: string | null): void => {
    if (!settings) return;

    editSettings({
      ...settings,
      user_id: user.userID,
      career_coach_mode: value,
    });
  };

  // VARS
  const options = [
    { value: null, label: "Default" },
    { value: "Yoda", label: "Yoda" },
    { value: "Gandalf", label: "Gandalf" },
    { value: "Dumbledore", label: "Dumbledore" },
    { value: "Prof. McGonagall", label: "Prof. McGonagall" },
  ];

  const currentValue =
    options.find((option) => option.value === settings?.career_coach_mode) ||
    options[0];

  return (
    <div className="flex flex-col max-w-2xl">
      <div className="flex items-center">
        <span className="block text-sm/6 font-medium text-white">
          Career Coach
        </span>
        <InfoTooltip
          message={`
            Every Monday, get a personalised recap of your journal entries with some guidance from our AI career coach!
          `}
        />
      </div>

      <div className="flex items-center justify-between mt-2 mb-4">
        <span className="block text-sm text-white">Mode</span>
        <Select
          className="w-48"
          options={options}
          value={currentValue}
          onChange={(option) => handleChangeMode(option?.value || null)}
          isDisabled={isLoading}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: "black",
            }),
            input: (baseStyles) => ({
              ...baseStyles,
              color: "white",
            }),
            singleValue: (baseStyles) => ({
              ...baseStyles,
              color: "white",
            }),
            valueContainer: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: "black",
              color: "white",
            }),
            menu: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: "black",
              border: "1px solid #4B5563",
            }),
            option: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: state.isFocused ? "#99a1af" : "black",
            }),
          }}
        />
      </div>
    </div>
  );
};

export default CareerCoach;
