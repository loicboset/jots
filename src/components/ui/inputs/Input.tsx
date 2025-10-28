import { HTMLProps } from 'react';

/* eslint-disable max-len */
type Props = HTMLProps<HTMLInputElement> & {
  wrapperClassname?: string;
  label: string;
};

const Input = ({ wrapperClassname, label, ...rest }: Props): React.ReactElement => (
  <div className={wrapperClassname}>
    <label className="block text-sm/6 font-medium text-white">{label}</label>
    <div className="mt-2">
      <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
        <input
          {...rest}
          className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
        />
      </div>
    </div>
  </div>
);

export default Input;
