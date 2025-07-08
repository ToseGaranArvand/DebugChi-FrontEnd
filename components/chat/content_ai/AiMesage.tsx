import { Avatar } from "@heroui/react";
import React from "react";
import { motion } from "framer-motion";

type Props = {
  message: string;
  audio: string | "";
};

const AiMessage = (props: Props) => {
  // Split the message into words
  const words = props.message.split(" ");

  // Animation variants for container and words
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const wordAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="w-full h-auto box-border p-4 flex flex-col" dir="rtl">
         <div className="flex gap-2 items-center h-auto">
        <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
        <Avatar
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnhASaYjeDzOkzQX9Q3UCafoh61EfV3mtVkw&s"
          name="Name"
          size="sm"
        />
        <span>debugchi.io</span>
      </div>
        </div>
        <div
          className={`flex flex-col gap-2 relative max-w-96 font-sans rounded-2xl bg-gray-100 text-gray-800 px-4 py-2`}
        >
          <span className="break-words whitespace-pre-wrap">{props.message}</span>  
        </div>
      </div>
  )
}

export default AiMessage;
{/* <div className="flex gap-2 items-center">
  <Avatar
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnhASaYjeDzOkzQX9Q3UCafoh61EfV3mtVkw&s"
    name="Name"
    size="sm"
  />
  <span>debugchi.io</span>
</div>
<div
  className="w-max box-border min-h-14 pr-10 rounded-bl-full 
  flex items-center"
>
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
        className={"inline-block"}
      >
        {word}
      </motion.span>
    ))}
  </motion.div>
</div> */}
// </div>
