import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "sm" | "md" | "lg";
};

export const Button = ({ children, onClick, size = "md", ...rest }: Props) => {
  return (
    <button
      className="border-none bg-blue-600 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-700 active:bg-blue-500 transition-colors duration-100 ease-in-out shadow-md"
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};
