"use client";
import React from "react";
import { Avatar, Badge, Chip } from "@heroui/react"; // فرض بر این است که از کتابخانه @heroui/react استفاده می‌کنید
import Action from "@/components/chat/header/action";
import SubmitRequest from "@/components/Tools/Actions/submit-request";
import ProgrammerRate from "@/components/Tools/ProgrammerRate";

const AIBotProfile = () => {
  // دیتای ثابت برای بات هوش مصنوعی
  const botData = {
    name: "سارا احسانی",
    image_profile:"/img.jpg",
    skills: ["AI", "Machine Learning", "Natural Language Processing", "Python", "TensorFlow"],
    level: "Advanced",
    description: "من آماده پاسخ گویی  به شما هستم لطفا با دقت به سوالات پاسخ دهید",
  };

  return (
    <div className="h-full w-full box-border p-2">
      {/* نمایش سطح بات */}
      {/* <ProgrammerRate level={"Senior"} /> */}

      {/* بخش اصلی پروفایل */}
      <div className="min-h-[400px] flex flex-col gap-4 items-center justify-center">
        {/* عکس پروفایل با نشان آنلاین */}
        <Badge color="success" content="" placement="bottom-right" shape="circle">
          <Avatar
            radius="full"
            className="w-40 h-40 text-2xl"
            src={botData.image_profile}
          />
        </Badge>

        {/* نام بات */}
        <div className="w-full flex flex-col items-center justify-center">
          <h2 className="text-xl">{botData.name}</h2>
          <p className="text-sm text-gray-500 text-right my-4">{botData.description}</p>
        </div>

        {/* مهارت‌های بات */}
        {/* <div className="w-full flex flex-wrap justify-start flex-row-reverse gap-2 border-b border-slate-800 py-2 box-border">
          {botData.skills.map((skill, index) => (
            <Chip key={index} color="default" variant="flat" size="sm">
              {skill}
            </Chip>
          ))}
        </div> */}
      </div>

      {/* بخش اقدامات (Actions) */}
      <div className="flex items-center gap-4 justify-center flex-1">
        {/* <Action /> */}
      </div>

      {/* دکمه ارسال درخواست */}
      {/* <SubmitRequest /> */}
    </div>
  );
};

export default AIBotProfile;