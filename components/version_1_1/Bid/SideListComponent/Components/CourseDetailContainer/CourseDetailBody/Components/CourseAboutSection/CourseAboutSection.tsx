import { Project } from "@/components/types/tender.type";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FC, useState } from "react";

const CourseAboutSection: FC<{ selectedItem?: Project | null }> = ({
  selectedItem,
}) => {
  const [isMoreDetail, setIsMoreDetail] = useState(false);
  return (
    <div
      className={`relative ${
        isMoreDetail ? "h-fit" : "h-[185px]"
      } flex flex-col transition-all duration-300 px-4 py-[12px] pb-[50px] space-y-3 bg-[#191919] rounded-[18px]`}
    >
      <h3 className="text-[18px]">درباره کلاس</h3>
      <p className="!mt-2 text-gray-300 text-[12px] leading-relaxed overflow-hidden h-full">
        {selectedItem?.educational_heading ?? "توضیحات اضافه موجود نیست"}
      </p>
      <Button
        onClick={() => setIsMoreDetail(!isMoreDetail)}
        className="absolute left-[15px] bottom-[15px] !bg-transparent !p-0 flex flex-col items-center gap-1 text-[10px] text-[#8f8f8f]"
      >
        سرفصل
        <Image
          src="/images/svg/DownArrowSvg.svg"
          alt=""
          className={`${
            isMoreDetail ? "rotate-180" : ""
          } transition-all duration-300`}
          width={20}
          height={20}
        />
      </Button>
    </div>
  );
};
export { CourseAboutSection };
