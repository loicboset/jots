import { useEffect, useState } from "react";

const VersionNumber = (): React.ReactElement => {
  const [lastVersion, setLastVersion] = useState<string | null>(null);

  // EFFECTS
  useEffect(() => {
    fetch('/api/last_version')
      .then((res) => res.json())
      .then((version) => {
        setLastVersion(version);
      });
  }, [])

  return (
    <p
      className="relative rounded-full bg-indigo-500 px-3 py-1.5 text-xs font-medium text-white"
    >
      {lastVersion}
    </p>
  );
};

export default VersionNumber;
