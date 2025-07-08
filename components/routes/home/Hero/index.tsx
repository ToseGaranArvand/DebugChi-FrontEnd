"use client"

import { motion } from "framer-motion"
import AnimatedBackground from "@/components/Tools/AnimatedBackground"
import PhoneForm from "./PhoneForm"
import RotatingBenefits from "./RotatingBenefits"

const Hero = () => {
  return (
    <section className=" w-full h-[400px] flex items-center justify-center overflow-hidden">
      <AnimatedBackground />
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            استاد دیباگ و برنامه‌نویسی شوید
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-10 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            به کلاس‌های خصوصی و عمومی ما بپیوندید و مهارت‌های خود را ارتقا دهید
          </motion.p>
          <PhoneForm />
          <RotatingBenefits />
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <svg
          className="w-10 h-10 text-white animate-bounce"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </motion.div>
    </section>
  )
}

export default Hero

