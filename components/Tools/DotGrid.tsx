"use client";

import { useState, useEffect } from "react";

const DotGrid = () => {
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);

  const grid = [];
  const rows = 20; // تعداد ردیف‌ها
  const cols = 20; // تعداد ستون‌ها

  for (let i = 0; i < rows * cols; i++) {
    grid.push(i);
  }

  const handleMouseOver = (index: number) => {
    setHoveredDot(index);
  };

  const handleMouseOut = () => {
    setHoveredDot(null);
  };

  return (
    <div className="grid-container">
      {grid.map((dot, index) => (
        <div
          key={index}
          className={`dot ${hoveredDot === index ? "hovered" : ""}`}
          onMouseOver={() => handleMouseOver(index)}
          onMouseOut={handleMouseOut}
        ></div>
      ))}
      <style jsx>{`
        .grid-container {
          display: grid;
          grid-template-columns: repeat(${cols}, 1fr);
          gap: 5px;
          background-color: black;
          width: 100%;
          height: 500px;
          justify-content: center;
          align-content: center;
        }
        .dot {
          width: 10px;
          height: 10px;
          background-color: white;
          border-radius: 50%;
          transition: background-color 0.3s ease;
        }
        .dot.hovered {
          background-color: red;
        }
      `}</style>
    </div>
  );
};

export default DotGrid;
