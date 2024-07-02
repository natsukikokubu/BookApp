import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "sm" | "md" | "lg";
};

export const Button = ({
  children,
  onClick,
  size = "md",
  disabled,
  ...rest
}: Props) => {
  const color = "bg-blue-600 hover: bg-blue-700 active:bg-blue-500";
  const disabledColor = "bg-gray-400";
  const colorClassName = disabled ? disabledColor : color;

  return (
    <button
      className={`${colorClassName} border-none text-white font-bold py-2 px-6 rounded-full transition-colors duration-100 ease-in-out shadow-md`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};
