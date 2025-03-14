import React, { memo } from 'react';

import { ArrowPathIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';

import styles from './Spinner.module.css';

type Theme = 'light' | 'dark' | 'gray';
type Size = 'extraSmall' | 'small' | 'large';

type SpinnerProps = {
  theme?: Theme;
  size?: Size;
  className?: string;
  isCentered?: boolean;
};

const Spinner = (props: SpinnerProps): React.ReactElement => {
  // Props
  const { size = 'large', className: additionalClassName, isCentered } = props;

  const className = classNames(styles.spinner, additionalClassName);

  let spinnerSize = '';
  switch (size) {
    case 'small':
      spinnerSize = 'w-5';
      break;
    case 'extraSmall':
      spinnerSize = 'w-3';
      break;
    default:
      spinnerSize = 'w-12';
  }

  const color = 'text-white';

  const centerStyle = isCentered ? { margin: '0 auto', height: 'inherit' } : {};

  return (
    <span style={centerStyle} className={className}>
      <ArrowPathIcon name="loader" className={`${spinnerSize} ${color}`} />
    </span>
  );
};

export default memo(Spinner);
