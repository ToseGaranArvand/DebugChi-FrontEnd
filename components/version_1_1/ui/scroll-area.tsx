// components/CustomScrollbar.tsx
import React, { ReactNode, useEffect } from "react";

type CustomScrollbarProps = {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const Scrollbar = ({ children, className, style }: CustomScrollbarProps) => {
  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.innerHTML = `
      .custom-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: #888 transparent;
        direction: rtl; /* Flip scrollbar to left (for Firefox) */
      }

      .custom-scrollbar > * {
        direction: ltr; /* Restore content direction */
      }

      .custom-scrollbar::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
      }

      .custom-scrollbar::-webkit-scrollbar-thumb {
        background-color: #888;
        border-radius: 8px;
        transition: background-color 0.3s;
      }

      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background-color: #555;
      }

      .custom-scrollbar::-webkit-scrollbar-button {
        display: none; /* Hide scrollbar arrows */
      }

      .custom-scrollbar {
        /* Flip scrollbar to left (WebKit) */
        direction: rtl;
      }

      .custom-scrollbar > * {
        direction: ltr;
      }
    `;
    document.head.appendChild(styleEl);

    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  return (
    <div
      className={`custom-scrollbar overflow-auto ${className || ""}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default Scrollbar;
