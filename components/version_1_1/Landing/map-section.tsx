"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Phone, Mail, Copy } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function MapSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [copied, setCopied] = useState(null);

  const copyToClipboard = (text: any, type: any) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section
      className="py-16 bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-black text-gray-900 dark:text-gray-100"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-700 bg-clip-text text-transparent">
            دفتر مرکزی ما
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            با ما در ارتباط باشید
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8">
          <motion.div
            className="md:w-full h-[400px] bg-transparent rounded-xl overflow-hidden shadow-md"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d315.66023604767304!2d48.28532501583919!3d30.3332863407595!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fc44ef11644e37d%3A0x7000779d9dc22a3b!2zODdNUCs1NVDYjCDYsdmF24zZhNmH2Iwg2KfbjNix2KfZhg!5e0!3m2!1sfa!2s!4v1741833184915!5m2!1sfa!2s"
              className="w-full h-[400px]"

              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>

          <motion.div
            className="md:w-1/3 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-right"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-100">
              اطلاعات تماس
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-end gap-3">
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    آدرس دفتر مرکزی
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    تهران، خیابان ولیعصر، پلاک ۱۲۳
                  </p>
                </div>
                <MapPin className="w-5 h-5 text-pink-500 flex-shrink-0 dark:text-pink-400" />
              </div>

              <div className="flex items-center justify-end gap-3">
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    شماره تماس
                  </p>
                  <Link
                    href="tel:02112345678"
                    className="text-gray-600 dark:text-gray-400 hover:underline"
                  >
                    ۰۲۱-۱۲۳۴۵۶۷۸
                  </Link>
                </div>
                <Phone
                  className="w-5 h-5 text-purple-500 flex-shrink-0 dark:text-purple-400"
                  onClick={() => copyToClipboard("02112345678", "phone")}
                />
                {copied === "phone" && (
                  <span className="text-xs text-green-500">کپی شد!</span>
                )}
              </div>

              <div className="flex items-center justify-end gap-3">
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    ایمیل
                  </p>
                  <Link
                    href="mailto:info@example.com"
                    className="text-gray-600 dark:text-gray-400 hover:underline"
                  >
                    info@example.com
                  </Link>
                </div>
                <Mail
                  className="w-5 h-5 text-pink-500 flex-shrink-0 dark:text-pink-400"
                  onClick={() => copyToClipboard("info@example.com", "email")}
                />
                {copied === "email" && (
                  <span className="text-xs text-green-500">کپی شد!</span>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
