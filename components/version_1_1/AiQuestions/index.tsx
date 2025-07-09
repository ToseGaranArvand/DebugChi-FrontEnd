"use client";

import type React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { perform_post, perform_chat_post } from "@/lib/api";

interface Message {
  id: number;
  text: string;
  displayText: string;
  isAI: boolean;
  isTyping?: boolean;
}

interface AICategory {
  id: number;
  title: string;
  sound?: string;
}

interface Main {
  ai_category: AICategory[];
  category_name: string;
  description: string;
  icon?: string;
  title: string;
}

type Props = {
  question: Main[];
};

export default function AiQuestion({ question }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Main | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<
    Array<{ role: string; content: string }>
  >([]);
  const [isQuestionPhase, setIsQuestionPhase] = useState(true);
  const [requestInfo, setRequestInfo] = useState<any>(null);
  const [requestType, setRequestType] = useState<string>("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [sessionId, setSessionId] = useState<string | null>(null);

  const adjustTextareaHeight = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  }, []);

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue, adjustTextareaHeight]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  useEffect(() => {
    const updateChatHeight = () => {
      if (chatContainerRef.current) {
        const header = document.querySelector("header");
        const inputContainer = document.querySelector(".input-container");

        const headerHeight = header?.clientHeight || 0;
        const inputHeight = inputContainer?.clientHeight || 0;

        const windowHeight = window.innerHeight;
        const chatHeight = windowHeight - headerHeight - inputHeight - 32;

        chatContainerRef.current.style.height = `${chatHeight}px`;
      }
    };

    updateChatHeight();
    window.addEventListener("resize", updateChatHeight);

    return () => {
      window.removeEventListener("resize", updateChatHeight);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [showChat]);

  useEffect(() => {
    messages.forEach((message, index) => {
      if (
        message.isAI &&
        message.displayText.length < message.text.length &&
        !message.isTyping
      ) {
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[index] = { ...message, isTyping: true };
          return newMessages;
        });

        const fullText = message.text;
        let currentIndex = 0;

        const typeNextChar = () => {
          if (currentIndex < fullText.length) {
            setMessages((prev) => {
              const newMessages = [...prev];
              newMessages[index] = {
                ...newMessages[index],
                displayText: fullText.substring(0, currentIndex + 1),
              };
              return newMessages;
            });
            currentIndex++;
            typingTimeoutRef.current = setTimeout(typeNextChar, 20);
          } else {
            setMessages((prev) => {
              const newMessages = [...prev];
              newMessages[index] = { ...newMessages[index], isTyping: false };
              return newMessages;
            });
          }
        };

        typingTimeoutRef.current = setTimeout(typeNextChar, 100);
      }
    });
  }, [messages]);

  useEffect(() => {
    if (showChat) {
      const welcomeMessage = `سلام! من اینجا هستم تا در زمینه ${selectedCategory?.category_name} به شما کمک کنم. چطور می‌تونم کمکتون کنم؟`;

      const initialAIMessage: Message = {
        id: 1,
        text: welcomeMessage,
        displayText: welcomeMessage,
        isAI: true,
      };

      setMessages([initialAIMessage]);
      setConversationHistory([{ role: "assistant", content: welcomeMessage }]);
      setIsQuestionPhase(true);
      setRequestInfo(null);
    }
  }, [showChat]);

  const handleSelectCategory = (item: Main) => {
    setSelectedCategory(item);

    if (item.category_name === "رفع اشکال") {
      setRequestType("debug");
    } else if (item.category_name === "مشاوره") {
      setRequestType("consultation");
    } else if (item.category_name === "کلاس خصوصی") {
      setRequestType("private_class");
    }
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() && !isSending && isQuestionPhase) {
      setIsSending(true);

      const userMessage: Message = {
        id: messages.length + 1,
        text: inputValue,
        displayText: inputValue,
        isAI: false,
      };

      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInputValue("");

      const updatedHistory = [
        ...conversationHistory,
        { role: "user", content: inputValue },
      ];
      setConversationHistory(updatedHistory);

      try {
        const response = await perform_chat_post("ai/chat/deepseek/", {
          message: inputValue,
          request_type: "debug",
        });

        const aiMessage: Message = {
          id: updatedMessages.length + 1,
          text: response.response,
          displayText: "",
          isAI: true,
        };

        setMessages([...updatedMessages, aiMessage]);
        setConversationHistory([
          ...updatedHistory,
          { role: "assistant", content: response.response },
        ]);

        setIsQuestionPhase(response.is_question_phase);

        if (!response.is_question_phase) {
          setRequestInfo(response.request_info);
        }
      } catch (error: any) {
        console.error("API Error:", error);
        let errorMessage = "خطا در ارتباط با سرور";

        if (error.response?.data?.detail) {
          errorMessage = error.response.data.detail;
        }

        const errorMessageObj: Message = {
          id: updatedMessages.length + 1,
          text: errorMessage,
          displayText: errorMessage,
          isAI: true,
        };

        setMessages([...updatedMessages, errorMessageObj]);
        setConversationHistory([
          ...updatedHistory,
          { role: "assistant", content: errorMessage },
        ]);
      } finally {
        setIsSending(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !isSending) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const StarIcon = () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 0L8.89064 5.10936L14 7L8.89064 8.89064L7 14L5.10936 8.89064L0 7L5.10936 5.10936L7 0Z"
        fill="#3C91FF"
      />
    </svg>
  );

  const AudioWaveformIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.3999 16.9999V3.99994C15.3999 3.62865 15.2524 3.27249 14.9899 3.00994C14.7437 2.76379 14.4153 2.61882 14.0693 2.60166L13.9999 2.5999C13.6286 2.5999 13.2725 2.74739 13.0099 3.00994C12.7474 3.27249 12.5999 3.62865 12.5999 3.99994V19.9999C12.5999 20.6895 12.326 21.3507 11.8384 21.8383C11.3508 22.3259 10.6895 22.5999 9.99994 22.5999C9.31038 22.5999 8.64898 22.3259 8.16139 21.8383C7.67382 21.3507 7.3999 20.6894 7.3999 19.9999V6.99994C7.3999 6.62864 7.25241 6.27249 6.98986 6.00994C6.74373 5.76381 6.41537 5.61883 6.06936 5.60166L5.99986 5.5999C5.62858 5.59991 5.27252 5.74741 5.00998 6.00994C4.74743 6.27249 4.59994 6.62864 4.59994 6.99994V10.9999C4.59994 11.6895 4.32593 12.3507 3.83834 12.8383C3.35075 13.3259 2.68947 13.5999 1.9999 13.5999C1.66854 13.5999 1.39992 13.3313 1.3999 12.9999C1.3999 12.6686 1.66853 12.3999 1.9999 12.3999C2.3712 12.3999 2.72735 12.2525 2.9899 11.9899C3.25245 11.7274 3.39994 11.3712 3.39994 10.9999V6.99994C3.39994 6.31038 3.67383 5.64898 4.16143 5.16139C4.64901 4.67381 5.31032 4.39991 5.99986 4.3999L6.06443 4.40072C6.73061 4.41724 7.36605 4.68902 7.83842 5.16139C8.32601 5.64898 8.5999 6.31038 8.5999 6.99994V19.9999C8.5999 20.3712 8.74739 20.7274 9.00994 20.9899C9.27249 21.2524 9.62865 21.3999 9.99994 21.3999C10.3712 21.3999 10.7273 21.2524 10.9898 20.9899C11.2524 20.7274 11.3999 20.3712 11.3999 19.9999V3.99994C11.3999 3.31038 11.6739 2.64898 12.1615 2.16139C12.6491 1.67382 13.3104 1.3999 13.9999 1.3999L14.0645 1.40072C14.7306 1.41725 15.366 1.68906 15.8383 2.16139C16.3259 2.64898 16.5999 3.31038 16.5999 3.99994V16.9999L16.6016 17.0693C16.6187 17.4153 16.7638 17.7437 17.01 17.9899C17.2725 18.2524 17.6286 18.3999 17.9999 18.3999C18.3712 18.3999 18.7273 18.2524 18.9899 17.9899C19.2524 17.7274 19.3999 17.3712 19.3999 16.9999V12.9999C19.3999 12.3104 19.6738 11.649 20.1614 11.1614C20.649 10.6738 21.3104 10.3999 21.9999 10.3999C22.3313 10.3999 22.5999 10.6685 22.5999 10.9999C22.5999 11.3313 22.3313 11.5999 21.9999 11.5999C21.6286 11.5999 21.2725 11.7474 21.0099 12.0099C20.7474 12.2725 20.5999 12.6286 20.5999 12.9999V16.9999C20.5999 17.6894 20.326 18.3507 19.8384 18.8383C19.3508 19.3259 18.6894 19.5999 17.9999 19.5999C17.3103 19.5999 16.649 19.3259 16.1614 18.8383C15.6891 18.366 15.4172 17.7306 15.4006 17.0645L15.3999 16.9999Z"
        fill="#010000"
      />
    </svg>
  );

  const PaperclipIcon = () => (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_4564_1980)">
        <path
          d="M13.4701 5.62186C12.992 5.14377 12.3436 4.87517 11.6675 4.87503L11.6042 4.87583C10.951 4.89214 10.328 5.15869 9.8648 5.62186C9.38715 6.09951 9.11848 6.74716 9.11784 7.4226L9.20802 16.4356C9.20803 16.4371 9.20808 16.4387 9.20808 16.4402C9.20808 17.5144 9.63478 18.5446 10.3944 19.3042C11.154 20.0638 12.1842 20.4905 13.2585 20.4905C14.3327 20.4905 15.3629 20.0638 16.1225 19.3043L16.1928 19.2322C16.9067 18.4819 17.3068 17.4855 17.3086 16.4474L17.2102 8.11934C17.2073 7.87083 17.4064 7.66692 17.6549 7.66398C17.9034 7.66105 18.1072 7.86015 18.1101 8.10865L18.2085 16.4286C18.2086 16.4324 18.2089 16.4363 18.2089 16.4402C18.2089 17.7326 17.7034 18.9729 16.8021 19.8968L16.7589 19.9406C15.8305 20.869 14.5714 21.3906 13.2585 21.3906C11.9455 21.3906 10.6863 20.869 9.75797 19.9406C8.83066 19.0133 8.30924 17.7559 8.30805 16.4446L8.21794 7.42906V7.42446L8.21893 7.33882C8.24099 6.45505 8.60175 5.61212 9.2284 4.98546C9.85505 4.35882 10.6979 3.99812 11.5817 3.97605L11.6674 3.975L11.6675 3.975L11.7532 3.97612C12.6369 3.99817 13.4799 4.35881 14.1065 4.98546C14.7523 5.63128 15.1155 6.50679 15.1169 7.41999H15.117L15.2082 16.4356C15.2082 16.4372 15.2082 16.4387 15.2082 16.4402C15.2081 16.9573 15.0026 17.4532 14.637 17.8188C14.2714 18.1844 13.7755 18.3899 13.2585 18.3899L13.2583 18.3899C12.7413 18.3898 12.2454 18.1844 11.8798 17.8188C11.5142 17.4532 11.3087 16.9573 11.3086 16.4402L11.2175 7.42906L11.2178 7.40594C11.2275 7.16808 11.4221 6.97702 11.6629 6.97457C11.9114 6.97206 12.1149 7.17154 12.1174 7.42005L12.2087 16.4356L12.2087 16.4401C12.2087 16.7185 12.3193 16.9855 12.5162 17.1824C12.713 17.3792 12.98 17.4899 13.2584 17.49L13.3104 17.4887C13.5699 17.4758 13.8161 17.367 14.0006 17.1824C14.1972 16.9858 14.3078 16.7194 14.3082 16.4414L14.217 7.42912L14.217 7.42459L14.2162 7.36132C14.1999 6.70809 13.9333 6.08504 13.4701 5.62186Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_4564_1980">
          <rect
            width="18"
            height="18"
            fill="white"
            transform="translate(0 12.728) rotate(-45)"
          />
        </clipPath>
      </defs>
    </svg>
  );

  const Ellipse1 = () => (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="19" cy="19" r="19" fill="white" />
    </svg>
  );

  const Ellipse2 = () => (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="19.5" stroke="#6E6E6E" />
    </svg>
  );

  if (!selectedCategory) {
    return (
      <div
        className="w-full flex-1 flex-col flex h-full items-center justify-center"
        dir="rtl"
      >
        <span className="text-4xl mb-20">چطور میتونم کمکت کنم؟</span>

        <div className="w-[55%] max-sm:w-full h-96 max-sm:h-auto grid max-sm:grid-cols-1 grid-cols-2 gap-4 mb-4">
          {Array.isArray(question)
            ? question.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center gap-4 bg-default-50 border border-default-100 max-h-96 px-4 box-border rounded-2xl cursor-pointer overflow-y-auto hover:bg-default-100 transition-colors"
                  onClick={() => handleSelectCategory(item)}
                >
                  <div className="flex-1 flex gap-4 p-2 items-center">
                    <div className="w-24 h-24 flex-shrink-0">
                      {item.icon ? (
                        <img
                          src={item.icon}
                          alt={item.title}
                          className="rounded-full border border-default-100 object-cover w-full h-full"
                        />
                      ) : (
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
                      )}
                    </div>
                    <div className="flex flex-col justify-center gap-2">
                      <h2 className="font-mediumSans text-foreground">
                        {item.category_name}
                      </h2>
                      <h3 className="w-full text-tiny text-wrap font-lightSans leading-5">
                        {item.description}
                      </h3>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    );
  }

  if (!showChat) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-32 h-32">
              {selectedCategory.icon ? (
                <img
                  src={selectedCategory.icon}
                  alt={selectedCategory.category_name}
                  className="w-full h-full object-contain rounded-full border border-default-100"
                />
              ) : (
                <div className="bg-gray-700 rounded-full w-full h-full flex items-center justify-center">
                  <span className="text-4xl">📝</span>
                </div>
              )}
            </div>
            <h1 className="text-3xl font-bold">
              {selectedCategory.category_name}
            </h1>
            <p className="text-gray-400">{selectedCategory.description}</p>
          </div>

          <div className="mt-12">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="solid"
                color="primary"
                size="lg"
                className="w-full py-6 text-lg"
                onPress={() => setShowChat(true)}
              >
                شروع گفتگو
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl h-full flex flex-col text-white"
      dir="rtl"
      style={{ background: "#0F0F0F" }}
    >
      <header
        className="border-b p-4 text-center flex-shrink-0 relative"
        style={{
          background: "#111111",
          border: "1px solid",
          borderImageSource:
            "linear-gradient(270deg, rgba(34, 68, 34, 0.266667) 0%, #242424 100%)",
          borderImageSlice: 1,
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
        }}
      >
        <button
          onClick={() => {
            setShowChat(false);
            setSelectedCategory(null);
          }}
          className="absolute left-4 text-gray-400 hover:text-white"
        >
          ← بازگشت
        </button>
        <h1 className="text-sm">
          <span style={{ color: "#BBBBBB" }}>دیباگچی</span>
          <span className="mx-2">|</span>
          <span style={{ color: "#2DB2FF" }}>
            {selectedCategory.category_name}
          </span>
        </h1>
      </header>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div
          ref={chatContainerRef}
          className="overflow-y-auto p-6"
          style={{
            maxHeight: "calc(100vh - 200px)",
            minHeight: "50vh",
          }}
        >
          <div className="space-y-6 max-w-3xl mx-auto">
            {messages.map((message) => {
              if (
                !isQuestionPhase &&
                message.id === messages.length &&
                message.isAI
              ) {
                return (
                  <div key={message.id}>
                    <div className={`flex justify-start`}>
                      <div
                        className={`relative p-4 bg-transparent max-w-[90%]`}
                      >
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "#BABABA" }}
                        >
                          {message.displayText}
                        </p>
                        <div className="absolute top-4 -right-1">
                          <StarIcon />
                        </div>
                      </div>
                    </div>

                    {requestInfo && (
                      <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                        <h3 className="font-bold mb-2">مشخصات درخواست:</h3>
                        <pre className="text-sm whitespace-pre-wrap">
                          {JSON.stringify(requestInfo, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isAI ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`relative p-4 ${
                      message.isAI
                        ? "bg-transparent max-w-[90%]"
                        : "max-w-[50%]"
                    }`}
                    style={
                      !message.isAI
                        ? {
                            background: "#1C1C1CB2",
                            backdropFilter: "blur(100px)",
                            borderRadius: "12px",
                          }
                        : {}
                    }
                  >
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#BABABA" }}
                    >
                      {message.displayText}
                      {message.isTyping && (
                        <span className="ml-1 inline-block h-2 w-2 animate-pulse rounded-full bg-blue-500"></span>
                      )}
                    </p>

                    {message.isAI && (
                      <div className="absolute top-4 -right-1">
                        <StarIcon />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div ref={messagesEndRef} />
        </div>

        <div className="input-container flex-shrink-0 p-6 pt-0 mt-auto">
          <div className="relative flex items-center gap-3 max-w-3xl mx-auto">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  !isQuestionPhase
                    ? "گفتگو به پایان رسیده"
                    : "از من سوال بپرسید..."
                }
                disabled={isSending || !isQuestionPhase}
                className="w-full placeholder-gray-400 px-4 py-4 text-right resize-none outline-none disabled:opacity-50"
                style={{
                  background: "#1C1C1CB2",
                  border: "1px solid #6E6E6E4A",
                  backdropFilter: "blur(100px)",
                  borderRadius: "20px",
                  paddingTop: "16px",
                  paddingRight: "60px",
                  paddingLeft: "60px",
                  color: "#BABABA",
                  minHeight: "135px",
                  maxHeight: "200px",
                }}
                dir="rtl"
              />

              <div className="absolute bottom-4 right-4">
                <div className="relative cursor-pointer">
                  <Ellipse1 />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <AudioWaveformIcon />
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 left-4">
                <div className="relative cursor-pointer">
                  <Ellipse2 />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PaperclipIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
