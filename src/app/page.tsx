/* eslint-disable max-len */
import type { JSX } from 'react';

import {
  ChevronRightIcon
} from '@heroicons/react/20/solid'
import { BeakerIcon, BookOpenIcon, RocketLaunchIcon, LightBulbIcon, ArchiveBoxArrowDownIcon, ArrowPathRoundedSquareIcon, BugAntIcon, TrophyIcon } from '@heroicons/react/24/outline'
import Image from 'next/image';
import Link from 'next/link'

import EmailSignupForm from '@/components/EmailSignUpForm';
import Icon from '@/components/ui/Icon';

const primaryFeatures = [
  {
    name: 'Because You Need a Rubber Duck',
    description:
      'Talk through your thoughts, debug your brain, and solve problems faster with the help of AI.',
    icon: BeakerIcon
  },
  {
    name: 'Because Your PR Needs a Backstory',
    description:
      'Track your thought process so future-you (and your team) knows why that refactor happened.',
    icon: BookOpenIcon,
  },
  {
    name: 'Because You Actually Fixed It But Don’t Remember How',
    description:
      'Log your debugging steps so next time, you have a cheat sheet.',
    icon: BugAntIcon,
  },
  {
    name: 'Because You Want to See Your Growth',
    description:
      'Measure your progress, track achievements, and level up as a developer.',
    icon: RocketLaunchIcon
  },
  {
    name: 'Because You Keep Googling the Same Thing',
    description:
      'Save your learnings in one place, so you stop asking chatGPT about the same error.',
    icon: ArrowPathRoundedSquareIcon
  },
  {
    name: 'Because You’re Juggling Too Many Ideas',
    description:
      'A developer-friendly space to dump ideas, errors, solutions, and insights.',
    icon: LightBulbIcon,
  },
  {
    name: 'Because Your Brain is Full but Your Notebook is Empty',
    description:
      'Organize your thoughts, tag important notes, and keep your side projects on track.',
    icon: ArchiveBoxArrowDownIcon
  },
  {
    name: 'Because You Want That Next Promotion Or Job',
    description:
      'Showcase your achievements to support your promotion case or upcoming job interview.',
    icon: TrophyIcon
  },
];



const footerNavigation = {
  social: [
    {
      name: 'GitHub',
      href: 'https://github.com/loicboset/DevLogApp',
      icon: (): JSX.Element => (
        <svg fill="currentColor" viewBox="0 0 24 24" className='size-6'>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Discord',
      href: 'https://discord.gg/YQP4wwbyfg',
      icon: (): JSX.Element => (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="size-8" viewBox="0 0 24 24">
          <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
        </svg>
      ),
    },
  ],
}

const LandingPage = (): JSX.Element => {
  return (
    <div className="bg-gray-900">
      <main>
        {/* Hero section */}
        <div className="relative isolate overflow-hidden">
          {/* Header */}
          <header className='flex justify-between items-center p-4 relative'>
            <div>
              <Icon src={'logo.svg'} className='text-indigo-600 w-40 h-40 -top-10 -left-4 md:w-60 md:-top-16 md:-left-8 lg:w-72 lg:h-72 lg:-top-18 lg:-left-8 absolute' />
            </div>
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
          <div className="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:px-8 lg:py-40">
            <div className="mx-auto max-w-3/4 shrink-0 lg:mx-0 lg:pt-8">
              <div className='flex justify-between items-center flex-wrap space-y-4'>
                <Link href="/releases" className="inline-flex space-x-6">
                  <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-sm/6 font-semibold text-indigo-400 ring-1 ring-indigo-500/20 ring-inset">
                    What&apos;s new
                  </span>
                  <span className="inline-flex items-center space-x-2 text-sm/6 font-medium text-gray-300">
                    <span className='hidden md:inline'>Just shipped v2025.04.16</span>
                    <ChevronRightIcon aria-hidden="true" className="size-5 text-gray-500" />
                  </span>
                </Link>
                <a href="https://www.producthunt.com/products/jots?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-jots" target="_blank" rel="noreferrer">
                  <Image src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=971956&theme=light&t=1748608214707" alt="Jots - Unlock&#0032;the&#0032;benefits&#0032;of&#0032;journaling&#0032;to&#0032;become&#0032;a&#0032;better&#0032;dev&#0046; | Product Hunt" style={{ width: '250px', height: '54px' }} width="250" height="54" />
                </a>
              </div>
              <h1 className="mt-10 text-5xl font-semibold tracking-tight text-pretty text-white sm:text-7xl">
                Level Up Your Dev Game With Jots 🚀
              </h1>
              <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
                Unlock the benefits of journaling to become a better, faster developer every day.
              </p>
              <p className="mt-8 text-lg font-medium text-pretty text-orange-300 sm:text-xl/8">
                We are releasing the app for early adopters to help shape the future of Jots. Join our beta phase now for exclusive free access to all our features, feedback loops, and community.
              </p>
              <div className="mt-10 flex flex-wrap space-y-2 items-center gap-x-6">
                <Link
                  href="/signup"
                  className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                >
                  Start a new habit now
                </Link>
                <p className="text-sm/6 font-semibold text-white">
                  It’s free, healthy and open source.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature section */}
        <div className="mx-auto mt-2 max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl lg:text-balance">
              Why Do Top Developers Keep a Journal,<span className='text-indigo-400'> and Why You Should Too?</span>
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              {primaryFeatures.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex space-x-4 items-center mb-4">
                    <div className="flex shrink-0 h-10 w-10 items-center justify-center rounded-lg bg-indigo-500">
                      <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
                    </div>
                    <span className='font-semibold text-white text-2xl'>{feature.name}</span>
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base/7 text-gray-300">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Demo section */}
        <div className="mx-auto mt-24 max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl lg:text-center">
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl lg:text-balance">
              See Jots in<span className='text-indigo-400'> action</span>
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                position: 'relative',
                paddingBottom: '56.25%',
                width: '80%',
                maxWidth: '800px',
                height: 0,
                border: '4px solid black',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <iframe
                src="https://www.loom.com/embed/591f4740ecaa4de0a4903bcc30030ac5?sid=f22a9e2d-d155-4f99-af11-0620aff09100"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: '0',
                }}
                allowFullScreen
                title="Jots demo video"
              />
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="relative isolate mt-2 px-6 py-32 sm:py-40 lg:px-8">
          <svg
            aria-hidden="true"
            className="absolute inset-0 -z-10 size-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
          >
            <defs>
              <pattern
                x="50%"
                y={0}
                id="1d4240dd-898f-445f-932d-e2872fd12de3"
                width={200}
                height={200}
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={0} className="overflow-visible fill-gray-800/20">
              <path
                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect fill="url(#1d4240dd-898f-445f-932d-e2872fd12de3)" width="100%" height="100%" strokeWidth={0} />
          </svg>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
              Give Jots a Shot
            </h2>
            <p className="mx-auto mt-6 mb-6 max-w-xl text-lg/8 text-gray-300">
              We promise, it can only do you good.
            </p>
            <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-sm/6 font-semibold text-indigo-400 ring-1 ring-indigo-500/20 ring-inset">
              Discover all our latest AI features with early access.
            </span>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/signup"
                className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              >
                Let&apos;s go!
              </Link>
            </div>
            <div className="mt-20">
              <EmailSignupForm />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="border-t border-white/10 py-12 md:flex md:items-center md:justify-between">
          <div className="flex justify-center gap-x-6 md:order-2">
            <Link href="/privacy" className="text-gray-400 hover:text-gray-300">
              Privacy
            </Link>
            {footerNavigation.social.map((item) => (
              <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">{item.name}</span>
                <item.icon aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-center text-sm/6 text-gray-400 md:order-1 md:mt-0">
            Made for devs by devs with 🫶
          </p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage