import { Project, Result } from "@/components/types/tender.type";
import { Clock } from "lucide-react";
import { FC } from "react";

const CourseScheduleInfo: FC<{ selectedItem?: Project | null }> = ({
  selectedItem,
}) => {
  const startDateStr = selectedItem?.start_date;
  const startDate = startDateStr ? new Date(startDateStr) : null;

  const startMonth = startDate
    ? startDate.toLocaleDateString("fa-IR", { month: "short" })
    : "";

  const startDay = startDate ? startDate.getDay() : "-";
  return (
    <div className="space-y-[26px] py-1">
      <div className="flex gap-3">
        <div className="w-10 h-10 bg-[#0f0f0f] rounded-[10px] border border-white">
          <span className="text-sm text-center">
            <div className="h-4 leading-none pt-1 bg-[#2e2e2e] rounded-t-[10px] text-[9px] font-iranLight">
              {startMonth}
            </div>
            <div className="font-iranNumMedium">{startDay}</div>
          </span>
        </div>
        <span className="mt-1.5 text-gray-300">زمان برگزاری کلاس</span>
      </div>

      <div className="flex gap-3">
        <div className="w-10 h-10 bg-[#0f0f0f] rounded-[10px] border border-white flex items-center justify-center">
          <Clock className="w-7 h-7 text-[#4ff04f]" />
        </div>
        <span className="mt-1.5 text-gray-300 font-iranNumMedium">
          زمان آموزش: 3 ساعت 30 دقیقه
        </span>
      </div>
    </div>
  );
};
export { CourseScheduleInfo };
