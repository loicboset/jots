import { useFeatureFlag } from "configcat-react";

import { useUserSettings } from "@/services/user_settings";

const ConnectGithub = (): React.ReactElement => {
  const { value: isgithubenabled, loading: isgithubenabledLoading } = useFeatureFlag("isgithubenabled", false);
  const { data: userSettings, isLoading } = useUserSettings();


  // VARS
  if (isLoading && !isgithubenabled && !isgithubenabledLoading) return <></>;

  const isGithubConnected = Boolean(userSettings?.github_token_encrypted);

  const handleConnect = (): void => {
    if (isGithubConnected) return; // do nothing if already connected
    window.location.href = "/api/github";
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <h2 className="text-base/7 font-semibold text-white">Github Extension</h2>
        <p className="mt-1 text-sm/6 text-gray-400">
          Enrich your content with your PR descriptions and commits.
        </p>
      </div>
      <div className="sm:col-span-4 flex justify-end">
        <button
          onClick={handleConnect}
          disabled={isGithubConnected}
          style={{
            backgroundColor: isGithubConnected ? '#1F2937' : '#007acc',
            color: '#fff',
            border: 'none',
            padding: '10px 18px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            transition: 'background-color 0.3s ease'
          }}
        >
          {isGithubConnected ? "GitHub Connected ✓" : "Connect GitHub"}
        </button>
      </div>
    </div>
  )
}

export default ConnectGithub;