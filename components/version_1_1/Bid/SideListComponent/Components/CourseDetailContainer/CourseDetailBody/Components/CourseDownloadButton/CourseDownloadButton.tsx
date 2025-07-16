import { Project } from "@/components/types/tender.type";
import { Button } from "@heroui/react";
import { Download } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

const CourseDownloadButton: FC<{ selectedItem?: Project | null }> = ({
  selectedItem,
}) => (
  <Button
    as={Link}
    href={selectedItem?.educational_heading_file}
    className="h-[48px] sm:h-[36px] w-[155px] !p-0 !bg-[#0f0f0f] border border-[#3e3e3e] !text-white flex items-center justify-between gap-0 rounded-[18px] sm:rounded-[20px]"
  >
    <div className="h-full w-[60px] border-l border-[#3e3e3e] flex items-center justify-center">
      <Download className="w-4 h-4" />
    </div>
    <span className="w-full text-[#a3a3a3] text-[10px] pr-3"> دانلود سرفصل ها</span>
  </Button>
);
export { CourseDownloadButton };
