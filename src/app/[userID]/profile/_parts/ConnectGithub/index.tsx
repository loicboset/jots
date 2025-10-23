import Button from "@/components/ui/buttons/Button";
import InfoTooltip from "@/components/ui/tooltips/InfoTooltip";
import { useUserSettings } from "@/services/user_settings";

const ConnectGithub = (): React.ReactElement => {
  const { data: userSettings, isLoading: isUserSettingsLoading } = useUserSettings();

  // VARS
  const isGithubConnected = !isUserSettingsLoading && !!userSettings?.github_token_encrypted;

  const handleConnect = (): void => {
    if (isGithubConnected) return; // do nothing if already connected
    window.location.href = "/api/github";
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <div className='flex items-center'>
          <h2 className="text-base/7 font-semibold text-white">Github Extension</h2>
          <InfoTooltip message='This information will be used as extra context to offer targeted reflections based on your work.' />
        </div>
        <p className="mt-1 text-sm/6 text-gray-400">
          Enrich your content with your PR descriptions and commits.
        </p>
      </div>
      <div className="sm:col-span-4 flex justify-end">
        <Button onClick={handleConnect} disabled={isGithubConnected}>
          {isGithubConnected ? "GitHub Connected ✓" : "Connect GitHub"}
        </Button>
      </div>
    </div>
  )
}

export default ConnectGithub;