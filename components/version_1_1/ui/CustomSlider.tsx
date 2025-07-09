// base
import React from "react";
// lib
import { Swiper } from "swiper/react";
import "swiper/css";
import { SwiperOptions } from "swiper/types";
import { Pagination, Scrollbar } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
//style
import "./ui.css";
interface ICustomSliderPropTypes {
  children: React.ReactNode[];
  className?: string;
  spaceBetween?: number;
  slidesPerView?: number;
  loop?: boolean;
  breakpoints?: {
    [width: number]: SwiperOptions;
  };
  dir?: "rtl" | "ltr";
  pagination?: boolean;
  scrollbar?: boolean;
  direction?: "horizontal" | "vertical";
}
const CustomSlider: React.FC<ICustomSliderPropTypes> = ({
  children,
  className,
  spaceBetween,
  slidesPerView,
  loop,
  breakpoints,
  dir,
  pagination = false,
  scrollbar = false,
  direction,
}) => {
  return (
    <div className={`w-full ${className}`}>
      <Swiper
        direction={direction}
        pagination={{
          dynamicBullets: pagination,
        }}
        scrollbar={scrollbar}
        dir={dir}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        loop={loop}
        breakpoints={breakpoints}
        modules={[Pagination, Scrollbar]}
        className={`h-fit !pb-4`}
      >
        {children}
      </Swiper>
    </div>
  );
};

export { CustomSlider };
