
import { useRouter } from "next/navigation";

const ExtensionToken = (): React.ReactElement => {
  // ROUTER
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <h2 className="text-base/7 font-semibold text-white">VSCode extension</h2>
        <p className="mt-1 text-sm/6 text-gray-400">
          Generate your API Token for your VSCode extension.
        </p>
      </div>
      <div className="sm:col-span-4 flex justify-end">
        <button
          onClick={() => router.push('/extension-token')}
          style={{
            backgroundColor: '#007acc',
            color: '#fff',
            border: 'none',
            padding: '10px 18px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#005f99')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#007acc')}
        >
          Generate Token
        </button>
      </div>
    </div>
  )
}

export default ExtensionToken;