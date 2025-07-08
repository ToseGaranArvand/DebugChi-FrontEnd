"use client";
import { Button, Input, InputOtp, Textarea } from "@heroui/react";
import {
  AudioLines,
  Code,
  Mic,
  Mic2,
  Paperclip,
  Pin,
  ScreenShare,
  Send,
  Voicemail,
  WavesIcon,
} from "lucide-react";
import React, { useState } from "react";
// import { Textarea } from '../../textarea';

type Props = {};
import localFont from "next/font/local";
import { WaveAudio } from "../../ui/icons";
import SendCode from "../code";


const SendChat = (props: Props) => {
  const [showSend, setShowSend] = useState(false);
  return (
    <div
    className="grid grid-cols-1 h-full px-5 
    box-border  max-w-4xl mx-auto bg-[#303030] rounded-xl "
    >
      <Textarea
        onValueChange={(value) => {
          value.length > 0 ? setShowSend(true) : setShowSend(false);
        }}
        variant="faded"
        classNames={{
          innerWrapper: "bg-[#303030] text-medium border-none outline-none ",
          inputWrapper: "bg-[#303030] text-medium border-none outline-none ",
          base: "text-medium border-none outline-none ",
          input: "text-medium box-border pt-2 border-none outline-none text-slate-100 font-ultraLightSans",
        }}
        minRows={1}
        maxRows={2}
        className="w-full border-none outline-none box-border text-medium"
        placeholder="مشکل خود را شرح دهید..."
      />
      <div className="flex items-center justify-center gap-4">
        <div className="w-full px-4 mb-2 box-border flex items-center justify-center gap-4">
          <Button
            isIconOnly
            startContent={showSend ? <Send /> : <AudioLines />}
            variant="solid"
            color="primary"
            radius="full"
            size="sm"
          ></Button>
          <div className="flex-1"></div>
          <Button
            isIconOnly
            startContent={<Paperclip />}
            variant="flat"
            size="sm"
            radius="full"
          ></Button>
        {/* <SendCode /> */}
          <Button
            isIconOnly
            startContent={<ScreenShare />}
            variant="flat"
            size="sm"
            radius="full"
          ></Button>
        </div>

        {/* <Input type='text' variant='faded' color='warning'  size='lg'/> */}
      </div>
    </div>
  );
};

export default SendChat;
