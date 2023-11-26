import type { FunctionalComponent } from "preact";

type ButtonProps = {
  type: "submit" | "reset" | "button";
  onClick?: (e: MouseEvent) => void;
  disabled?: boolean;
  label?: any;
  classes?: string;
  children?: any;
  style?: "primary" | "secondary" | "tertiary";
  noedge?: boolean;
  fullwidth?: boolean;
};

const Button: FunctionalComponent<ButtonProps> = ({
  type,
  onClick,
  label,
  classes = "",
  children,
  style,
  noedge,
  fullwidth,
  disabled,
}) => {
  const classNames = `${classes} ${style}`;
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classNames}
      // $primary={buttonStyle === "primary"}
      // $secondary={buttonStyle === "secondary"}
      // $tertiary={buttonStyle === "tertiary"}
      // $noedge={noedge}
      // $fullwidth={fullwidth}
      // $disabled={disabled}
    >
      {children || label}
    </button>
  );
};

export default Button;
