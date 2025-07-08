"use client";
import React from "react";

import { Accordion, AccordionItem, Button, Checkbox } from "@heroui/react";



const UserSerivices = () => {
  return (
    <div className="w-full flex flex-col gap-4">
        {/* <Accordion variant="splitted" hideIndicator className="sticky top-0" dir="rtl" itemClasses={{
          base:'bg-default-100'
        }}>

            <AccordionItem
              suppressHydrationWarning
              key="main"
              aria-label={"Accordion main"}
              title={
                <div className="w-[93%] h-full flex items-center justify-between box-border px-4 text-xs">
                  <span>عنوان</span>
                  <span>نوع خدمات</span>
                  <span>قیمت</span>
                  <span>تاریخ شروع</span>
                  <span>تاریخ پایان</span>
                  <span>وضعیت</span>
                </div>
              }
            ></AccordionItem>

      </Accordion>
      <Accordion variant="splitted" dir="rtl" itemClasses={{
        indicator:"z-[1]"
      }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item) => {
          return (
            <AccordionItem
              suppressHydrationWarning
              key={String(item)}
              aria-label={"Accordion " + item}
              title={
                <div className="w-[95%] h-full flex items-center justify-between box-border px-4">
                  <span>jasd</span>
                  <span>jasd</span>
                  <span>jasd</span>
                  <span>jasd</span>
                  <span>jasd</span>
                  <span>jasd</span>
                </div>
              }
            ></AccordionItem>
          );
        })}
      </Accordion> */}
    </div>
  );
};

export default UserSerivices;
