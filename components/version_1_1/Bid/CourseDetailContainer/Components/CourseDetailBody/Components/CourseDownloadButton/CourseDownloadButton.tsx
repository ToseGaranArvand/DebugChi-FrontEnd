import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const CourseDownloadButton = () => (
  <Button
    variant="outline"
    className="h-[48px] w-full !p-0 !bg-[#0f0f0f] border-[#3e3e3e] !text-white flex items-center justify-between gap-0 rounded-[18px]"
  >
    <div className="h-full w-[60px] border-l border-[#3e3e3e] flex items-center justify-center">
      <Download className="w-4 h-4" />
    </div>
    <span className="w-full text-[#a3a3a3]"> دانلود سرفصل ها</span>
  </Button>
);
export { CourseDownloadButton };
