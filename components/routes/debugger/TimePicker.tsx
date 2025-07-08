"use client";

import React, { useEffect, useState } from "react";
import { getDaysInCurrentShamsiMonth } from "./data";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Dot, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { chooseConsultTime } from "./data";
import { useAppDispatch, useAppSelector } from "@/redux/store/store";
import { updateRequest } from "@/redux/slices/consultSlice";
import { convertShamsiToGregorian } from "@/utils/tools";
import { TimePicker as Time } from "@/components/TimePicker";
import {ClockPicker} from "./ClockPicker";
type Props = {};

const TimePicker = (props: Props) => {
  const [selectedTime, setSelectedTime] = useState<string>("00:00")
  const dispatch = useAppDispatch();
  const {
    monthNumber,
    nextMonthNumber,
    daysInMonth,
    currentMonthName,
    nextMonthName,
    today,
    daysWithWeekdays,
    nextMonthWithWeekdays,
  } = getDaysInCurrentShamsiMonth();
  const [selectedDay, setSelectedDay] = React.useState(today);
  const [currentMonth, setCurrentMonth] = useState(true);
  const [duration, setDuration] = useState(20);
  // const {request} = useAppSelector(state=>state.consult)
  const DayItem = ({ day, weekday }: { day: number; weekday: string }) => (
    <div
      onClick={() => {
        console.log(nextMonthNumber,currentMonth)
        let start_at = `1403/${monthNumber}/${day}`;
        setSelectedDay(day);
        dispatch(updateRequest({ start_at: start_at }));
      }}
      className={`flex flex-col items-center gap-2 p-2 cursor-pointer ${
        day === selectedDay ? "bg-blue-100 dark:bg-blue-950" : ""
      } rounded-2xl w-20 transition-colors`}
    >
      <span className="text-xs text-muted-foreground">{weekday}</span>
      <motion.div
        animate={{
          y: day === selectedDay ? 5 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`flex items-center justify-center w-12 h-12 border rounded-full ${
          day === selectedDay
            ? "bg-blue-500 text-white border-blue-500"
            : "border-border"
        }`}
      >
        {day}
      </motion.div>
      <Dot className="text-green-500" size={16} />
    </div>
  );

  return (
    <div className="w-full  mx-auto space-y-4 border rounded-2xl p-4 shadow-lg">
      <div className="flex items-center justify-between px-4">
        <Button
          variant="ghost"
          dir="ltr"
          disabled={!currentMonth}
          onClick={() => {
            setCurrentMonth(false);
            setSelectedDay(1);
          }}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="mx-2">{nextMonthName}</span>
        </Button>
        <Button
          variant="ghost"
          disabled={currentMonth}
          onClick={() => setCurrentMonth(true)}
          dir="ltr"
        >
          <span className="mx-2">{currentMonthName}</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <Swiper
        dir="rtl"
        slidesPerView="auto"
        spaceBetween={8}
        freeMode={true}
        modules={[FreeMode]}
        className="w-full px-4"
        initialSlide={0}
      >
        {(currentMonth
          ? daysWithWeekdays.slice(today - 1)
          : nextMonthWithWeekdays
        ).map(({ day, weekday }) => (
          <SwiperSlide key={day} className="!w-auto">
            <DayItem day={day} weekday={weekday} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="w-full mx-auto h-auto flex items-center justify-between box-border p-5">
        {chooseConsultTime.map((item, index) => {
          return (
            <div
            
              onClick={() =>{ 
                setDuration(item.time);
                dispatch(updateRequest({duration:item.time}));
              }}
              className={`flex gap-4 flex-col items-center justify-center border-2  rounded-2xl w-20 h-auto cursor-pointer py-1 ${
                duration == item.time
                  ? "bg-blue-100 dark:bg-blue-950 ring-2 ring-blue-500"
                  : ""
              }`}
              key={index}
            >
              <span>{"دقیقه"}&nbsp;{item.time}</span>
            
              <Timer size={14} />
            </div>
          );
        })}
      <div className="w-2/4 flex justify-end">
      <ClockPicker  />
      {/* <Time onChange={setSelectedTime}/> */}
      </div>
      </div>
    </div>
  );
};

export default TimePicker;
