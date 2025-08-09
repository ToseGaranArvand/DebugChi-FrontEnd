"use client"
import { useEffect, useRef, useState } from "react"
import Message from "./Message"
import { socket } from "@/config/socket-config"
import type { Main } from "../types/user.types"
import type { Main as MainChat } from "../types/testChat.type"
import { type RootState, useAppDispatch, useAppSelector } from "@/redux/store/store"
import { setData, setMessage, setRead, setSatus } from "@/redux/slices/chatSocketSlice"
import { addToast, Button, Textarea } from "@heroui/react"
import { perform_post } from "@/lib/api"
import Cookies from "js-cookie"

type Props = {
  is_commented: boolean
  is_closed: string
  user: Main
  session_id: string
  user_applicator: Main
}


const StarIcon = () => (
  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.5 0L15.8761 9.12387L25 12.5L15.8761 15.8761L12.5 25L9.12387 15.8761L0 12.5L9.12387 9.12387L12.5 0Z"
      fill="#3C91FF"
    />
  </svg>
)

const ArrowIcon = ({ isRotated }: { isRotated: boolean }) => (
  <svg
    width="12"
    height="7"
    viewBox="0 0 12 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      transform: isRotated ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 0.3s ease",
    }}
  >
    <path
      d="M1 1L6 6L11 1"
      stroke="#BBBBBB"
      strokeOpacity="0.42"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const Conversation = ({ user_applicator, user, session_id, is_closed, is_commented }: Props) => {
  const chat = useAppSelector((state: RootState) => state.chatSocket)
  const dispatch = useAppDispatch()
  const [isClosed, setIsClosed] = useState<boolean>(false)
  const [user_data, setUserData] = useState<any>()
  const [isExpanded, setIsExpanded] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const CheckClosed = is_closed == "close" || isClosed

  const fullProblemText = `مشکلی در اتصال به پایگاه داده وجود دارد. به نظر می‌رسد که رشته اتصال (connection string) نامعتبر است. لطفاً تنظیمات پایگاه داده را بررسی کنید و مطمئن شوید که نام کاربری، رمز عبور و آدرس سرور به درستی وارد شده‌اند. این مشکل ممکن است به دلیل تغییرات اخیر در سرور یا تنظیمات فایروال باشد.علاوه بر این، ممکن است مشکل از طرف تنظیمات شبکه یا محدودیت‌های امنیتی باشد. پیشنهاد می‌شود ابتدا اتصال شبکه را بررسی کنید و سپس لاگ‌های سرور را مطالعه کنید تا علت دقیق مشکل مشخص شود. همچنین بررسی کنید که آیا سرویس پایگاه داده در حال اجرا است یا خیر.`

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user_data = localStorage.getItem("user_data")
      if (user_data) {
        setUserData(JSON.parse(user_data))
      }
    }
    const data = {
      session_id: session_id,
    }
    socket.emit("get_messages", data)
    socket.on("get_messages", (data) => {
      dispatch(setData(data))
      setTimeout(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" })
  }, 100)
    })
  }, [])

  useEffect(() => {
    const closeHandler = (data: { closed: string }) => {
      if (data.closed) {
        setIsClosed(true)
      }
    }
    socket.on(`close_session_${session_id}`, closeHandler)
    socket.on(String(session_id), (msg) => {
      dispatch(setMessage(msg))
      setTimeout(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, 100)
    })
    socket.on(`${session_id}_sent`, (id) => {
      dispatch(setSatus({ id: id, status: "sent" }))
    })
    socket.on(`${session_id}_read`, (data) => {
      if (data.read) {
        dispatch(setRead())
      }
    })
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" })
    return () => {
      socket.off(`get_messages`)
      socket.off(String(session_id))
      socket.off(`${session_id}_sent`)
      socket.off(`${session_id}_read`)
      socket.off(`close_session_${session_id}`, closeHandler)
    }
  }, [socket, chat])

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col">
      {/* Problem Description Box */}
      <div className="w-2/5 mx-auto mb-6">
       
        <div className="flex items-center gap-2 mb-4 justify-start">
          <StarIcon />
          <h1 className="text-white text-lg font-semibold">مشکل اتصال پایگاه داده</h1>
        </div>
        <div className="text-center">
          <div className="relative">
            <p
              className="text-gray-300 text-sm leading-relaxed transition-all duration-700 ease-in-out"
              style={{
                maxHeight: isExpanded ? "400px" : "96px",
                overflow: "hidden",
                maskImage: !isExpanded ? "linear-gradient(to bottom, black 60%, transparent 100%)" : "none",
                WebkitMaskImage: !isExpanded ? "linear-gradient(to bottom, black 60%, transparent 100%)" : "none",
              }}
            >
              {isExpanded ? fullProblemText : fullProblemText.substring(0, 200) + "..."}
            </p>
            {!isExpanded && (
              <div
                className="absolute bottom-0 left-0 w-full transition-opacity duration-300"
                style={{
                  height: "48px",
                  background:
                    "linear-gradient(to top, #0F0F0F 100%, rgba(15, 15, 15, 0.95) 80%, rgba(15, 15, 15, 0.7) 60%, rgba(15, 15, 15, 0.3) 30%, transparent 0%)",
                }}
              />
            )}
            <div className="mt-4">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="px-32 py-4 rounded-full text-white text-xs flex items-center gap-2 mx-auto transition-all duration-300"
                style={{
                  background: "#111111",
                  border: "0.5px solid #6E6E6E",
                  backdropFilter: "blur(100px)",
                }}
              >
                {isExpanded ? "نمایش کمتر" : "نمایش بیشتر"}
                <ArrowIcon isRotated={isExpanded} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        className="space-y-4 max-w-full transition-all duration-500 ease-in-out pb-24"
        style={{
          transform: isExpanded ? "translateY(0)" : "translateY(0)",
          marginTop: isExpanded ? "20px" : "0px",
        }}
      >
        {chat.map((item: MainChat, index) => {
          return (
            <div key={index} dir={item.sender == user_data?.uuid ? "rtl" : ""}>
              <Message
                session={session_id}
                data={item.data}
                sender={item.sender}
                reciever={item.sender === user.uuid ? user.image_profile : user_applicator.image_profile}
              />
            </div>
          )
        })}
        {CheckClosed && is_commented == false && <SendCommentMessage session_id={session_id} user_id={user.id} />}
        <div ref={messagesEndRef} className="mb-24" />
      </div>
    </div>
  )
}

export default Conversation

interface FeedbackOption {
  id: string
  label: string
}

const feedbackOptions: FeedbackOption[] = [
  { id: "good-guidance", label: "راهنمایی خوب" },
  { id: "expert", label: "متخصص عالی" },
  { id: "helpful", label: "مفید" },
  { id: "responsive", label: "پاسخگو" },
  { id: "knowledgeable", label: "دانش بالا" },
]

export const SendCommentMessage = ({ session_id, user_id }: { session_id: any; user_id: number }) => {
  const [rating, setRating] = useState<number>(0)
  const [comment, setComment] = useState<string>("")
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [sucessesful, setSuccess] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions((prev) => (prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]))
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    const join_selection = selectedOptions.join(",")
    const token = Cookies.get("token")
    const request = await perform_post(
      "api/v1/comments/",
      {
        user: user_id,
        description: comment,
        tags: join_selection,
        session_id: session_id,
        rate: rating,
      },
      token || "",
    )
    if (request) {
      setIsLoading(false)
      setSuccess(true)
      addToast({
        classNames: { base: "z-[9999]" },
        title: "ثبت کامنت",
        description: "کامنت شما با موفقیت ثبت شد",
        color: "success",
        variant: "flat",
      })
    } else {
      setIsLoading(false)
      addToast({
        classNames: { base: "z-[9999]" },
        title: "ثبت کامنت",
        description: "خطا در ارسال اطلاعات دوباره اقدام کنید",
        color: "danger",
        variant: "flat",
      })
    }
  }

  if (sucessesful) {
    return null
  }

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-md bg-gray-800 text-white">
      <h2 className="text-xl font-bold mb-6 text-center">ارزیابی خدمات</h2>
      <div className="mb-6">
        <p className="mb-2 font-medium text-right">امتیاز شما:</p>
        <div className="flex flex-row-reverse justify-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-3xl focus:outline-none transition-colors ${
                star <= rating ? "text-yellow-500" : "text-gray-500"
              }`}
            >
              {star <= rating ? "★" : "☆"}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <p className="mb-2 font-medium text-right">موارد مثبت را انتخاب کنید:</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {feedbackOptions.map((option) => (
            <Button
              key={option.id}
              type="button"
              color={selectedOptions.includes(option.label) ? "primary" : "default"}
              className={`justify-center text-center w-full transition-all ${
                selectedOptions.includes(option.label) ? "border-2 border-primary" : "border border-gray-600"
              }`}
              onPress={() => handleOptionToggle(option.label)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <p className="mb-2 font-medium text-right">نظر شما:</p>
        <Textarea
          validate={(value) => {
            if (value.length <= 0) {
              return "نظر خود را حتما بنویسید"
            }
          }}
          fullWidth
          dir="rtl"
          placeholder="لطفا نظر خود را وارد کنید..."
          value={comment}
          onValueChange={(e) => setComment(e)}
        />
      </div>
      <div className="flex justify-center">
        <Button color="primary" className="w-full md:w-auto md:min-w-[200px]" onPress={handleSubmit}>
          ارسال نظر
        </Button>
      </div>
    </div>
  )
}
