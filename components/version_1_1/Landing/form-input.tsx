"use client"

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ConsultationForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, phone, consent });
    setName("");
    setPhone("");
    setConsent(false);
  };

  return (
    <motion.div 
      className="w-full max-w-5xl mx-auto rounded-3xl overflow-hidden bg-[#b69cff] text-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex flex-col md:flex-row">
        <div className="p-8 md:p-12 flex flex-col justify-center md:w-1/2">
          <motion.h2 
            className="text-3xl md:text-4xl font-light mb-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            فرم درخواست
            <br />
            مشاوره رایگان
          </motion.h2>
          <p className="text-lg mb-8 opacity-90">ما در کمتر از یک ساعت با شما تماس خواهیم گرفت</p>

          <motion.form 
            onSubmit={handleSubmit} 
            className="flex flex-col gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="نام"
              className="px-4 py-3 rounded-full bg-white/20 placeholder-white/70 outline-none focus:bg-white/30 transition-colors"
              required
            />

            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="شماره تلفن"
              className="px-4 py-3 rounded-full bg-white/20 placeholder-white/70 outline-none focus:bg-white/30 transition-colors"
              required
            />

            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                id="consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="w-4 h-4 rounded"
                required
              />
              <label htmlFor="consent" className="text-sm">
                من با پردازش داده‌های شخصی خود موافقم
              </label>
            </div>

            <motion.button
              type="submit"
              className="mt-4 bg-white text-[#b69cff] font-medium py-3 px-6 rounded-full hover:bg-opacity-90 transition-opacity"
              whileHover={{ scale: 1.05 }}
            >
              ارسال درخواست
            </motion.button>
          </motion.form>
        </div>

        <div className="relative md:w-1/2 min-h-[300px] md:min-h-0 flex items-center justify-center">
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white">
            <Image
              src="/ai/image/ai_1.jpg"
              alt="مشاور"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
