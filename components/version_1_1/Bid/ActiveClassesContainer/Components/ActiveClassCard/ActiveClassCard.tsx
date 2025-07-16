import Button from "@/components/version_1_1/ui/button";
import Image from "next/image";
import React from "react";

const ActiveClassCard = () => {
  return (
    <div className="w-full pb-2.5 border-2 border-[#1F1F1F] bg-[#181818] rounded-2xl">
      <div className="h-[56px] pr-4 flex items-center border-b-2 border-[#262626] bg-gradient-to-b from-[#0F0F0F] to-[#000A1B] rounded-2xl">
        <h1 className="text-[22px] mb-1 text-[#0EE520] font-iranBold">
          آموزش فلاتر
        </h1>
      </div>
      <div className="px-3 mt-2 flex items-center justify-between text-sm text-[#BABABA]">
        <h1>اطلاعات مدرس</h1>
        <h1>جزئیات کلاس</h1>
        <h1>ارزش دوره </h1>
        <h1 className="text-[#0EE520] text-xl font-iranNumMedium">960,000</h1>
      </div>
      <div
        style={{
          background:
            "linear-gradient(to right, #ffffff0a 0%, #ffffff1e 50%, #ffffff0a 100%)",
        }}
        className="h-[1px] mt-[13px] bg-[#ffffff1e] mb-[26px]"
      ></div>
      <div className="px-1 flex justify-between gap-2 items-center">
        <Button className="w-[201px] h-[36px] pr-5 pl-1.5 flex justify-between rounded-[8px] bg-gradient-to-r from-[#002A5B] to-[#0075FF]">
          <h1 className="text-[16px] mb-1">پیوست به کلاس</h1>
          <Image
            src="/images/general/GoogleMeet.png"
            alt=""
            className="w-5 h-5 bg-white rounded-md"
            width={20}
            height={20}
          />
        </Button>
        <div className="flex gap-0.5">
          <div className="w-[30px] h-[30px] flex justify-center items-center rounded-full border border-[#373737] bg-[#262626]">
            <Image
              src="/images/svg/CallSvg.svg"
              alt=""
              width={20}
              height={20}
            />
          </div>
          <div className="w-[30px] h-[30px] flex justify-center items-center rounded-full border border-[#373737] bg-[#262626]">
            <Image
              src="/images/svg/CameraSvg.svg"
              alt=""
              width={20}
              height={20}
            />
          </div>
          <div className="w-[30px] h-[30px] flex justify-center items-center rounded-full border border-[#373737] bg-[#262626]">
            <Image
              src="/images/svg/MiniCommentSvg.svg"
              alt=""
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { ActiveClassCard };
