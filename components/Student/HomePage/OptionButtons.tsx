"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { ErrorSection } from "./ErrorSection";
import { Button, Textarea } from "@heroui/react";
import { Paperclip, SendHorizontal } from "lucide-react";

interface IOptionButtons {
  userRole?: string[];
}

const loginErrText = "برای چت با هوش مصنوعی دیباگچی وارد حساب کاربری خود شوید";
const selectCatErrText =
  "برای شروع چت با هوش مصنوعی ابتدا موضوع را انتخاب کنید";

const OptionButtons: FC<IOptionButtons> = ({ userRole }) => {
  const [error, setError] = useState<string | undefined>("");
  const [chatType, setChatType] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const optionRef = useRef<HTMLDivElement>(null);
  const sendRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleErrorClick = (errText?: string) => {
    if (!userRole) {
      setError(errText);
      return;
    }
  };

  const handleClick = (type: string) => {
    setChatType(type);
    setError(""); // پاک‌کردن ارور قبلی
  };
  const handleKeyDown = (e: React.KeyboardEvent<Element>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // از ایجاد خط جدید جلوگیری می‌کنیم
      handleSend();
    }
  };

  const handleSend = () => {
    if (!chatType) {
      setError(selectCatErrText);
      return;
    }
    if (!message.trim()) {
      setError("لطفاً یک پیام وارد کنید");
      return;
    }

    // ارسال داده‌ها (فعلاً فقط نمایش در کنسول)
    const formData = {
      type: chatType,
      text: message,
      file: file?.name || null,
    };
    console.log("فرم ارسال شد:", formData);

    // پاک‌سازی فرم
    setChatType("");
    setMessage("");
    setFile(null);
    setError("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError("");
    }
  };

  // handle error useEffect
  useEffect(() => {
    if (!error) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        optionRef.current &&
        !optionRef.current.contains(event.target as Node) &&
        sendRef.current &&
        !sendRef.current.contains(event.target as Node)
      ) {
        setError("");
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [error]);

  return (
    <>
      <div className="w-full flex-1 flex flex-col items-center justify-center">
        <h1 className="text-[28px]">چطور میتونم کمکت کنم ؟</h1>

        {/* گزینه‌ها */}
        <div
          ref={optionRef}
          className="mt-6 grid grid-cols-5 gap-x-2 gap-y-[10px]"
        >
          <Button
            onPress={() =>
              userRole ? handleClick("debug") : handleErrorClick(loginErrText)
            }
            className="col-span-2  min-h-0 !h-10 border border-[#6E6E6E30] rounded-[10px] bg-gradient-to-tr from-black to-[#13151B] text-[15px] text-[#BBBBBB] font-iranLight py-3"
          >
            دیباگینگ میخوام
          </Button>
          <Button
            onPress={() =>
              userRole ? handleClick("consult") : handleErrorClick(loginErrText)
            }
            className="col-span-3  min-h-0 !h-10 border border-[#6E6E6E30] rounded-[10px] bg-gradient-to-tr from-black to-[#13151B] text-[15px] text-[#BBBBBB] font-iranLight py-3"
          >
            به مشاوره نیاز دارم
          </Button>
          <Button
            onPress={() =>
              userRole ? handleClick("private") : handleErrorClick(loginErrText)
            }
            className="col-span-3  min-h-0 !h-10 border border-[#6E6E6E30] rounded-[10px] bg-gradient-to-tr from-black to-[#13151B] text-[15px] text-[#BBBBBB] font-iranLight py-3"
          >
            کلاس خصوصی
          </Button>
          <Button
            onPress={() =>
              userRole ? handleClick("public") : handleErrorClick(loginErrText)
            }
            className="col-span-2  min-h-0 !h-10 border border-[#6E6E6E30] rounded-[10px] bg-gradient-to-tr from-black to-[#13151B] text-[15px] text-[#BBBBBB] font-iranLight py-3"
          >
            کلاس عمومی
          </Button>
        </div>

        {/* ارور */}
        <ErrorSection error={error} />
      </div>

      {/* فرم چت */}
      <div
        ref={sendRef}
        dir="rtl"
        className="w-full min-h-[120px] p-2 flex items-end justify-between bg-[#1C1C1CB2] rounded-[20px] border border-[#6E6E6E] mt-6"
      >
        {/* ارسال */}
        <Button
          onPress={handleSend}
          isIconOnly
          className="min-w-0 w-[38px] min-h-0 h-[38px] !p-0 !pl-0.5 rounded-full bg-white"
          startContent={<SendHorizontal className="text-black" />}
        />

        {/* متن پیام */}
        <Textarea
          value={message}
          onValueChange={setMessage}
          onKeyDown={handleKeyDown}
          size="lg"
          isClearable
          isDisabled={!userRole}
          classNames={{
            inputWrapper: "!bg-transparent !min-h-[104px] !h-fit !block",
            input: "!pl-5",
            innerWrapper: "!h-fit",
          }}
          className="min-h-[104px] w-[80%] mx-auto placeholder:text-[#BBBBBB]"
          placeholder="از من سوال بپرس ..."
        />

        {/* آپلود فایل */}
        <Button
          onPress={() => fileInputRef.current?.click()}
          isIconOnly
          className="min-w-0 w-[38px] min-h-0 h-[38px] rounded-full bg-transparent border border-[#6E6E6E]"
          startContent={<Paperclip className="-rotate-45 w-4 h-4" />}
        />
        <input
          ref={fileInputRef}
          type="file"
          hidden
          onChange={handleFileChange}
        />
      </div>

      {/* نمایش نام فایل انتخاب‌شده */}
      {file && (
        <p className="text-sm text-gray-400 mt-2 text-center">
          فایل انتخاب‌شده: {file.name}
        </p>
      )}
    </>
  );
};

export { OptionButtons };

// Wave 1 (User not logged in enters):
//   When the user clicks on any of the option buttons or send/pin buttons,
//   an error appears. This error is handled inside the handleErrorClick function.
//   If the user clicks anywhere outside the option buttons or the chat input box,
//   the error message disappears — this behavior is managed in the handle error useEffect.
// much love for next generation devs :)
