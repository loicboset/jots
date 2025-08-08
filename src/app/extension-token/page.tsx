'use client';

import { useEffect, useState, type JSX } from 'react';

import Link from "next/link";

export default function ExtensionTokenPage(): JSX.Element {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function generateToken(): Promise<void> {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/generate_extension_jwt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        throw new Error(await res.text());
      }
      const data = await res.json();
      setToken(data.token);
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      setError(err.message || 'Failed to generate token');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    generateToken();
  }, []);

  // TODO: handle UX for expired token case

  return (
    <main className="max-w-xl mx-auto p-6">
      <div className='flex p-4 backdrop-blur-xs justify-between items-center sticky top-0 z-10 border-b border-gray-900'>
        <Link href="/">
          <h1 className='text-3xl text-indigo-500'>Jots</h1>
        </Link>
      </div>
      <h1 className="text-2xl font-semibold mb-4">Your VS Code Extension Token</h1>

      {loading && <p>Generating token...</p>}

      {error && <p className="text-red-600">{error}</p>}

      {token && (
        <div className="bg-gray-100 p-4 rounded border font-mono text-sm break-all">
          <p className="mt-4 text-black">
          {token}
          </p>
          <p className="mt-4 text-gray-500">
            Copy and paste this token into the VS Code extension using the “Journal: Set Token” command.
          </p>
        </div>
      )}

    </main>
  );
}
