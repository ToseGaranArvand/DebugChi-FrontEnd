"use client";

import { CourseImageSlider } from "./Components/CourseImageSlider/CourseImageSlider";
import { CourseInfo } from "./Components/CourseInfo/CourseInfo";
import { CourseScheduleInfo } from "./Components/CourseScheduleInfo/CourseScheduleInfo";
import { CourseAboutSection } from "./Components/CourseAboutSection/CourseAboutSection";
import { CourseInstructor } from "./Components/CourseInstructor/CourseInstructor";
import { CourseEnrolledUsers } from "./Components/CourseEnrolledUsers/CourseEnrolledUsers";
import { CourseDownloadButton } from "./Components/CourseDownloadButton/CourseDownloadButton";

const sessions = Array.from({ length: 8 }).map((_, i) => ({
  advName: ["علی رضایی", "نگین احمدی", "حسین محمدی", "سارا محمودی"][i % 4],
  advProfile: "/images/general/Profile.png",
}));

export const CourseDetailBody = () => {
  return (
    <div className="text-white">
      <CourseImageSlider />

      <div className="px-4">
        <CourseInfo />

        <div
          style={{
            background:
              "linear-gradient(to right, #ffffff00 0%, #ffffff20 50%, #ffffff00 100%)",
          }}
          className="h-[1px] my-4"
        ></div>

        <CourseScheduleInfo />

        <div
          style={{
            background:
              "linear-gradient(to right, #ffffff00 0%, #ffffff20 50%, #ffffff00 100%)",
          }}
          className="h-[1px] mt-5 mb-[17px]"
        ></div>

        <CourseAboutSection />
        <CourseInstructor />

        <div className="flex items-center justify-between gap-12 mt-2 mr-6 ml-0.5">
          <CourseEnrolledUsers sessions={sessions} />
          <CourseDownloadButton />
        </div>
      </div>
    </div>
  );
};
