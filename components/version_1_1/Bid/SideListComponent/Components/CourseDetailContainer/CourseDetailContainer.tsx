"use client";
// base
import { FC, useEffect } from "react";
// components
import { CourseDetailBody } from "./CourseDetailBody/CourseDetailBody";
import { useBidFilter } from "@/context/BidFilterContext";
// core
import { cookies } from "next/headers";
import { perform_get } from "@/lib/api";

const CourseDetailContainer: FC<{ id: number; header: React.ReactNode }> = ({
  id,
  header,
}) => {


  return (
    <div className="text-white bg-[#0f0f0f] h-full flex flex-col">
      {header}
      <div className="flex-1 overflow-y-auto">
        <CourseDetailBody id={id}/>
      </div>
    </div>
  );
};

export { CourseDetailContainer };
