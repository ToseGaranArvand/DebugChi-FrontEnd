// components/ChatInputSection.tsx
"use client";

import { FC, useRef } from "react";
import { Button, Textarea } from "@heroui/react";
import { Paperclip, SendHorizontal } from "lucide-react";

interface Props {
  message: string;
  setMessage: (val: string) => void;
  isChatDisabled: boolean;
  isSending: boolean;
  onSend: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sendRef: React.RefObject<HTMLDivElement>;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export const ChatInputSection: FC<Props> = ({
  message,
  setMessage,
  isChatDisabled,
  isSending,
  onSend,
  onFileChange,
  sendRef,
  fileInputRef,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<Element>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isSending) onSend();
    }
  };

  return (
    <div
      ref={sendRef}
      dir="rtl"
      className="w-full min-h-[120px] p-2 flex items-end justify-between bg-[#1C1C1CB2] rounded-[20px] border border-[#6E6E6E]"
    >
      {/* ارسال */}
      <Button
        onPress={onSend}
        isIconOnly
        isDisabled={isChatDisabled}
        className="min-w-0 w-[38px] min-h-0 h-[38px] !p-0 !pl-0.5 rounded-full bg-white"
        startContent={<SendHorizontal className="text-black" />}
      />

      {/* ورودی پیام */}
      <Textarea
        value={message}
        onValueChange={setMessage}
        onKeyDown={handleKeyDown}
        isDisabled={isChatDisabled}
        isClearable
        size="lg"
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
        isDisabled={isChatDisabled}
        className="min-w-0 w-[38px] min-h-0 h-[38px] rounded-full bg-transparent border border-[#6E6E6E]"
        startContent={<Paperclip className="-rotate-45 w-4 h-4" />}
      />
      <input ref={fileInputRef} type="file" hidden onChange={onFileChange} />
    </div>
  );
};
