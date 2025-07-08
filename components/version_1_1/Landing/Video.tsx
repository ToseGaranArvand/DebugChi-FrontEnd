import { Button } from "@heroui/react";
import { Play } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {};

const Video = (props: Props) => {
  return (
    <div className="w-full mx-auto flex flex-col items-center justify-center min-h-[500px] bg-white   dark:bg-slate-900 box-border p-5 ">
      
      <div className="w-full flex justify-between px-10 box-border my-16">
        <span className="text-3xl leading-loose font-blackSans">
          ببینید اتصال و کار با <br />  دیباگچی چگونه است
        </span>
        <span className="text-3xl leading-loose font-mediumSans">
          شما میتوانید مشکلات نرم افزاری خود <br /> را به دیباگچی بسپارید
        </span>
      </div>
      <div className="w-full h-[600px] mt-4 relative flex items-center justify-center ">
        <Image
          src={"/ai/image/ai_1.jpg"}
          alt="ai"
          objectFit="cover"
          className="opacity-80 hover:opacity-100 rounded-3xl"
          fill
        />
        <Button className="w-24 h-24 absolute z-40 bg-white/30" variant="light" size="lg" radius="full">
          <Play color="white" className="fill-white"/>
        </Button>
      </div>
    </div>
  );
};

export default Video;
