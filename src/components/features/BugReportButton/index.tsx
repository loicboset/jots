import type { JSX } from "react";

import { BugAntIcon } from '@heroicons/react/24/outline';

const BugReportButton = (): JSX.Element => (
  <button
    data-tally-open="31xy5g" data-tally-width="373" data-tally-hide-title="1" data-tally-overlay="1" data-tally-auto-close="1000"
    className="fixed top-5 right-5 flex items-center gap-2 bg-red-400 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-700 transition cursor-pointer"
  >
    <BugAntIcon className="text-white h-5 w-5" />
  </button>
);

export default BugReportButton;