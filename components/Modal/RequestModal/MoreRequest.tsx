"use client";
import { showMoreRequest } from "@/redux/slices/globalSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store/store";
import { Button, ScrollShadow } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { TimePicker } from "./time-picker-component";

type Props = {};




const MoreRequest = (props: Props) => {
  const { more_request } = useAppSelector((state: RootState) => state.gloabal);
  const dispatch = useAppDispatch();
  const [selectedTime, setSelectedTime] = useState({ hour: 12, minute: 0 })

  const handleTimeChange = (hour: number, minute: number) => {
    // Only update if values actually changed
    if (selectedTime.hour !== hour || selectedTime.minute !== minute) {
      setSelectedTime({ hour, minute })
    }
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      const style = document.createElement("style");
      style.textContent = `
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style); // حذف استایل هنگام خروج
      };
    }
  }, []);
  return (
    <AnimatePresence>
      {more_request && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-full min-h-[600px] flex flex-col bg-[#232035] absolute z-50 bottom-0 rounded-tr-lg rounded-tl-lg"
        >
            <div className="flex-1 w-full h-full flex items-center justify-center" id="time-picker">
            <TimePicker
              initialHour={selectedTime.hour}
              initialMinute={selectedTime.minute}
              onTimeChange={handleTimeChange}
            />
          </div>

          <div className="h-20 w-full grid grid-cols-2 gap-4 place-content-center box-border px-4  ">
            <Button
              
              variant="light"
              onPress={() => dispatch(showMoreRequest(false))}
            >
              انصراف
            </Button>
            <Button
              color="success"
              onPress={() => 
                dispatch(showMoreRequest(false))}
            >
              تایید
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MoreRequest;
