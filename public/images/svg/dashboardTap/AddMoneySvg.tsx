import React from "react";

const AddMoneySvg = () => {
  return (
    <div className="relative">
      <svg
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="1.21582"
          y="1.22461"
          width="18.4604"
          height="18.4604"
          rx="3.25"
          stroke="#E1E1E1"
          stroke-width="1.5"
        />
      </svg>
      <div className="absolute top-0 left-0 pl-1.5 pt-1.5">
        <svg
          width="8"
          height="7"
          viewBox="0 0 8 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.50488 3.45501H6.49498M3.99993 0.959961V5.95006"
            stroke="#85BA00"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export { AddMoneySvg };
