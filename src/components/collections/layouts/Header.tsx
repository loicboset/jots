/* eslint-disable max-len */

import Link from 'next/link'

import Icon from '@/components/ui/Icon';

// This header is user on static pages like /releases and /privacy

const Header = (): React.ReactElement => {
  return (
    <>
      <header className='flex justify-between items-center p-4 relative'>
        <Link href="/">
          <Icon src={'logo.svg'} className='text-indigo-600 w-40 h-40 -top-10 -left-4 md:w-60 md:-top-16 md:-left-8 lg:w-72 lg:h-72 lg:-top-18 lg:-left-8 absolute' />
        </Link>
        <div className='flex justify-end space-x-4 items-center'>
          <Link href="/roadmap" className="text-sm/6 mr-8 font-semibold text-white lg:block">
            Roadmap
          </Link>
          <Link href="/blog" className="text-sm/6 mr-8 hidden sm:block font-semibold text-white lg:block">
            Blog
          </Link>
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
    </>
  );
};

export default Header;
