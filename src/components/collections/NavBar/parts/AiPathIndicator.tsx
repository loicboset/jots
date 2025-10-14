import { Cpu } from "lucide-react";

import { useUserSettings } from "@/services/user_settings";

const AiPathIndicator = (): React.ReactElement => {
  // HOOKS
  const { data: settings } = useUserSettings();

  if (settings?.goal === "Learn AI skills") {
    return (
      <div className="flex items-center gap-2 px-3 py-2 mt-4 rounded-lg bg-gray-900 text-white shadow-sm">
        <div className="relative">
          <Cpu className="w-5 h-5 text-purple-400" />
          <span className="absolute inset-0 rounded-full blur-md bg-purple-500 opacity-70 animate-pulse"></span>
        </div>
        <span className="text-sm font-medium">AI learning path active</span>
      </div>
    );
  }
  return <></>;
};

export default AiPathIndicator;
