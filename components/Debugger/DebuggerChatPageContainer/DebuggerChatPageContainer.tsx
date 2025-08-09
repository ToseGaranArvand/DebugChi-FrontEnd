"use client";

import { perform_get } from "@/lib/api";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store/store";
import {
  Button,
  Tooltip,
  Avatar,
  Chip,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Select,
  SelectItem,
  useDisclosure,
  addToast,
} from "@heroui/react";
import {
  Diamond,
  Phone,
  Search,
  Video,
  Check,
  CheckCheck,
  Clock,
  Pause,
  Play,
  Share2,
  ChevronDown,
  AudioWaveform,
  ArrowUp,
  Paperclip,
  CodeXml,
} from "lucide-react";
import { socket } from "@/config/socket-config";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  setData,
  setMessage,
  setRead,
  setSatus,
} from "@/redux/slices/chatSocketSlice";
import {
  Applicator,
  chatData2,
  SessionInfoResponse,
  SessionInfoResponse2,
  UserInfo,
} from "@/components/types/chatType";
import { chatData } from "@/components/types/testChat.type";
import { formatCurrency } from "@/utils/tools";
import { CodeBlock } from "@/components/ui/ace/code-block";
import { perform_post } from "@/lib/api";
import Cookies from "js-cookie";
import { Main } from "@/components/types/user.types";
import Image from "next/image";
import { v4 } from "uuid";
import { v4 as uuidv4 } from "uuid";
import MonacoEditor from "@monaco-editor/react";
import { Code } from "lucide-react";
import { usePathname } from "next/navigation";
import FileUpload from "@/components/version_1_1/FileUpload";
import { setShowRequest } from "@/redux/slices/globalSlice";
import { useDebuggerContext } from "@/context/DebuggerContext";
import { jwtDecode } from "jwt-decode";
import { createRoom } from "@/lib/alocom";
import { io } from "socket.io-client";
import { Socket } from "socket.io-client";
import {
  connectSocket,
  createChatRoom,
  disconnectSocket,
  fetchMessages,
  joinRoom,
  leaveRoom,
  onReceiveMessage,
  sendMessage,
} from "@/lib/socket";
import type { User } from "@/components/types/user.types";

type MessageType = "text" | "image" | "file" | "video" | "document";

interface Message {
  id: string;
  room_id: string;
  sender_id: string;
  receiver_id: string;
  type: MessageType;
  content: string;
  file_url?: string;
  file_name?: string;
  file_size?: number;
  is_read: boolean;
  created_at: string;
}

const languages = [
  "abap",
  "apex",
  "azcli",
  "bat",
  "c",
  "clojure",
  "coffeescript",
  "cpp",
  "csharp",
  "csp",
  "css",
  "dart",
  "dockerfile",
  "ecl",
  "elixir",
  "erlang",
  "fsharp",
  "go",
  "graphql",
  "handlebars",
  "hcl",
  "html",
  "ini",
  "java",
  "javascript",
  "json",
  "julia",
  "kotlin",
  "less",
  "lua",
  "markdown",
  "matlab",
  "mdx",
  "mysql",
  "objective-c",
  "pascal",
  "perl",
  "pgsql",
  "php",
  "plaintext",
  "postiats",
  "powerquery",
  "powershell",
  "proto",
  "pug",
  "python",
  "r",
  "razor",
  "redis",
  "redshift",
  "restructuredtext",
  "ruby",
  "rust",
  "sb",
  "scala",
  "scheme",
  "scss",
  "shell",
  "sol",
  "sql",
  "st",
  "swift",
  "systemverilog",
  "tcl",
  "twig",
  "typescript",
  "vb",
  "xml",
  "yaml",
].map((lang) => ({ key: lang, label: lang.toUpperCase() }));

const fontSizes = [
  { key: "14", label: "14px" },
  { key: "18", label: "18px" },
  { key: "24", label: "24px" },
  { key: "32", label: "32px" },
  { key: "40", label: "40px" },
  { key: "52", label: "52px" },
];

const DebuggerChatPageContainer = ({
  token,
  id,
}: {
  token: string;
  id: string;
}) => {
  const { setChatRoomId, setUserId } = useDebuggerContext();
  const [data, setData] = useState<SessionInfoResponse>();
  const decoded = jwtDecode(token);
  const userId = decoded?.user_id;

  useEffect(() => {
    const fetchData = async () => {
      if (!id.trim()) return;

      try {
        // گرفتن اطلاعات جلسه
        const response = await perform_get(
          `api/v1/debug/get-session-info/${id}`,
          token
        );
        setData(response);
        // console.log("Session Info:", response);

        // گرفتن اطلاعات کاربر از توکن

        if (userId) {
          setUserId(userId);
          setChatRoomId(id);
        } else {
          console.warn("No user_id found in token.");
        }
      } catch (err) {
        console.error("Error in fetchData:", err);
      }
    };

    fetchData();
  }, [id, token]);

  if (!data || !userId) return;

  return (
    <div className="relative w-full h-full pt-[60px] pb-5 flex flex-col items-center rounded-2xl bg-[#151515c6] backdrop-blur-3xl">
      <ActionButtons data={data} />
      <UserOverView />
      <div className="w-full py-8 flex-1 overflow-hidden">
        <ChatBox
          sender_id={`${data.data.consult?.uuid || data.data.debuger?.uuid}`}
          receiver_id={`${
            data.data.consult_applicator?.uuid ||
            data.data.debuger_applicator?.uuid
          }`}
          user={data.data.debuger || data.data.consult}
          session_id={data.data.session_id}
          token={token}
        />
      </div>
      <ChatInput
        sender_id={`${data.data.consult?.id || data.data.debuger?.id}`}
        receiver_id={`${
          data.data.consult_applicator?.id || data.data.debuger_applicator?.id
        }`}
        data={data}
        session_id={data.data.session_id}
        reciever={data.data.debuger_applicator || data.data.consult_applicator}
      />
    </div>
  );
};

export { DebuggerChatPageContainer };

const ActionButtons = ({ data }: { data: SessionInfoResponse }) => {
  const handleCall = async () => {
    if (data.teacher_id) {
      try {
        const room = await createRoom({
          teacher_id: data.teacher_id,
          participant_id:
            data.data?.consult_applicator?.id ||
            data.data?.debuger_applicator?.id,
          title: data.data.title,
        });

        // console.log("Room:", room);
        // کاربر رو بفرست روی لینک تماس:
        // window.open(room.url, "_blank");
      } catch (err) {
        console.error("خطا در ایجاد تماس:", err);
      }
    } else {
      addToast({
        description: "برای استفاده از امکانات تماس ابتدا باید کلاس فعال شود",
        color: "danger",
      });
    }
  };
  return (
    <div className="absolute left-5 top-4 flex gap-1">
      <Tooltip content="جستجو">
        <Button
          className="min-w-0 min-h-0 w-7 h-7 rounded-full !bg-[#161616] border border-[#242424]"
          isIconOnly
          startContent={<Search className="text-[#6E6E6E] w-[15px] h-[15px]" />}
        />
      </Tooltip>
      <Tooltip content="تماس صوتی">
        <Button
          onPress={handleCall}
          className="min-w-0 min-h-0 w-7 h-7 rounded-full !bg-[#161616] border border-[#242424]"
          isIconOnly
          startContent={<Phone className="text-[#6E6E6E] w-[15px] h-[15px]" />}
        />
      </Tooltip>
      <Tooltip content="تماس تصویری">
        <Button
          onPress={handleCall}
          className="min-w-0 min-h-0 w-7 h-7 rounded-full !bg-[#161616] border border-[#242424]"
          isIconOnly
          startContent={<Video className="text-[#6E6E6E] w-[15px] h-[15px]" />}
        />
      </Tooltip>
      <Tooltip content="any desk">
        <Button
          className="min-w-0 min-h-0 w-7 h-7 rounded-full !bg-[#161616] border border-[#242424]"
          isIconOnly
          startContent={
            <Diamond className="text-[#6E6E6E] w-[15px] h-[15px]" />
          }
        />
      </Tooltip>
    </div>
  );
};

const UserOverView = () => {
  const [isExtended, setIsExtended] = useState(false);
  return (
    <div
      dir="rtl"
      className={`${
        isExtended ? "h-full" : "h-[153px]"
      } transition-all duration-500 relative w-full pb-[50px] flex flex-col items-center`}
    >
      <div className="w-full max-w-[404px] -mr-10 flex gap-[13px] items-center">
        <Image
          src="/images/svg/ChatStarSvg.svg"
          alt=""
          width={25}
          height={25}
        />
        <h1 className="text-lg">جزئیات مشکل کار بر اینجا ثبت میشود</h1>
      </div>
      <div className="flex-1 w-full max-w-[404px] overflow-hidden">
        <p className="w-full flex-1 max-w-[404px] mt-2.5 leading-[22px] text-right text-xs text-[#BBBBBBD9]">
          مشکلی در اتصال به پایگاه داده وجود دارد. به نظر می‌رسد که رشته اتصال
          (connection string) نامعتبر است. لطفاً تنظیمات پایگاه داده را بررسی
          کنید و مطمئن شوید که نام کاربری، رمز عبور و آدرس سرور به درستی وارد
          شده‌اند. این مشکل ممکن است به دلیل تغییرات اخیر در سرور یا تنظیمات
          فایروال باشد.علاوه بر این، ممکن است مشکل از طرف تنظیمات شبکه یا
          محدودیت‌های امنیتی باشد. پیشنهاد می‌شود ابتدا اتصال شبکه را بررسی کنید
          و سپس لاگ‌های سرور را مطالعه کنید تا علت دقیق مشکل مشخص شود. همچنین
          بررسی کنید که آیا سرویس پایگاه داده در حال اجرا است یا خیر.
        </p>
      </div>

      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-full max-w-[410px] h-[130px] rounded-b-[20%] bg-gradient-to-b from-transparent to-[#101010]">
        <Button
          onPress={() => setIsExtended(!isExtended)}
          endContent={
            <ChevronDown
              className={` ${
                isExtended ? "rotate-180" : ""
              } transition-all text-[#BBBBBB6B] w-5 h-5`}
            />
          }
          className="absolute left-0 bottom-0 w-full !gap-0.5 rounded-[63px] bg-[#111111] border border-[#6E6E6E] text-xs"
        >
          {isExtended ? "نمایش کمتر" : "نمایش بیشتر"}
        </Button>
      </div>
    </div>
  );
};

type IChatBoxProps = {
  user: UserInfo;
  session_id: string;
  token: string;
  sender_id: string | null;
  receiver_id: string | null;
};
const ChatBox: FC<IChatBoxProps> = ({
  session_id,
  user,
  token,
  sender_id,
  receiver_id,
}) => {
  const chat = useAppSelector((state: RootState) => state.chatSocket);
  const dispatch = useAppDispatch();
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const [user_data, setUserData] = useState<any>();
  const userId = user?.id;
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user_data = localStorage.getItem("user_data");
      if (user_data) {
        setUserData(JSON.parse(user_data));
      }
    }
    const data = {
      session_id: session_id,
    };
    socket.emit("get_messages", data);
    socket.on("get_messages", (data) => {
      dispatch(setData(data));
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
      }, 100);
    });
  }, []);

  useEffect(() => {
    const closeHandler = (data: { closed: string }) => {
      if (data.closed) {
        setIsClosed(true);
      }
    };
    socket.on(`close_session_${session_id}`, closeHandler);
    socket.on(String(session_id), (msg) => {
      dispatch(setMessage(msg));
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });
    socket.on(`${session_id}_sent`, (id) => {
      dispatch(setSatus({ id: id, status: "sent" }));
    });
    socket.on(`${session_id}_read`, (data) => {
      if (data.read) {
        dispatch(setRead());
      }
    });
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
    return () => {
      socket.off(`get_messages`);
      socket.off(String(session_id));
      socket.off(`${session_id}_sent`);
      socket.off(`${session_id}_read`);
      socket.off(`close_session_${session_id}`, closeHandler);
    };
  }, [socket, chat]);

  return (
    <div className="w-full h-full px-5 overflow-auto">
      {chat &&
        chat.map((item: SessionInfoResponse2, idx) => (
          <div key={idx} dir={item.sender === user_data?.uuid ? "rtl" : "ltr"}>
            <Message
              session={session_id}
              data={item.data}
              token={token}
              user={user}
              sender={item.sender}
            />
          </div>
        ))}
      <div ref={messagesEndRef} className="mb-24" />
    </div>
  );
};
interface MessageProps {
  session: string;
  data: chatData2;
  token: string;
  user: UserInfo;
  sender: string;
}
const Message = ({ session, data, token, user, sender }: MessageProps) => {
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.ontimeupdate = () => {
        setTime(audioRef.current?.currentTime || 0);
      };
    }
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSliderChange = (value: number) => {
    setTime(value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // const readReceipt = () => {
  //   if (user?.uuid === data.sender_id) {
  //     if (data.sender_id === user.uuid) {
  //       return <CheckCheck className="text-blue-500" size={14} />;
  //     } else if (data.status === "sent") {
  //       return <Check className="text-gray-400" size={14} />;
  //     } else if (data.status === "pending") {
  //       return <Clock className="text-gray-400" size={14} />;
  //     } else {
  //       return null;
  //     }
  //   }
  //   return null;
  // };

  const formatDate = () => {
    return new Date(data.created_at || "").toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (!user) return null;

  const messageTime = formatDate();

  if (data.type === "text") {
    return (
      <div className={`flex mb-4`}>
        {sender === user?.uuid ? (
          <ProgrammerMessageBubble time={messageTime}>
            {data.text}
          </ProgrammerMessageBubble>
        ) : (
          <ClientMessageBubble time={messageTime}>
            {data.text}
          </ClientMessageBubble>
        )}
      </div>
    );
  }

  // if (data.type === "audio") {
  //   return (
  //     <div className="flex items-start gap-4">
  //       <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-slate-900 overflow-hidden flex-shrink-0">
  //         <img
  //           src={
  //             user.uuid == sender ? user.image_profile : reciever || "/user.jpg"
  //           }
  //           alt={user?.first_name || "User"}
  //           className="h-full w-full object-cover"
  //         />
  //       </div>
  //       <div className="grid grid-cols-1 w-96 bg-gray-100 dark:bg-gray-900 rounded-2xl py-2 px-4 gap-2">
  //         <audio ref={audioRef}>
  //           <source src={data.audioUrl} type="audio/webm" />
  //         </audio>
  //         <div className="flex gap-4 items-center">
  //           <Button
  //             onPress={togglePlayPause}
  //             color="secondary"
  //             isIconOnly
  //             radius="full"
  //             variant="flat"
  //             startContent={
  //               isPlaying ? (
  //                 <Pause size={14} />
  //               ) : (
  //                 <Play size={14} className="fill-current ml-0.5" />
  //               )
  //             }
  //           />
  //           <div className="flex-1">
  //             <input
  //               type="range"
  //               className="w-full h-1.5 bg-gray-300 rounded-lg appearance-none cursor-pointer"
  //               value={time}
  //               onChange={(e) => handleSliderChange(Number(e.target.value))}
  //               min={0}
  //               max={audioRef.current?.duration || 60}
  //               step={1}
  //             />
  //           </div>
  //         </div>
  //         <div className="flex text-xs text-gray-600">
  //           <span>{formatTime(Number(time))}</span>
  //           <span className="flex-1 flex gap-2 items-center justify-end">
  //             {messageTime}
  //             {readReceipt()}
  //           </span>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // if (data.type === "file") {
  //   return (
  //     <div
  //       className={`flex ${
  //         sender === user?.uuid ? "justify-end" : "justify-start"
  //       } mb-4`}
  //     >
  //       {sender === user?.uuid ? (
  //         <div className="bg-blue-600 rounded-lg p-4 max-w-md">
  //           <div className="flex items-center gap-2 mb-2">
  //             <svg
  //               width="20"
  //               height="20"
  //               viewBox="0 0 24 24"
  //               fill="none"
  //               xmlns="http://www.w3.org/2000/svg"
  //             >
  //               <path
  //                 d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
  //                 stroke="currentColor"
  //                 strokeWidth="2"
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //               />
  //               <polyline
  //                 points="14,2 14,8 20,8"
  //                 stroke="currentColor"
  //                 strokeWidth="2"
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //               />
  //             </svg>
  //             <a
  //               href={data.url}
  //               target="_blank"
  //               rel="noopener noreferrer"
  //               className="text-white hover:underline"
  //             >
  //               {data.filename || "فایل ضمیمه"}
  //             </a>
  //           </div>
  //           {data.text && (
  //             <p className="text-white text-sm mb-2">{data.text}</p>
  //           )}
  //           <div className="flex items-center justify-start gap-1 mt-2">
  //             <CheckCheck size={14} />
  //             <span className="text-gray-200 text-xs">{messageTime}</span>
  //           </div>
  //         </div>
  //       ) : (
  //         <div className="bg-gray-800 rounded-lg p-4 max-w-md">
  //           <div className="flex items-center gap-2 mb-2">
  //             <svg
  //               width="20"
  //               height="20"
  //               viewBox="0 0 24 24"
  //               fill="none"
  //               xmlns="http://www.w3.org/2000/svg"
  //             >
  //               <path
  //                 d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
  //                 stroke="currentColor"
  //                 strokeWidth="2"
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //               />
  //               <polyline
  //                 points="14,2 14,8 20,8"
  //                 stroke="currentColor"
  //                 strokeWidth="2"
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //               />
  //             </svg>
  //             <a
  //               href={data.url}
  //               target="_blank"
  //               rel="noopener noreferrer"
  //               className="text-blue-400 hover:underline"
  //             >
  //               {data.filename || "فایل ضمیمه"}
  //             </a>
  //           </div>
  //           {data.text && (
  //             <p className="text-white text-sm mb-2">{data.text}</p>
  //           )}
  //           <div className="flex items-center justify-start gap-1 mt-2">
  //             <CheckCheck size={14} />
  //             <span className="text-gray-400 text-xs">{messageTime}</span>
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   );
  // }

  // if (data.type === "picture") {
  //   return (
  //     <div className="flex gap-4 items-start">
  //       <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden flex-shrink-0">
  //         <img
  //           src={
  //             user.uuid == sender ? user.image_profile || "/user.jpg" : reciever
  //           }
  //           alt={user?.first_name || "sender"}
  //           className="h-full w-full object-cover"
  //           onError={(e) => {
  //             (
  //               e.target as HTMLImageElement
  //             ).src = `/placeholder.svg?height=40&width=40`;
  //           }}
  //         />
  //       </div>
  //       <div className="max-w-96 bg-gray-100 dark:bg-gray-900 flex flex-col h-auto p-2 rounded-2xl">
  //         <div className="rounded-lg overflow-hidden cursor-pointer">
  //           <img
  //             src={data.url || "/placeholder.svg"}
  //             alt={data.filename}
  //             className="w-full h-auto object-cover"
  //           />
  //         </div>
  //         <div className="w-full h-auto p-2 mt-2 text-right">
  //           <span className="break-words whitespace-pre-wrap">{data.text}</span>
  //         </div>
  //         <div className="flex items-center justify-end gap-1 self-end p-2 text-xs text-gray-600">
  //           <span>{messageTime}</span>
  //           {readReceipt()}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // if (data.type === "anydesk") {
  //   return (
  //     <div className="flex gap-4 items-start rtl">
  //       <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0">
  //         <Avatar
  //           src={
  //             user.uuid == sender ? user.image_profile || "/user.jpg" : reciever
  //           }
  //           alt={user?.first_name || "کاربر"}
  //           name={user?.first_name}
  //         />
  //       </div>
  //       <div className="max-w-96 bg-gradient-to-br from-red-50 to-gray-50 dark:from-gray-800 dark:to-gray-900 flex flex-col h-auto p-3 rounded-2xl border border-red-100 dark:border-red-700">
  //         <div className="flex items-center gap-2 mb-3">
  //           <div className="bg-red-600 p-1.5 rounded-md">
  //             <svg
  //               className="w-5 h-5 text-white"
  //               viewBox="0 0 24 24"
  //               fill="currentColor"
  //             >
  //               <path d="M19.7,10.5L19.7,10.5l-6-6c-0.4-0.4-1-0.4-1.4,0l0,0l-6,6c-0.4,0.4-0.4,1,0,1.4l6,6c0.4,0.4,1,0.4,1.4,0l6-6C20.1,11.5,20.1,10.9,19.7,10.5z M12,16.2L7.8,12L12,7.8l4.2,4.2L12,16.2z" />
  //             </svg>
  //           </div>
  //           <span className="font-bold text-gray-800 dark:text-gray-200">
  //             دسترسی از راه دور AnyDesk
  //           </span>
  //         </div>

  //         <div className="bg-white dark:bg-gray-800 rounded-lg p-3 mb-3 border border-gray-200 dark:border-gray-600">
  //           <div className="flex items-center justify-between">
  //             <div>
  //               <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
  //                 شناسه AnyDesk:
  //               </p>
  //               <p className="text-lg font-mono font-bold text-gray-800 dark:text-gray-200">
  //                 {data.text}
  //               </p>
  //             </div>
  //             <Button
  //               size="sm"
  //               variant="flat"
  //               color="primary"
  //               startContent={<Share2 size={14} />}
  //               onPress={() => copyToClipboard(data.text || "")}
  //             >
  //               کپی
  //             </Button>
  //           </div>
  //         </div>

  //         <div className="text-xs text-gray-600 dark:text-gray-400 mb-3">
  //           <p>برای اتصال:</p>
  //           <ol className="list-decimal list-inside mt-1 space-y-1">
  //             <li>نرم‌افزار AnyDesk را باز کنید</li>
  //             <li>شناسه بالا را در قسمت "Remote Desk" وارد کنید</li>
  //             <li>روی "Connect" کلیک کنید</li>
  //           </ol>
  //         </div>

  //         <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
  //           <span>{messageTime}</span>
  //           <div className="flex items-center gap-1">
  //             {readReceipt()}
  //             <span className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 px-2 py-1 rounded-full text-xs">
  //               فعال
  //             </span>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // if (data.type === "code") {
  //   return (
  //     <div className="flex items-start gap-2 h-auto">
  //       <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden flex-shrink-0">
  //         <img
  //           src={
  //             user.uuid == sender ? user.image_profile || "/user.jpg" : reciever
  //           }
  //           alt={user?.first_name || "User"}
  //           className="h-full w-full object-cover"
  //         />
  //       </div>
  //       <div
  //         className={`flex flex-col gap-2 relative sm:w-full md:w-2/4 lg:w-3/4 font-sans rounded-2xl`}
  //       >
  //         <CodeBlock
  //           filename="code"
  //           language={data.language || ""}
  //           code={data.text || ""}
  //         />
  //         <div className="flex items-center justify-end gap-1 self-end text-xs">
  //           <span>{messageTime}</span>
  //           {readReceipt()}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // if (data.type === "payment") {
  //   return (
  //     <PaymentMessage
  //       session_id={session}
  //       user={user}
  //       sender={sender}
  //       reciever={reciever}
  //       data={data.data}
  //       status={data.status}
  //       token={token}
  //     />
  //   );
  // }

  return null;
};
const ProgrammerMessageBubble = ({
  children,
  time,
}: {
  children: React.ReactNode;
  time: string;
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 200, height: 60 });

  useEffect(() => {
    if (textRef.current) {
      const textWidth = textRef.current.scrollWidth;
      const textHeight = textRef.current.scrollHeight;
      setDimensions({
        width: Math.max(200, Math.min(400, textWidth + 60)),
        height: Math.max(60, textHeight + 40),
      });
    }
  }, [children]);

  return (
    <div className="relative inline-block">
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={`M0 15C0 6.71573 6.71573 0 15 0H${dimensions.width - 26.126}C${
            dimensions.width - 17.842
          } 0 ${dimensions.width - 11.126} 6.71573 ${
            dimensions.width - 11.126
          } 15V${dimensions.height - 12}L${dimensions.width} ${
            dimensions.height
          }H${dimensions.width - 31.987}H15C6.71573 ${dimensions.height} 0 ${
            dimensions.height - 6.7157
          } 0 ${dimensions.height - 15}V15Z`}
          fill="#2E5AB2"
        />
      </svg>
      <div className="absolute inset-0 p-4 pl-6 pr-8 flex flex-col justify-center">
        <div
          ref={textRef}
          className="text-white text-sm text-right leading-relaxed break-words mb-2"
          style={{ maxWidth: dimensions.width - 70 }}
        >
          {children}
        </div>
        <div className="flex items-center justify-start gap-1 mt-1">
          <CheckCheck className="w-4 h-4" />
          <span className="text-white text-xs opacity-70">{time}</span>
        </div>
      </div>
    </div>
  );
};
const ClientMessageBubble = ({
  children,
  time,
}: {
  children: React.ReactNode;
  time: string;
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 180, height: 50 });

  useEffect(() => {
    if (textRef.current) {
      const textWidth = textRef.current.scrollWidth;
      const textHeight = textRef.current.scrollHeight;
      setDimensions({
        width: Math.max(180, Math.min(350, textWidth + 50)),
        height: Math.max(50, textHeight + 35),
      });
    }
  }, [children]);

  return (
    <div className="relative inline-block">
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={`M0 0H17H${dimensions.width - 15}C${dimensions.width - 6.716} 0 ${
            dimensions.width
          } 6.71573 ${dimensions.width} 15V${dimensions.height - 15.5}C${
            dimensions.width
          } ${dimensions.height - 7.2157} ${dimensions.width - 6.716} ${
            dimensions.height - 0.5
          } ${dimensions.width - 15} ${dimensions.height - 0.5}H23C14.7157 ${
            dimensions.height - 0.5
          } 8 ${dimensions.height - 7.2157} 8 ${
            dimensions.height - 15.5
          }V12L0 0Z`}
          fill="#171F2B"
        />
      </svg>
      <div className="absolute inset-0 p-4 pl-8 pr-6 flex flex-col justify-center">
        <div
          ref={textRef}
          className="text-[#BABABA] text-sm text-right leading-relaxed break-words mb-2"
          style={{ maxWidth: dimensions.width - 60 }}
        >
          {children}
        </div>
        <div className="flex items-center justify-start gap-1 mt-1">
          <CheckCheck size={14} />
          <span className="text-[#BABABA] text-xs opacity-70">{time}</span>
        </div>
      </div>
    </div>
  );
};
const PaymentMessage = ({
  data,
  sender,
  reciever,
  user,
  status,
  session_id,
  token,
}: {
  data: any;
  sender: any;
  user: any;
  reciever: any;
  status: any;
  session_id: string;
  token: string;
}) => {
  const _date = new Date(data.date).toLocaleDateString("fa-IR", {
    day: "numeric",
    hour: "numeric",
    year: "numeric",
    minute: "numeric",
    month: "long",
  });
  const [isLoading, setIsLoading] = useState(false);

  const createPayment = async () => {
    setIsLoading(true);
    const response = await perform_post(
      "payment/create_payment/",
      {
        session_id: session_id,
        title: "کلاس خصوصی",
        description: "توضیحات کلاس خصوصی",
        amount: 1000,
      },
      token || ""
    );
    if (response.success) {
      window.location.href = response.url;
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-row-reverse items-start gap-2 h-auto">
      <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden flex-shrink-0">
        <img
          src={
            user.uuid == sender
              ? `${process.env.server}/${user?.image_profile}`
              : `${process.env.server}/${reciever}`
          }
          alt={user?.first_name || "User"}
          className="h-full w-full object-cover"
        />
      </div>
      <div
        className={`flex flex-col gap-2 relative sm:w-full md:w-2/4 lg:w-1/4 min-h-20 bg-white dark:bg-black  rounded-2xl p-4`}
      >
        {/* Payment Data Display */}
        <div className="flex flex-col">
          {/* Header with status badge */}
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-800">اطلاعات پرداخت</h3>
            <span className="px-2 py-1 text-xs  rounded-full bg-amber-100 text-amber-800 capitalize">
              {status == "pending"
                ? "درحال بررسی"
                : status == "close"
                ? "لغو درخواست"
                : "پرداخت شده"}
            </span>
          </div>
          {/* Date and time */}
          <div className="mb-3">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm">{_date}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm">{data.time}</span>
            </div>
          </div>
          {/* Session details */}
          <div className="bg-gray-50 rounded-lg p-3 mb-3">
            <h4 className=" text-gray-700 mb-2">اطلاعات جلسه</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-500">زمان:</div>
              <div className="text-gray-800 ">
                {data.class.session_hours}ساعت{" "}
                {data.class.session_minutes > 0
                  ? `${data.class.session_minutes}m`
                  : ""}
              </div>
              <div className="text-gray-500">تعداد جلسات:</div>
              <div className="text-gray-800 ">{data.class.session_number}</div>
            </div>
          </div>
          {/* Session type */}
          <div className="flex justify-between flex-wrap gap-2 mb-3 items-center">
            <div className="flex justify-between flex-wrap gap-2">
              {Object.entries(data.moshaver).map(([key, value]) => {
                if (key.startsWith("is_") && value === true) {
                  const type = key.replace("is_", "");
                  return (
                    <span
                      key={key}
                      className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full capitalize"
                    >
                      {type}
                    </span>
                  );
                }
                return null;
              })}
            </div>
            <Chip className="text-foreground">{formatCurrency(1000)}</Chip>
          </div>
          {/* Action buttons */}
          {sender != user.uuid ? (
            <div className="flex gap-2 mt-2">
              <Button
                color="success"
                fullWidth
                className="text-background"
                onPress={createPayment}
                isLoading={isLoading}
              >
                پرداخت
              </Button>
              <Button fullWidth variant="bordered" color="danger">
                لغو
              </Button>
            </div>
          ) : (
            <div className="w-full h-10 rounded-2xl bg-default-800 flex items-center justify-center text-background">
              {status == "pending"
                ? "درحال بررسی"
                : status == "close"
                ? "لغو درخواست"
                : "پرداخت شده"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
interface IChatInput {
  sender_id: string | null;
  receiver_id: string | null;
  data: SessionInfoResponse;
  session_id: string;
  reciever: Applicator;
}
const ChatInput = ({
  sender_id,
  receiver_id,
  data,
  session_id,
  reciever,
}: IChatInput) => {
  const [description, SetDescription] = useState<string>("");

  const [response_data, setData] = useState<SessionInfoResponse>();
  const [user, setUser] = useState<any>();
  const dispatch = useAppDispatch();
  const payed = useAppSelector((state) => state.gloabal.payed);

  const sendMessage = () => {
    const data = {
      session_id: session_id,
      sender: user.uuid,
      receiver: reciever.uuid,
      data: {
        id: v4(),
        type: "text",
        text: description,
        created_at: String(new Date()),
        status: "pending",
      },
    };
    socket.emit("test_message", data);
    SetDescription("");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user_data = localStorage.getItem("user_data");
      if (user_data) {
        setUser(JSON.parse(user_data));
      }
    }
  }, []);

  useEffect(() => {
    setData(data);
    const lockHandler = (data: { lock: boolean }) => {
      if (data.lock) {
        setData((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            data: {
              ...prev.data,
              is_locked: true,
            },
          };
        });
      }
    };
    const closeHandler = (data: { closed: string }) => {
      if (data.closed) {
        setData((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            data: {
              ...prev.data,
              status: "close",
            },
          };
        });
      }
    };

    const messageHandler = (msg: any) => {
      if (msg.sender !== user?.uuid) {
      }
    };

    socket.on(`lock_session_${session_id}`, lockHandler);
    socket.on(`close_session_${session_id}`, closeHandler);
    socket.on(String(session_id), messageHandler);

    return () => {
      socket.off(`lock_session_${session_id}`, lockHandler);
      socket.off(`close_session_${session_id}`, closeHandler);
      socket.off(String(session_id), messageHandler);
    };
  }, [session_id, user]);

  if (response_data?.is_debuger == false && response_data?.data.is_locked) {
    return (
      <div className="w-full flex justify-center items-center bg-[#1C1C1C] rounded-3xl h-16">
        <p className="text-sm text-gray-400">برای ادامه پرداخت را تکمیل کنید</p>
      </div>
    );
  }

  if (response_data?.data.status === "close") {
    return null;
  }

  return (
    <div className="w-[calc(100%-40px)] h-[58px] rounded-[20px] p-3 border border-[#6E6E6E] bg-[#1c1c1c63] backdrop-blur-[20px]">
      <div className="relative w-full h-full flex flex-row-reverse items-center gap-4">
        <div>
          <Button
            onPress={description.length > 0 ? sendMessage : undefined}
            className={`min-w-0 min-h-0 w-[38px] h-[38px] rounded-full ${
              description.length > 0
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-white hover:bg-gray-100"
            }
            `}
            isIconOnly
            startContent={
              description.length > 0 ? (
                <ArrowUp className="w-6 h-6" />
              ) : (
                <AudioWaveform className="w-6 h-6 text-black" />
              )
            }
          />
        </div>
        <input
          type="text"
          value={description}
          onChange={(e) => SetDescription(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="چیزی تایپ کنید ..."
          className="w-full !bg-transparent !rounded-0 text-right text-white placeholder-gray-400 outline-none"
          dir="rtl"
        />
        <div className="flex items-center gap-2">
          {/* <SendCode
            data={data}
            sender={user.uuid}
            reciever={reciever.uuid}
            session_id={session_id}
          />

         
          <FileUpload
            session_id={response_data?.data.session_id || ""}
            reciever={reciever.uuid}
            sender={user.uuid}
          /> */}
        </div>
      </div>
    </div>
  );
};

interface SendCodeProps {
  sender: string;
  reciever: string;
  session_id: string;
  data: SessionInfoResponse;
}
const SendCode: FC<SendCodeProps> = ({
  sender,
  reciever,
  session_id,
  data,
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [fontSize, setFontSize] = useState(18);

  // ارسال پیام کد
  const handleSendMessage = useCallback(() => {
    if (!code.trim()) return;

    const unicId = uuidv4();

    const message = {
      session_id,
      sender,
      receiver: reciever,
      data: {
        id: unicId,
        type: "code",
        text: code,
        language,
        created_at: new Date().toISOString(),
        status: "pending",
      },
    };

    // socket.emit("test_message", message);
    setCode("");
    onClose();
  }, [code, language, sender, reciever, session_id, onClose]);

  return (
    <>
      <Button
        onPress={onOpen}
        isIconOnly
        className="min-w-0 w-[38px] min-h-0 h-[38px] rounded-full bg-transparent border border-[#6E6E6E]"
        startContent={<CodeXml className="w-[17px] h-[17px]" />}
      />

      <Drawer
        hideCloseButton
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="3xl"
        placement="left"
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex gap-3">
                <Select
                  label="انتخاب زبان"
                  selectedKeys={[language]}
                  onSelectionChange={(keys) =>
                    setLanguage(Array.from(keys)[0] as string)
                  }
                >
                  {languages.map((lang) => (
                    <SelectItem key={lang.key}>{lang.label}</SelectItem>
                  ))}
                </Select>

                <Select
                  label="اندازه فونت"
                  selectedKeys={[String(fontSize)]}
                  onSelectionChange={(keys) =>
                    setFontSize(Number(Array.from(keys)[0]))
                  }
                >
                  {fontSizes.map((size) => (
                    <SelectItem key={size.key}>{size.label}</SelectItem>
                  ))}
                </Select>
              </DrawerHeader>

              <DrawerBody dir="ltr">
                <MonacoEditor
                  width="100%"
                  height="100%"
                  language={language}
                  theme="vs-dark"
                  value={code}
                  onChange={(val) => setCode(val || "")}
                  options={{
                    scrollBeyondLastLine: false,
                    minimap: { enabled: true },
                    automaticLayout: true,
                    fontSize,
                  }}
                />
              </DrawerBody>

              <DrawerFooter>
                <Button
                  color="primary"
                  variant="flat"
                  onPress={handleSendMessage}
                >
                  ارسال کد
                </Button>
                <Button color="primary" variant="flat" onPress={onClose}>
                  بستن
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
