"use client";

import { motion } from "framer-motion";
import AudioPlayer from "./AudioPlayer";

interface ChatMessageProps {
  message: string;
  isUser?: boolean;
  audioSrc?: string;
}

const ChatMessage = ({ message, isUser = false, audioSrc }: ChatMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          isUser
            ? "bg-lime-100 text-black rounded-tr-none"
            : "bg-gray-200 dark:bg-c_secondary text-foreground rounded-tl-none"
        }`}
      >
        <div className="flex items-start gap-2">
          {!isUser && audioSrc && <AudioPlayer audioSrc={audioSrc} />}
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
