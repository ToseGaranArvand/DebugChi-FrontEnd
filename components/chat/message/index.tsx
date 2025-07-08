import { Avatar, Button } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RootState, useAppSelector } from "@/redux/store/store";
import { ArrowRightIcon, Check, Copy, Volume1, VolumeX } from "lucide-react";
import Cookies from "js-cookie";
import { Main } from "@/components/types/user.types";

type Props = {
  person: boolean;
  message: string;
  analyze?: boolean;
  sound?: string;
};

const Message = (props: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [user_data, setUserData] = useState<Main>();
  const user = localStorage.getItem("user_data");

  useEffect(() => {
    if (user) {
      setUserData(JSON.parse(user));
    }
  }, []);

  // آماده سازی صدا در useEffect
  useEffect(() => {
    if (props.sound) {
      const newAudio = new Audio(props.sound);
      newAudio.onended = () => {
        setIsPlaying(false);
      };
      setAudio(newAudio);
    }
  }, [props.sound]);

  const togglePlayPause = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        // پخش صدا با تأخیر ۲ ثانیه‌ای
        setTimeout(() => {
          audio.play();
          setIsPlaying(true);
        }, 2000);
      }
    }
  };

  const { delay } = useAppSelector((state: RootState) => state.aiQuestion);

  const words = props.message.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const wordAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const analyzeContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
        staggerDirection: -1,
      },
    },
  };

  const analyzeWordAnimation = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
      },
    }),
  };

  if (props.person) {
    return (
      <div
        className="w-full h-auto box-border p-4 flex flex-col justify-center items-end"
        dir="rtl"
      >
        {delay.state && delay.message === props.message ? (
          <div className="w-full flex-1 flex justify-end">
            <div className="w-5 h-5 bg-foreground-500 rounded-full animate-pulse flex-row-reverse"></div>
          </div>
        ) : (
          <>
            <div
              className="w-full flex flex-col h-auto box-border p-4 gap-4 font-iranSans"
              dir="ltr"
            >
              <div className="flex gap-2 items-center h-auto">
                {/* <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0"> */}
                <Avatar
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnhASaYjeDzOkzQX9Q3UCafoh61EfV3mtVkw&s"
                  name="Name"
                  size="sm"
                />
                <span>debugchi.io</span>
              </div>

              {/* </div> */}
              <div
                className={`flex flex-col gap-2 relative max-w-96 font-sans rounded-2xl bg-gray-100 dark:bg-stone-800 text-foreground-800 text-right px-4 py-2`}
              >
                <span className="break-words whitespace-pre-wrap font-mediumSans">
                  {props.message}
                </span>
              </div>
              <div className="flex gap-2">
                {props.sound && (
                  <div>
                    <Button
                      isIconOnly
                      startContent={
                        isPlaying ? (
                          <VolumeX className="text-stone-500" />
                        ) : (
                          <Volume1 className="text-stone-500" />
                        )
                      }
                      size="sm"
                      variant="light"
                      onPress={togglePlayPause}
                    ></Button>
                  </div>
                )}
                <Button
                  startContent={<Copy size={16} />}
                  isIconOnly
                  variant="light"
                  size="sm"
                  className="text-stone-500"
                ></Button>
              </div>
            </div>

            {/* <div className="flex gap-2 items-center flex-row-reverse">
              <Avatar
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnhASaYjeDzOkzQX9Q3UCafoh61EfV3mtVkw&s"
                name="Name"
                size="sm"
              />
              <span>debugchi.io</span>
            </div>
            <div className="w-max box-border min-h-14 pr-10 rounded-bl-full flex items-center justify-end">
              {props.analyze ? (
                <motion.div
                  className="flex flex-wrap gap-x-1 justify-end"
                  variants={analyzeContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {words.map((word, index) => (
                    <motion.span
                      key={index}
                      variants={wordAnimation}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  className="flex flex-wrap gap-x-1 justify-end"
                  variants={container}
                  initial="hidden"
                  animate="visible"
                >
                  {words.map((word, index) => (
                    <motion.span
                      key={index}
                      variants={wordAnimation}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </div> */}
          </>
        )}
      </div>
    );
  } else {
    return (
      <div className="w-full box-border p-4 flex flex-col rounded-lg" dir="rtl">
        <div className="min-w-10 flex flex-col p-4 box-border rounded-lg  ">
          <div className="flex gap-2 items-center">
            <Avatar
              src={user_data && `${process.env.server}/${user_data?.image_profile}` || ""}
              name={user_data &&  user_data?.first_name || "کاربر"}
              size="sm"
            />
            <span>
              { user_data && user_data?.first_name + " " + user_data?.last_name ||"کاربر عادی"}
            </span>
          </div>
          <div className="w-max box-border min-h-14 pr-10 rounded-bl-full flex gap-4 items-center">
            <motion.div
              className="flex flex-wrap gap-x-1 justify-end bg-stone-800 rounded-xl max-w-96 px-4 py-2"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {words.map((word, index) => (
                <motion.span
                  key={index}
                  variants={wordAnimation}
                  className="inline-block text-foreground-500"
                >
                  {word} 
                </motion.span>
              ))}
            </motion.div>
            {/* <Check size={20} /> */}
          </div>
        </div>
      </div>
    );
  }
};

export default Message;
