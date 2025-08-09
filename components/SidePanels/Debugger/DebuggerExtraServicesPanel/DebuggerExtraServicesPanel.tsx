import { CustomModal } from "@/components/version_1_1/ui/Modal";
import { useDebuggerContext } from "@/context/DebuggerContext";
import { perform_get, perform_post } from "@/lib/api";
import { addToast, Button } from "@heroui/react";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";
import {
  additionalServicesType,
  SessionInfoResponse,
} from "@/components/types/chatType";
import { formatCurrency } from "@/utils/tools";

const DebuggerExtraServicesPanel = () => {
  const router = useRouter();
  const token = Cookies.get("token");

  const { chatRoomId, userId } = useDebuggerContext();
  const [response, setResponse] = useState<SessionInfoResponse>();

  const [isRequestAccepted, setIsRequestAccepted] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);

  const handleCancelConfirm = async () => {
    try {
      const res = await perform_post("api/v1/reject-session/", {
        action: "cancel",
        session_id: chatRoomId,
      });

      if (res.success) {
        addToast({
          description: "درخواست با موفقیت لغو شد.",
          color: "success",
        });
        setIsRequestAccepted(false);
        setIsCancelModalOpen(false);
        handleBack();
      } else {
        addToast({
          description: res.message || "لغو درخواست ناموفق بود.",
          color: "warning",
        });
      }
    } catch (error) {
      console.error(error);
      addToast({
        description: "خطایی رخ داد. لطفاً دوباره تلاش کنید.",
        color: "danger",
      });
    }
  };

  const handleFinishConfirm = async () => {
    try {
      const res = await perform_post("api/v1/reject-session/", {
        action: "cancel",
        session_id: chatRoomId,
      });

      if (res.success) {
        addToast({
          description: "درخواست با موفقیت پایان یافت.",
          color: "success",
        });
        setIsRequestAccepted(false);
        setIsFinishModalOpen(false);
        handleBack();
      } else {
        addToast({
          description: res.message || "پایان درخواست ناموفق بود.",
          color: "warning",
        });
      }
    } catch (error) {
      console.error(error);
      addToast({
        description: "خطایی رخ داد. لطفاً دوباره تلاش کنید.",
        color: "danger",
      });
    }
  };

  const handleAcceptRequest = async () => {
    if (response) {
      try {
        const res = await perform_post(
          "ai/request/accept/",
          {
            request_id: response.data.id,
          },
          token
        );

        if (res.success) {
          addToast({
            description: "درخواست با موفقیت قبول شد.",
            color: "success",
          });
          setIsRequestAccepted(!isRequestAccepted);
        } else {
          addToast({
            description: res.message || "قبول درخواست ناموفق بود.",
            color: "warning",
          });
        }
      } catch (error) {
        console.error(error);
        addToast({
          description: "خطایی رخ داد. لطفاً دوباره تلاش کنید.",
          color: "danger",
        });
      }
    } else {
      addToast({
        description: "مشکلی رخ داد لطفا مجدد امتحان کنید",
        color: "danger",
      });
    }
  };

  const handleBack = () => {
    router.push(`/`);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (chatRoomId.trim() && userId) {
        const response = await perform_get(
          `api/v1/debug/get-session-info/${chatRoomId}`
        );
        if (response.data) {
          console.log(response.teacher_id);

          setResponse(response);

          if (response.teacher_id === userId) {
            console.log("dsdsa");

            setIsRequestAccepted(true);
          }
        }
      }
    };
    fetchData();
  }, [chatRoomId, userId]);

  if (!response) return <></>;

  return (
    <div className="w-full h-full py-[21px] px-5 bg-[#0F0F0F] rounded-2xl">
      <div className="w-full h-full flex flex-col bg-[#181818] rounded-2xl ">
        <div className="w-full h-[58px] px-2.5 flex justify-between rounded-2xl border-2 border-[#1F1F1F] bg-gradient-to-br from-[#0F0F0F] via-[#0F0F0F] to-[#000A1B]">
          <div className="h-full flex items-center gap-2">
            <div className="w-7 h-7 border border-white rounded-full overflow-hidden">
              <Image
                src={"/images/general/Profile.png"}
                alt=""
                width={28}
                height={28}
              />
            </div>
            <div className="pt-0.5">
              <h1 className="text-xs">
                {response.data?.consult_applicator?.username ||
                  response.data?.debuger_applicator?.username}
              </h1>
              <p className="-mt-0.5 text-[10px] text-[#BABABA]">
                {response.data.language}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              isDisabled={isRequestAccepted}
              onPress={handleAcceptRequest}
              className={`w-[93px] h-6 rounded-lg text-[10px] ${
                isRequestAccepted ? "bg-[#212938]" : "bg-[#4A9909]"
              }`}
            >
              {isRequestAccepted ? "در حال انجام" : "پذیرش درخواست"}
            </Button>

            <Button
              className="!bg-transparent min-w-0 min-h-0 w-[25px] h-[25px]"
              onPress={handleBack}
              isIconOnly
              startContent={
                <ArrowLeft className="w-[18px] h-[18px] text-[#6E6E6E] " />
              }
            />
          </div>
        </div>
        <div className="px-4 pb-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="mt-[15px] mb-[13px] pr-3 pl-6 flex flex-row-reverse justify-between text-[#BABABA] text-[10px]">
              <span className="font-iranBold"> {response.data.title}</span>
              <span>عنوان درخواست</span>
            </div>
            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#ffffff1f] to-transparent" />
            <ServicesDetailCollapse
              extraServices={response.extra_services}
              totalPrice={response.data.price}
              session_id={chatRoomId}
            />
          </div>
          {isRequestAccepted && (
            <div className="w-full space-y-2">
              <Button
                onPress={() => setIsCancelModalOpen(true)}
                className="w-full h-[33px] rounded-lg border border-[#242424] bg-transparent text-[10px] text-[#FF4343]"
              >
                لغو درخواست
              </Button>
              <Button
                onPress={() => setIsFinishModalOpen(true)}
                className="w-full h-[33px] rounded-lg border border-[#242424] bg-[#FF2327] text-sm text-[#FDFDFD] font-iranBold"
              >
                پایان خدمات
              </Button>
            </div>
          )}
        </div>
        {/* ConfirmModal برای لغو درخواست */}
        <ConfirmModal
          isOpen={isCancelModalOpen}
          onOpenChange={setIsCancelModalOpen}
          title="لغو درخواست"
          description="! آیا از لغو درخواست اطمینان دارید؟ این عمل قابل بازگشت نیست"
          confirmText="بله، لغو کن"
          cancelText="انصراف"
          onConfirm={handleCancelConfirm}
          onCancel={() => setIsCancelModalOpen(false)}
        />

        {/* ConfirmModal برای پایان خدمات */}
        <ConfirmModal
          isOpen={isFinishModalOpen}
          onOpenChange={setIsFinishModalOpen}
          title="پایان خدمات"
          description="آیا مطمئن هستید که می‌خواهید خدمات را پایان دهید؟"
          confirmText="بله، پایان بده"
          cancelText="انصراف"
          onConfirm={handleFinishConfirm}
          onCancel={() => setIsFinishModalOpen(false)}
        />
      </div>
    </div>
  );
};

export { DebuggerExtraServicesPanel };

interface IServicesDetailCollapse {
  extraServices: additionalServicesType[];
  totalPrice: number;
  session_id: string;
}
const ServicesDetailCollapse: FC<IServicesDetailCollapse> = ({
  extraServices,
  totalPrice,
  session_id,
}) => {
  const [isDetailCollapseOpen, setIsDetailCollapseOpen] = useState(true);
  const [services, setServices] =
    useState<additionalServicesType[]>(extraServices);
  const [allPrice, setAllPrice] = useState<number>(totalPrice);

  const getMeetDate = (iso: string) =>
    iso?.split("T")[0].replaceAll("-", "/") ?? "";
  const getMeetHour = (iso: string) => iso?.split("T")[1]?.slice(0, 5) ?? "";
  const getMeetDuration = (minutes: number) =>
    (minutes / 60).toString().replace(/\.0$/, "");

  const handleAccept = async (
    type: additionalServicesType["service_type"],
    index: number
  ) => {
    try {
      const res = await perform_post("api/v1/reject-session/", {
        action: "accept_extra_service",
        session_id: session_id,
        extra_service_index: index,
      });

      if (res.success) {
        addToast({
          description: "درخواست اضافی با موفقیت پذیرفته شد.",
          color: "success",
        });
        const updated = services.map((s) =>
          s.service_type === type
            ? {
                ...s,
                session_date: "",
                voiceCall: false,
                videoCall: false,
              }
            : s
        );
        setServices(updated);
      } else {
        addToast({
          description: res.message || "پذیرش درخواست اضافی ناموفق بود.",
          color: "warning",
        });
      }
    } catch (error) {
      console.error(error);
      addToast({
        description: "خطایی رخ داد. لطفاً دوباره تلاش کنید.",
        color: "danger",
      });
    }
  };
  const handleRemove = async (
    type: additionalServicesType["service_type"],
    index: number
  ) => {
    try {
      const res = await perform_post("api/v1/reject-session/", {
        action: "reject_extra_service",
        session_id: session_id,
        extra_service_index: index,
      });

      if (res.success) {
        addToast({
          description: "درخواست اضافی با موفقیت رد شد.",
          color: "success",
        });
        const updated = services.filter((s) => s.service_type !== type);
        setServices(updated);
        const newPrice = updated
          .map((service) => service.price)
          .reduce((a, b) => a + b, 0);
      } else {
        addToast({
          description: res.message || "رد درخواست اضافی ناموفق بود.",
          color: "warning",
        });
      }
    } catch (error) {
      console.error(error);
      addToast({
        description: "خطایی رخ داد. لطفاً دوباره تلاش کنید.",
        color: "danger",
      });
    }
  };

  return (
    <div
      dir="ltr"
      className={`${
        isDetailCollapseOpen
          ? "bg-[#090D14] rounded-lg border border-[#242424]"
          : ""
      } mt-4`}
    >
      <div
        onClick={() => setIsDetailCollapseOpen(!isDetailCollapseOpen)}
        className={`${
          isDetailCollapseOpen
            ? "h-[34px]"
            : "h-[46px] bg-[#140913] rounded-xl border border-[#242424]"
        } pl-2 pr-5 flex justify-between items-center cursor-pointer`}
      >
        <div className="flex flex-row-reverse gap-2 items-center text-[#0EE520] font-iranNumBold">
          {formatCurrency(allPrice, true)}
          <span className="text-[8px] text-[#BABABA] font-iranNumMedium">
            مبلغ کل
          </span>
          <ChevronLeft
            className={`${
              isDetailCollapseOpen ? "-rotate-90" : ""
            } transition-all text-[#BBBBBB6B] w-[22px] h-[22px]`}
          />
        </div>
        <span
          className={`${
            isDetailCollapseOpen
              ? "mb-1 text-[10px] text-[#FDFDFD]"
              : "text-sm text-[#BABABA]"
          }`}
        >
          مجموعه سفارش ها
        </span>
      </div>

      <div
        className={`pt-0.5  overflow-auto ${
          isDetailCollapseOpen ? "h-[325px]" : "h-[0px]"
        }`}
      >
        {services.map((item, idx) => (
          <div key={idx} className="px-4 pb-[15px] pt-0">
            <div className="h-[1px] mt-0.5 mb-[13px] bg-gradient-to-r from-transparent via-[#ffffff27] to-transparent" />
            <div className="mt-2 flex flex-col items-center gap-[7px] text-sm rounded-md text-white">
              <ServiceDetailBanner
                title="عنوان درخواست"
                value={
                  item.service_type === "debug"
                    ? "دیباگ"
                    : item.service_type === "consultation"
                    ? "مشاوره"
                    : "کلاس خصوصی"
                }
              />
              <ServiceDetailBanner
                title="تاریخ برگذاری"
                value={getMeetDate(item.session_date)}
              />
              <ServiceDetailBanner
                title="ساعت جلسه"
                value={getMeetHour(item.session_date)}
                placeholder="ساعت"
                valueClassName="flex flex-row-reverse"
                placeholderClassName="mr-0"
              />
              <ServiceDetailBanner
                title="مدت زمان جلسه"
                value={getMeetDuration(item.session_duration_minutes)}
                placeholder="ساعت"
                valueClassName="flex flex-row-reverse"
              />
              <ServiceDetailBanner
                title="مبلغ سفارش"
                value={formatCurrency(item.price, true)}
                placeholder="تومان"
                valueClassName="text-[#0EE520] flex flex-row-reverse"
                placeholderClassName="text-[#BABABA99]"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onPress={() => handleAccept(item.service_type, idx)}
                className="h-[25px] min-h-0 min-w-0 w-[74px] mt-[9px] !bg-transparent rounded-lg border border-[#242424CC] text-[8px] text-[#0EE520]"
              >
                پذیرش
              </Button>
              <Button
                onPress={() => handleRemove(item.service_type, idx)}
                className="h-[25px] min-h-0 w-[74px] mt-[9px] !bg-transparent rounded-lg border border-[#242424CC] text-[8px] text-[#FF3939]"
              >
                لغو سفارش
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
interface IServiceDetailBannerTypes {
  title: string;
  value: string | number;
  placeholder?: string;
  placeholderClassName?: string;
  valueClassName?: string;
}
const ServiceDetailBanner: FC<IServiceDetailBannerTypes> = ({
  title,
  value,
  placeholder,
  valueClassName,
  placeholderClassName,
}) => {
  return (
    <div className="w-full flex gap-2 items-center text-nowrap text-[8px] text-[#FDFDFD] font-iranNumMedium">
      <h1 className={`w-[65px] text-right font-iranNumBold ${valueClassName}`}>
        {value}
        {placeholder && (
          <span className={`mr-1 ${placeholderClassName}`}>{placeholder}</span>
        )}
      </h1>
      <div className="h-[1px] flex-1 bg-[#bababa17]"></div>
      <h1 className="w-[58px] text-right">{title}</h1>
    </div>
  );
};

interface ConfirmModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  description: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  hideCloseButton?: boolean;
  isDismissable?: boolean;
}
const ConfirmModal: FC<ConfirmModalProps> = ({
  isOpen,
  onOpenChange,
  title,
  description,
  confirmText = "تایید",
  cancelText = "انصراف",
  onConfirm,
  onCancel,
  hideCloseButton = true,
  isDismissable = true,
}) => {
  return (
    <CustomModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onOpen={() => {}}
      hideCloseButton={hideCloseButton}
      isDismissable={isDismissable}
      hideOpenButton={true}
    >
      <div className="p-6 flex flex-col items-center gap-5 bg-[#090D14] rounded-lg border border-[#242424] text-sm text-[#FDFDFD]">
        <h1 className="text-red-500 text-lg font-iranBold"> {title}</h1>
        <div className="h-[1px] w-full mt-0.5 mb-[13px] bg-gradient-to-r from-transparent via-[#ffffff27] to-transparent" />
        <p> {description}</p>
        <div className="mt-10 flex justify-end gap-3">
          <Button
            onPress={() => {
              onOpenChange(false);
              if (onCancel) onCancel();
            }}
            className="rounded-lg border-2 border-[#242424E5] bg-transparent text-[#FDFDFD] text-sm px-4 py-2"
          >
            {cancelText}
          </Button>
          <Button
            onPress={() => {
              onConfirm();
              onOpenChange(false);
            }}
            className="rounded-lg bg-[#FF2327] text-white text-sm px-4 py-2"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </CustomModal>
  );
};
