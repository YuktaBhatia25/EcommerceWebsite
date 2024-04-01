import React from "react";

export const Button = ({ children, sx }) => {
  return (
    <button className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-800 hover:bg-primary-900">
      { children }
    </button>
  );
};
