type ToggleProps = {
  state: boolean;
  toggleSwitch: () => void;
}

const Toggle = ({ state, toggleSwitch }: ToggleProps): React.ReactElement => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <span className="text-sm font-medium">{state ? "On" : "Off"}</span>
      <div
        onClick={toggleSwitch}
        className={`relative inline-flex items-center cursor-pointer w-12 h-6 rounded-full transition-all duration-300 ease-in-out ${
          state ? "bg-blue-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block w-6 h-6 rounded-full bg-white transition-all duration-300 ease-in-out transform ${
            state ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </div>
    </div>
  );
}

export default Toggle
