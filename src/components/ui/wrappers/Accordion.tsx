'use client';

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

type Props = {
  label: string | React.ReactElement;
  children: React.ReactElement;
};

const Accordion = ({ label, children }: Props): React.ReactElement => (
  <Disclosure as="div" className="py-6 first:pt-0 last:pb-0">
    {({ open }) => (
      <>
        <DisclosureButton
          className={`flex items-center border ${open ? 'rounded-t-md' : 'rounded-md'
            } p-4 justify-between w-full group`}
        >
          <div>{label}</div>
          <ChevronDownIcon
            className={`w-5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </DisclosureButton>
        <DisclosurePanel as="dd" className="pr-12 border-l border-r border-b p-4 rounded-b-md">
          {children}
        </DisclosurePanel>
      </>
    )}
  </Disclosure>
);

export default Accordion;
