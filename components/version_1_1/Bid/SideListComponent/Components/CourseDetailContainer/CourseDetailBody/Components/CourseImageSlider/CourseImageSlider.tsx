import { SwiperSlide } from "swiper/react";
import Image from "next/image";
import { CustomSlider } from "@/components/version_1_1/ui/CustomSlider";
import { FC } from "react";
import { Project } from "@/components/types/tender.type";

const CourseImageSlider: FC<{ selectedItem?: Project | null }> = ({
  selectedItem,
}) => {
  // if (selectedItem?.images.length === 0)
  return (
    <div className="relative px-4 pt-2">
      <CustomSlider
        className="h-[228px] w-full"
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
  // when api was right uncomment this code
  // if (selectedItem?.images.length === 0)
  //   return (
  //     <div className="relative px-4 pt-2">
  //       <CustomSlider
  //         className="h-[228px] w-full"
  //         pagination={true}
  //         spaceBetween={20}
  //         slidesPerView={1}
  //       >
  //         {selectedItem?.images.map((item) => (
  //           <SwiperSlide
  //             key={item.id}
  //             className="h-[191px] w-full rounded-[18px] overflow-hidden"
  //           >
  //             <Image
  //               src={item.image}
  //               alt=""
  //               className="h-[191px] w-full rounded-[18px]"
  //               width={432}
  //               height={191}
  //             />
  //           </SwiperSlide>
  //         ))}
  //       </CustomSlider>
  //     </div>
  //   );
};
export { CourseImageSlider };
