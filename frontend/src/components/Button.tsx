import React from "react";

type Props = {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean; // Added new prop
};

const Button = ({ onClick, children, disabled }: Props) => {
  const disabledClass = disabled
    ? "border-gray-300 text-gray-300"
    : "border-black hover:bg-black hover:text-white cursor-pointer";
  
  return (
    <button
      className={`bg-white border-2 duration-150 transition-all font-bold py-2 px-4 rounded ${disabledClass}`}
      onClick={onClick}
      disabled={disabled} // Added disabled prop
    >
      {children}
    </button>
  );
};

export default Button;
