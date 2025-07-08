import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination } from "swiper/modules";
import { feedbackComments } from "./data";
import { Separator } from "@/components/ui/separator";
import ProfileWithImageCard from "@/components/Tools/cards/ProfileWithImageCard";
import { formatTimeAgo } from "@/utils/tools";
import { Timer } from "lucide-react";

export default function CommentSlide() {
  return (
    <>
      <Swiper
      dir="rtl"
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        modules={[FreeMode]}
        className="mySwiper w-full h-36 p-4 box-border my-5"
      >
        {feedbackComments.map((item) => {
          return (
            <SwiperSlide
              key={item.id}
              className=" border shadow-md rounded-md !w-72 !h-auto"
            >
            <div className="w-full h-full">
            <p className="text-sm text-muted-foreground font-light h-2/4 p-4 box-border">
                {item.text}
            </p>
              <Separator />
              <div className="flex  box-border border-b rounded-md px-5 bg-gray-50 dark:bg-gray-900 h-2/4">
                <ProfileWithImageCard
                  image=""
                  name={item.reviewer}
                  speciality={[]}
                  user_score={item.rating}
                  />
                <div className="flex flex-1 gap-2 items-center justify-end">
                  <span className="text-xs">{formatTimeAgo(item.date)}</span>
                  <Timer />
                </div>
              </div>
                  </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
