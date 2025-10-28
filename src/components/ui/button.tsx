// src/components/ui/button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
    >
      {children}
    </button>
  );
};
