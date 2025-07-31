import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import { CustomModal } from "@/components/version_1_1/ui/Modal";
import { formatCurrency } from "@/utils/tools";
import { ArrowLeft, ChevronLeft, Percent, ScanFace } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Button, Checkbox, Input } from "@heroui/react";
import {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";
import { FullDatePicker } from "@/components/version_1_1/ui/FullDatePicker";
import { CounterItem } from "./CounterItem/CounterItem";
import { requestInfoTypes } from "./StudentHomePageContainer";
import moment from "jalali-moment";
import { perform_post } from "@/lib/api";

type additionalServicesType = {
  type: "debug" | "consultation" | "private_class";
  voiceCall?: boolean;
  videoCall?: boolean;
  meetHour: string;
  meetDuration: string;
  meetDate: string;
};

type FormValues = {
  discountCode?: string;
  additionalServices?: additionalServicesType[];
  reserveMeetDate: string;
};

interface IServiceBookingModal {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  requestType: "debug" | "consultation" | "private_class" | "public_class";
  requestInfo: requestInfoTypes;
}

const serviceTypes = ["debug", "consultation", "private_class"] as const;

const ServiceBookingModal: FC<IServiceBookingModal> = ({
  isModalOpen,
  setIsModalOpen,
  requestType,
  requestInfo,
}) => {
  const [showContent, setShowContent] = useState<
    | "main"
    | "addService"
    | "hourReserve"
    | "DateReserve"
    | "waiting"
    | {
        text: string;
        prev: "main" | "addService" | "hourReserve" | "DateReserve" | "waiting";
        next: "main" | "addService" | "hourReserve" | "DateReserve" | "waiting";
      }
  >("main");
  const isWarning =
    typeof showContent === "object" &&
    showContent !== null &&
    "text" in showContent &&
    "prev" in showContent &&
    "next" in showContent;

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      discountCode: "",
      additionalServices: [],
      reserveMeetDate: "00:00:00",
    },
  });
  const convertTimeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };
  const convertTimeToDay = (time: string): string => {
    const [monthStr, dayStr, hourStr] = time.split(":");
    const month = Number(monthStr);
    const day = Number(dayStr);
    const hour = Number(hourStr);

    const totalDays = month * 30 + day;
    return `${totalDays}:${hour.toString().padStart(2, "0")}`;
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const today = moment().format("YYYY-MM-DD");
      const requestId = requestInfo.id;

      // آماده‌سازی scheduled_date
      const isScheduled = data.reserveMeetDate !== "00:00:00";
      const scheduledDate = isScheduled
        ? `${today}T${convertTimeToDay(data.reserveMeetDate)}:00Z`
        : undefined;

      // آماده‌سازی extra_services
      const extraServices = data.additionalServices
        ? data.additionalServices
            .filter(
              (service) =>
                service.meetDate.trim() !== "" &&
                service.meetDuration.trim() !== "00:00" &&
                service.meetHour.trim() !== "00:00"
            )
            .map((service) => {
              const session_duration_minutes = convertTimeToMinutes(
                service.meetDuration
              );

              const base: any = {
                service_type: service.type,
                session_duration_minutes: session_duration_minutes,
                session_date: `${today}T${service.meetHour}:00Z`,
              };

              return base;
            })
        : [];

      // ساخت نهایی payload
      const payload: any = {
        request_id: requestId,
      };

      if (isScheduled && scheduledDate) {
        payload.is_scheduled = true;
        payload.scheduled_date = scheduledDate;
      }

      if (extraServices.length > 0) {
        payload.extra_services = extraServices;
      }

      console.log("Sending payload to API:", payload);

      const result = await perform_post("ai/request/confirm/", payload);
      setShowContent("waiting");

      if (!result.ok) {
        throw new Error(result.message || "خطا در ارسال داده");
      }

      console.log("درخواست با موفقیت ارسال شد:", result);
    } catch (error: any) {
      console.error("خطا در ارسال فرم:", error);
    }
  };

  return (
    <CustomModal
      isOpen={isModalOpen}
      onOpen={() => setIsModalOpen(true)}
      onOpenChange={setIsModalOpen}
      hideOpenButton
    >
      {showContent === "main" && (
        <MainForm
          control={control}
          handleSubmit={handleSubmit}
          errors={errors}
          onSubmit={onSubmit}
          setShowContent={setShowContent}
          requestType={requestType}
          requestInfo={requestInfo}
        />
      )}
      {showContent === "addService" && (
        <ServiceForm
          initialServices={getValues("additionalServices") || []}
          onServiceListUpdate={(service) =>
            setValue("additionalServices", service)
          }
          setShowContent={setShowContent}
        />
      )}
      {showContent === "DateReserve" && (
        <ReserveDateSection
          initialReserveDate={getValues("reserveMeetDate")}
          onReserveDateUpdate={(service) =>
            setValue("reserveMeetDate", service)
          }
          setShowContent={setShowContent}
        />
      )}
      {showContent === "waiting" && <WaitingModal />}
      {isWarning && (
        <WarningSection
          text={showContent.text}
          onCancel={() => setShowContent(showContent.prev)}
          onConfirm={() => setShowContent(showContent.next)}
        />
      )}
    </CustomModal>
  );
};
export { ServiceBookingModal };

interface MainFormProps {
  control: Control<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  errors: FieldErrors<FormValues>;
  onSubmit: SubmitHandler<FormValues>;
  setShowContent: Dispatch<
    SetStateAction<
      | "main"
      | "addService"
      | "hourReserve"
      | "DateReserve"
      | "waiting"
      | {
          text: string;
          prev:
            | "main"
            | "addService"
            | "hourReserve"
            | "DateReserve"
            | "waiting";
          next:
            | "main"
            | "addService"
            | "hourReserve"
            | "DateReserve"
            | "waiting";
        }
    >
  >;
  requestType: IServiceBookingModal["requestType"];
  requestInfo: requestInfoTypes;
}
const MainForm: FC<MainFormProps> = ({
  control,
  handleSubmit,
  errors,
  onSubmit,
  setShowContent,
  requestType,
  requestInfo,
}) => {
  const [openDiscountInp, setOpenDiscountInp] = useState(false);
  const requestTypeTitles: Record<IServiceBookingModal["requestType"], string> =
    {
      debug: "دیباگ",
      consultation: "مشاوره",
      private_class: "کلاس خصوصی",
      public_class: "کلاس عمومی",
    };

  return (
    <div className="p-[1px] rounded-2xl bg-gradient-to-b from-[#BABABA52] to-[#30303000]">
      <div className="w-[431px] pt-[13px] pb-5 rounded-2xl bg-[#181818] ">
        <div className="px-5 flex flex-row-reverse items-center justify-between text-[#0EE520] font-iranBold">
          <h1 className="text-[22px]">{requestTypeTitles[requestType]}</h1>
          {/* <h1 className="text-[22px]">دیباگ</h1> */}
          <div className="pt-1.5 flex flex-row-reverse items-center gap-1.5 text-xl">
            {/* {formatCurrency(200000, true)} */}
            {formatCurrency(requestInfo.price, true)}
            <span className="text-xs text-[#BABABA] font-iranMedium">
              تومان
            </span>
          </div>
        </div>
        <div className="h-[1px] mt-[17px] bg-gradient-to-r from-transparent via-[#ffffff27] to-transparent" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="pt-[35px] px-[45px] flex justify-between items-center">
            <Button
              startContent={<Percent />}
              onPress={() => setOpenDiscountInp(!openDiscountInp)}
              className="w-[132px] h-[63px] flex flex-col items-center justify-center gap-2 rounded-xl bg-[#212938] text-[#BABABA] !text-xs"
            >
              کد تخفیف
            </Button>
            <Button
              startContent={<ScanFace />}
              onPress={() => setShowContent("addService")}
              className="w-[132px] h-[63px] flex flex-col items-center justify-center gap-2 rounded-xl bg-[#212938] text-[#BABABA] !text-xs"
            >
              ست کردن خدمات
            </Button>
          </div>
          <Controller
            control={control}
            name="discountCode"
            render={({ field }) => (
              <div
                dir="rtl"
                className={`${
                  openDiscountInp
                    ? "h-[46px] mt-[18px] mb-[11px] p-[1px]"
                    : "h-0 mt-[19px] mb-[17px]"
                } w-[calc(100%-50px)] mx-auto bg-gradient-to-r from-[#bababa3a] via-transparent to-[#bababa3a] rounded-[10px] !overflow-hidden [&>div]:!rounded-[10px]`}
              >
                <Input
                  className="w-full h-full"
                  classNames={{
                    inputWrapper: "!bg-[#181818] !h-full !rounded-[10px]",
                    input: "text-xs text-[#BABABA]",
                  }}
                  endContent={
                    <Percent className="w-[22px] h-[22px] text-[#4A9909]" />
                  }
                  placeholder="کد تخفیف رو وارد کنید"
                  value={field.value}
                  onChange={field.onChange}
                />
              </div>
            )}
          />

          <div className="w-full px-[25px] h-9 flex gap-4">
            <Button
              type="button"
              onPress={() => setShowContent("DateReserve")}
              className="w-1/2 h-full bg-[#010919] rounded-xl text-sm"
            >
              رزرو درخواست
            </Button>
            <Button
              type="submit"
              className="w-1/2 h-full bg-[#3344D9] rounded-xl text-sm"
            >
              ثبت درخواست
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface meetDateType {
  type: "debug" | "consultation" | "private_class";
  date: string;
}
interface meetHourType {
  type: "debug" | "consultation" | "private_class";
  time: string;
}
interface meetDurationType {
  type: "debug" | "consultation" | "private_class";
  duration: string;
}
interface voiceCallType {
  type: "debug" | "consultation" | "private_class";
  voice: boolean;
}
interface videoCallType {
  type: "debug" | "consultation" | "private_class";
  video: boolean;
}
const ServiceForm = ({
  initialServices,
  onServiceListUpdate,
  setShowContent,
}: {
  initialServices: additionalServicesType[];
  onServiceListUpdate: (service: additionalServicesType[]) => void;
  setShowContent: Dispatch<
    SetStateAction<
      | "main"
      | "addService"
      | "hourReserve"
      | "DateReserve"
      | "waiting"
      | {
          text: string;
          prev:
            | "main"
            | "addService"
            | "hourReserve"
            | "DateReserve"
            | "waiting";
          next:
            | "main"
            | "addService"
            | "hourReserve"
            | "DateReserve"
            | "waiting";
        }
    >
  >;
}) => {
  const extractServiceState = (
    type: additionalServicesType["type"],
    meetHour: meetHourType[],
    meetDuration: meetDurationType[],
    meetDate: meetDateType[],
    voiceCall: voiceCallType[],
    videoCall: videoCallType[]
  ) => ({
    hour: meetHour.find((h) => h.type === type)?.time || "00:00",
    duration: meetDuration.find((h) => h.type === type)?.duration || "00:00",
    date: meetDate.find((d) => d.type === type)?.date || "",
    voice: voiceCall.find((v) => v.type === type)?.voice ?? false,
    video: videoCall.find((v) => v.type === type)?.video ?? false,
  });
  const defaultServices: additionalServicesType[] = serviceTypes.map(
    (type) => ({
      type,
      meetDate: "",
      meetHour: "00:00",
      meetDuration: "00:00",
      voiceCall: false,
      videoCall: false,
    })
  );

  const [services, setServices] = useState<additionalServicesType[]>(
    initialServices.length ? initialServices : defaultServices
  );
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [openFormType, setOpenFormType] = useState<
    additionalServicesType["type"] | null
  >(null);
  const [showTimeModal, setShowTimeModal] = useState<
    [additionalServicesType["type"], "time" | "duration"] | null
  >(null);
  const [meetHour, setMeetHour] = useState<meetHourType[]>([]);
  const [meetDuration, setMeetDuration] = useState<meetDurationType[]>([]);
  const [meetDate, setMeetDate] = useState<meetDateType[]>([]);
  const [voiceCall, setVoiceCall] = useState<voiceCallType[]>([]);
  const [videoCall, setVideoCall] = useState<videoCallType[]>([]);

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [cantBack, setCantBack] = useState(false);

  const handleToggleForm = (type: additionalServicesType["type"]) => {
    setOpenFormType((prev) => (prev === type ? null : type));
  };

  const updateService = useCallback(
    (updatedService: additionalServicesType) => {
      setServices((prevServices) =>
        prevServices.map((s) =>
          s.type === updatedService.type ? updatedService : s
        )
      );
      setHasUnsavedChanges(true);
    },
    []
  );

  const handleSubmit = () => {
    onServiceListUpdate(services);
    setShowContent("main");
    setCantBack(false);
  };
  const handleBack = () => {
    if (isDetailOpen) {
      setIsDetailOpen(false);
      return;
    }
    if (hasUnsavedChanges) {
      setCantBack(true);
      return;
    }
    setShowContent("main");
  };

  useEffect(() => {
    if (initialServices.length) {
      setServices(initialServices);
    }
  }, [initialServices]);

  useEffect(() => {
    const extractedMeetHours = services.map(({ type, meetHour }) => ({
      type,
      time: meetHour,
    }));
    setMeetHour(extractedMeetHours);
    const extractedMeetDuration = services.map(({ type, meetDuration }) => ({
      type,
      duration: meetDuration,
    }));

    setMeetDuration(extractedMeetDuration);
    const extractedMeetDates = services.map(({ type, meetDate }) => ({
      type,
      date: meetDate,
    }));
    setMeetDate(extractedMeetDates);

    const extractedVoiceCalls = services.map(({ type, voiceCall }) => ({
      type,
      voice: voiceCall || false,
    }));
    setVoiceCall(extractedVoiceCalls);

    const extractedVideoCalls = services.map(({ type, videoCall }) => ({
      type,
      video: videoCall || false,
    }));
    setVideoCall(extractedVideoCalls);
  }, [services]);

  if (showTimeModal) {
    return (
      <ServiceHourSection
        setShowTimeModal={setShowTimeModal}
        value={
          showTimeModal[1] === "time"
            ? meetHour.find((t) => t.type === showTimeModal[0])?.time || "00:00"
            : meetDuration.find((t) => t.type === showTimeModal[0])?.duration ||
              "00:00"
        }
        setValue={showTimeModal[1] === "time" ? setMeetHour : setMeetDuration}
        currentType={showTimeModal[0]}
        kind={showTimeModal[1]}
      />
    );
  }

  return (
    <div className="relative w-[429px] p-[22px] pt-[34px] bg-[#181818] rounded-[18px]">
      <div className="mb-5 pr-3 pl-6 flex justify-between text-[#BABABA] text-sm">
        <span className="font-iranBold">اپلیکیشن موبایل</span>
        <span>عنوان درخواست</span>
      </div>
      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#ffffff1f] to-transparent" />

      <ServicesDetailCollapse
        services={services}
        setServices={setServices}
        isDetailCollapseOpen={isDetailOpen}
        setIsDetailCollapseOpen={setIsDetailOpen}
        setHasUnsavedChanges={setHasUnsavedChanges}
      />

      {!isDetailOpen &&
        services.map((service: additionalServicesType) => {
          const { hour, date, voice, video, duration } = extractServiceState(
            service.type,
            meetHour,
            meetDuration,
            meetDate,
            voiceCall,
            videoCall
          );

          const updateField = <T extends { type: string }, K extends keyof T>(
            stateSetter: React.Dispatch<React.SetStateAction<T[]>>,
            key: K,
            value: T[K],
            type: string
          ) => {
            stateSetter((prev) =>
              prev.map((item) =>
                item.type === type ? { ...item, [key]: value } : item
              )
            );
            setHasUnsavedChanges(true);
          };
          return (
            <ServiceInputForm
              key={service.type}
              serviceData={service}
              isOpen={openFormType === service.type}
              onToggle={() => handleToggleForm(service.type)}
              onConfirm={updateService}
              setShowTimeModal={setShowTimeModal}
              meetHour={hour}
              meetDate={date}
              meetDuration={duration}
              voiceCall={voice}
              videoCall={video}
              setMeetDate={(newDate) =>
                updateField(setMeetDate, "date", newDate, service.type)
              }
              setVoiceCall={(val) =>
                updateField(setVoiceCall, "voice", val, service.type)
              }
              setVideoCall={(val) =>
                updateField(setVideoCall, "video", val, service.type)
              }
            />
          );
        })}

      {cantBack && (
        <p className="w-full mt-5 text-center text-red-500">
          لطفا قبل از خروج تغییرات خود را نهایی کنید
        </p>
      )}

      {!openFormType && !isDetailOpen && (
        <Button
          type="submit"
          className="w-full h-[46px] mt-8 py-2 bg-[#3344D9] rounded-xl text-[#FDFDFD] text-lg"
          onPress={handleSubmit}
        >
          تایید نهایی
        </Button>
      )}

      <Button
        onPress={handleBack}
        className="absolute left-2 top-2 !bg-transparent"
        isIconOnly
        startContent={
          <ArrowLeft className="w-[22px] h-[22px] text-[#6E6E6E]" />
        }
      />
    </div>
  );
};

interface ServiceInputFormProps {
  serviceData: additionalServicesType;
  onConfirm: (data: additionalServicesType) => void;
  isOpen: boolean;
  onToggle: () => void;
  setShowTimeModal: Dispatch<
    SetStateAction<[additionalServicesType["type"], "time" | "duration"] | null>
  >;
  meetHour: string;
  meetDate: string;
  setMeetDate: (newDate: string) => void;
  voiceCall: boolean;
  setVoiceCall: (val: boolean) => void;
  videoCall: boolean;
  setVideoCall: (val: boolean) => void;
  meetDuration: string;
}
const ServiceInputForm = ({
  serviceData,
  onConfirm,
  isOpen,
  onToggle,
  setShowTimeModal,
  meetHour,
  meetDate,
  setMeetDate,
  voiceCall,
  setVoiceCall,
  videoCall,
  setVideoCall,
  meetDuration,
}: ServiceInputFormProps) => {
  const { type } = serviceData;
  const [noData, setNoData] = useState(false);

  const isValid = () =>
    meetDate.trim() &&
    meetHour.trim() &&
    meetHour.trim() !== "00:00" &&
    meetDuration.trim() &&
    meetDuration.trim() !== "00:00" &&
    (type === "debug" || voiceCall !== undefined || videoCall !== undefined);

  const handleConfirm = () => {
    if (isValid()) {
      onConfirm({
        type,
        meetDate,
        meetHour,
        meetDuration,
        voiceCall,
        videoCall,
      });
      return;
    }
    setNoData(true);
  };

  return (
    <div className="relative">
      <div className="mt-[15px] bg-[#090D14] rounded-xl border border-[#242424] text-sm">
        <button
          onClick={onToggle}
          className="w-full h-[44px] px-5 flex flex-row-reverse items-center justify-between text-[#FDFDFD]"
        >
          {type === "debug"
            ? "دیباگ"
            : type === "consultation"
            ? "مشاوره"
            : "کلاس خصوصی"}
          <ChevronLeft
            className={`transition-transform ${
              isOpen ? "-rotate-90" : ""
            } text-[#BBBBBB6B] w-[18px] h-[18px]`}
          />
        </button>

        <div
          className={`transition-all ${
            isOpen ? (type === "debug" ? "h-[154px]" : "h-[202px]") : "h-0"
          } overflow-hidden`}
        >
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#ffffff1f] to-transparent" />

          {type !== "debug" && (
            <div className="mt-[15px] mb-[13px] flex justify-evenly gap-4">
              <Checkbox
                isSelected={voiceCall}
                onValueChange={setVoiceCall}
                radius="none"
                className="flex-row-reverse gap-1.5"
                classNames={{
                  icon: "w-2 !h-2",
                  label: "text-[#BABABA] text-[10px]",
                  wrapper: "w-2.5 !h-2.5 !rounded-[3px]",
                }}
              >
                تماس صوتی
              </Checkbox>
              <Checkbox
                isSelected={videoCall}
                onValueChange={setVideoCall}
                radius="none"
                className="flex-row-reverse gap-1.5"
                classNames={{
                  icon: "w-2 !h-2",
                  label: "text-[#BABABA] text-[10px]",
                  wrapper: "w-2.5 !h-2.5 !rounded-[3px]",
                }}
              >
                تماس تصویری
              </Checkbox>
            </div>
          )}
          <div dir="rtl" className="px-4">
            <span className="block py-0.5 pr-3 text-[#BABABA] text-[10px]">
              مدت جلسه
            </span>
            <Button
              className="w-full h-10 bg-[#181818] border border-[#242424] text-white p-2 rounded-md font-iranNumMedium"
              onPress={() => setShowTimeModal([serviceData.type, "duration"])}
            >
              {meetDuration !== "00:00" && meetDuration}
            </Button>
          </div>

          <div dir="rtl" className="px-4 mt-[9px] pb-4 flex gap-5">
            <div className="w-1/2">
              <span className="block py-0.5 pr-3 text-[#BABABA] text-[10px]">
                تاریخ برگزاری
              </span>
              <div className="ServiceBookingModalDatePicker">
                <FullDatePicker
                  value={meetDate}
                  onChange={setMeetDate}
                  minDate={new Date()}
                />
              </div>
            </div>
            <div className="w-1/2">
              <span className="block py-0.5 pr-3 text-[#BABABA] text-[10px]">
                ساعت جلسه
              </span>
              <Button
                className="w-full h-10 bg-[#181818] border border-[#242424] text-white p-2 rounded-md font-iranNumMedium"
                onPress={() => setShowTimeModal([serviceData.type, "time"])}
              >
                {meetHour !== "00:00" && meetHour}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {noData && (
        <p className="w-full text-center text-xs text-red-500">
          اطلاعات به درستی وارد نشدند
        </p>
      )}

      {isOpen && (
        <Button
          type="submit"
          className="w-full h-[46px] mt-[15px] py-2 bg-[#3344D9] rounded-xl text-[#FDFDFD] text-lg"
          onPress={handleConfirm}
        >
          تایید خدمات
        </Button>
      )}
    </div>
  );
};

interface IServicesDetailCollapseTypes {
  isDetailCollapseOpen: boolean;
  setIsDetailCollapseOpen: Dispatch<SetStateAction<boolean>>;
  services: additionalServicesType[];
  setServices: Dispatch<SetStateAction<additionalServicesType[]>>;
  setHasUnsavedChanges: Dispatch<SetStateAction<boolean>>;
}
const ServicesDetailCollapse: FC<IServicesDetailCollapseTypes> = ({
  setIsDetailCollapseOpen,
  isDetailCollapseOpen,
  services,
  setServices,
  setHasUnsavedChanges,
}) => {
  const getServiceCost = (type: additionalServicesType["type"]) => {
    if (type === "debug") return 320000;
    if (type === "consultation") return 480000;
    if (type === "private_class") return 960000;
    return 0;
  };
  const calculateTotalCost = () =>
    services
      .filter(
        (item) => item.meetDate.trim() !== "" && item.meetHour.trim() !== ""
      )
      .reduce((sum, item) => sum + getServiceCost(item.type), 0);

  const handleRemove = (type: additionalServicesType["type"]) => {
    const updated = services.map((s) =>
      s.type === type
        ? {
            ...s,
            meetDate: "",
            meetHour: "00:00",
            voiceCall: false,
            videoCall: false,
          }
        : s
    );

    setServices(updated);
    setHasUnsavedChanges(true);
  };
  return (
    <div
      className={`${
        isDetailCollapseOpen
          ? "bg-[#090D14] rounded-2xl border border-[#242424]"
          : ""
      } mt-4`}
    >
      <div
        onClick={() => setIsDetailCollapseOpen(!isDetailCollapseOpen)}
        className={`${
          isDetailCollapseOpen
            ? ""
            : "bg-[#140913] rounded-xl border border-[#242424]"
        } h-[46px] pl-2 pr-5 flex justify-between items-center cursor-pointer`}
      >
        <div className="flex flex-row-reverse gap-2 items-center text-[#0EE520] font-iranNumBold">
          {calculateTotalCost().toLocaleString().replace(/,/g, "،")}
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
              ? "text-[10px] text-[#FDFDFD]"
              : "text-sm text-[#BABABA]"
          }`}
        >
          مجموعه سفارش ها
        </span>
      </div>
      <div
        className={`transition-all pt-0.5 ${
          isDetailCollapseOpen
            ? "h-[480px] overflow-auto"
            : "h-0 overflow-hidden"
        }`}
      >
        {services
          .filter((item) => item.meetDate && item.meetHour)
          .map((item, idx) => (
            <div key={idx} className="px-4 pb-[15px] pt-0">
              <div className="h-[1px] mt-0.5 mb-5 bg-gradient-to-r from-transparent via-[#ffffff27] to-transparent" />
              <div className="mt-2 flex flex-col items-center gap-[14px] text-sm rounded-md text-white">
                <ServiceDetailBanner
                  title="عنوان درخواست"
                  value={
                    item.type === "debug"
                      ? "دیباگ"
                      : item.type === "consultation"
                      ? "مشاوره"
                      : "کلاس خصوصی"
                  }
                />
                <ServiceDetailBanner
                  title="تاریخ برگذاری"
                  value={item.meetDate}
                />
                <ServiceDetailBanner
                  title="ساعت جلسه"
                  value={item.meetHour}
                  placeholder="ساعت"
                  valueClassName="flex gap-1 justify-end"
                  placeholderClassName="mr-0"
                />
                <ServiceDetailBanner
                  title="مدت زمان جلسه"
                  value={item.meetDuration}
                  placeholder="ساعت"
                  valueClassName="flex flex-row-reverse"
                />
                <ServiceDetailBanner
                  title="مبلغ سفارش"
                  value={getServiceCost(item.type)
                    .toLocaleString()
                    .replace(/,/g, "،")}
                  placeholder="تومان"
                  valueClassName="text-[#0EE520] flex flex-row-reverse"
                  placeholderClassName="text-[#BABABA99]"
                />
              </div>
              <Button
                onPress={() => handleRemove(item.type)}
                className="h-[33px] min-h-0 w-[97px] mt-[9px] !bg-transparent rounded-lg border border-[#242424CC] text-[10px] text-[#FF3939]"
              >
                لغو سفارش
              </Button>
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
    <div className="w-full flex gap-2 items-center text-nowrap text-[10px] text-[#FDFDFD] font-iranNumMedium ">
      <h1 className={`w-[65px] text-right ${valueClassName}`}>
        {value}
        {placeholder && (
          <span className={`mr-1 ${placeholderClassName}`}>{placeholder}</span>
        )}
      </h1>
      <div className="h-[1px] flex-1 bg-[#bababa17]"></div>
      <h1 className="w-[70px] text-right">{title}</h1>
    </div>
  );
};

interface IWarningSectionProps {
  text: string;
  onCancel: () => void;
  onConfirm: () => void;
}
const WarningSection: FC<IWarningSectionProps> = ({
  text,
  onCancel,
  onConfirm,
}) => {
  return (
    <div className="relative w-[429px] h-[300px] flex flex-col justify-between border-2 border-[#c78b29] p-[22px] pt-[34px] bg-[#181818] rounded-[18px]">
      <div className="flex-1 w-full flex justify-center items-center">
        <h1 className="text-lg text-center">{text}</h1>
      </div>
      <div className="h-[46px] flex gap-4">
        <Button
          className="w-1/2 h-full bg-[#990909] text-lg"
          onPress={() => onCancel()}
        >
          بازگشت
        </Button>
        <Button
          className="w-1/2 h-full bg-[#4A9909] text-lg"
          onPress={() => onConfirm()}
        >
          ادامه می‌دهم
        </Button>
      </div>
    </div>
  );
};
interface IServiceHourSectionTypes {
  value: string;
  setValue:
    | Dispatch<SetStateAction<meetHourType[]>>
    | Dispatch<SetStateAction<meetDurationType[]>>;
  setShowTimeModal: Dispatch<
    SetStateAction<[additionalServicesType["type"], "time" | "duration"] | null>
  >;
  currentType: additionalServicesType["type"];
  kind: "time" | "duration";
}

const ServiceHourSection: FC<IServiceHourSectionTypes> = ({
  setShowTimeModal,
  value,
  setValue,
  currentType,
  kind,
}) => {
  const [hour, setHour] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);

  useEffect(() => {
    const parts = value.split(":");

    if (parts.length === 2) {
      setHour(Number(parts[0]) || 0);
      setMinute(Number(parts[1]) || 0);
    }
  }, [value]);

  const handleSubmit = () => {
    const newTime = `${String(hour).padStart(2, "0")}:${String(minute).padStart(
      2,
      "0"
    )}`;

    setValue((prev: meetHourType[] | meetDurationType[]) =>
      prev.map((item: any) =>
        item.type === currentType
          ? {
              ...item,
              [kind === "time" ? "time" : "duration"]: newTime,
            }
          : item
      )
    );

    setShowTimeModal(null);
  };

  return (
    <div className="relative w-[404px] h-[280px] py-[3px] pb-[22px] rounded-[21px] flex flex-col gap-[21px] items-center">
      <Button
        onPress={() => setShowTimeModal(null)}
        className="absolute left-2 top-2 !bg-transparent"
        isIconOnly
        startContent={
          <ArrowLeft className="w-[22px] h-[22px] text-[#6E6E6E]" />
        }
      />
      <Image
        src="/images/common/NoArrowRectangle.png"
        alt=""
        className="absolute -z-10 inset-0 w-full h-full transition-transform duration-300"
        width={404}
        height={280}
      />
      <div className=" flex justify-center gap-3">
        <CounterItem label="ساعت" value={hour} max={23} onChange={setHour} />
        <CounterItem
          label="دقیقه"
          value={minute}
          max={59}
          onChange={setMinute}
        />
      </div>
      <Button
        onPress={handleSubmit}
        className="w-[326px] !h-[45px] pt-1 mx-auto !bg-[#1B1B1B] border border-[#BABABA38] rounded-[15px] text-xl font-iranRegular"
      >
        تایید
      </Button>
    </div>
  );
};

const ReserveDateSection = ({
  initialReserveDate,
  onReserveDateUpdate,
  setShowContent,
}: {
  initialReserveDate: string;
  onReserveDateUpdate: (service: string) => void;
  setShowContent: Dispatch<
    SetStateAction<
      | "main"
      | "addService"
      | "hourReserve"
      | "DateReserve"
      | "waiting"
      | {
          text: string;
          prev:
            | "main"
            | "addService"
            | "hourReserve"
            | "DateReserve"
            | "waiting";
          next:
            | "main"
            | "addService"
            | "hourReserve"
            | "DateReserve"
            | "waiting";
        }
    >
  >;
}) => {
  const [month, setMonth] = useState<number>(0);
  const [day, setDay] = useState<number>(0);
  const [hour, setHour] = useState<number>(0);

  useEffect(() => {
    const parts = initialReserveDate.split(":");

    if (parts.length === 3) {
      setMonth(Number(parts[0]) || 0);
      setDay(Number(parts[1]) || 0);
      setHour(Number(parts[2]) || 0);
    }
  }, [initialReserveDate]);

  const handleSubmit = () => {
    const newReserveDate = `${String(month).padStart(2, "0")}:${String(
      day
    ).padStart(2, "0")}:${String(hour).padStart(2, "0")}`;

    onReserveDateUpdate(newReserveDate);
    setShowContent("main");
  };
  return (
    <div className="relative w-[404px] h-[280px] py-[3px] pb-[22px] rounded-[21px] flex flex-col gap-[21px] items-center">
      <Button
        onPress={() => setShowContent("main")}
        className="absolute left-2 top-2 !bg-transparent"
        isIconOnly
        startContent={
          <ArrowLeft className="w-[22px] h-[22px] text-[#6E6E6E]" />
        }
      />
      <Image
        src="/images/common/NoArrowRectangle.png"
        alt=""
        className="absolute -z-10 inset-0 w-full h-full transition-transform duration-300"
        width={404}
        height={280}
      />
      <div className=" flex justify-center gap-3">
        <CounterItem label="ماه" value={month} max={11} onChange={setMonth} />
        <CounterItem label="روز" value={day} max={29} onChange={setDay} />
        <CounterItem label="ساعت" value={hour} max={23} onChange={setHour} />
      </div>
      <Button
        onPress={handleSubmit}
        className="w-[326px] !h-[45px] pt-1 mx-auto !bg-[#1B1B1B] border border-[#BABABA38] rounded-[15px] text-xl font-iranRegular"
      >
        تایید
      </Button>
    </div>
  );
};

const WaitingModal = () => {
  return (
    <div className="relative w-[429px] h-[300px] flex flex-col justify-between border-2 border-[#c78b29] p-[22px] pt-[34px] bg-[#181818] rounded-[18px]">
      <div className="flex-1 w-full flex justify-center items-center">
        <h1 className="text-lg text-center">
          درخواست شما برای اساتید ارسال شد لطفا منتظر بمانید
        </h1>
      </div>
    </div>
  );
};
