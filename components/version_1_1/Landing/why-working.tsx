"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  ShieldCheck,
  Clock,
  MessageSquare,
  BarChart,
  Smartphone,
  Globe,
  Zap,
  icons,
} from "lucide-react";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Lottie from "lottie-react";
// import monitor from "@/public/lottie/monitor.json";
// import coff from "@/public/lottie/coffee_1.json";
// import coffe_2 from "@/public/lottie/coffee_2.json";
import Image from "next/image";
export default function WhyWorkingWithUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const features = [
    {
      //   icon: <LineChart className="w-8 h-8 text-pink-500" />,
      icon: '/landing/working_with_us/4.svg',
      title: " همیشه آماده کمک",
      description:
        "به جای اینکه شما منتظر برنامه نویس باشید، برنامه نویس منتظر شماست. برنامه نویسان همیشه هر کجای جهان منتظر درخواست شما هستند.",
    },
    {
      icon:'/landing/working_with_us/3.jpg',

      title: "کاهش هزینه",
      description:
        "در دیباگچی قبل از دریافت خدمات میدانید قیمت ها کاملا منصفانه و به دور از سلیقه برنامه نویس تعیین می شوند",
    },
    {
      icon:'/landing/working_with_us/5.svg',
      title: "پشتیبانی ۲۴ ساعتها",
      description:
        "اگر مشکلی در طول دریافت خدمات رخ دهد یا هر پرسشی درباره قیمت یا شرایط برنامه نویس دارید ، تیم پشتیبانی دیباگچی به صورت تمام وقت پاسخ گوی شماست",
    },
    {
      icon: '/landing/working_with_us/6.svg',
      title: "متخصصین حرفه ای و با تجربه",
      description:
        "متخصصین حرفه ای و با تجربه از برنامه نویسان دیباگچی توسط یک آزمون کامل تعیید سطح می شوند و متناول با مشکل شما ، کاربر  مناسب به شما پیشنهاد داده میشه",
    },
  ];
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      className="py-16"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-foreground-900 ">
            چرا کاربران با ما کار میکنند؟
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col h-96 items-center gap-4 bg-white dark:bg-gray-800 p-5  shadow-xl hover:shadow-2xl transition-shadow text-right rounded-3xl"
              variants={item}
            >
              <div className="mt-1 w-36 h-36">
                {/* <Lottie animationData={feature.icon} loop /> */}
                <Image src={feature.icon} width={300} height={300} alt={feature.title}/>
              </div>
              <div className="flex-1 flex flex-col gap-6">
                <h3 className="text-xl font-bold mb-1 text-gray-800 dark:text-gray-200">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-md">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
