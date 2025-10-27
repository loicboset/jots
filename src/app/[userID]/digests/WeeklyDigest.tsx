'use client';

/* eslint-disable max-len */
import { useRef, useState } from 'react';

import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import dayjs from 'dayjs';

import { useDigestMarkAsRead } from '@/services/digests';
import { Digest } from '@/types/api/digests';

type Props = {
  digest: Digest;
};

const WeeklyDigest = ({ digest }: Props): React.ReactElement => {
  // STATE
  const [showMore, setShowMore] = useState(false);
  const [height, setHeight] = useState('200px');

  // REFS
  const contentRef = useRef<HTMLDivElement>(null);

  // RQ
  const { mutate: markAsRead } = useDigestMarkAsRead();

  // METHODS
  const toggleShowMore = (): void => {
    if (contentRef.current) {
      setHeight(showMore ? '200px' : `${contentRef.current.offsetHeight}px`);
    }

    if (digest.is_read === false) markAsRead(digest.id);

    setShowMore(!showMore);
  };

  // VARS
  const showIsNew = digest.is_read === false;
  const date = dayjs(digest.date).format('MMMM D, YYYY');

  return (
    <div
      onClick={showMore ? undefined : toggleShowMore}
      className={classNames(
        'rounded-lg bg-gray-800 border-2 border-gray-500 relative',
        showMore === false && 'cursor-pointer',
      )}
    >
      {showIsNew && (
        <div className="absolute -top-2 -right-3 border border-indigo-600 bg-indigo-500 text-white text-sm shadow-xs shadow-gray-700 font-medium px-2 py-1 rounded-xl">
          New
        </div>
      )}
      <div
        onClick={toggleShowMore}
        className="px-4 py-6 border-b-2 border-gray-500 flex space-x-2 items-center group cursor-pointer select-none"
      >
        {showMore ? <ChevronDownIcon className="h-5" /> : <ChevronRightIcon className="h-5" />}
        <h2 className="text-lg font-medium leading-6 text-gray-50 group-hover:font-bold">
          Weekly Digest of {date}
        </h2>
      </div>

      <div style={{ height }} className="transition-all duration-300 ease-in-out overflow-hidden">
        <div
          ref={contentRef}
          className="px-4 py-6 text-gray-100 whitespace-pre-line overflow-scroll"
        >
          {digest.content}
        </div>
      </div>
      {!showMore && (
        <div className="absolute bottom-0 bg-linear-to-b from-gray-800/0 to-gray-800 w-full h-20" />
      )}
    </div>
  );
};

export default WeeklyDigest;
