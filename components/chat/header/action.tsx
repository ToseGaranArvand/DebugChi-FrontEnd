"use client";
import { Button, Tooltip } from "@heroui/react";
import { PhoneCall, Search, Video } from "lucide-react";
import React, { useEffect, useState } from "react";
import { AnyDeskIcon } from "../../ui/icons";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store/store";
import { setMessage } from "@/redux/slices/chatSocketSlice";
import { socket } from "@/config/socket-config";
import { Main } from "@/components/types/user.types";
import { usePathname } from "next/navigation";

type Props = {
  reciever: Main;
};

const Action = ({ reciever }: Props) => {
  const [user, setUser] = useState<any>(null); // حالت اولیه null
  const [mute, setMute] = useState(false);
  const dispatch = useAppDispatch();
  const { payed } = useAppSelector((state: RootState) => state.gloabal);

  const path = usePathname();
  const session_id = path.split("/")[2];

  // خواندن اطلاعات کاربر از localStorage در سمت کلاینت
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user_data = localStorage.getItem("user_data");
      if (user_data) {
        setUser(JSON.parse(user_data));
      }
    }
  }, []);

  const sendMessage = () => {
    if (!user) return; // اطمینان از وجود user قبل از ارسال پیام

    const data = {
      session_id: session_id,
      sender: user.uuid,
      receiver: reciever.uuid,
      data: {
        type: "anydesk",
        text: "12345678911",
        created_at: String(new Date()),
        status: "pending",
      },
    };

    console.log(data);
    dispatch(setMessage(data));
    socket.emit("test_message", data);
  };

  return (
    <>
      <Tooltip color="primary" content="جستجو...">
        <Button
          isIconOnly
          variant="flat"
          color="primary"
          radius="full"
          startContent={<Search />}
        />
      </Tooltip>

      <Tooltip color="primary" content="صوتی">
        <Button
          isIconOnly
          startContent={<PhoneCall />}
          color="primary"
          variant="flat"
          radius="full"
        />
      </Tooltip>

      <Tooltip color="primary" content="ویدیو">
        <Button
          isIconOnly
          startContent={<Video />}
          color="primary"
          variant="flat"
          radius="full"
        />
      </Tooltip>

      <Tooltip color="primary" content="انی‌دسک">
        <Button
          isIconOnly
          onPress={sendMessage}
          startContent={<AnyDeskIcon />}
          color="primary"
          variant="flat"
          radius="full"
        />
      </Tooltip>
    </>
  );
};

export default Action;
