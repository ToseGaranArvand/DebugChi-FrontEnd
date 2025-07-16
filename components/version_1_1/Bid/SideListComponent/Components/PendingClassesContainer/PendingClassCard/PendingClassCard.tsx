import Button from "@/components/version_1_1/ui/button";
import Image from "next/image";
import React from "react";

const PendingClassCard = () => {
  return (
    <div className="w-full h-[189px] border-2 border-[#1F1F1F] bg-[#181818] rounded-2xl">
      <div className="h-[56px] pr-2 pl-[14px] flex items-center justify-between border-b-2 border-[#262626] bg-gradient-to-b from-[#0F0F0F] to-[#000A1B] rounded-2xl">
        <div className="mb-1 flex items-center gap-2">
          <Image
            src={"/images/general/profile.png"}
            alt="profile"
            className="w-[28px] h-[28px] border border-white rounded-full object-cover"
            width={30}
           height={30}
          />
          <div>
            <h1 className="text-xs">Mehdihamodi</h1>
            <h1 className="-mt-0.5 text-[10px] text-[#BABABA]">
              مدرس و دانشمند
            </h1>
          </div>
        </div>
        <Button className="w-[74px] h-6 pt-1.5 bg-[#4A9909] rounded-[8px] text-[10px]">
          پذیرش
        </Button>
      </div>

      <div className="px-7 pt-[10px] pb-[17px] flex justify-between items-center text-[#BABABA] text-[10px]">
        <h1>تاریخ درخواست </h1>
        <span className="font-iranRegular">۵ ساعت قبل</span>
      </div>
      <div
        style={{
          background:
            "linear-gradient(to right, #ffffff0a 0%, #ffffff1e 50%, #ffffff0a 100%)",
        }}
        className="h-[1px] bg-[#ffffff1e]"
      ></div>
      <div className="px-7 pt-[9px] pb-[17px] flex justify-between items-center text-[#BABABA] text-[10px]">
        <h1>وضعیت </h1>
        <span className="text-[#4A9909] font-iranRegular">
          {" "}
          در انتظار تایید
        </span>
      </div>
      <div
        style={{
          background:
            "linear-gradient(to right, #ffffff0a 0%, #ffffff1e 50%, #ffffff0a 100%)",
        }}
        className="h-[1px] bg-[#ffffff1e]"
      ></div>
      <div className="px-7 pt-[10px] pb-[17px] flex justify-between items-center text-[#BABABA] text-[10px]">
        <h1>مبلغ پیشنهادی </h1>
        <span className="text-sm font-iranBold">۱،۱۵۰،۰۰۰</span>
      </div>
    </div>
  );
};

export { PendingClassCard };
