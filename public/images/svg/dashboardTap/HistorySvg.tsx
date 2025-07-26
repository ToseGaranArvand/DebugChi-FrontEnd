import React from "react";

const HistorySvg = () => {
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
          width="10"
          height="9"
          viewBox="0 0 10 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.11914 7.62243C1.4143 6.44179 2.00462 3.49019 3.48042 3.49019C4.66106 3.49019 4.66106 5.26115 5.84171 5.26115C7.31751 5.26115 8.49815 2.30955 8.79331 1.12891"
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

export { HistorySvg };
