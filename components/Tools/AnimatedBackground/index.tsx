"use client"

import { motion } from "framer-motion"
import React from "react"

const AnimatedBackground = () => {
  return (
    <div className="inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-bl from-blue-500 to-purple-600" />
      {[...Array(50)].map((_, i) => (
        <motion.div
        suppressHydrationWarning
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            top: `${Math.random() * 100}%`,
            right: `${Math.random() * 100}%`,
          }}
          animate={{
            y: ["0%", "100%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

export default AnimatedBackground

