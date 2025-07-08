"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="py-16 md:py-24 overflow-hidden bg-pink-50 dark:bg-gray-900/80">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            className="md:w-1/2 text-right order-2 md:order-1"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-xl md:text-2xl font-bold mb-4 leading-tight text-foreground">
              دیابگچی یک هوش مصنوعی پیشرفته است که ارتباط سریع و آسان با متخصصان
              برنامه نویسی را برای آموزش، مشاوره و دیباگ ، فراهم میکند
            </h1>
            <p className="text-sm md:text-sm text-gray-500 mb-8">
              برای شروع کافیه که درخواست خدمات فوری را کلیک کنید ، ما در تما
              مراحل شمارو همراهی و راهنمایی میکنیم
            </p>
            <motion.a
              href="/"
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              شروع کنید
            </motion.a>
          </motion.div>

          <motion.div
            className="md:w-1/2 order-1 md:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="/ai/image/ai_1.jpg"
                alt="مدیریت کسب و کار"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
