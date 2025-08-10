"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { UserMainComment } from "@/components/types/user.types";
import { User } from "@heroui/react";

export default function Testimonials({
  comments,
}: {
  comments: UserMainComment[];
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const totalPages = Math.ceil(comments.length / 2);

  const nextPage = () => {
    setDirection(1);
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setDirection(-1);
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visibleTestimonials = comments.slice(
    currentPage * 2,
    currentPage * 2 + 2
  );

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const pageVariants = {
    enter: (direction: any) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    },
    exit: (direction: any) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    }),
  };

  return (
    <motion.div
      className="w-full  text-white py-16 px-4 md:px-8 rounded-3xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      dir="ltr"
    >
      <motion.div
        className="w-full"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <div className="flex items-center gap-3 mb-4" dir="rtl">
            <div className="w-5 h-5 rounded-full bg-white"></div>
            <h3 className="text-3xl font-bold bg-gradient-to-r to-violet-500 from-white bg-clip-text text-transparent">
              نظراتی که راجب خدمات من ثبت شده
            </h3>
          </div>
        </motion.div>

        <AnimatePresence mode="wait" custom={direction}>
            {visibleTestimonials.length === 0 && <div className="w-full h-40 rounded-2xl border border-dashed border-slate-800 flex items-center justify-center">کامنتی ثبت نشده</div> }

          <motion.div
            key={currentPage}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="grid md:grid-cols-2 gap-6 mb-8"
          >
            {visibleTestimonials.map((testimonial, index) => (
              <motion.div
                dir="rtl"
                key={testimonial.id}
                className="bg-zinc-900 rounded-xl p-6 relative overflow-hidden"
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 30px rgba(139, 92, 246, 0.2)",
                  transition: { duration: 0.2 },
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: index * 0.2 + 0.5 },
                }}
              >
                <motion.div
                  className="flex items-center mb-4"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.7 }}
                >
            
                    <User
                      avatarProps={{
                        src: testimonial.commented_user.image_profile,
                        name:
                          testimonial.commented_user.first_name +
                          " " +
                          testimonial.commented_user.last_name,
                      }}
                      description={testimonial.commented_user.username}
                      name={
                        testimonial.commented_user.first_name +
                        " " +
                        testimonial.commented_user.last_name
                      }
                    />
             
                </motion.div>

                <div className="flex mb-4">
                  {[...Array(testimonial.rate)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.8 + i * 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      <Star className="w-5 h-5 fill-violet-500 text-violet-500" />
                    </motion.div>
                  ))}
                </div>

                <motion.p
                  className="text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 1.3 }}
                >
                  {testimonial.description}
                </motion.p>

                <motion.div
                  className="absolute top-6 right-6 text-gray-600 opacity-20"
                  initial={{ rotate: -10, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 0.2 }}
                  transition={{
                    delay: index * 0.2 + 1.5,
                    type: "spring",
                    stiffness: 100,
                  }}
                >
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.5 8.5L4.5 8.5L4.5 13.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.5 8.5C7.5 8.5 9.5 10.5 9.5 13.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19.5 8.5L14.5 8.5L14.5 13.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14.5 8.5C17.5 8.5 19.5 10.5 19.5 13.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>

                <motion.div
                  className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-violet-500/5"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 5,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="flex justify-center items-center gap-4"
          variants={itemVariants}
        >
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <motion.button
                key={i}
                onClick={() => {
                  setDirection(i > currentPage ? 1 : -1);
                  setCurrentPage(i);
                }}
                className={`w-2 h-2 rounded-full ${
                  currentPage === i ? "bg-violet-500" : "bg-gray-600"
                }`}
                aria-label={`Go to page ${i + 1}`}
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.9 }}
                animate={
                  currentPage === i
                    ? {
                        scale: [1, 1.3, 1],
                        transition: {
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                          duration: 1.5,
                        },
                      }
                    : { scale: 1 }
                }
              />
            ))}
          </div>
            {
              visibleTestimonials.length > 0 
              &&  <div className="flex gap-2 ml-4">
            <motion.button
              onClick={prevPage}
              className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-violet-900 transition-colors"
              aria-label="Previous page"
              whileHover={{ scale: 1.1, borderColor: "#8b5cf6" }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={nextPage}
              className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center hover:bg-violet-700 transition-colors"
              aria-label="Next page"
              whileHover={{ scale: 1.1, backgroundColor: "#7c3aed" }}
              whileTap={{ scale: 0.9 }}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
            }
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
