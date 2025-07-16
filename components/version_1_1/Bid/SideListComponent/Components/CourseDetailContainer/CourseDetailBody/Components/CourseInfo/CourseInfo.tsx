import { Project } from "@/components/types/tender.type";
import { FC } from "react";

const CourseInfo: FC<{ selectedItem?: Project | null }> = ({
  selectedItem,
}) => (
  <div className="mr-6">
    <h2 className="text-2xl text-[#FFF700] mb-2 font-iranNumBlack">
      {selectedItem?.class_title ?? "عنوان کلاس"}
    </h2>
    <p>
      تعداد جلسات |{" "}
      <span className="text-[#FFF700]">{selectedItem?.buffer_date ?? 'نامعلوم'}</span>
    </p>
  </div>
);
export { CourseInfo };
