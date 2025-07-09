import { Clock } from "lucide-react";

const CourseScheduleInfo = () => (
  <div className="space-y-[26px] py-1">
    <div className="flex gap-3">
      <div className="w-10 h-10 bg-[#0f0f0f] rounded-[10px] border border-white">
        <span className="text-sm text-center">
          <div className="h-4 leading-none pt-1 bg-[#2e2e2e] rounded-t-[10px] text-[9px] font-iranLight">
            خرداد
          </div>
          <div className="font-iranNumMedium">18</div>
        </span>
      </div>
      <span className="mt-1.5 text-gray-300">زمان برگزاری کلاس</span>
    </div>

    <div className="flex gap-3">
      <div className="w-10 h-10 bg-[#0f0f0f] rounded-[10px] border border-white flex items-center justify-center">
        <Clock className="w-7 h-7 text-[#4ff04f]" />
      </div>
      <span className="mt-1.5 text-gray-300 font-iranNumMedium">زمان آموزش: 3 ساعت 30 دقیقه</span>
    </div>
  </div>
);
export { CourseScheduleInfo };
