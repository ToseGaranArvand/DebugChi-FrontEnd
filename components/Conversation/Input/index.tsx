"use client"
import { Tooltip } from "@heroui/react"
import { ArrowUp } from "lucide-react"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { socket } from "@/config/socket-config"
import type { User } from "@/components/types/user.types"
import { v4 } from "uuid"
import type { Main as SessionInfo } from "@/components/types/session-info"
import SendCode from "@/components/chat/code"
import FileUpload from "@/components/version_1_1/FileUpload"

type Props = {
  reciever: User
  data: any
}


const MicrophoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.3999 16.9999V3.99994C15.3999 3.62865 15.2524 3.27249 14.9899 3.00994C14.7437 2.76379 14.4153 2.61882 14.0693 2.60166L13.9999 2.5999C13.6286 2.5999 13.2725 2.74739 13.0099 3.00994C12.7474 3.27249 12.5999 3.62865 12.5999 3.99994V19.9999C12.5999 20.6895 12.326 21.3507 11.8384 21.8383C11.3508 22.3259 10.6895 22.5999 9.99994 22.5999C9.31038 22.5999 8.64898 22.3259 8.16139 21.8383C7.67382 21.3507 7.3999 20.6894 7.3999 19.9999V6.99994C7.3999 6.62864 7.25241 6.27249 6.98986 6.00994C6.74373 5.76381 6.41537 5.61883 6.06936 5.60166L5.99986 5.5999C5.62858 5.59991 5.27252 5.74741 5.00998 6.00994C4.74743 6.27249 4.59994 6.62864 4.59994 6.99994V10.9999C4.59994 11.6895 4.32593 12.3507 3.83834 12.8383C3.35075 13.3259 2.68947 13.5999 1.9999 13.5999C1.66854 13.5999 1.39992 13.3313 1.3999 12.9999C1.3999 12.6686 1.66853 12.3999 1.9999 12.3999C2.3712 12.3999 2.72735 12.2525 2.9899 11.9899C3.25245 11.7274 3.39994 11.3712 3.39994 10.9999V6.99994C3.39994 6.31038 3.67383 5.64898 4.16143 5.16139C4.64901 4.67381 5.31032 4.39991 5.99986 4.3999L6.06443 4.40072C6.73061 4.41724 7.36605 4.68902 7.83842 5.16139C8.32601 5.64898 8.5999 6.31038 8.5999 6.99994V19.9999C8.5999 20.3712 8.74739 20.7274 9.00994 20.9899C9.27249 21.2524 9.62865 21.3999 9.99994 21.3999C10.3712 21.3999 10.7273 21.2524 10.9898 20.9899C11.2524 20.7274 11.3999 20.3712 11.3999 19.9999V3.99994C11.3999 3.31038 11.6739 2.64898 12.1615 2.16139C12.6491 1.67382 13.3104 1.3999 13.9999 1.3999L14.0645 1.40072C14.7306 1.41725 15.366 1.68906 15.8383 2.16139C16.3259 2.64898 16.5999 3.31038 16.5999 3.99994V16.9999L16.6016 17.0693C16.6187 17.4153 16.7638 17.7437 17.01 17.9899C17.2725 18.2524 17.6286 18.3999 17.9999 18.3999C18.3712 18.3999 18.7273 18.2524 18.9899 17.9899C19.2524 17.7274 19.3999 17.3712 19.3999 16.9999V12.9999C19.3999 12.3104 19.6738 11.649 20.1614 11.1614C20.649 10.6738 21.3104 10.3999 21.9999 10.3999C22.3313 10.3999 22.5999 10.6685 22.5999 10.9999C22.5999 11.3313 22.3313 11.5999 21.9999 11.5999C21.6286 11.5999 21.2725 11.7474 21.0099 12.0099C20.7474 12.2725 20.5999 12.6286 20.5999 12.9999V16.9999C20.5999 17.6894 20.326 18.3507 19.8384 18.8383C19.3508 19.3259 18.6894 19.5999 17.9999 19.5999C17.3103 19.5999 16.649 19.3259 16.1614 18.8383C15.6891 18.366 15.4172 17.7306 15.4006 17.0645L15.3999 16.9999Z"
      fill="#000000"
    />
  </svg>
)

const AttachmentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_4564_1980)">
      <path
        d="M13.4701 5.62186C12.992 5.14377 12.3436 4.87517 11.6675 4.87503L11.6042 4.87583C10.951 4.89214 10.328 5.15869 9.8648 5.62186C9.38715 6.09951 9.11848 6.74716 9.11784 7.4226L9.20802 16.4356C9.20803 16.4371 9.20808 16.4387 9.20808 16.4402C9.20808 17.5144 9.63478 18.5446 10.3944 19.3042C11.154 20.0638 12.1842 20.4905 13.2585 20.4905C14.3327 20.4905 15.3629 20.0638 16.1225 19.3043L16.1928 19.2322C16.9067 18.4819 17.3068 17.4855 17.3086 16.4474L17.2102 8.11934C17.2073 7.87083 17.4064 7.66692 17.6549 7.66398C17.9034 7.66105 18.1072 7.86015 18.1101 8.10865L18.2085 16.4286C18.2086 16.4324 18.2089 16.4363 18.2089 16.4402C18.2089 17.7326 17.7034 18.9729 16.8021 19.8968L16.7589 19.9406C15.8305 20.869 14.5714 21.3906 13.2585 21.3906C11.9455 21.3906 10.6863 20.869 9.75797 19.9406C8.83066 19.0133 8.30924 17.7559 8.30805 16.4446L8.21794 7.42906V7.42446L8.21893 7.33882C8.24099 6.45505 8.60175 5.61212 9.2284 4.98546C9.85505 4.35882 10.6979 3.99812 11.5817 3.97605L11.6674 3.975L11.6675 3.975L11.7532 3.97612C12.6369 3.99817 13.4799 4.35881 14.1065 4.98546C14.7523 5.63128 15.1155 6.50679 15.1169 7.41999H15.117L15.2082 16.4356C15.2082 16.4372 15.2082 16.4387 15.2082 16.4402C15.2081 16.9573 15.0026 17.4532 14.637 17.8188C14.2714 18.1844 13.7755 18.3899 13.2585 18.3899L13.2583 18.3899C12.7413 18.3898 12.2454 18.1844 11.8798 17.8188C11.5142 17.4532 11.3087 16.9573 11.3086 16.4402L11.2175 7.42906L11.2178 7.40594C11.2275 7.16808 11.4221 6.97702 11.6629 6.97457C11.9114 6.97206 12.1149 7.17154 12.1174 7.42005L12.2087 16.4356L12.2087 16.4401C12.2087 16.7185 12.3193 16.9855 12.5162 17.1824C12.713 17.3792 12.98 17.4899 13.2584 17.49L13.3104 17.4887C13.5699 17.4758 13.8161 17.367 14.0006 17.1824C14.1972 16.9858 14.3078 16.7194 14.3082 16.4414L14.217 7.42912L14.217 7.42459L14.2162 7.36132C14.1999 6.70809 13.9333 6.08504 13.4701 5.62186Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_4564_1980">
        <rect width="18" height="18" fill="white" transform="translate(0 12.728) rotate(-45)" />
      </clipPath>
    </defs>
  </svg>
)

const InputMessage = ({ reciever, data }: Props) => {
  const path = usePathname()
  const [description, SetDescription] = useState<string>("")
  const [response_data, setData] = useState<SessionInfo>()
  const [user, setUser] = useState<any>()
  const session_id = path.split("/")[2]


  const playMessageSentSound = () => {
    const audio = new Audio("/sounds/message-sent.mp3")
    audio.play().catch(() => {})
  }


  const playMessageReceivedSound = () => {
    const audio = new Audio("/sound/message-received.wav")
    audio.play().catch(() => {})
  }

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
    }
    socket.emit("test_message", data)
    SetDescription("")
    playMessageSentSound()
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user_data = localStorage.getItem("user_data")
      if (user_data) {
        setUser(JSON.parse(user_data))
      }
    }
  }, [])

  useEffect(() => {
    setData(data)
    const lockHandler = (data: { lock: boolean }) => {
      if (data.lock) {
        setData((prev) => {
          if (!prev) return prev
          return {
            ...prev,
            data: {
              ...prev.data,
              is_locked: true,
            },
          }
        })
      }
    }
    const closeHandler = (data: { closed: string }) => {
      if (data.closed) {
        setData((prev) => {
          if (!prev) return prev
          return {
            ...prev,
            data: {
              ...prev.data,
              status: "close",
            },
          }
        })
      }
    }

 
    const messageHandler = (msg: any) => {
      if (msg.sender !== user?.uuid) {
        playMessageReceivedSound()
      }
    }

    socket.on(`lock_session_${session_id}`, lockHandler)
    socket.on(`close_session_${session_id}`, closeHandler)
    socket.on(String(session_id), messageHandler)

    return () => {
      socket.off(`lock_session_${session_id}`, lockHandler)
      socket.off(`close_session_${session_id}`, closeHandler)
      socket.off(String(session_id), messageHandler)
    }
  }, [session_id, user])

  if (!user) return null

  if (response_data?.is_debuger == false && response_data?.data.is_locked) {
    return (
      <div className="w-full flex justify-center items-center bg-[#1C1C1C] rounded-3xl h-16">
        <p className="text-sm text-gray-400">برای ادامه پرداخت را تکمیل کنید</p>
      </div>
    )
  }

  if (response_data?.data.status === "close") {
    return null
  }

  return (
    <div className="flex-shrink-0 p-4">
      <div className="relative w-full">
        <input
          type="text"
          value={description}
          onChange={(e) => SetDescription(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              sendMessage()
            }
          }}
          placeholder="پیام خود را بنویسید..."
          className="w-full px-16 py-3 text-right text-white placeholder-gray-400 outline-none rounded-2xl"
          style={{
            background: "#1C1C1CB2",
            border: "1px solid #6E6E6E",
            backdropFilter: "blur(100px)",
          }}
          dir="rtl"
        />

        
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          {description.length > 0 ? (
            <button className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors" onClick={sendMessage}>
              <ArrowUp className="w-4 h-4 text-white" />
            </button>
          ) : (
            <button className="p-2 rounded-full bg-white hover:bg-gray-100 transition-colors">
              <MicrophoneIcon />
            </button>
          )}
        </div>

    
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
     
          <Tooltip color="primary" content="کد">
            <div className="p-2 rounded-full border border-gray-600 hover:border-gray-500 transition-colors">
              <SendCode sender={user.uuid} reciever={reciever.uuid} />
            </div>
          </Tooltip>

          {/* دکمه آپلود فایل */}
          {/* <Tooltip color="primary" content="ارسال فایل">
            <div className="p-2 rounded-full border border-gray-600 hover:border-gray-500 transition-colors">
              <FileUpload
                session_id={response_data?.data.session_id || ""}
                reciever={reciever.uuid}
                sender={user.uuid}
              />
            </div>
          </Tooltip> */}

          
          <button className="p-2 rounded-full border border-gray-600 hover:border-gray-500 transition-colors">
            <AttachmentIcon />
          </button>
        </div>
      </div>
    </div>
  )
}

export default InputMessage
