"use client"

import { memo } from 'react';

import classNames from 'classnames';
import { ReactSVG } from 'react-svg'

import styles from './icon.module.css';

type Props = {
  /** The SVG contents to display in the icon */
  src: string;
  className?: string;
};

const ClientSideIcon = ({ src, className = 'w-6 h-6' }: Props): React.ReactElement => {
  return <ReactSVG className={classNames(styles.icon, className)} src={src} />;
};

export default memo(ClientSideIcon);
