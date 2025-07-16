"use client";
// base
import React, { FC } from "react";
// core
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SearchInput } from "@/components/version_1_1/ui/SearchInput";
import Button from "@/components/version_1_1/ui/button";

const ActiveClassesHeader: FC = () => {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };
  return (
    <>
      <div className="px-3 pl-8 flex gap-4 justify-between items-center">
        <SearchInput
          placeholder="جستجو..."
          className="w-full h-[43px] !bg-[#1C1C1CB2] rounded-[20px] border !border-[#252525] text-[#BBBBBB] placeholder:text-[#BBBBBB] font-iranLight text-[15px]"
        />
        <div className="flex items-center gap-5">
          <Button
            onPress={() => handleNavigate("/")}
            className="px-0 !bg-transparent border-none"
          >
            <Image
              src="/images/svg/BackSvg.svg"
              alt=""
              width={20}
              height={20}
            />
          </Button>
        </div>
      </div>
      <div
        style={{
          background:
            "linear-gradient(to right, #ffffff0a 0%, #ffffff30 50%, #ffffff0a 100%)",
        }}
        className="h-[1px] mt-[15px]  mb-[15px]"
      ></div>
    </>
  );
};

export { ActiveClassesHeader };
