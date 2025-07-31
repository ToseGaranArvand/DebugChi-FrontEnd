"use client";

import type {
  Main,
  PendingConsult,
  PendingDebug,
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
import { Button, Chip, Tab, Tabs, useDisclosure } from "@heroui/react";

import { RankTab, SupportFAQ } from "@/components/version_1_1/User/home";
import { GetUserActivityHistoryTab } from "@/components/version_1_1/User/TabsData";
import OnlineAction from "@/components/version_1_1/User/OnlineAction";

interface IDebuggerHomePageContainer {
  response: any;
  serializedFaq: any;
}

const DebuggerHomePageContainer: FC<IDebuggerHomePageContainer> = ({
  response,
  serializedFaq,
}) => {
  const [containerWidth, setContainerWidth] = React.useState<number>(720);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateContainerWidth();

    const resizeObserver = new ResizeObserver(() => {
      updateContainerWidth();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  return (
    <>
      <div
        ref={containerRef}
        className="flex-1 flex flex-col h-full bg-[#0F0F0F] rounded-2xl relative overflow-hidden"
      >
        <section className="flex-1 overflow-hidden">
          <DebugerHome
            user={response}
            faq={serializedFaq}
            containerWidth={containerWidth}
          />
        </section>
      </div>
    </>
  );
};

export { DebuggerHomePageContainer };

interface DebugerHomeProps {
  user: any;
  faq: any;
  containerWidth?: number;
}
const DebugerHome = ({ user, faq, containerWidth }: DebugerHomeProps) => {
  const { showNewRequest } = useAppSelector((state: any) => state.gloabal);

  return (
    <>
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
            rgba(14, 229, 32, 0.5) 0%,
            rgba(0, 156, 255, 0.5) 100%
          );
          border-radius: 10px;
          transition: all 0.3s ease;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(
            180deg,
            rgba(14, 229, 32, 0.8) 0%,
            rgba(0, 156, 255, 0.8) 100%
          );
        }

        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(14, 229, 32, 0.5) rgba(31, 31, 31, 0.5);
          scroll-behavior: smooth;
        }
      `}</style>

      <div className="flex flex-col w-full h-full overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <div className="h-full flex justify-center items-start py-5 overflow-hidden">
            <div className="w-[90%] h-[calc(100%-10px)] bg-[#1F1F1F] rounded-2xl overflow-hidden flex flex-col">
              <div className="flex-1 p-4 custom-scrollbar overflow-y-auto">
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    showNewRequest
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-4 scale-95 pointer-events-none absolute"
                  }`}
                >
                  <NewRequestIncoming />
                </div>

                <div
                  className={`flex items-center justify-center h-full transition-all duration-500 ease-in-out ${
                    !showNewRequest
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-4 scale-95 pointer-events-none absolute"
                  }`}
                >
                  <div className="text-center text-gray-400">
                    <div className="text-2xl mb-2">📴</div>
                    <p className="text-lg">شما آفلاین هستید</p>
                    <p className="text-sm mt-1">
                      برای دریافت درخواست‌ها آنلاین شوید
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const NewRequestIncoming = () => {
  const router = useRouter();
  const { showNewRequest } = useAppSelector(
    (state: RootState) => state.gloabal
  );
  const dispatch = useAppDispatch();
  const [pendingList, setPendingList] = useState<Main>({
    pending_consult: [],
    pending_debug: [],
  });

  useEffect(() => {
    const is_online = Cookies.get("is_online");
    if (is_online === "true") {
      dispatch(setShowNewRequest(true));
    }

    const fetchData = async () => {
      const token = Cookies.get("token");

      try {
        const response = await fetch(
          `${process.env.server}/api/v1/debug/get_pending_session/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        // console.log(data);
        setPendingList(data);

        // const res = await perform_get(`ai/request/detail/80/`);
        // console.log(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [showNewRequest]);

  return (
    <>
      {showNewRequest && (
        <div dir="rtl" className="bg-[#1F1F1F] rounded-2xl">
          <RequestCard data={pendingList} />
        </div>
      )}
    </>
  );
};
const RequestCard = ({ data }: { data: Main }) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const { pending_debug, pending_consult } = data;
  const router = useRouter();

  const isDebug = (
    item: PendingConsult | PendingDebug
  ): item is PendingDebug => {
    return "file" in item;
  };

  const combinedPending = [...pending_debug, ...pending_consult];

  const pendingList =
    data.pending_consult.length > 0 || data.pending_debug.length > 0
      ? combinedPending
      : [];

  if (pendingList.length === 0) {
    return (
      <div className="flex flex-col gap-2 w-full box-border mb-2 p-4 bg-c_background/50 rounded-3xl">
        <span className="flex-1 flex justify-center items-center box-border text-primary-700 text-xs md:text-sm">
          هیچ درخواستی وجود ندارد
        </span>
      </div>
    );
  }

  const handleAccept = async (sessionId: string) => {
    setLoadingId(sessionId);
    await router.push(`/chat/${sessionId}`);
  };

  return pendingList.map((item) => {
    const debugMode = isDebug(item);
    const user = debugMode ? item.debuger_applicator : item.consult_applicator;
    const tag = debugMode ? "# دیباگ" : "# مشاوره";

    return (
      <div key={item.session_id} className="pt-4">
        <div className="flex flex-col w-3/4 mx-auto mb-4 mt-2 bg-[#181818] rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center p-3 md:p-4 rounded-t-2xl bg-[linear-gradient(124.51deg,_#0F0F0F_27.72%,_#000A1B_159.39%)] border-2 border-[#1F1F1F]">
            <div className="text-right">
              <div className="text-[#0EE520] text-xs md:text-sm font-bold">
                {tag}
              </div>
            </div>

            <span className="text-white text-xs md:text-sm font-bold mr-2">
              {formatCurrency(item.price)}
            </span>
          </div>

          {/* Content */}
          <div className="p-4 md:p-5 space-y-3">
            {/* Title */}
            <h1 className="text-white text-sm md:text-base font-bold text-right leading-tight">
              {item.title}
            </h1>

            {/* Description */}
            <div className="text-gray-300 text-xs md:text-sm leading-relaxed pb-2 text-right">
              <p>{item.description}</p>
            </div>

            {/* Separator line */}
            <div
              className="w-full my-3"
              style={{
                height: "0.10px",
                border: "0.10px solid",
                borderImageSource:
                  "linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.27) 53.37%, rgba(255, 255, 255, 0) 100%)",
                borderImageSlice: 1,
              }}
            ></div>

            {/* Accept Button */}
            <div className="flex justify-center">
              <Button
                className="w-3/4 mx-auto bg-[#4A9909] hover:bg-green-600 text-white text-center font-bold py-3 md:py-4 px-4 md:px-6 rounded-lg text-xs md:text-sm"
                isLoading={loadingId === item.session_id}
                onPress={() => handleAccept(item.session_id)}
              >
                {loadingId === item.session_id
                  ? "درحال برقراری ارتباط"
                  : "بررسی خدمات"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  });
};
