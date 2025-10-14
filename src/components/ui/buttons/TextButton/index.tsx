import classNames from "classnames";

import styles from "./TextButton.module.css";

type Color = "green" | "red" | "indigo" | "yellow" | "gray";

type ButtonType = "button" | "reset" | "submit";

type Props = {
  children: React.ReactElement | string;
  color?: Color;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  title?: string;
  disabled?: boolean;
  className?: string;
  type?: ButtonType;
};

const TextButton = (props: Props): React.ReactElement => {
  // PROPS
  const {
    children,
    color = "green",
    onClick,
    title,
    className,
    disabled,
    type = "button",
  } = props;

  const classNameBtn = classNames(
    "font-medium",
    className,
    styles.button,
    color && styles[`button--${color}`],
    disabled && styles["button--disabled"],
  );

  return (
    <button
      type={type}
      onClick={onClick}
      title={title}
      className={classNameBtn}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default TextButton;
