import type { FunctionalComponent } from "preact";

type ButtonProps = {
  type: "submit" | "reset" | "button";
  onClick?: (e: MouseEvent) => void;
  disabled?: boolean;
  label?: string;
  classes?: string;
  children?: any;
  style?: "primary" | "secondary" | "tertiary" | "transparent";
};

const Button: FunctionalComponent<ButtonProps> = ({
  type,
  onClick,
  label,
  classes = "",
  children,
  style,
  disabled,
}) => {
  const classNames = `${classes} ${style}`;
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={classNames}>
      {children || label}
    </button>
  );
};

export default Button;
