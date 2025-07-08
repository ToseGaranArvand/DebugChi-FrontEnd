"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import AiContent from ".";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store/store";
import {
  setAiConversation,
  setClearAi,
  setDelay,
  setSelectedCategory,
} from "@/redux/slices/aiSlice";
import { useSearchParams } from "next/navigation";
import { Questions } from "@/data/AIQuestion";
import Cookies from "js-cookie";
import SendMessageButton from "@/components/chatApp/send-button";
import { ArrowUp, MessageCircleCode } from "lucide-react";
import { setFindUser } from "@/redux/slices/globalSlice";

const AiWelcome: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const dispatch = useAppDispatch();
  const [message_id, setMessageId] = useState(0);

  
  const filterMode: any = Questions.find(
    (item) => item.category == "starter"
  );
  useEffect(() => {
    const check_start = Cookies.get("started");
   
    if (check_start == "true") {
      setShowHelp(true);
      dispatch(
        setAiConversation({
          ai: true,
          message: filterMode?.questions[0].question || "",
          sound: filterMode?.questions[0].sound || "",
        })
      );
      dispatch(
        setDelay({
          state: true,
          message: filterMode?.questions[0].question || "",
        })
      );
      dispatch(setSelectedCategory(filterMode));
      setTimeout(() => {
        dispatch(
          setDelay({
            state: false,
            message: "",
          })
        );
      }, 1500);
    }
  }, []);

  const handleQuestion = () => {
    // Cookies.set("started", "true");
   

    setStarted(true);
    dispatch(
      setAiConversation({
        ai: true,
        message: filterMode?.questions[0].question || "",
        sound: filterMode?.questions[0].sound || "",
      })
    );
    dispatch(
      setDelay({
        state: true,
        message: filterMode?.questions[0].question || "",
      })
    );
    dispatch(setSelectedCategory(filterMode));
    setTimeout(() => {
      dispatch(
        setDelay({
          state: false,
          message: "",
        })
      );
    }, 1500);
  };

  const showMessage = (id: number) => {
    setMessageId(id);
  };

  const showQuestion = (id: number) => {
    if (id == 2){
      dispatch(setClearAi())
      dispatch(setFindUser(false))
      Cookies.remove('started')
      setStarted(true);
      dispatch(   
        setAiConversation({
          ai: true,
          message: filterMode?.questions[0].question || "",
          sound: filterMode?.questions[0].sound || "",
        })
      );
      dispatch(
        setDelay({
          state: true,
          message: filterMode?.questions[0].question || "",
        })
      );
      dispatch(setSelectedCategory(filterMode));
      setTimeout(() => {
        dispatch(
          setDelay({
            state: false,
            message: "",
          })
        );
      }, 1500);
    }


  };

  if (started) {
    return <AiContent />;
  } else if (showHelp) {
    return (
      <div className="w-full flex-1 h-full flex flex-col items-center justify-end ">
        <div className="flex-1 w-full flex flex-col items-center justify-center gap-1">
          <MessageCircleCode className="stroke-lime-300" size={64} />
          <span className="text-4xl mb-20">چطور میتونم کمکت کنم؟</span>
        </div>
        <div
          className=" w-[56%] min-h-[150px] grid grid-cols-2 gap-4 mb-4"
          id="questions"
        >
          {[
            "به مشاوره نیاز دارم",
            "دیباگینگ میخوام",
            "به کلاس خصوصی نیاز دارم",
            "کلاس عمومی میخوام",
          ].map((item, index) => {
            return (
              <div
                key={index + 1}
                className="flex items-center justify-center gap-4  bg-gray-300 dark:bg-c_secondary px-4 box-border rounded-md"
                onMouseEnter={() => showMessage(index + 1)}
                onMouseLeave={() => setMessageId(0)}
              >
                <div className="flex-1 flex flex-col">
                  <h2
                    className={`font-mediumSans ${
                      message_id == index + 1 ? "text-lime-300" : "text-foreground"
                    }`}
                  >
                    {item}
                  </h2>
                </div>
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    message_id === index + 1
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  }`}
                >
                  <Button
                    isIconOnly
                    size="sm"
                    className="bg-lime-300"
                    startContent={<ArrowUp color="black" />}
                    onPress={() => handleQuestion}
                  ></Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex-1 h-full flex flex-col items-center justify-end ">
    <div className="flex-1 w-full flex flex-col items-center justify-center gap-1">
      <MessageCircleCode className="stroke-lime-300" size={64} />
      <span className="text-4xl mb-20">چطور میتونم کمکت کنم؟</span>
    </div>
    <div
      className=" w-[56%] min-h-[150px] grid grid-cols-2 gap-4 mb-4"
      id="questions"
    >
      {[
        "به مشاوره نیاز دارم",
        "دیباگینگ میخوام",
        "به کلاس خصوصی نیاز دارم",
        "کلاس عمومی میخوام",
      ].map((item, index) => {
        return (
          <div
            key={index + 1}
            className="flex items-center justify-center gap-4 bg-gray-300 dark:bg-c_secondary px-4 box-border rounded-md"
            onMouseEnter={() => showMessage(index + 1)}
            onMouseLeave={() => setMessageId(0)}
          >
            <div className="flex-1 flex flex-col">
              <h2
                className={`font-mediumSans ${
                  message_id == index + 1 ? "dark:text-lime-300" : "text-foreground"
                }`}
              >
                {item}
              </h2>
            </div>
            <div
              className={`transition-all duration-500 ease-in-out ${
                message_id === index + 1
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }`}
            >
              <Button
                isIconOnly
                size="sm"
                className="bg-lime-300"
                startContent={<ArrowUp color="black" />}
                onPress={handleQuestion}
              ></Button>
            </div>
          </div>
        );
      })}
    </div>
  </div>
    // <div className="w-full mx-auto h-full flex flex-col items-center justify-center p-4">
    //   <motion.div
    //     initial={{ opacity: 0, y: 20 }}
    //     animate={{ opacity: 1, y: 0 }}
    //     transition={{ duration: 0.5 }}
    //     className="text-center max-w-md"
    //   >
    //     <div className="flex flex-col items-center justify-center gap-4">
    //       <span className="text-7xl animate-pulse">🎉</span>
    //       <h1 className="text-4xl my-2">خوش آمدید</h1>
    //       <p>
    //         در نهایت، مشکل برنامه نویسی شما حل شدنیه! با ما همراه باشید تا بدون
    //         دردسر، سریع و دقیق، مشکل شما را بررسی و حل کنیم
    //         <br />
    //         <br />
    //         بیایید با یک پرسش و پاسخ سریع برای پیدا کردن متخصص مناسب شروع کنیم.
    //       </p>
    //     </div>

    //     {/* <AiMesage message="به سیستم هوش مصنوعی خوش آمدید" audio="" /> */}

    //     <div className="my-8">
    //       <p className="text-gray-600 mb-4">
    //         لطفاً برای شروع پاسخگویی به سوالات روی دکمه زیر کلیک کنید.
    //       </p>

    //       <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    //         <Button
    //           variant="solid"
    //           color="secondary"
    //           className="w-full py-3"
    //           onPress={handleQuestion}
    //         >
    //           شروع
    //         </Button>
    //       </motion.div>
    //     </div>
    //   </motion.div>
    // </div>
  );
};

export default AiWelcome;
