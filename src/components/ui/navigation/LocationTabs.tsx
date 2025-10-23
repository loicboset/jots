import { memo } from 'react';

import Link from 'next/link';
import classNames from 'classnames';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

type Props = {
  tabs: { name: string; href: string; icon?: React.ElementType }[];
};

const LocationTabs = (props: Props): React.ReactElement => {
  // PROPS
  const { tabs } = props;

  // ROUTER
  const pathname = usePathname();

  return (
    <div>
      <div className="grid grid-cols-1 sm:hidden">
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          defaultValue={tabs.find((tab) => pathname.includes(tab.href))?.name}
          aria-label="Select a tab"
          className="
            col-start-1 row-start-1 w-full appearance-none rounded-md bg-white/5 py-2 pr-8 pl-3
            text-base text-gray-100 outline-1 -outline-offset-1 outline-white/10 *:bg-gray-800
            focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500
          "
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-400"
        />
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-white/10">
          <nav aria-label="Tabs" className="-mb-px flex">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                aria-current={pathname.includes(tab.href) ? 'page' : undefined}
                className={classNames(
                  pathname.includes(tab.href)
                    ? 'border-indigo-400 text-indigo-400'
                    : 'border-transparent text-gray-400 hover:border-white/20 hover:text-gray-300',
                  'group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium w-full',
                )}
              >
                {tab.icon && (
                  <tab.icon
                    aria-hidden="true"
                    className={classNames(
                      pathname.includes(tab.href)
                        ? 'text-indigo-400'
                        : 'text-gray-500 group-hover:text-gray-400',
                      'mr-2 -ml-0.5 size-5',
                    )}
                  />
                )}
                <span>{tab.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default memo(LocationTabs);
