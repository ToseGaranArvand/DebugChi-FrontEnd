"use client";
// base
import React, { FC } from "react";
// core
import { Button } from "antd";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CourseDetailHeader: FC = () => {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };
  return (
    <>
      <div className="px-3 pl-8 flex justify-between items-center">
        <div className="flex items-center gap-5">
          <h1 className="mr-6 text-[18px]">سرفصل های پروژه</h1>
        </div>
        <div className="flex items-center gap-5">
          <Button
            onClick={() => handleNavigate("/")}
            className="px-0 !bg-transparent border-none"
          >
            <Image src="/images/svg/BackSvg.svg" alt="" width={20}
           height={20} />
          </Button>
        </div>
      </div>
      <div
        style={{
          background:
            "linear-gradient(to right, #ffffff0a 0%, #ffffff30 50%, #ffffff0a 100%)",
        }}
        className="h-[1px] mt-[8px]  mb-[18px]"
      ></div>
    </>
  );
};

export { CourseDetailHeader };
