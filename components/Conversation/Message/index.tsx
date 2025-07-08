"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,
  CheckCheck,
  Clock,
  DownloadCloud,
  ExternalLink,
  Pause,
  Play,
  Share2,
} from "lucide-react";
import type { chatData } from "@/components/types/testChat.type";
import { Avatar, Button, Chip, Textarea } from "@heroui/react";
import { CodeBlock } from "@/components/ui/ace/code-block";
import { formatCurrency } from "@/utils/tools";
import { perform_post } from "@/lib/api";
import Cookies from "js-cookie";
type Props = {
  data: chatData;
  sender: string;
  reciever: string;
  session: string;
};

const Message = (props: Props) => {
  const [user, setUserData] = useState<any>();
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      let user_data = localStorage.getItem("user_data");
      if (user_data) {
        setUserData(JSON.parse(user_data));
      }
    }

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
  // #endregion

  const readReceipt = () => {
    if (user?.uuid === props.sender) {
      if (props.data.status === "pending") {
        return <Clock className="text-gray-400" size={14} />;
      } else if (props.data.status === "sent") {
        return <Check className="text-gray-400" size={14} />;
      }
      return <CheckCheck className="text-blue-500" size={14} />;
    }
    return null;
  };

  const formatDate = () => {
    return new Date(props.data.created_at || "").toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  if(!user) return null


  if (props.data.type === "text") {
    return (
      <div className="flex gap-2 items-start h-auto">
        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden flex-shrink-0">
          <img
            src={
              user.uuid == props.sender
                ? user.image_profile || "/user.jpg"
                : props.reciever
            }
            alt={user?.first_name || "User"}
            className="h-full w-full object-cover"
          />
        </div>
        <div
          className={`flex flex-col gap-2 relative max-w-96 font-sans rounded-2xl ${
            user?.uuid === props.sender
              ? "bg-blue-600 text-white"
              : "bg-gray-100 dark:bg-gray-900 text-foreground-900"
          } px-4 py-2`}
        >
          <span className="break-words whitespace-pre-wrap font-lightSans">
            {props.data.text}
          </span>
          <div className="flex items-center justify-end gap-1 self-end text-xs">
            <span>{formatDate()}</span>
            {readReceipt()}
          </div>
        </div>
      </div>
    );
  } else if (props.data.type === "audio") {
    return (
      <div className="flex items-start gap-4">
        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-slate-900 overflow-hidden flex-shrink-0">
          <img
            src={
              user.uuid == props.sender
                ? user.image_profile || "/user.jpg"
                : props.reciever
            }
            alt={user?.first_name || "User"}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 w-96 bg-gray-100 dark:bg-gray-900 rounded-2xl py-2 px-4 gap-2">
          <audio ref={audioRef}>
            <source src={props.data.audioUrl} type="audio/webm" />
          </audio>
          <div className="flex gap-4 items-center">
            <Button
              // className=""
              onPress={togglePlayPause}
              color="secondary"
              isIconOnly
              radius="full"
              variant="flat"
              startContent={
                isPlaying ? (
                  <Pause size={14} />
                ) : (
                  <Play size={14} className="fill-current ml-0.5" />
                )
              }
            ></Button>

            <div className="flex-1">
              <input
                type="range"
                className="w-full h-1.5 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                value={time}
                onChange={(e) => handleSliderChange(Number(e.target.value))}
                min={0}
                max={audioRef.current?.duration || 60}
                step={1}
              />
            </div>
          </div>
          <div className="flex text-xs text-gray-600">
            <span>{formatTime(Number(time))}</span>
            <span className="flex-1 flex gap-2 items-center justify-end">
              {formatDate()}
              {readReceipt()}
            </span>
          </div>
        </div>
      </div>
    );
  } else if (props.data.type === "file") {
    return (
      <div className="flex gap-4 items-start">
        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-slate-900 overflow-hidden flex-shrink-0">
          <img
            src={
              user.uuid == props.sender
                ? user.image_profile || "/user.jpg"
                : props.reciever
            }
            alt={user?.first_name || "User"}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="max-w-96 bg-gray-100 dark:bg-gray-900 flex flex-col h-auto p-2 rounded-2xl">
          <div className="bg-gray-200 dark:bg-gray-800 h-14 rounded-xl flex items-center justify-between px-3">
            <span className="font-medium truncate">{props.data.filename}</span>
            <a
              className="p-2 text-gray-700 hover:text-gray-900 transition-colors"
              href={props.data.url}
            >
              <DownloadCloud size={20} />
            </a>
          </div>
          <div className="w-full h-auto p-2">
            <span className="break-words whitespace-pre-wrap">
              {props.data.text}
            </span>
          </div>
          <div className="flex items-center justify-end gap-1 self-end p-2 text-xs text-gray-600">
            <span>{formatDate()}</span>
            {readReceipt()}
          </div>
        </div>
      </div>
    );
  } else if (props.data.type === "picture") {
    return (
      <div className="flex gap-4 items-start">
        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden flex-shrink-0">
          <img
            src={
              user.uuid == props.sender
                ? user.image_profile || "/user.jpg"
                : props.reciever
            }
            alt={user?.first_name || "sender"}
            className="h-full w-full object-cover"
            onError={(e) => {
              (
                e.target as HTMLImageElement
              ).src = `/placeholder.svg?height=40&width=40`;
            }}
          />
        </div>
        <div className="max-w-96 bg-gray-100 dark:bg-gray-900 flex flex-col h-auto p-2 rounded-2xl">
          <div className="rounded-lg overflow-hidden cursor-pointer">
            <img
              src={props.data.url}
              alt={props.data.filename}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="w-full h-auto p-2 mt-2 text-right">
            <span className="break-words whitespace-pre-wrap">
              {props.data.text}
            </span>
          </div>
          <div className="flex items-center justify-end gap-1 self-end p-2 text-xs text-gray-600">
            <span>{formatDate()}</span>
            {readReceipt()}
          </div>
        </div>
      </div>
    );
  } else if (props.data.type === "anydesk") {
    return (
      <div className="flex gap-4 items-start rtl">
        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0">
          <Avatar
            src={
              user.uuid == props.sender
                ? user.image_profile || "/user.jpg"
                : props.reciever
            }
            alt={user?.first_name || "کاربر"}
            name={user?.first_name}
          />
        </div>
        <div className="max-w-96 bg-gradient-to-br from-red-50 to-gray-50 dark:from-gray-800 dark:to-gray-900 flex flex-col h-auto p-3 rounded-2xl border border-red-100 dark:border-red-700">
          {/* سربرگ AnyDesk */}
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-red-600 p-1.5 rounded-md">
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19.7,10.5L19.7,10.5l-6-6c-0.4-0.4-1-0.4-1.4,0l0,0l-6,6c-0.4,0.4-0.4,1,0,1.4l6,6c0.4,0.4,1,0.4,1.4,0l6-6C20.1,11.5,20.1,10.9,19.7,10.5z M12,16.2L7.8,12L12,7.8l4.2,4.2L12,16.2z" />
              </svg>
            </div>
            <span className="font-bold text-gray-800 dark:text-gray-200">
              دسترسی از راه دور AnyDesk
            </span>
          </div>

          {/* شناسه AnyDesk */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 mb-3 border border-gray-200 dark:border-gray-600 shadow-sm">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                شناسه AnyDesk
              </span>
              <button
                onClick={() => copyToClipboard(props.data.text || "")}
                className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500 flex items-center gap-1 text-xs font-medium"
              >
                <Share2 size={14} />
                کپی
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-mono font-bold text-red-600 dark:text-red-400 tracking-wider">
                {props.data.text}
              </span>
            </div>
          </div>

          {/* دستورالعمل‌ها */}
          <div className="bg-white/70 dark:bg-gray-700 rounded-lg p-3 mb-3 border border-gray-200 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300">
            <p className="mb-2">برای اتصال با AnyDesk:</p>
            <ol className="list-decimal pr-5 space-y-1">
              <li>AnyDesk را از وب‌سایت رسمی دانلود کنید</li>
              <li>برنامه را نصب و اجرا کنید</li>
              <li>شناسه AnyDesk نمایش داده‌شده را وارد کنید</li>
              <li>روی "اتصال" کلیک کنید و منتظر پذیرش بمانید</li>
            </ol>
          </div>

          {/* دکمه دانلود */}
          <a
            href="https://anydesk.com/en/downloads"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors mb-2"
          >
            <DownloadCloud size={18} />
            دانلود AnyDesk
          </a>

          {/* لینک پشتیبانی */}
          <a
            href="https://support.anydesk.com/knowledge"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-center text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 flex items-center justify-center gap-1"
          >
            <ExternalLink size={12} />
            نیاز به کمک دارید؟ به پشتیبانی AnyDesk مراجعه کنید
          </a>

          {/* زمان و وضعیت خوانده‌شده */}
          <div className="flex items-center justify-end gap-1 self-end mt-3 text-xs text-gray-500 dark:text-gray-400">
            <span>{formatDate()}</span>
            {readReceipt()}
          </div>
        </div>
      </div>
    );
  } else if (props.data.type == "code") {
    return (
      <div className="flex items-start gap-2  h-auto">
        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden flex-shrink-0">
          <img
            src={
              user.uuid == props.sender
                ? user.image_profile || "/user.jpg"
                : props.reciever
            }
            alt={user?.first_name || "User"}
            className="h-full w-full object-cover"
          />
        </div>
        <div
          className={`flex flex-col gap-2 relative sm:w-full md:w-2/4 lg:w-3/4 font-sans rounded-2xl`}
        >
          <CodeBlock
            filename="code"
            language={props.data.language || ""}
            code={props.data.text || ""}
          />

          <div className="flex items-center justify-end gap-1 self-end text-xs">
            <span>{formatDate()}</span>
            {readReceipt()}
          </div>
        </div>
      </div>
    );
  } else if (props.data.type == "payment") {
    return (
      <PaymentMessage
        session_id={props.session}
        user={user}
        sender={props.sender}
        reciever={props.reciever}
        data={props.data.data}
        status={props.data.status}
      />
    );
  }

  return null;
};

export default Message;
const token = Cookies.get('token');
const PaymentMessage = ({
  data,
  sender,
  reciever,
  user,
  status,
  session_id,
}: {
  data: any;
  sender: any;
  user: any;
  reciever: any;
  status: any;
  session_id: string;
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
    const response = await perform_post("payment/create_payment/", {
      session_id: session_id,
      title: "کلاس خصوصی",
      description: "توضیحات کلاس خصوصی",
      amount: 1000,
    },
   token || ''
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
