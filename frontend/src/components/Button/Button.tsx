import React from "react";
import "./Button.scss";
import { ButtonProps } from "./types";

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "btn--primary btn--medium",
  disabled = false,
  ...props
}) => {
  return (
    <button
      className={`btn ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
