"use client";

import type React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, Download, Award } from "lucide-react";
import { LogoIcon } from "../ui/icons";
import { Button, Link as Hlink } from "@heroui/react";

type FooterLinkProps = {
  href: string;
  children: React.ReactNode;
};

const FooterLink = ({ href, children }: FooterLinkProps) => {
  return (
    <motion.div
      whileHover={{ x: 5 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <Link
        href={href}
        className="flex items-center text-foreground-500 hover:text-amber-500 transition-colors duration-200"
      >
        <ChevronLeft className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100" />
        {children}
      </Link>
    </motion.div>
  );
};

const FooterSection = ({
  title,
  links,
  delay = 0,
}: {
  title: string;
  links: { text: string; href: string }[];
  delay?: number;
}) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        staggerChildren: 0.1,
        delayChildren: delay + 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className="flex flex-col space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-medium font-bold text-foreground-900  border-primary-500 pr-2">
        {title}
      </h3>
      <div className="flex flex-col space-y-2">
        {links.map((link, index) => (
          <motion.div key={index} variants={itemVariants} className="group">
            <FooterLink href={link.href}>{link.text}</FooterLink>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const Footer = () => {
  const learnWithUs = [
    { text: "کلاس خصوصی", href: "/private_class" },
    { text: "کلاس عمومی", href: "/public_class" },
    { text: "مشاوره سریع", href: "/community/chat/?query=fast-consultation" },
    { text: "دیباگ فوری", href: "/community/chat/?query=urgent-debug" },
    { text: "صحبت با مدرسین", href: "/community/chat/?query=ask-teacher" },
    // { text: "مزایده، مناقصه آموزش ها", href: "/" },
  ];

  const aboutUs = [
    { text: "درباره ما", href: "/about-us" },
    { text: "تماس با ما", href: "/contact-us" },
    { text: "سوالات متداول", href: "/faq" },
  ];

  const workWithUs = [
    { text: "مشاغل در دیباگچی", href: "/" },
    { text: "کلاس خصوصی", href: "/" },
    { text: "کلاس عمومی", href: "/" },
    { text: "مشاوره", href: "/" },
    { text: "دیباگ", href: "/" },
  ];

  const instructorsByTopic = [
    { text: "وب", href: "/community/chat/?query=web?mode=find_t" },
    { text: "وردپرس", href: "/community/chat/?query=web?mode=find_t" },
    { text: "اپلیکیشن", href: "/community/chat/?query=web?mode=find_t" },
    { text: "امنیت", href: "/community/chat/?query=web?mode=find_t" },
    { text: "بلاکچین", href: "/community/chat/?query=web?mode=find_t" },
    { text: "همه", href: "/community/chat/?query=web?mode=find_t" },
  ];

  const backgroundVariants = {
    initial: {
      backgroundPosition: "0% 0%",
    },
    animate: {
      backgroundPosition: "100% 100%",
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse" as const,
        duration: 20,
      },
    },
  };

  return (
    <footer className="w-full mx-auto mt-14 overflow-hidden" dir="rtl">
      <motion.div
        className=" bg-gradient-to-br from-amber-50 to-amber-100 dark:from-gray-950 dark:to-amber-950 p-8 shadow-sm"
        variants={backgroundVariants}
        initial="initial"
        animate="animate"
      >
        <div className="w-full grid grid-cols-2 ">
          <div className="flex flex-col gap-4 h-full ">
            <div className="w-full">
              <LogoIcon />
            </div>
            <div className="grid grid-cols-2 gap-4 h-full ">
              {[
                {
                  name: "خدمات فوری دیباگچی",
                  url: "/community/chat/?query=urgent",
                },
                {
                  name: "کسب درآمد از دیباگچی",
                  url: "/",
                },
              ].map((item) => {
                return (
                  <Button
                    variant="flat"
                    color="warning"
                    className="h-3/4"
                    key={item.name}
                  >
                    <Link
                      href={item.url}
                      className="w-full h-full flex items-center justify-center"
                    >
                      {item.name}
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-right max-w-4xl">
            <FooterSection
              title="با ما بیاموزید"
              links={learnWithUs}
              delay={0.1}
            />
            <FooterSection
              title="با ما آشنا شوید"
              links={aboutUs}
              delay={0.2}
            />
            <FooterSection
              title="با ما کار کنید"
              links={workWithUs}
              delay={0.3}
            />
            <FooterSection
              title="مدرسین بر اساس موضوع"
              links={instructorsByTopic}
              delay={0.4}
            />
          </div>
        </div>

        <div className="w-full border-t border-white border-dashed mx-auto mt-6"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 pt-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6 ">
            <motion.div
              // whileHover={{ scale: 1.02 }}
              className=" p-4 rounded-lg shadow-sm flex items-center justify-center h-64 border"
            >
              {/* <Download className="w-6 h-6 text-amber-500" />
              <div className="text-right">
                <h4 className="font-bold text-foreground-700">نصب وب اپلیکیشن دیباگچی</h4>
                <p className="text-sm text-foreground-500">دسترسی سریع به خدمات ما</p>
              </div> */}
            </motion.div>

            <motion.div
              // whileHover={{ scale: 1.02 }}

              className=" p-4 border rounded-lg shadow-sm h-64 grid grid-cols-3 gap-4"
            >
              <div className="border"></div>
              <div className="border"></div>
              <div className="border"></div>
              <div className="border"></div>
              <div className="border"></div>
              <div className="border"></div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex items-center justify-center  text-center bg-amber-950"
      >
        <motion.span initial={{ opacity: 0.5 }} whileInView={{ opacity: 1 }} className="text-sm text-gray-600">
          © {new Date().getFullYear()} دیباگچی - تمامی حقوق محفوظ است
        </motion.span>
      </motion.div> */}
    </footer>
  );
};

export default Footer;

// import { Calendar, DateValue } from "@heroui/react";
// import {I18nProvider} from "@react-aria/i18n";
// import {today, getLocalTimeZone} from "@internationalized/date";

//   <I18nProvider locale="fa-IR">
//   <Calendar  aria-label="Date (International Calendar)" defaultValue={today(getLocalTimeZone())} className="text-orange-500"  />
// </I18nProvider>
