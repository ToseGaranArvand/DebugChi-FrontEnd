"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import Message from "./Message";
import { socket } from "@/config/socket-config";
import { usePathname, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { Main, Main as MainUser } from "../types/user.types";
import { Main as MainChat } from "../types/testChat.type";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store/store";
import {
  setData,
  setMessage,
  setRead,
  setSatus,
} from "@/redux/slices/chatSocketSlice";
import Action from "../chat/header/action";
import { addToast, Button, Textarea } from "@heroui/react";
import { perform_post } from "@/lib/api";

type Props = {
  is_commented: boolean;
  is_closed: string;
  user: Main;
  session_id: string;
  user_applicator: Main;
};

const Conversation = ({
  user_applicator,
  user,
  session_id,
  is_closed,
  is_commented,
}: Props) => {
  let sender: MainUser;
  const query = useSearchParams();
  const chat = useAppSelector((state: RootState) => state.chatSocket);
  const dispatch = useAppDispatch();
  const path = usePathname();
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const [user_data, setUserData] = useState<any>();

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const CheckClosed = is_closed == "close" || isClosed;

  // if (user_data) {
  //   sender = JSON.parse(user_data);
  // }
  useEffect(() => {
    if (typeof window !== "undefined") {
      let user_data = localStorage.getItem("user_data");
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
    });

    socket.on(`${session_id}_sent`, (id) => {
      console.log(id, "hello_");
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
    // <Suspense fallback={<div>loading...</div>}>

    <div className="w-full flex flex-col gap-2 pt-20 flex-1 overflow-y-auto">
      {chat.map((item: MainChat, index) => {
        return (
          <div key={index} dir={item.sender == user_data.uuid ? "rtl" : ""}>
            <Message
              session={session_id}
              data={item.data}
              sender={item.sender}
              reciever={
                item.sender === user.uuid
                  ? user.image_profile
                  : user_applicator.image_profile
              }
            />
          </div>
        );
      })}
      {CheckClosed && is_commented == false && (
        <SendCommentMessage session_id={session_id} user_id={user.id} />
      )}
      <div ref={messagesEndRef} />{" "}
      {/* اینجا رفرنس را به انتهای لیست پیام‌ها اضافه می‌کنیم */}
    </div>
    // </Suspense>
  );
};

export default Conversation;

interface FeedbackOption {
  id: string;
  label: string;
}

const feedbackOptions: FeedbackOption[] = [
  { id: "good-guidance", label: "راهنمایی خوب" },
  { id: "expert", label: "متخصص عالی" },
  { id: "helpful", label: "مفید" },
  { id: "responsive", label: "پاسخگو" },
  { id: "knowledgeable", label: "دانش بالا" },
];

export const SendCommentMessage = ({
  session_id,
  user_id,
}: {
  session_id: any;
  user_id: number;
}) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [sucessesful, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Check system preference for theme (optional)
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setTheme("dark");
      }

      // Listen for changes in color scheme preference
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (event) => {
          setTheme(event.matches ? "dark" : "light");
        });
    }
  }, []);

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const join_selection = selectedOptions.join(",");
    // console.log({
    //   rating,
    //   comment,
    //   join_selection,
    // });
    const token = Cookies.get('token');

    const request = await perform_post("api/v1/comments/", {
      user: user_id,
      description: comment,
      tags: join_selection,
      session_id: session_id,
      rate: rating,
    },
     token || ''
  );
    console.log(request);
    if (request) {
      setIsLoading(false);
      setSuccess(true);
      addToast({
        classNames: {
          base: "z-[9999]",
        },
        title: "ثبت کامنت",
        description: "کامنت شما با موفقیت ثبت شد",
        color: "success",
        variant: "flat",
      });
    } else {
      setIsLoading(false);
      addToast({
        classNames: {
          base: "z-[9999]",
        },
        title: "ثبت کامنت",
        description: "خطا در ارسال اطلاعات دوباره اقدام کنید",
        color: "danger",
        variant: "flat",
      });
    }
  };

  if (sucessesful) {
    return null;
  }

  return (
    <div
      className={`max-w-4xl mx-auto p-6 rounded-lg shadow-md ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-xl font-bold mb-6 text-center">ارزیابی خدمات</h2>

      {/* Star Rating */}
      <div className="mb-6">
        <p className="mb-2 font-medium text-right">امتیاز شما:</p>
        <div className="flex flex-row-reverse justify-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-3xl focus:outline-none transition-colors ${
                star <= rating
                  ? "text-yellow-500"
                  : theme === "dark"
                  ? "text-gray-500"
                  : "text-gray-300"
              }`}
            >
              {star <= rating ? "★" : "☆"}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <p className="mb-2 font-medium text-right">
          موارد مثبت را انتخاب کنید:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {feedbackOptions.map((option) => (
            <Button
              key={option.id}
              type="button"
              color={
                selectedOptions.includes(option.label) ? "primary" : "default"
              }
              className={`justify-center text-center w-full transition-all ${
                selectedOptions.includes(option.label)
                  ? "border-2 border-primary"
                  : `border ${
                      theme === "dark" ? "border-gray-600" : "border-gray-300"
                    }`
              }`}
              onPress={() => handleOptionToggle(option.label)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Comment */}
      <div className="mb-6">
        <p className="mb-2 font-medium text-right">نظر شما:</p>
        <Textarea
          validate={(value) => {
            if (value.length <= 0) {
              return "نظر خود را حتما بنویسید";
            }
          }}
          fullWidth
          dir="rtl"
          placeholder="لطفا نظر خود را وارد کنید..."
          value={comment}
          onValueChange={(e) => setComment(e)}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <Button
          color="primary"
          className="w-full md:w-auto md:min-w-[200px]"
          onPress={handleSubmit}
        >
          ارسال نظر
        </Button>
      </div>
    </div>
  );
};
