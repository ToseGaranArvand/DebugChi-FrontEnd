import React from "react";

const GetMoneySvg = () => {
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
          strokeWidth="1.5"
        />
      </svg>
      <div className="absolute top-0 left-0 pl-1.5 pt-1.5">
        <svg
          width="9"
          height="9"
          viewBox="0 0 9 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.55413 7.78223L4.55413 1.12876M4.55413 1.12876L1.22739 4.45549M4.55413 1.12876L7.88086 4.45549"
            stroke="#85BA00"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export { GetMoneySvg };
