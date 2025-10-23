import { memo } from 'react';

import Link from 'next/link';
import classNames from 'classnames';
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
  );
};

export default memo(LocationTabs);
