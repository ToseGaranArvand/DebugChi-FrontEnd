"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const PhoneForm = () => {
  const [phone, setPhone] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("شماره تلفن ارسال شده:", phone)
    setPhone("")
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
    >
      <div className="flex items-center bg-white bg-opacity-20 rounded-lg overflow-hidden">
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="شماره تلفن خود را وارد کنید"
          className="appearance-none bg-transparent border-none w-full text-white placeholder-gray-300 py-3 px-4 leading-tight focus:outline-none text-right"
          required
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-shrink-0 bg-white text-purple-600 font-bold py-3 px-6 rounded-r-lg transition duration-300 ease-in-out hover:bg-purple-100"
          type="submit"
        >
          ثبت‌نام
        </motion.button>
      </div>
    </motion.form>
  )
}

export default PhoneForm

