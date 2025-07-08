"use client"
import { Calendar, RefreshCcw, ShoppingBag, Globe, Cloud, PiggyBank } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"
import type { Main } from "@/components/types/user.types"

export function ServiceFeatures() {
  const [user, setUser] = useState<Main | null>(null)

  useEffect(() => {
    const user_data = localStorage.getItem("user_data")
    if (user_data) {
      try {
        const parsedUser = JSON.parse(user_data)
        setUser(parsedUser)
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error)
      }
    }
  }, [])



  const is_debugger = user?.user_roles?.includes("debugger") ?? false


  const features = [
    {
      icon: Calendar,
      title: "آموزش رایگان",
      description: "دسترسی به دوره‌های آموزشی رایگان برای یادگیری مهارت‌های جدید",
      href: "/community?type=courses",
    },
    {
      icon: RefreshCcw,
      title: is_debugger ? "انجام سریع دیباگ" : "دریافت سریع دیباگ",
      description: is_debugger
        ? "کمک به رفع مشکلات برنامه‌نویسی دیگران به صورت سریع"
        : "دریافت کمک فوری برای رفع مشکلات برنامه‌نویسی",
      href: "/",
    },
    {
      icon: ShoppingBag,
      title: "مشاهده مدرسان دیباگچی",
      description: "مشاهده لیست مدرسان متخصص در زمینه دیباگ و رفع اشکال برنامه‌نویسی",
      href: "/community?type=debugers",
    },
    {
      icon: Globe,
      title: is_debugger ? "دریافت کلاس خصوصی" : "نیاز به کلاس خصوصی دارم",
      description: "درخواست کلاس خصوصی با مدرسان برای یادگیری اختصاصی و شخصی‌سازی شده",
      href: is_debugger ?  "/bid" : '/',
    },
    {
      icon: Cloud,
      title: "دریافت مشاوره فوری",
      description: "ارتباط سریع با مشاوران متخصص برای راهنمایی در مسیر یادگیری و توسعه",
      href: "/",
    },
    {
      icon: PiggyBank,
      title: "شرکت در مزایده و مناقصه",
      description: "مشارکت در پروژه‌های مزایده و مناقصه برای کسب درآمد و تجربه عملی",
      href: "/bid",
    },
  ]

  return (
    <div className="w-full bg-pink-50 dark:bg-slate-900 py-16 px-4 md:px-8 lg:px-16 relative overflow-hidden rounded-t-[100px] mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            ما سرویسی ایجاد کرده‌ایم که تمام نیازها را پوشش می‌دهد
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">از آموزش تا دیباگینگ برای پیشرفت شما</p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {features.map((feature, index) => (
            <Link key={index} href={feature.href} className="w-auto h-auto">
              <motion.div
                className="bg-white dark:bg-slate-950 rounded-2xl p-6 flex flex-col items-center text-center shadow-md shadow-pink-100 dark:shadow-slate-800 transition-transform duration-300 ease-in-out hover:shadow-lg hover:shadow-pink-200 dark:hover:shadow-slate-700 h-64"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 rounded-full bg-purple-400 dark:bg-purple-950 flex items-center justify-center mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm flex-grow">{feature.description}</p>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
