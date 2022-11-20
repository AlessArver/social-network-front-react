import { FC, ReactNode } from "react";
import clsx from "clsx";

import s from "./index.module.sass";

export enum ButtonSize {
  sm = "sm",
  md = "md",
}
export interface IButton {
  children: ReactNode;
  fullWidth?: boolean;
  size?: ButtonSize;
  onClick?: () => void;
  htmlType?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}
export const Button: FC<IButton> = ({
  children,
  fullWidth,
  size = ButtonSize.md,
  onClick,
  htmlType = "button",
  disabled,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(s.button, s[`button_${size}`], fullWidth, className)}
      type={htmlType}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
