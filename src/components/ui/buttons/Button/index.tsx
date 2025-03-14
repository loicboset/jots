import { ButtonHTMLAttributes, ReactNode } from "react";

import classNames from "classnames";

import styles from './Button.module.css';
import Spinner from "../loaders/Spinner";


type Props = {
  children: ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: Props): React.ReactElement => {
  // PROPS
  const { children, size = "md", className, isLoading, isDisabled, ...rest } = props;

  // VARS
  const baseStyles = `
    relative font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2
    focus-visible:outline-offset-2 focus-visible:outline-indigo-500
  `;

  const sizeClasses = {
    xs: "rounded-sm bg-indigo-500 px-2 py-1 text-xs",
    sm: "rounded-sm bg-indigo-500 px-2 py-1 text-sm",
    md: "rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm",
    lg: "rounded-md bg-indigo-500 px-3 py-2 text-sm",
    xl: "rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm",
  };

  const buttonStyle = classNames(
    baseStyles,
    sizeClasses[size],
    isDisabled && styles['button--disabled'],
    isLoading && styles['button--loading'],
    className,
  );

  const loadingMarkup = (
    <Spinner size="small" className={styles.button__spinner} />
  );

  return (
    <button
      type="button"
      className={buttonStyle}
      {...rest}
      disabled={isDisabled || isLoading}
    >
      {children}
      {isLoading && loadingMarkup}
    </button>
  );
}

export default Button;