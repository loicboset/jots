import { ButtonHTMLAttributes, ReactNode } from 'react';

import classNames from 'classnames';
import Link from 'next/link';

import styles from './Button.module.css';
import Spinner from '../../loaders/Spinner';

type Props = {
  children: ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  color?: 'white' | 'indigo';
  href?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: Props): React.ReactElement => {
  // PROPS
  const {
    children,
    size = 'md',
    className,
    isLoading,
    isDisabled,
    color = 'indigo',
    href,
    ...rest
  } = props;

  // VARS
  const baseStyles = `
    relative font-semibold shadow-xs focus-visible:outline-2
    cursor-pointer focus-visible:outline-offset-2 text-center
  `;

  const sizes = {
    xs: 'rounded-sm px-2 py-1 text-xs',
    sm: 'rounded-sm px-2 py-1 text-sm',
    md: 'rounded-md px-2.5 py-1.5 text-sm',
    lg: 'rounded-md px-3 py-2 text-sm',
    xl: 'rounded-md px-3.5 py-2.5 text-sm',
  };

  const colors = {
    white: 'text-black bg-white hover:bg-gray-400 focus-visible:outline-gray-500',
    indigo: 'text-white bg-indigo-500 hover:bg-indigo-400 focus-visible:outline-indigo-500',
  };

  const buttonStyle = classNames(
    baseStyles,
    sizes[size],
    isDisabled && styles['button--disabled'],
    isLoading && styles['button--loading'],
    colors[color],
    className,
  );

  const loadingMarkup = <Spinner size="small" className={styles.button__spinner} />;

  if (href) {
    return (
      <Link href={href} className={buttonStyle}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={buttonStyle} {...rest} disabled={isDisabled || isLoading}>
      {children}
      {isLoading && loadingMarkup}
    </button>
  );
};

export default Button;
