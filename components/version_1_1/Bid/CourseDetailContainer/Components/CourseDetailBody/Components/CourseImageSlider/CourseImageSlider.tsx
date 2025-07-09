import { SwiperSlide } from "swiper/react";
import Image from "next/image";
import { CustomSlider } from "@/components/version_1_1/ui/CustomSlider";

const CourseImageSlider = () => {
  return (
    <div className="relative px-4 pt-2">
      <CustomSlider
        className="h-[228px]"
        pagination={true}
        spaceBetween={20}
        slidesPerView={1}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <SwiperSlide
            key={i}
            className="h-[191px] w-full rounded-[18px] overflow-hidden"
          >
            <Image
              src="/images/general/LabelSample3.png"
              alt=""
              className="h-[191px] w-full rounded-[18px]"
              width={432}
           height={191}
            />
          </SwiperSlide>
        ))}
      </CustomSlider>
    </div>
  );
};
export { CourseImageSlider };
