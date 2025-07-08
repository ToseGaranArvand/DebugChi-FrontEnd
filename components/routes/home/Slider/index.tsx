"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow, Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { Button, Link } from "@heroui/react";

// Define TypeScript interface for images
interface ImageData {
  alt_name: string;
  image_url: string;
  title: string;
  description: string;
  link_url: string;
}

const images: ImageData[] = [
  {
    alt_name: "دیباگ",
    image_url: "/images/slider/main/image_1.png",
    title: "دیباگ",
    description: `از هر نقطه‌ی دنیا در هر ساعت از روز و شب با خدمات کلاس خصوصی هر باگ یا مشکلی را در حوزه
برنامه‌نویسی در کنار یک مدرس خبره رفع کن در سریع‌ترین زمان ممکن.`,
    link_url: "/community/chat",
  },
  {
    alt_name: "کلاس خصوصی",
    image_url: "/images/slider/main/image_1.png",
    title: "کلاس خصوصی",
    description: `از هر نقطه‌ی دنیا در هر ساعت از روز و شب با خدمات کلاس خصوصی هر باگ یا مشکلی را در حوزه
برنامه‌نویسی در کنار یک مدرس خبره رفع کن در سریع‌ترین زمان ممکن.`,
link_url: "/community/chat",

  },
  {
    alt_name: "کلاس عمومی",
    image_url: "/images/slider/main/image_1.png",
    title: "کلاس عمومی",
    description: `از هر نقطه‌ی دنیا در هر ساعت از روز و شب با خدمات کلاس خصوصی هر باگ یا مشکلی را در حوزه
برنامه‌نویسی در کنار یک مدرس خبره رفع کن در سریع‌ترین زمان ممکن.`,
link_url: "/community/chat",

  },
  {
    alt_name: "مشاوره",
    image_url: "/images/slider/main/image_1.png",
    title: "مشاوره",
    description: `از هر نقطه‌ی دنیا در هر ساعت از روز و شب با خدمات کلاس خصوصی هر باگ یا مشکلی را در حوزه
برنامه‌نویسی در کنار یک مدرس خبره رفع کن در سریع‌ترین زمان ممکن.`,
link_url: "/community/chat",

  }
];

export default function Slider() {
  return (
    <Swiper
      navigation={true}
      loop={true}
      // dir="rtl"
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      effect={"coverflow"}
      slidesPerView={"auto"}
      centeredSlides={true}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
        slideShadows: false,
      }}
      modules={[Navigation, EffectCoverflow, Autoplay]}
      className="mySwiper h-[500px]"
    >
      {images.map((img, index) => (
        <SwiperSlide key={index} className="flex items-center justify-center !w-[700px]">
          {({ isActive }: { isActive: boolean }) => (
            <AnimatePresence>
              <motion.div
                initial={{ width: 700, scale: 0.8, opacity: 0.5, zIndex: 0 }}
                animate={{
                  width: isActive ? 800 : 800,
                  scale: isActive ? 1.1 : 0.8,
                  opacity: isActive ? 1 : 0.5,
                  zIndex: isActive ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className={`relative h-full  rounded-lg overflow-hidden`}
              >
                {/* Image with Next.js */}
                <Image
                  src={img.image_url || "/placeholder.svg"}
                  alt={img.alt_name}
                  fill
                  priority
                  sizes="(max-width: 800px) 100vw, 800px"
                  style={{ objectFit: "cover" }}
                  className="rounded-lg shadow-md shadow-amber-500"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent w-[675px] rounded-lg h-auto mx-auto"></div>

                {/* Text Content */}
                <div className="absolute bottom-24 z-10 w-3/4 right-16 text-white px-4">
                  <h2 className="text-[37px] font-bold text-amber-500">{img.title}</h2>
                  <p className="text-sm text-gray-300">{img.description}</p>
                </div>
                <Button as={Link} color="warning" className="absolute left-20 bottom-20" href={img.link_url}>
                  ورود
                </Button>
              </motion.div>
            </AnimatePresence>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}