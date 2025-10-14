/* eslint-disable max-len */
"use client";

import { Switch } from "@headlessui/react";

type Props = {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
};

const Toggle = ({ enabled, onChange }: Props): React.ReactElement => (
  <Switch
    checked={enabled}
    onChange={onChange}
    className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:outline-hidden data-checked:bg-indigo-600"
  >
    <span
      aria-hidden="true"
      className="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-5"
    />
  </Switch>
);

export default Toggle;
