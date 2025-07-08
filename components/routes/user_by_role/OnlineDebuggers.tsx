"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";


import "swiper/css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {  ArrowLeft, Bug, ChevronLeft, Headphones, MessageCircleCode, MonitorPlay, PhoneCall, Star, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";


const OnlineDebuggers = () => {
  return (
    <Swiper
      slidesPerView={5}
      spaceBetween={30}
     
      className="mySwiper h-auto mt-4"
    >
      {
        Array.from({ length: 10 }).map((_, index) => (

      <SwiperSlide key={index} className="border rounded-lg bg-gray-50 dark:bg-slate-900 box-border  p-4  !w-72
      " >
      <div className="w-full flex flex-col items-center justify-center">
      <Avatar className="w-20 h-20">
        <AvatarImage src="https://th.bing.com/th/id/R.2fc6ecdf7989040501034d7005f2678d?rik=9YXZ4S4tY%2bm2%2bQ&pid=ImgRaw&r=0&sres=1&sresct=1" ></AvatarImage>
        <AvatarFallback><User size={36}/></AvatarFallback>
      </Avatar>
      <div className="my-2 flex flex-col items-center">
        <h2 className="text-sm font-bold">عیلرضا یوسف نژاد</h2>
        <div>
        <Badge variant={"outline"}>Full-Stack Developer</Badge>

        </div>
      </div>
      <div className="flex">
      <Star className="text-yellow-400 fill-yellow-400"/>
      <Star className="text-yellow-400 fill-yellow-400"/>
      <Star className="text-yellow-400 fill-yellow-400"/>
      <Star className="text-yellow-400 fill-yellow-400"/>
      <Star className="text-yellow-400 fill-yellow-400"/>

      </div>
      <div className="my-2 flex gap-4">
        <Badge variant={"outline"} className="flex text-sm"><span className="text-nowrap">2000+ دیباگ و مشاوره</span></Badge>
        <Badge variant={"outline"} className="flex text-sm"><span className="text-nowrap">2000+ آموزش</span></Badge>
              </div>
      <Button className="mt-2" variant={"ghost"} >
        <span>مشاهده پروفایل</span>
        <ChevronLeft />
      </Button>
      </div>
      </SwiperSlide>
        ))
      }
     

    
    </Swiper>
  );
};

export default OnlineDebuggers;
