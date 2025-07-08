"use client";
import { Button, Input, Textarea, Tooltip } from "@heroui/react";
import {
  ArrowUp,
  Code2,
  Mic2,
  Paperclip,
  Pin,
  Volume2,
  VolumeOff,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store/store";
import { setConversation } from "@/redux/slices/chatWithUser";
import { AnyDeskIcon, MicIcon } from "@/components/ui/icons";
import { socket } from "@/config/socket-config";
import { Main, User } from "@/components/types/user.types";
import Cookies from "js-cookie";
import { setMessage } from "@/redux/slices/chatSocketSlice";
import { v4 as uuidv4, v4 } from "uuid";
import {Main as SessionInfo} from "@/components/types/session-info"
import SendCode from "@/components/chat/code";
import { setShowRequest } from "@/redux/slices/globalSlice";
import AudioRecorder from "@/components/version_1_1/AudioRecorder/audio-recorder";
import FileUpload from "@/components/version_1_1/FileUpload";
type Props = {
  reciever: User;
  data: any;
};

const InputMessage = ({ reciever, data }: Props) => {
  const path = usePathname();


  const [description, SetDescription] = useState<string>("");
  const [response_data, setData ] = useState<SessionInfo>();
  const dispatch = useAppDispatch();
  const { payed } = useAppSelector((state: RootState) => state.gloabal);


  const [user,setUser] = useState<any>()

  const session_id = path.split("/")[2];

  const sendMessage = () => {

      const data = {
        session_id: session_id,
        sender: user.uuid,
        receiver: reciever.uuid,
        data: {
          id:v4(),
          type: "text",
          text: description,
          created_at: String(new Date()),
          status: "pending",
        },
      };

      // dispatch(setMessage(data));
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
    const closeHandler = (data:{closed:string})=>{
      if (data.closed) {
        setData((prev) => {
          if (!prev) return prev;
  
          return {
            ...prev,
            data: {
              ...prev.data,
              status: "close" ,
            },
          };
        });
      }

    }
    socket.on(`lock_session_${session_id}`, lockHandler);
    socket.on(`close_session_${session_id}`,closeHandler);
    return () => {
      socket.off(`lock_session_${session_id}`, lockHandler);
      socket.off(`close_session_${session_id}`,closeHandler);

    };
  }, []);
  
    if (!user) return null;

 if (response_data?.is_debuger == false && response_data?.data.is_locked) {
    return (
      <div className="w-full flex justify-center items-center bg-foreground-100 rounded-3xl h-16">
        <p className="text-sm text-foreground-200">
          برای ادامه پرداخت را تکمیل کنید
        </p>
      </div>
    );
  }
  if (response_data?.data.status === "close"){
    return null
  }
  return (
    <div className="flex flex-col w-[90%] rounded-xl mx-auto box-border border dark:border-none">
      <Textarea
        value={description}
        onValueChange={(value) => {
          SetDescription(value);
        }}
        variant="bordered"
        className="w-full"
        classNames={{
          input:
            "dark:bg-[#232035] bg-white border-none outline-none rounded-bl-none",
          innerWrapper:
            "dark:bg-[#232035] bg-white border-none outline-none rounded-bl-none",
          inputWrapper:
            "dark:bg-[#232035] bg-white border-none outline-none rounded-bl-none rounded-br-none",
        }}
        minRows={1}
        maxRows={5}
        labelPlacement="inside"
        placeholder="بنویسید..."
      />
      <div className="flex p-2 box-border  dark:bg-[#232035] bg-white  rounded-b-xl">
        {description.length > 0 ? (
          <Button
            className="bg-lime-300 text-black"
            startContent={<ArrowUp />}
            isIconOnly
            onPress={sendMessage}
            radius="full"
          ></Button>
        ) : (
          <AudioRecorder session_id={response_data?.data.session_id || ""} sender={user.uuid} reciever={reciever.uuid} />

        )}

        <div className="flex-1 flex items-center justify-end gap-4">
          <Tooltip color="primary" content="کد">
            <SendCode sender={user.uuid} reciever={reciever.uuid} />
          </Tooltip>

          <Tooltip color="primary" content="ارسال فایل">
          <FileUpload session_id={response_data?.data.session_id || ""}  reciever={reciever.uuid} sender={user.uuid}/>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default InputMessage;
