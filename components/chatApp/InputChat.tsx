"use client";
import { Button, Input, Textarea } from "@heroui/react";
import { ArrowUp, Paperclip, Pin } from "lucide-react";
import React, { useState } from "react";
import PaperClip from "./PaperClip";
import SendMessageButton from "./send-button";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/redux/store/store";
import { setConversation } from "@/redux/slices/chatWithUser";

type Props = {};

const InputChat = (props: Props) => {
  const path = usePathname();
  const [description, SetDescription] = useState<string>("");
  const dispatch = useAppDispatch();
  console.log(path);
  const check_path = `${path}?mode=ai` === "/community/chat/ai?mode=ai";
  console.log(check_path);

  return (
    <div className="flex flex-col w-2/4 mt-14 box-border p-10 mx-auto">
      <Textarea
        onValueChange={(value) => {
          SetDescription(value);
        }}
        variant="bordered"
        className="w-full"
        classNames={{
          input: "bg-[#232035] border-none outline-none rounded-bl-none",
          innerWrapper: "bg-[#232035] border-none outline-none rounded-bl-none",
          inputWrapper:
            "bg-[#232035] border-none outline-none rounded-bl-none rounded-br-none",
        }}
        minRows={3}
        maxRows={5}
        labelPlacement="inside"
        placeholder="بنویسید..."
      />
      <div className="flex p-2 box-border  bg-[#232035] rounded-b-xl">
        <Button
          className="bg-lime-300 text-black"
          startContent={<ArrowUp />}
          isIconOnly
          onPress={() => {
            dispatch(
              setConversation({
                ai: false,
                message: description,
              })
            );
          }}
        >
          
        </Button>
      </div>
    </div>
  );
};

export default InputChat;
