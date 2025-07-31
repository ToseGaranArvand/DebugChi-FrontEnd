"use client"
import { useEffect, useRef, useState } from "react"
import type React from "react"
import { Check, CheckCheck, Clock, Pause, Play, Share2 } from "lucide-react"
import type { chatData } from "@/components/types/testChat.type"
import { Avatar, Button, Chip } from "@heroui/react"
import { CodeBlock } from "@/components/ui/ace/code-block"
import { formatCurrency } from "@/utils/tools"
import { perform_post } from "@/lib/api"
import Cookies from "js-cookie"

interface MessageProps {
  session: string
  data: chatData
  sender: string
  reciever: string
}


const DoubleCheckIcon = () => (
  <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.5 5.5L1.90909 7L6 1" stroke="white" strokeWidth="0.8" strokeLinecap="round" />
    <path d="M4.5 5.5L5.90909 7L10 1" stroke="white" strokeWidth="0.8" strokeLinecap="round" />
  </svg>
)


const ProgrammerMessageBubble = ({ children, time }: { children: React.ReactNode; time: string }) => {
  const textRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 200, height: 60 })

  useEffect(() => {
    if (textRef.current) {
      const textWidth = textRef.current.scrollWidth
      const textHeight = textRef.current.scrollHeight
      setDimensions({
        width: Math.max(200, Math.min(400, textWidth + 60)),
        height: Math.max(60, textHeight + 40),
      })
    }
  }, [children])

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
          d={`M0 15C0 6.71573 6.71573 0 15 0H${dimensions.width - 26.126}C${dimensions.width - 17.842} 0 ${dimensions.width - 11.126} 6.71573 ${dimensions.width - 11.126} 15V${dimensions.height - 12}L${dimensions.width} ${dimensions.height}H${dimensions.width - 31.987}H15C6.71573 ${dimensions.height} 0 ${dimensions.height - 6.7157} 0 ${dimensions.height - 15}V15Z`}
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
          <DoubleCheckIcon />
          <span className="text-white text-xs opacity-70">{time}</span>
        </div>
      </div>
    </div>
  )
}


const ClientMessageBubble = ({ children, time }: { children: React.ReactNode; time: string }) => {
  const textRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 180, height: 50 })

  useEffect(() => {
    if (textRef.current) {
      const textWidth = textRef.current.scrollWidth
      const textHeight = textRef.current.scrollHeight
      setDimensions({
        width: Math.max(180, Math.min(350, textWidth + 50)),
        height: Math.max(50, textHeight + 35),
      })
    }
  }, [children])

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
          d={`M0 0H17H${dimensions.width - 15}C${dimensions.width - 6.716} 0 ${dimensions.width} 6.71573 ${dimensions.width} 15V${dimensions.height - 15.5}C${dimensions.width} ${dimensions.height - 7.2157} ${dimensions.width - 6.716} ${dimensions.height - 0.5} ${dimensions.width - 15} ${dimensions.height - 0.5}H23C14.7157 ${dimensions.height - 0.5} 8 ${dimensions.height - 7.2157} 8 ${dimensions.height - 15.5}V12L0 0Z`}
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
          <DoubleCheckIcon />
          <span className="text-[#BABABA] text-xs opacity-70">{time}</span>
        </div>
      </div>
    </div>
  )
}

const Message = ({ session, data, sender, reciever }: MessageProps) => {
  const [user, setUserData] = useState<any>()
  const [time, setTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user_data = localStorage.getItem("user_data")
      if (user_data) {
        setUserData(JSON.parse(user_data))
      }
    }
    if (audioRef.current) {
      audioRef.current.ontimeupdate = () => {
        setTime(audioRef.current?.currentTime || 0)
      }
    }
  }, [])

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleSliderChange = (value: number) => {
    setTime(value)
    if (audioRef.current) {
      audioRef.current.currentTime = value
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`
  }

  const readReceipt = () => {
    if (user?.uuid === sender) {
      if (data.status === "pending") {
        return <Clock className="text-gray-400" size={14} />
      } else if (data.status === "sent") {
        return <Check className="text-gray-400" size={14} />
      }
      return <CheckCheck className="text-blue-500" size={14} />
    }
    return null
  }

  const formatDate = () => {
    return new Date(data.created_at || "").toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  if (!user) return null

  const messageTime = formatDate()

  
  if (data.type === "text") {
    return (
      <div className={`flex mb-4`}>
        {sender === user?.uuid ? (
          <ProgrammerMessageBubble time={messageTime}>{data.text}</ProgrammerMessageBubble>
        ) : (
          <ClientMessageBubble time={messageTime}>{data.text}</ClientMessageBubble>
        )}
      </div>
    )
  }


  if (data.type === "audio") {
    return (
      <div className="flex items-start gap-4">
        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-slate-900 overflow-hidden flex-shrink-0">
          <img
            src={user.uuid == sender ? user.image_profile || "/user.jpg" : reciever}
            alt={user?.first_name || "User"}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="grid grid-cols-1 w-96 bg-gray-100 dark:bg-gray-900 rounded-2xl py-2 px-4 gap-2">
          <audio ref={audioRef}>
            <source src={data.audioUrl} type="audio/webm" />
          </audio>
          <div className="flex gap-4 items-center">
            <Button
              onPress={togglePlayPause}
              color="secondary"
              isIconOnly
              radius="full"
              variant="flat"
              startContent={isPlaying ? <Pause size={14} /> : <Play size={14} className="fill-current ml-0.5" />}
            />
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
              {messageTime}
              {readReceipt()}
            </span>
          </div>
        </div>
      </div>
    )
  }

  
  if (data.type === "file") {
    return (
      <div className={`flex ${sender === user?.uuid ? "justify-end" : "justify-start"} mb-4`}>
        {sender === user?.uuid ? (
          <div className="bg-blue-600 rounded-lg p-4 max-w-md">
            <div className="flex items-center gap-2 mb-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polyline
                  points="14,2 14,8 20,8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <a href={data.url} target="_blank" rel="noopener noreferrer" className="text-white hover:underline">
                {data.filename || "فایل ضمیمه"}
              </a>
            </div>
            {data.text && <p className="text-white text-sm mb-2">{data.text}</p>}
            <div className="flex items-center justify-start gap-1 mt-2">
              <DoubleCheckIcon />
              <span className="text-gray-200 text-xs">{messageTime}</span>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-4 max-w-md">
            <div className="flex items-center gap-2 mb-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polyline
                  points="14,2 14,8 20,8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <a href={data.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                {data.filename || "فایل ضمیمه"}
              </a>
            </div>
            {data.text && <p className="text-white text-sm mb-2">{data.text}</p>}
            <div className="flex items-center justify-start gap-1 mt-2">
              <DoubleCheckIcon />
              <span className="text-gray-400 text-xs">{messageTime}</span>
            </div>
          </div>
        )}
      </div>
    )
  }


  if (data.type === "picture") {
    return (
      <div className="flex gap-4 items-start">
        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden flex-shrink-0">
          <img
            src={user.uuid == sender ? user.image_profile || "/user.jpg" : reciever}
            alt={user?.first_name || "sender"}
            className="h-full w-full object-cover"
            onError={(e) => {
              ;(e.target as HTMLImageElement).src = `/placeholder.svg?height=40&width=40`
            }}
          />
        </div>
        <div className="max-w-96 bg-gray-100 dark:bg-gray-900 flex flex-col h-auto p-2 rounded-2xl">
          <div className="rounded-lg overflow-hidden cursor-pointer">
            <img src={data.url || "/placeholder.svg"} alt={data.filename} className="w-full h-auto object-cover" />
          </div>
          <div className="w-full h-auto p-2 mt-2 text-right">
            <span className="break-words whitespace-pre-wrap">{data.text}</span>
          </div>
          <div className="flex items-center justify-end gap-1 self-end p-2 text-xs text-gray-600">
            <span>{messageTime}</span>
            {readReceipt()}
          </div>
        </div>
      </div>
    )
  }

 
  if (data.type === "anydesk") {
    return (
      <div className="flex gap-4 items-start rtl">
        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0">
          <Avatar
            src={user.uuid == sender ? user.image_profile || "/user.jpg" : reciever}
            alt={user?.first_name || "کاربر"}
            name={user?.first_name}
          />
        </div>
        <div className="max-w-96 bg-gradient-to-br from-red-50 to-gray-50 dark:from-gray-800 dark:to-gray-900 flex flex-col h-auto p-3 rounded-2xl border border-red-100 dark:border-red-700">
        
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-red-600 p-1.5 rounded-md">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.7,10.5L19.7,10.5l-6-6c-0.4-0.4-1-0.4-1.4,0l0,0l-6,6c-0.4,0.4-0.4,1,0,1.4l6,6c0.4,0.4,1,0.4,1.4,0l6-6C20.1,11.5,20.1,10.9,19.7,10.5z M12,16.2L7.8,12L12,7.8l4.2,4.2L12,16.2z" />
              </svg>
            </div>
            <span className="font-bold text-gray-800 dark:text-gray-200">دسترسی از راه دور AnyDesk</span>
          </div>
  
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 mb-3 border border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">شناسه AnyDesk:</p>
                <p className="text-lg font-mono font-bold text-gray-800 dark:text-gray-200">{data.text}</p>
              </div>
              <Button
                size="sm"
                variant="flat"
                color="primary"
                startContent={<Share2 size={14} />}
                onPress={() => copyToClipboard(data.text || "")}
              >
                کپی
              </Button>
            </div>
          </div>

          <div className="text-xs text-gray-600 dark:text-gray-400 mb-3">
            <p>برای اتصال:</p>
            <ol className="list-decimal list-inside mt-1 space-y-1">
              <li>نرم‌افزار AnyDesk را باز کنید</li>
              <li>شناسه بالا را در قسمت "Remote Desk" وارد کنید</li>
              <li>روی "Connect" کلیک کنید</li>
            </ol>
          </div>
      
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>{messageTime}</span>
            <div className="flex items-center gap-1">
              {readReceipt()}
              <span className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 px-2 py-1 rounded-full text-xs">
                فعال
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  
  if (data.type === "code") {
    return (
      <div className="flex items-start gap-2 h-auto">
        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden flex-shrink-0">
          <img
            src={user.uuid == sender ? user.image_profile || "/user.jpg" : reciever}
            alt={user?.first_name || "User"}
            className="h-full w-full object-cover"
          />
        </div>
        <div className={`flex flex-col gap-2 relative sm:w-full md:w-2/4 lg:w-3/4 font-sans rounded-2xl`}>
          <CodeBlock filename="code" language={data.language || ""} code={data.text || ""} />
          <div className="flex items-center justify-end gap-1 self-end text-xs">
            <span>{messageTime}</span>
            {readReceipt()}
          </div>
        </div>
      </div>
    )
  }


  if (data.type === "payment") {
    return (
      <PaymentMessage
        session_id={session}
        user={user}
        sender={sender}
        reciever={reciever}
        data={data.data}
        status={data.status}
      />
    )
  }

  return null
}

export default Message

const token = Cookies.get("token")

const PaymentMessage = ({
  data,
  sender,
  reciever,
  user,
  status,
  session_id,
}: {
  data: any
  sender: any
  user: any
  reciever: any
  status: any
  session_id: string
}) => {
  const _date = new Date(data.date).toLocaleDateString("fa-IR", {
    day: "numeric",
    hour: "numeric",
    year: "numeric",
    minute: "numeric",
    month: "long",
  })
  const [isLoading, setIsLoading] = useState(false)

  const createPayment = async () => {
    setIsLoading(true)
    const response = await perform_post(
      "payment/create_payment/",
      {
        session_id: session_id,
        title: "کلاس خصوصی",
        description: "توضیحات کلاس خصوصی",
        amount: 1000,
      },
      token || "",
    )
    if (response.success) {
      window.location.href = response.url
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-row-reverse items-start gap-2 h-auto">
      <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden flex-shrink-0">
        <img
          src={
            user.uuid == sender ? `${process.env.server}/${user?.image_profile}` : `${process.env.server}/${reciever}`
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
              {status == "pending" ? "درحال بررسی" : status == "close" ? "لغو درخواست" : "پرداخت شده"}
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
                {data.class.session_hours}ساعت {data.class.session_minutes > 0 ? `${data.class.session_minutes}m` : ""}
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
                  const type = key.replace("is_", "")
                  return (
                    <span key={key} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full capitalize">
                      {type}
                    </span>
                  )
                }
                return null
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
              {status == "pending" ? "درحال بررسی" : status == "close" ? "لغو درخواست" : "پرداخت شده"}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
