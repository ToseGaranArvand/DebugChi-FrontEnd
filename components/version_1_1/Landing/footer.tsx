"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Instagram, Twitter, Linkedin, Facebook } from "lucide-react"

export default function Footer() {
  const footerLinks = [
    {
      title: "شرکت",
      links: ["درباره ما", "تماس با ما", "مشاغل", "خبرنامه"],

    },
    {
      title: "محصولات",
      links: ["ویژگی‌ها", "قیمت‌ گذاری", "مستندات", "راهنما"],
    },
    {
      title: "منابع",
      links: ["وبلاگ", "راهنمای کاربر", "پشتیبانی", "آموزش‌ها"],
    },
    {
      title: "قانونی",
      links: ["حریم خصوصی", "شرایط استفاده", "امنیت", "حق کپی"],
    },
  ]

  return (
    <footer className="bg-gradient-to-r from-purple-900 to-pink-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-right">
          {footerLinks.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-lg font-bold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-700">
          <motion.div
            className="text-xl font-bold mb-4 md:mb-0 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            سیستم مدیریت
          </motion.div>

          <motion.div
            className="flex space-x-4 mb-4 md:mb-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="#" className="text-gray-300 hover:text-white transition-colors">
              <Instagram size={20} />
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white transition-colors">
              <Twitter size={20} />
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white transition-colors">
              <Linkedin size={20} />
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white transition-colors">
              <Facebook size={20} />
            </Link>
          </motion.div>

          <motion.div
            className="text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            © ۱۴۰۴ تمام حقوق محفوظ است.
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

