import classNames from 'classnames';
import { usePathname } from 'next/navigation';

import Button from '@/components/ui/buttons/Button';
import { useDigestsUnreadCount } from '@/services/digests';

const WeeklyDigestButton = (): React.ReactElement => {
  // RQ
  const { data: count = 0 } = useDigestsUnreadCount();

  // ROUTER
  const path = usePathname();

  // VARS
  const hasUnread = count > 0;

  return (
    <div className="relative w-full flex">
      <Button href={path + `/digests`} color="white" className="w-full">
        Weekly Digests
      </Button>
      {hasUnread && (
        <div
          className={classNames(
            'absolute h-5 w-5 flex shadow-xs shadow-gray-700 items-center justify-center -top-1 -right-1',
            'bg-indigo-500 border border-indigo-600 text-white rounded-full p-2 text-xs',
          )}
        >
          <span className="font-bold">1</span>
        </div>
      )}
    </div>
  );
};

export default WeeklyDigestButton;
