"use client";
import React, { useEffect, useRef, useState } from "react";
import { Questions } from "@/data/AIQuestion";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store/store";
import {
  showQuestion,
  setSelectedCategory,
  clearAddedAnswers,
} from "@/redux/slices/aiSlice";
import { motion } from "framer-motion";
import UserMessage from "../message";
import { Button } from "@heroui/react";
import { setWelcome } from "@/redux/slices/globalSlice";

const AiContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { question_id, selected_category, conversation } = useAppSelector(
    (state) => state.aiQuestion
  );
  const {welcome}  = useAppSelector((state:RootState)=>state.gloabal)

  useEffect(() => {
    // اگر هنوز selected_category ست نشده، بذار استارتر بشه
    if (!selected_category) {
      const foundCategory = Questions.find((q) =>
        q.category.toLowerCase().includes("starter")
      );
      if (foundCategory) {
        dispatch(setSelectedCategory(foundCategory));
        dispatch(showQuestion(0));
      }
    }
  }, [dispatch, selected_category]);

  // هر بار سوال عوض می‌شود، پاسخ‌های سفارشی را پاک کن
  useEffect(() => {
    dispatch(clearAddedAnswers());
  }, [question_id, dispatch]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversation]);

  if (!selected_category) {
    return <p className="text-gray-500">سوالی برای این دسته‌بندی یافت نشد.</p>;
  }

if(welcome){
  return (
    <div className="w-full mx-auto h-full flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <span className="text-7xl animate-pulse">🎉</span>
          <h1 className="text-4xl my-2">خوش آمدید</h1>
          <p>
            در نهایت، مشکل برنامه نویسی شما حل شدنیه! با ما همراه باشید تا بدون
            دردسر، سریع و دقیق، مشکل شما را بررسی و حل کنیم
            <br />
            <br />
            بیایید با یک پرسش و پاسخ سریع برای پیدا کردن متخصص مناسب شروع کنیم.
          </p>
        </div>

        {/* <AiMesage message="به سیستم هوش مصنوعی خوش آمدید" audio="" /> */}

        <div className="my-8">
          <p className="text-gray-600 mb-4">
            لطفاً برای شروع پاسخگویی به سوالات روی دکمه زیر کلیک کنید.
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
            onPress={()=>dispatch(setWelcome(false))}
              variant="solid"
              color="secondary"
              className="w-full py-3"
            >
              شروع
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}




  return (
    <div className="w-3/4 mx-auto flex-1 flex flex-col items-center p-4">
      <div className="w-full flex justify-start flex-col">
        <div className="h-[calc(100vh-300px)] overflow-y-auto" ref={scrollRef}>
      
          {conversation.map((item, index) => {
            return (
              <UserMessage
                key={index}
                person={item.ai}
                message={item.message}
                analyze={item.analyze}
                sound={item.sound}
              />
            );
          })}
        </div>
      </div>

      <motion.div
        key={question_id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6"></div>
      </motion.div>
    </div>
  );
};

export default React.memo(AiContent);
