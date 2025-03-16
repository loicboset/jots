/* eslint-disable max-len */
import fs from "fs";
import path from "path";

import Link from 'next/link'

const Releases = (): React.ReactElement => {
  const versionsDir = path.join(process.cwd(), "versions");
  const files = fs.readdirSync(versionsDir);

  const releases = files
    .map((file) => {
      const filePath = path.join(versionsDir, file);
      const content = JSON.parse(fs.readFileSync(filePath, "utf8"));
      return { ...content, version: file.replace(".json", "") };
    });

  return (
    <div className="relative isolate">
      {/* Header */}
      <header className='flex p-4 bg-gray-950/80 backdrop-blur-xs justify-between items-center sticky top-0 z-10 border-b border-gray-900'>
        <Link href="/">
          <h1 className='text-5xl text-indigo-500'>DevLog</h1>
        </Link>
        <div className='flex space-x-4 items-center'>
          <Link href="/login" className="text-sm/6 font-semibold text-white lg:block">
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign up
          </Link>
        </div>
      </header>
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 size-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      >
        <defs>
          <pattern
            x="50%"
            y={-1}
            id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-gray-800/20">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)" width="100%" height="100%" strokeWidth={0} />
      </svg>
      <div
        aria-hidden="true"
        className="absolute top-10 left-[calc(50%-4rem)] -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:top-[calc(50%-30rem)] lg:left-48 xl:left-[calc(50%-24rem)]"
      >
        <div
          style={{
            clipPath:
              'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
          }}
          className="aspect-1108/632 w-[69.25rem] bg-linear-to-r from-[#80caff] to-[#4f46e5] opacity-20"
        />
      </div>
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">Our Releases</h2>
            <p className="mt-2 mb-2 text-lg/8 text-gray-300">
              We&apos;re working hard to make this app as useful for you as possible.
              You can check what&apos;s new on this page , and you can even join our Discord to share ideas and participate to the project!
            </p>
            <p className="mt-2 text-lg/8 text-gray-300">
              We are in the process of building exciting new features to help you build knowledge and progress, some leveraging the newest AI technologies. So stay tuned!
            </p>
            <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
              {releases.map((release) => (
                <article key={release.version} className="flex max-w-xl flex-col items-start justify-between">
                  <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={release.datetime} className="text-white">
                      {release.date}
                    </time>
                    <p
                      className="relative rounded-full bg-indigo-500 px-3 py-1.5 font-medium text-white"
                    >
                      {release.version}
                    </p>
                  </div>
                  <div className="relative">
                    <h3 className="mt-3 text-lg/6 font-semibold text-white">
                      <span className="absolute inset-0" />
                      {release.title}
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm/6 text-gray-300">{release.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Releases