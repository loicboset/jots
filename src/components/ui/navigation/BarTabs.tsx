import { ReactElement } from 'react';

import classNames from 'classnames';
import ScreenSizeRenderer from '../wrappers/ScreenSizeRenderer';

type Tab = {
  name: string;
  icon?: null | ReactElement;
  mobileName?: string;
  label?: string;
  value?: number | React.ReactNode;
};

type Props = {
  tabs: Tab[];
  activeTab: string;
  handleActiveTab: (value: string) => void;
  className?: string;
  isBarTabsParent?: boolean;
  isBarTabsChild?: boolean;
};

const BarTabs = (props: Props): React.ReactElement => {
  // PROPS
  const {
    tabs,
    activeTab,
    handleActiveTab,
    className,
    isBarTabsParent = false,
    isBarTabsChild = false,
  } = props;

  const showSelectOnMobile = tabs.length > 4;

  return (
    <>
      {showSelectOnMobile && (
        <div className={`sm:hidden ${className}`}>
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="tabs"
            name="tabs"
            onChange={(e): void => handleActiveTab(e.target.value)}
            className="block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            defaultValue={activeTab}
          >
            {tabs.map((item) => (
              <option key={item.name}>{item.name}</option>
            ))}
          </select>
        </div>
      )}
      <div className={`${showSelectOnMobile ? 'hidden' : 'block'} sm:block ${className}`}>
        <nav
          className={`
          relative z-0 flex divide-x divide-gray-200
          ${!isBarTabsParent && !isBarTabsChild ? 'rounded-lg' : ''}  shadow`}
          aria-label="Tabs"
        >
          {tabs.map((item, tabIdx) => (
            <button
              key={item.name}
              onClick={(): void => handleActiveTab(item.name)}
              className={classNames(
                item.name === activeTab ? 'text-gray-500' : 'text-gray-100 hover:text-gray-300',
                tabIdx === 0 && !isBarTabsChild ? 'rounded-l-lg' : '',
                tabIdx === tabs.length - 1 && !isBarTabsChild ? 'rounded-r-lg' : '',
                isBarTabsChild ? 'py-2' : 'py-4',
                // eslint-disable-next-line max-len
                'group relative min-w-0 flex-1 overflow-hidden bg-gray-900 px-4 text-sm font-medium text-center hover:bg-gray-700 focus:z-10',
              )}
              aria-current={item.name === activeTab ? 'page' : undefined}
            >
              <ScreenSizeRenderer minWidth="sm">
                <div
                  className={`
                    flex items-center justify-center text-xs sm:text-sm
                    ${item.name === activeTab && 'text-gray-300'}`}
                >
                  <span className="mr-1">{item.icon ? item.icon : item.value}</span>
                  {item.label ? item.label : item.name}{' '}
                </div>
              </ScreenSizeRenderer>

              <ScreenSizeRenderer maxWidth="sm">
                <div
                  className={`
                      flex items-center justify-center text-xs sm:text-sm
                      ${item.name === activeTab && 'text-gray-300'}`}
                >
                  {item.mobileName ? item.mobileName : item.name}{' '}
                  <span className="ml-1">{item.icon}</span>
                </div>
              </ScreenSizeRenderer>

              <span
                aria-hidden="true"
                className={classNames(
                  item.name === activeTab ? 'bg-gray-300' : 'bg-transparent',
                  'absolute inset-x-0 bottom-0 h-0.5',
                )}
              />
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default BarTabs;
