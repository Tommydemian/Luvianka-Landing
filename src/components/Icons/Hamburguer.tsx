import React from "react";
import { IconElementProps } from "@/../types";

export const HamburguerIcon: React.FC<IconElementProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="16"
      fill="none"
      viewBox="0 0 22 16"
      className={className}
    >
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M1 1h20M1 8h20M1 15h20"
      ></path>
    </svg>
  );
};
