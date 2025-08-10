"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { ErrorSection } from "./ErrorSection";
import { Button, Textarea } from "@heroui/react";
import { Paperclip, SendHorizontal } from "lucide-react";
import { perform_post } from "@/lib/api";
import { OptionButtons } from "./OptionButtons";
import { StudentAiChatBox } from "./StudentAiChatBox";
import { ChatInputSection } from "./ChatInputSection";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};
export type requestInfoTypes = {
  id: number;
  status: string;
  price: number;
  assigned_to: string | null;
  difficulty: number;
  estimated_time: number;
  extra_services: any[];
  framework: string;
  language: string;
};
export type aiResponseType = {
  chat_id: number;
  conversation_history: ChatMessage[];
  current_question_index: number;
  is_question_phase: boolean;
  request_type: "debug" | "consultation" | "private_class" | "public_class";
  response: string;
  request_info?: requestInfoTypes;
};

export interface Message {
  text: string;
  isAI: boolean;
  isTyping?: boolean;
}

interface AICategory {
  id: number;
  title: string;
  sound?: string;
}

interface QuestionMain {
  ai_category: AICategory[];
  category_name: string;
  description: string;
  icon?: string;
  title: string;
}

interface Props {
  question: QuestionMain[];
}

interface IStudentHomePageContainer {
  userRole?: string[];
  question?: Props;
}

export type RequestType =
  | "debug"
  | "consultation"
  | "private_class"
  | "public_class"
  | "";

const errorMessages = {
  selectCategory: "برای شروع چت با هوش مصنوعی ابتدا موضوع را انتخاب کنید",
  emptyMessage: "لطفاً یک پیام وارد کنید",
};

const StudentHomePageContainer: FC<IStudentHomePageContainer> = ({
  userRole,
  question,
}) => {
  const [error, setError] = useState<string>("");
  const [chatType, setChatType] = useState<RequestType>("");
  const [file, setFile] = useState<File | null>(null);
  const [aiResponse, setAiResponse] = useState<aiResponseType | null>(null);
  const [chatId, setChatId] = useState<number | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");

  const optionRef = useRef<HTMLDivElement>(null);
  const sendRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = async () => {
    if (isSending || !chatType || !message.trim()) {
      setError(
        !chatType ? errorMessages.selectCategory : errorMessages.emptyMessage
      );
      return;
    }

    const userMessage: Message = { text: message, isAI: false };
    const typingPlaceholder: Message = {
      text: "در حال نوشتن...",
      isAI: true,
      isTyping: true,
    };

    setMessages((prev) => [...prev, userMessage, typingPlaceholder]);
    setMessage("");
    setIsSending(true);
    setError("");

    try {
      const newChatId = chatId ?? (await createChat(message, chatType));
      const response = await sendMessage(message, chatType, newChatId);

      setAiResponse(response);
      setChatId(newChatId);

      setMessages((prev) => {
        const cleaned = prev.filter((m) => !m.isTyping);
        return response?.is_question_phase
          ? [...cleaned, { text: response.response, isAI: true }]
          : cleaned;
      });
    } catch (err) {
      console.error("خطا در ارسال پیام:", err);
    } finally {
      setIsSending(false);
      setFile(null);
    }
  };

  const createChat = async (message: string, type: RequestType) => {
    const response: any = await perform_post("ai/chat/deepseek/", {
      message,
      request_type: type,
    });
    return response?.chat_id;
  };

  const sendMessage = async (
    message: string,
    type: RequestType,
    chatId: number | null
  ) => {
    return await perform_post("ai/chat/deepseek/", {
      message,
      request_type: type,
      chat_id: chatId,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !isSending) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setError("");
    }
  };

  useEffect(() => {
    if (!error) return;

    const clearErrorOnOutsideClick = (e: MouseEvent) => {
      if (
        !optionRef.current?.contains(e.target as Node) &&
        !sendRef.current?.contains(e.target as Node)
      ) {
        setError("");
      }
    };

    document.addEventListener("click", clearErrorOnOutsideClick);
    return () =>
      document.removeEventListener("click", clearErrorOnOutsideClick);
  }, [error]);

  return (
    <>
      <div className="w-full overflow-hidden pb-6 flex-1 flex flex-col items-center justify-center">
        {messages.length > 0 && userRole ? (
          <div className="overflow-hidden flex-1 w-full min-h-0">
            <StudentAiChatBox messages={messages} aiResponse={aiResponse} />
          </div>
        ) : (
          <OptionButtons
            userRole={userRole}
            error={error}
            setError={setError}
            setChatType={setChatType}
            chatType={chatType}
            optionRef={optionRef}
          />
        )}
      </div>

      {/* چت باکس */}
      <ChatInputSection
        message={message}
        setMessage={setMessage}
        isChatDisabled={
          isSending || aiResponse?.is_question_phase === false || !userRole
        }
        isSending={isSending}
        onSend={handleSend}
        onFileChange={handleFileChange}
        sendRef={sendRef}
        fileInputRef={fileInputRef}
      />

      {/* نام فایل */}
      {file && (
        <p className="text-sm text-gray-400 mt-2 text-center">
          فایل انتخاب‌شده: {file.name}
        </p>
      )}
    </>
  );
};

export { StudentHomePageContainer };
