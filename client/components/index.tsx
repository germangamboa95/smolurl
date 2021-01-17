import React, { FormEvent, useEffect, useState } from "react";

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  return (
    <input
      className=" w-full px-4 py-2 border border-gray-700 rounded "
      {...props}
    />
  );
};

interface ButtonProps {
  label: string;
}

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps
> = (props) => {
  const { className } = props;

  return (
    <button
      {...props}
      className={` hover:bg-blue-500 hover:text-white px-4 py-2 border border-gray-700 rounded ${className}`}
    >
      {props.label}
    </button>
  );
};

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`mt-6 p-6 w-full md:w-3/6 bg-white rounded text-center shadow-2xl ${className}`}
    >
      {children}
    </div>
  );
};
