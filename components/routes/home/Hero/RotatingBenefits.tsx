"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const benefits = [
  "کلاس خصوصی رایگان",
  "کلاس عمومی رایگان",
  "درخواست دیباگ رایگان",
  "دسترسی به منابع آموزشی",
  "پشتیبانی ۲۴/۷",
  "گواهینامه معتبر",
]

const RotatingBenefits = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % benefits.length)
    }, 3000) // تغییر هر 3 ثانیه

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="mt-12 text-white text-2xl font-bold"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      suppressHydrationWarning
    >
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {benefits[currentIndex]}
      </motion.div>
    </motion.div>
  )
}

export default RotatingBenefits

