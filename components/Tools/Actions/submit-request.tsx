"use client";
import { setShowRequest } from "@/redux/slices/globalSlice";
import { useAppDispatch } from "@/redux/store/store";
import { Button, Form } from "@heroui/react";
import {
  MessageCircle,
  MessageCircleCode,
  MessageCircleCodeIcon,
  MessageCircleHeart,
  PhoneCall,
  ScreenShare,
} from "lucide-react";
import React from "react";

type Props = {};

const SubmitRequest = (props: Props) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col box-border p-4 gap-4">
      <Button radius="full" className="w-full text-foreground" variant="bordered" color="default" onPress={()=>{
        dispatch(setShowRequest(true))
      }}>
        خدمات
      </Button>
      {/* <Button radius="full" className="w-full text-foreground" variant="bordered" color="default" >
        پرداخت
      </Button> */}
      <Button radius="full" className="w-full" variant="flat" color="danger" onPress={()=>window.location.href = '/'}>
        لغو
      </Button>

      {/* <Button className="w-full rounded-2xl flex justify-between  shadow-sm min-h-20" variant="bordered" color="success" startContent={<MessageCircleCodeIcon size={36} color="green"/>}>
        <div className="w-full flex flex-col items-start gap-2">
          <span className="text-md font-blackSans">متنی</span>
          <div className="w-10/12 bg-green-700 opacity-40 h-[1px]"></div>
          <span className="text-foreground-500 text-md">پاسخ دهی سریع ، چت و ارسال فایل</span>
        </div>
      </Button>
      <Button className="w-full rounded-2xl flex justify-between  shadow-sm min-h-20" variant="bordered" color="primary" startContent={<PhoneCall size={36} color="blue"/>}>
        <div className="w-full flex flex-col items-start gap-2">
          <span className="text-md font-blackSans">تلفنی</span>
          <div className="w-10/12 bg-blue-700 opacity-40 h-[1px]"></div>
          <span className="text-foreground-500 text-md">پاسخ دهی سریع ، چت و ارسال فایل</span>
        </div>
      </Button>
      <Button className="w-full rounded-2xl flex justify-between  shadow-sm min-h-20" variant="bordered" color="danger" startContent={<ScreenShare  size={36} color="red"/>}>
        <div className="w-full flex flex-col items-start gap-2">
          <span className="text-md font-blackSans">انی دسک</span>
          <div className="w-10/12 bg-red-700 opacity-40 h-[1px]"></div>
          <span className="text-foreground-500 text-md">پاسخ دهی سریع ، چت و ارسال فایل</span>
        </div>
      </Button> */}
    </div>
  );
};
export default SubmitRequest;
