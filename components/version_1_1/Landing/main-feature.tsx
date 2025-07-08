"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function MainFeature() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-900" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image src="/placeholder.svg?height=400&width=600" alt="ابزارهای یکپارچه" fill className="object-cover" />
            </div>
          </motion.div>

          <motion.div
            className="md:w-1/2 text-right"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-700 bg-clip-text text-transparent">
              ابزارهای یکپارچه برای افزایش بهره‌وری
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              با مجموعه ابزارهای ما، فرآیندهای داخلی شرکت خود را به آسانی کنترل کنید. سیستم یکپارچه ما امکان مدیریت تمام
              بخش‌های کسب و کار شما را فراهم می‌کند.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              از مدیریت مشتریان تا کنترل موجودی، از برنامه‌ریزی پروژه‌ها تا تحلیل مالی، همه در یک پلتفرم واحد در دسترس
              شماست.
            </p>
            <motion.button
              className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              اطلاعات بیشتر
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}