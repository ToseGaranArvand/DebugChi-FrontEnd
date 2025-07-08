"use client"

import { motion } from "framer-motion";
import { BarChart3, Zap, Users, PieChart } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <BarChart3 className="w-10 h-10 text-pink-500" />,
      title: "مدیریت آسان",
      description: "با چند کلیک فرآیندهای کاری خود را سامان دهید.",
    },
    {
      icon: <Zap className="w-10 h-10 text-purple-500" />,
      title: "عملکرد سریع",
      description: "سرعت بالا در پردازش اطلاعات و گزارش‌گیری.",
    },
    {
      icon: <Users className="w-10 h-10 text-pink-500" />,
      title: "مدیریت مشتریان",
      description: "ارتباط موثر با مشتریان و پیگیری سفارشات.",
    },
    {
      icon: <PieChart className="w-10 h-10 text-purple-500" />,
      title: "تحلیل داده‌ها",
      description: "گزارش‌های تحلیلی برای تصمیم‌گیری بهتر.",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-16 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-700 bg-clip-text text-transparent">
            ویژگی‌های برتر
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            با استفاده از امکانات پیشرفته ما، کسب و کار خود را به سطح بالاتری ببرید
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-right"
              variants={item}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}