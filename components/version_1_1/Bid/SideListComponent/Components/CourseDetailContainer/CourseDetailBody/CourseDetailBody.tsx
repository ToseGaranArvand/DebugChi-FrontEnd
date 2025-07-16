"use client";
import { FC } from "react";
import { CourseImageSlider } from "./Components/CourseImageSlider/CourseImageSlider";
import { CourseInfo } from "./Components/CourseInfo/CourseInfo";
import { CourseScheduleInfo } from "./Components/CourseScheduleInfo/CourseScheduleInfo";
import { CourseAboutSection } from "./Components/CourseAboutSection/CourseAboutSection";
import { CourseEnrolledUsers } from "./Components/CourseEnrolledUsers/CourseEnrolledUsers";
import { CourseDownloadButton } from "./Components/CourseDownloadButton/CourseDownloadButton";
import { useBidFilter } from "@/context/BidFilterContext";

export const CourseDetailBody: FC<{ id: number }> = ({ id }) => {
  const { data } = useBidFilter();
  const selectedItem = data?.find((item) => item.tender.id === id)?.tender
    .project;

  return (
    <div className="text-white h-fit">
      <CourseImageSlider selectedItem={selectedItem} />

      <div className="px-4">
        <CourseInfo selectedItem={selectedItem} />

        <div
          style={{
            background:
              "linear-gradient(to right, #ffffff00 0%, #ffffff20 50%, #ffffff00 100%)",
          }}
          className="h-[1px] my-4"
        ></div>

        <CourseScheduleInfo selectedItem={selectedItem} />

        <div
          style={{
            background:
              "linear-gradient(to right, #ffffff00 0%, #ffffff20 50%, #ffffff00 100%)",
          }}
          className="h-[1px] mt-5 mb-[17px]"
        ></div>

        <CourseAboutSection selectedItem={selectedItem} />
        <div className="pt-4 mr-5">
          <p className="text-[white] text-xs">درخواست کننده</p>
        </div>

        <div className="flex items-center justify-between gap-12 mt-2 mr-6 ml-0.5">
          <CourseEnrolledUsers selectedItem={selectedItem} />
          <CourseDownloadButton selectedItem={selectedItem} />
        </div>
      </div>
    </div>
  );
};
