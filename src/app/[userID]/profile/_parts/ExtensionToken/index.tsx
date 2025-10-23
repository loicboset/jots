
import { useRouter } from "next/navigation";

import Button from '@/components/ui/buttons/Button';

const ExtensionToken = (): React.ReactElement => {
  // ROUTER
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <h2 className="text-base/7 font-semibold text-white flex items-center gap-2">
          VSCode extension
          <a
            href="https://marketplace.visualstudio.com/items?itemName=Jots.daily-jots"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline text-sm font-normal"
          >
            Install here
          </a>
        </h2>
        <p className="mt-1 text-sm/6 text-gray-400">
          Generate your API Token for your VSCode extension.
        </p>
      </div>
      <div className="sm:col-span-4 flex justify-end">
        <Button onClick={() => router.push('/extension-token')}>Generate Token</Button>
      </div>
    </div>
  )
}

export default ExtensionToken;