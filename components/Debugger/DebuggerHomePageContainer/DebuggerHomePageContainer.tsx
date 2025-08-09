"use client";

import type {
  Main,
  PendingConsult,
  PendingDebug,
  PendingPrivateClass,
} from "@/components/types/incomingRequest";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store/store";
import { formatCurrency } from "@/utils/tools";
import { useRouter } from "next/navigation";
import React, { FC, useState, useEffect } from "react";
import { setShowNewRequest } from "@/redux/slices/globalSlice";
import Cookies from "js-cookie";
import ClassActivities from "@/components/version_1_1/User/home/ClassActivity";
import TicketsTracking from "@/components/version_1_1/User/home/TicketsTracking";
import { ModalSettings, ModalTask } from "@/components/debuger-modals";
import { Button, Chip, Spinner, Tab, Tabs, useDisclosure } from "@heroui/react";

import { RankTab, SupportFAQ } from "@/components/version_1_1/User/home";
import { GetUserActivityHistoryTab } from "@/components/version_1_1/User/TabsData";
import OnlineAction from "@/components/version_1_1/User/OnlineAction";
import Image from "next/image";
import { Power } from "lucide-react";
import { perform_get } from "@/lib/api";

interface IDebuggerHomePageContainer {
  token: string;
  serializedFaq: any;
}

const DebuggerHomePageContainer: FC<IDebuggerHomePageContainer> = ({
  token,
  serializedFaq,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [requestsArr, setRequestsArr] = useState<any[]>([]);

  const fetchRequests = async () => {
    setIsLoaded(false);

    const response = await perform_get(
      "api/v1/debug/get_pending_session/",
      token
    );

    if (
      response &&
      Array.isArray(response.pending_consult) &&
      Array.isArray(response.pending_debug) &&
      Array.isArray(response.pending_private_class)
    ) {
      const combinedArr = [
        ...response.pending_consult.map((item: PendingConsult) => ({
          ...item,
          type: "مشاوره",
        })),
        ...response.pending_debug.map((item: PendingDebug) => ({
          ...item,
          type: "دیباگ",
        })),
        ...response.pending_private_class.map((item: PendingPrivateClass) => ({
          ...item,
          type: "کلاس خصوصی",
        })),
      ];
      // console.log(combinedArr);
      
      setRequestsArr(combinedArr);
    }

    setIsLoaded(true);
  };

  const handleActive = async () => {
    const newStatus = !isActive;
    setIsActive(newStatus);
    Cookies.set("is_online", newStatus ? "true" : "false");

    if (newStatus) await fetchRequests();
  };

  useEffect(() => {
    const cookieVal = Cookies.get("is_online");
    const initialActive = cookieVal === "true";
    setIsActive(initialActive);

    if (initialActive) {
      fetchRequests();
    } else {
      setIsLoaded(true);
    }
  }, []);

  const renderContent = () => {
    if (!isActive) return null;
    if (!isLoaded)
      return (
        <Spinner
          className="absolute left-1/2 top-1/2 -translate-x-1/2 [&>div]:w-[60px] [&>div]:h-[60px]"
          color="success"
        />
      );
    return requestsArr.map((request, idx) => (
      <RequestCard key={idx} request={request} />
    ));
  };

  return (
    <div className="w-full h-full p-[1px] rounded-[16px] bg-gradient-to-l from-[#0F0F0F] to-[#242424]">
      <div className="w-full h-full p-[47px] pb-5 rounded-[16px] bg-[#0F0F0F]">
        <div className="relative w-full h-full flex flex-col rounded-[42px] bg-[#1F1F1F] overflow-auto custom-scrollbar">
          <style jsx>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: rgba(31, 31, 31, 0.5);
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: linear-gradient(
                180deg,
                rgba(14, 229, 32, 0.5),
                rgba(0, 156, 255, 0.5)
              );
              border-radius: 10px;
              transition: all 0.3s ease;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(
                180deg,
                rgba(14, 229, 32, 0.8),
                rgba(0, 156, 255, 0.8)
              );
            }
            .custom-scrollbar {
              scrollbar-width: thin;
              scrollbar-color: rgba(14, 229, 32, 0.5) rgba(31, 31, 31, 0.5);
              scroll-behavior: smooth;
            }
          `}</style>

          <div className="relative h-fit flex-1 w-full max-w-[555px] mx-auto px-5 pt-[23px] space-y-[13px]">
            {renderContent()}
          </div>
          <ButtonSection
            isLoaded={isLoaded}
            isActive={isActive}
            handleActive={handleActive}
          />
        </div>
      </div>
    </div>
  );
};

interface IRequestCard {
  request: any;
}
const RequestCard: FC<IRequestCard> = ({ request }) => {
  // console.log(request);

  const chatRoomId = request.session_id;

  const router = useRouter();
  const handleClick = () => {
    router.push(`/debugger/chat/${chatRoomId}?side=extraServices`);
  };

  return (
    <div className="w-full h-[195px] rounded-2xl bg-[#181818]">
      <div className="h-[58px] rounded-2xl px-5 flex items-center justify-between border-2 border-[#1F1F1F] bg-gradient-to-br from-[#0F0F0F] via-[#0F0F0F] to-[#000A1B]">
        <h1 className="text-lg text-[#0EE520] font-iranBold">{request.type}</h1>
        <div className="flex items-center gap-2 text-[#BABABA]">
          <div className="text-xl font-iranBold">
            {formatCurrency(request.price, true)}
          </div>
          <span className="text-[10px] font-iranRegular">تومان</span>
        </div>
      </div>
      <div className="w-full h-[80px] px-10 pt-2 overflow-y-auto text-[#BABABA]">
        <h1 className="text-xs">{request.title}</h1>
        <p className="mt-2 text-[10px] font-iranRegular">
          {request.description}
        </p>
      </div>
      <div className="flex flex-col items-center px-10">
        <div className="w-full h-[1px] mt-1.5 mx-10 bg-gradient-to-r from-transparent via-[#ffffff14] to-transparent" />
        <Button
          onPress={handleClick}
          className="w-[306px] min-h-0 h-[26px] !mx-auto mt-[11px] rounded-lg bg-[#4A9909] text-xs font-iranBold"
        >
          برسی درخواست
        </Button>
      </div>
    </div>
  );
};
interface IButtonSection {
  isLoaded: boolean;
  isActive: boolean;
  handleActive: () => void;
}
const ButtonSection: FC<IButtonSection> = ({
  isLoaded,
  isActive,
  handleActive,
}) => {
  return (
    <div className="sticky left-0 bottom-0 w-full h-fit rounded-b-[42px] bg-gradient-to-b from-transparent to-[#000204]">
      <Image
        src="/images/common/DebuggerDashboardRectangle.svg"
        alt=""
        width={1612}
        height={232}
        className="w-full"
      />

      <Button
        isIconOnly
        isDisabled={!isLoaded}
        onPress={handleActive}
        className={`absolute left-1/2 top-5 -translate-x-1/2 w-[6.7%] h-[46%] min-w-0 min-h-0 !bg-[#0F0F0F] rounded-full ${
          !isLoaded
            ? "shadow-[0_0_40px_5px_#2f2f2f]"
            : isActive
            ? "shadow-[0_0_40px_5px_#73FF003D]"
            : "shadow-[0_0_40px_5px_#FF1125B8]"
        }`}
        startContent={
          <Power
            className={`w-[45%] h-[45%] ${
              !isLoaded
                ? "text-[#2f2f2f]"
                : isActive
                ? "text-[#73FF00]"
                : "text-[#FF0004]"
            }`}
          />
        }
      />
    </div>
  );
};

export { DebuggerHomePageContainer };
