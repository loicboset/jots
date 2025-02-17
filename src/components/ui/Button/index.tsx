import { ButtonHTMLAttributes, ReactNode } from "react";

type Props = {
  children: ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, size = "md", ...props }: Props) => {
  const baseStyles = `
    font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2
    focus-visible:outline-offset-2 focus-visible:outline-indigo-500
  `;

  const sizeClasses = {
    xs: "rounded-sm bg-indigo-500 px-2 py-1 text-xs",
    sm: "rounded-sm bg-indigo-500 px-2 py-1 text-sm",
    md: "rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm",
    lg: "rounded-md bg-indigo-500 px-3 py-2 text-sm",
    xl: "rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm",
  };

  return (
    <button type="button" className={`${sizeClasses[size]} ${baseStyles}`} {...props}>
      {children}
    </button>
  );
}

export default Button;