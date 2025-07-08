"use client"

import { motion } from "framer-motion";
import { LineChart, ShieldCheck, Clock, MessageSquare, BarChart, Smartphone, Globe, Zap } from "lucide-react";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function KeyFeatures() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const features = [
    {
      icon: <LineChart className="w-8 h-8 text-pink-500" />,
      title: "گزارش‌های دقیق",
      description: "گزارش‌های تحلیلی و آماری برای تصمیم‌گیری بهتر",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-purple-500" />,
      title: "امنیت بالا",
      description: "حفاظت از داده‌های شما با بالاترین استانداردهای امنیتی",
    },
    {
      icon: <Clock className="w-8 h-8 text-pink-500" />,
      title: "صرفه‌جویی در زمان",
      description: "خودکارسازی فرآیندها و کاهش زمان انجام کارها",
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-purple-500" />,
      title: "پشتیبانی ۲۴/۷",
      description: "پشتیبانی شبانه‌روزی برای رفع مشکلات احتمالی",
    },
    {
      icon: <BarChart className="w-8 h-8 text-pink-500" />,
      title: "تحلیل روندها",
      description: "شناسایی الگوها و روندهای کسب و کار",
    },
    {
      icon: <Smartphone className="w-8 h-8 text-purple-500" />,
      title: "دسترسی موبایل",
      description: "استفاده از سیستم در هر زمان و هر مکان",
    },
    {
      icon: <Globe className="w-8 h-8 text-pink-500" />,
      title: "پشتیبانی چندزبانه",
      description: "ارائه خدمات به مشتریان بین‌المللی",
    },
    {
      icon: <Zap className="w-8 h-8 text-purple-500" />,
      title: "عملکرد سریع",
      description: "سرعت بالا در پردازش اطلاعات و گزارش‌گیری",
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
    <section className="py-16 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-700 bg-clip-text text-transparent">
            ویژگی‌های کلیدی
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            امکانات متنوع برای پاسخگویی به تمام نیازهای کسب و کار شما
          </p>
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
              className="flex items-start gap-4 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow text-right"
              variants={item}
            >
              <div className="mt-1">{feature.icon}</div>
              <div>
                <h3 className="text-lg font-bold mb-1 text-gray-800 dark:text-gray-200">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
