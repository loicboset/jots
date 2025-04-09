import { useState } from 'react';

import { InformationCircleIcon } from '@heroicons/react/24/solid';

const InfoTooltip = ({ message }: { message: string }): React.ReactElement => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative flex items-center ml-2 mr-2">
      <InformationCircleIcon
        className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      />

      {showTooltip && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-60 p-2 text-xs text-white bg-gray-800 rounded-md shadow-lg z-10">
          {message}
        </div>
      )}
    </div>
  );
}

export default InfoTooltip;
