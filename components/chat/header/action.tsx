"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/store/store";
import { setMessage } from "@/redux/slices/chatSocketSlice";
import { socket } from "@/config/socket-config";
import type { Main } from "@/components/types/user.types";
import { usePathname } from "next/navigation";
import { Main as messageType } from "@/components/types/testChat.type";
import { v4 } from "uuid";

type Props = {
  reciever: Main;
};

const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.8333 5.82295C10.8333 3.05578 8.59012 0.812516 5.82295 0.812501C3.05577 0.812501 0.812501 3.05577 0.812501 5.82295C0.812516 8.59012 3.05578 10.8333 5.82295 10.8333C8.59011 10.8333 10.8333 8.59011 10.8333 5.82295ZM11.6458 5.82295C11.6458 7.28468 11.1072 8.62056 10.2176 9.64306L12.881 12.3065L12.8954 12.3217C13.0395 12.4812 13.0347 12.7273 12.881 12.881C12.7273 13.0347 12.4812 13.0395 12.3217 12.8954L12.3065 12.881L9.64306 10.2176C8.62056 11.1072 7.28468 11.6458 5.82295 11.6458C2.60705 11.6458 1.44056e-05 9.03885 0 5.82295C0 2.60704 2.60704 0 5.82295 0C9.03885 1.44075e-05 11.6458 2.60705 11.6458 5.82295Z"
      fill="#6E6E6E"
    />
  </svg>
);

const CallIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.0992 9.7408C8.22312 9.79771 8.36272 9.81071 8.49502 9.77766C8.62731 9.74462 8.7444 9.66749 8.827 9.559L9.04 9.28C9.15178 9.13097 9.29672 9.01 9.46334 8.92669C9.62997 8.84337 9.81371 8.8 10 8.8H11.8C12.1183 8.8 12.4235 8.92643 12.6485 9.15147C12.8736 9.37652 13 9.68174 13 10V11.8C13 12.1183 12.8736 12.4235 12.6485 12.6485C12.4235 12.8736 12.1183 13 11.8 13C8.93566 13 6.18864 11.8621 4.16325 9.83675C2.13785 7.81136 1 5.06434 1 2.2C1 1.88174 1.12643 1.57652 1.35147 1.35147C1.57652 1.12643 1.88174 1 2.2 1H4C4.31826 1 4.62348 1.12643 4.84853 1.35147C5.07357 1.57652 5.2 1.88174 5.2 2.2V4C5.2 4.18629 5.15663 4.37003 5.07331 4.53666C4.99 4.70328 4.86904 4.84822 4.72 4.96L4.4392 5.1706C4.32905 5.25471 4.25141 5.37435 4.21947 5.50921C4.18754 5.64407 4.20327 5.78583 4.264 5.9104C5.08401 7.57592 6.43265 8.92288 8.0992 9.7408Z"
      stroke="#6E6E6E"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const VideoIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.6663 8.66667L14.1483 10.988C14.1985 11.0214 14.2569 11.0406 14.3171 11.0434C14.3773 11.0463 14.4372 11.0328 14.4903 11.0044C14.5435 10.9759 14.5879 10.9336 14.6189 10.8818C14.6499 10.8301 14.6663 10.771 14.6663 10.7107V5.24667C14.6664 5.18802 14.6509 5.1304 14.6215 5.07963C14.5922 5.02887 14.5499 4.98675 14.499 4.95753C14.4482 4.92832 14.3905 4.91304 14.3319 4.91324C14.2732 4.91344 14.2157 4.92911 14.165 4.95867L10.6663 7M2.66634 4H9.33301C10.0694 4 10.6663 4.59695 10.6663 5.33333V10.6667C10.6663 11.403 10.0694 12 9.33301 12H2.66634C1.92996 12 1.33301 11.403 1.33301 10.6667V5.33333C1.33301 4.59695 1.92996 4 2.66634 4Z"
      stroke="#6E6E6E"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DesktopIcon = () => (
  <svg
    width="35"
    height="35"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="1.29289"
      y="6.65723"
      width="8.31371"
      height="8.31371"
      transform="rotate(-45 1.29289 6.65723)"
      fill="#D9D9D9"
      stroke="#161616"
    />
  </svg>
);

const IconBackground = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="20" cy="20" r="19" fill="#161616" stroke="#242424" />
  </svg>
);

const Action = ({ reciever }: Props) => {
  const [user, setUser] = useState<any>(null);
  const dispatch = useAppDispatch();
  const path = usePathname();
  const session_id = path.split("/")[2];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user_data = localStorage.getItem("user_data");
      if (user_data) {
        setUser(JSON.parse(user_data));
      }
    }
  }, []);

  const sendMessage = () => {
    if (!user) return;
    const data: messageType = {
      session_id: session_id,
      sender: user.uuid,
      receiver: reciever.uuid,
      data: {
        id: v4(),
        type: "anydesk",
        text: "12345678911",
        created_at: String(new Date()),
        status: "pending",
      },
    };
    dispatch(setMessage(data));
    socket.emit("test_message", data);
  };

  return (
    <>
      {/* Desktop Icon */}
      <div className="relative cursor-pointer">
        <IconBackground />
        <div
          className="absolute inset-0 flex items-center justify-center"
          onClick={sendMessage}
        >
          <DesktopIcon />
        </div>
      </div>

      {/* Video Icon */}
      <div className="relative cursor-pointer">
        <IconBackground />
        <div className="absolute inset-0 flex items-center justify-center">
          <VideoIcon />
        </div>
      </div>

      {/* Call Icon */}
      <div className="relative cursor-pointer">
        <IconBackground />
        <div className="absolute inset-0 flex items-center justify-center">
          <CallIcon />
        </div>
      </div>

      {/* Search Icon */}
      <div className="relative cursor-pointer">
        <IconBackground />
        <div className="absolute inset-0 flex items-center justify-center">
          <SearchIcon />
        </div>
      </div>
    </>
  );
};

export default Action;
