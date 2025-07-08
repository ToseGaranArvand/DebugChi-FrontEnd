// components/DottedBox.js
"use client"
// components/DottedBox.js
import { useState } from "react";

const DottedBox = () => {
  const [hovered, setHovered] = useState({ x: -1, y: -1 });

  const gridSize = 40; // فاصله بین نقاط
  const dotRadius = 8; // شعاع نقاط معمولی
  const hoverRadius = 20; // شعاع نقاط هنگام هاور
  const boxHeight = 500;

  // ایجاد آرایه‌ای از نقاط برای ترسیم
  const dots = [];
  for (let y = 0; y < boxHeight; y += gridSize) {
    for (let x = 0; x < window.innerWidth; x += gridSize) {
      dots.push({ x, y });
    }
  }

  // بررسی نزدیکی نقاط به مکان ماوس
  const isNearMouse = (dot:any) => {
    const distance = Math.sqrt(
      Math.pow(dot.x - hovered.x, 2) + Math.pow(dot.y - hovered.y, 2)
    );
    return distance <= 40; // محدوده نقاط برای تغییر
  };

  // تعیین موقعیت دایره‌ها نسبت به ماوس
  const adjustDotPosition = (dot:any) => {
    if (isNearMouse(dot)) {
      return {
        cx: hovered.x,
        cy: hovered.y,
      };
    }
    return {
      cx: dot.x,
      cy: dot.y,
    };
  };

  return (
    <div
      className="w-full h-[500px] bg-gray-900 relative overflow-hidden"
      onMouseMove={(e) => {
        setHovered({ x: e.clientX, y: e.clientY });
      }}
      onMouseLeave={() => setHovered({ x: -1, y: -1 })}
    >
      <svg className="w-full h-full">
        {dots.map((dot, index) => {
          const { cx, cy } = adjustDotPosition(dot);
          return (
            <circle
              key={index}
              cx={cx}
              cy={cy}
              r={isNearMouse(dot) ? hoverRadius : dotRadius}
              className={`fill-current ${
                isNearMouse(dot) ? "text-indigo-500" : "text-gray-500"
              } transition-all duration-300 ease-out`}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default DottedBox;
