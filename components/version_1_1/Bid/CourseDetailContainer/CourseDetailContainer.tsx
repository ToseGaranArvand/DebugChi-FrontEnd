"use client";
// base
import { FC } from "react";
// components
import { CourseDetailBody } from "./Components/CourseDetailBody/CourseDetailBody";
import { CourseDetailHeader } from "./Components/CourseDetailHeader/CourseDetailHeader";
// core

const CourseDetailContainer: FC = () => {
  return (
    <div dir="rtl" className="text-white py-[50px] bg-[#0f0f0f]">
      <CourseDetailHeader />
      <CourseDetailBody />
    </div>
  );
};

export { CourseDetailContainer };
