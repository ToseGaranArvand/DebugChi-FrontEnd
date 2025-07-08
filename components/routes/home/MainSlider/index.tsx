"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import './styles.css';
type Props = {};
import { Pagination, Navigation } from "swiper/modules";
import * as motion from "motion/react-client";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { data } from "./data";
import ProfileWithImageCard from "@/components/Tools/cards/ProfileWithImageCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/tools";

const MainSLider = (props: Props) => {
  return (
    <>
     
      <Swiper
        slidesPerView={"auto"}
        // centeredSlides={true}
        spaceBetween={30}
        // navigation={true}
        modules={[Navigation]}
        className="mySwiper h-[400px]  w-full !box-border !p-4  !absolute top-2/4"
      >
        {data.map((item) => {
          return (
            <SwiperSlide
              className="!w-[800px] rounded-lg box-border shadow-md bg-white dark:bg-slate-900 "
              key={item.id}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
                className=" w-full h-full flex items-center justify-start gap-2"
              >
                <motion.div
                  className={`w-64 h-full flex flex-col relative rounded-lg box-border p-2 backdrop-blur-lg `}
                >
                  <Image
                    src={item.banner}
                    width={256}
                    height={300}
                    alt={item.description}
                    className="h-full border-2 object-cover rounded-lg"
                  />
                </motion.div>
                <motion.div className="w-[500px] flex flex-col justify-between h-full box-border p-5">
                  <div className="w-full h-20 flex items-center justify-start">
                    {/* <ProfileWithImageCard
                      image={item.image}
                      name={item.name}
                      speciality={item.user_expertise}
                      user_score={item.score}
                      key={item.id}
                    /> */}
                    <div className="flex flex-1 justify-end items-center">
                      {item.is_instant && (
                        <Badge variant={"destructive"}>فوری</Badge>
                      )}
                    </div>
                  </div>

                  <div
                    className="flex flex-col gap-2
                  "
                  >
                    <span className="text-lg font-bold">{item.subject}</span>
                    <hr />
                    <p className="text-base text-justify text-muted-foreground">
                      {item.description}
                    </p>
                  </div>

                  <div className="w-full h-20 flex flex-row-reverse items-center justify-end gap-2">
                    {item.is_free && (
                      <Button variant={"default"} className="rounded-full">
                        <span>ثبت نام</span>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                      </Button>
                    )}
                    {!item.is_free && (
                      <Button variant={"default"} className="rounded-full">
                        <span>ثبت نام</span>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                      </Button>
                    )}
                    <div className="flex-1  flex items-center justify-between">
                      <span>شروع از {item.start_at}</span>
                      <span className="text-base text-green-500">
                        {item.price > 0 ? formatCurrency(item.price) : "رایگان"}
                        
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default MainSLider;
