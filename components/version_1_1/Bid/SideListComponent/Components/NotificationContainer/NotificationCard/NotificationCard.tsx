import { Eye, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import Button from "@/components/version_1_1/ui/button";
import React from "react";
import { useBidFilter } from "@/context/BidFilterContext";

const NotificationCard = () => {
  const { setSidePanelContent } = useBidFilter();
  return (
    <div>
      <div className="h-[241px] border-2 border-[#1F1F1F] rounded-2xl bg-gradient-to-b from-[#0F0F0F] to-[#000A1B] text-sm">
        <h1 className="px-5 py-[19px] text-[#0EE520] text-[22px] font-iranBold">
          آموزش فلاتر
        </h1>
        <div
          style={{
            background:
              "linear-gradient(to right, #ffffff0a 0%, #ffffff30 50%, #ffffff0a 100%)",
          }}
          className="w-full h-[1px] mt-[25px] mb-[10px]"
        ></div>
        <div
          onClick={() => setSidePanelContent("pendingClasses")}
          className="flex justify-between px-7"
        >
          <span>درخواست ها</span>
          <Image
            src="/images/svg/DownArrowSvg.svg"
            alt=""
            className="rotate-90"
            width={20}
            height={20}
          />
        </div>
        <div
          style={{
            background:
              "linear-gradient(to right, #ffffff0a 0%, #ffffff30 50%, #ffffff0a 100%)",
          }}
          className="w-full h-[1px] mt-[17px] mb-[10px]"
        ></div>
        <div
          onClick={() => setSidePanelContent("pendingClasses")}
          className="flex justify-between px-7"
        >
          <span>برسی شده</span>
          <Image
            src="/images/svg/DownArrowSvg.svg"
            alt=""
            className="rotate-90"
            width={20}
            height={20}
          />
        </div>
        <div
          style={{
            background:
              "linear-gradient(to right, #ffffff0a 0%, #ffffff30 50%, #ffffff0a 100%)",
          }}
          className="w-full h-[1px] mt-[16px]"
        ></div>
      </div>
      <div className="flex items-center justify-between mt-3 px-[5px]">
        {/* Edit Button */}
        <Button className="w-[110px] h-9 pt-1 flex items-center justify-center !bg-[#0F0F0F] border border-[#1F1F1F] text-white rounded-full font-medium text-xs font-iranRegular">
          ویرایش
        </Button>
        {/* Engagement Metrics */}
        <div className="w-[180px] h-9 flex items-center justify-between !bg-[#0F0F0F] border border-[#1F1F1F] rounded-full px-4 py-2">
          <div className="flex items-center gap-0.5">
            <Eye className="w-5 h-5 text-gray-300" />
            <span className="text-white text-[10px] font-medium">۳۴۵</span>
          </div>
          <div className="flex items-center gap-0.5">
            <Heart className="w-5 h-5 text-gray-300" />
            <span className="text-white text-[10px] font-medium">۳۴۶</span>
          </div>
          <div className="flex items-center gap-0.5">
            <MessageCircle className="w-5 h-5 text-gray-300" />
            <span className="text-white text-[10px] font-medium">۳۴۶</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { NotificationCard };
