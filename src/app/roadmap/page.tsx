/* eslint-disable max-len */
import { RocketLaunchIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import Link from "next/link";

import Header from "@/components/collections/layouts/Header";
import getProjectIssues from "@/utils/getProjectIssues";

const Releases = async (): Promise<React.ReactElement> => {
  const issues = await getProjectIssues();

  return (
    <div className="relative isolate">
      <Header />
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">Our Roadmap</h2>
            <p className="mt-2 mb-2 text-lg/8 text-gray-300">
              We’re dedicated to making this app your ultimate journaling tool for growth and learning. Here, you can see what new features are coming and how we’re improving the experience just for all of us.
            </p>
            <p className="mt-2 text-lg/8 text-gray-300">
              If you have ideas or suggestions, we’d love to hear from you! Join our
              {' '}<Link href={'https://discord.gg/YQP4wwbyfg'} target="_blank" className="text-indigo-500">Discord</Link>{' '}
              community to share your thoughts and help shape the future of Jots.
            </p>
            <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
              <div className="flow-root">
                <ul role="list" className="-mb-8">
                  {issues.map((issue, index) => (
                    <li key={issue.content.number} className="list-none">
                      <div className="relative pb-8">
                        {index !== issues.length - 1 ? (
                          <span aria-hidden="true" className="absolute top-4 left-5.5 -ml-px h-full w-0.5 bg-gray-200" />
                        ) : null}
                        <div className="relative flex space-x-3 items-center">
                          <div>
                            <span
                              className={classNames(
                                'flex size-12 items-center justify-center rounded-full bg-white',
                              )}
                            >
                              <RocketLaunchIcon aria-hidden="true" className="size-8 text-indigo-500" />
                            </span>
                          </div>
                          <div className="flex min-w-0 flex-1 justify-between space-x-4">
                            <div>
                              <Link href={issue.content.url} className="font-medium text-white hover:text-gray-300" target="_blank">
                                <p className="text-md">
                                  {issue.content.title}{' '}
                                </p>
                              </Link>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-300">
                              <span>{issue.content.state}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Releases