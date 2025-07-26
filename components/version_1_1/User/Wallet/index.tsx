"use client";
import { Main } from "@/components/types/user.types";
import { ModalProvider, useModalContext } from "@/context/ModalContext";
import { useUserContext } from "@/context/userContext";
import {
  formatCardNumber,
  formatCurrency,
  getCurrentPersianMonth,
  getMonthNames,
} from "@/utils/tools";
import {
  addToast,
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  cn,
  DatePicker,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Tab,
  Tabs,
  User,
} from "@heroui/react";
import {
  ArrowLeft,
  CircleX,
  CreditCard,
  EyeOff,
  Filter,
  History,
  Home,
  Mail,
  MoveDownLeft,
  MoveUpRight,
  Plus,
  Search,
  SquarePlus,
  Trash2,
  Wallet2Icon,
} from "lucide-react";
import { div, span } from "motion/react-client";
import React, { FC, useEffect, useRef, useState } from "react";
import AddNewCard from "./AddNewCard";
import Image from "next/image";
import { perform_post } from "@/lib/api";
import { setDescription } from "@/redux/slices/aiSlice";
import { I18nProvider } from "@react-aria/i18n";
import DeleteModal from "./deleteModal";
import { HistorySvg } from "@/public/images/svg/dashboardTap/HistorySvg";
import { AddMoneySvg } from "@/public/images/svg/dashboardTap/AddMoneySvg";
import { GetMoneySvg } from "@/public/images/svg/dashboardTap/GetMoneySvg";
import { Control, Controller, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { CustomModal } from "../../ui/Modal";
import { CustomTextArea } from "../../ui/CustomTextArea";
import { CustomInput } from "./CustomInput/CustomInput";
import { CustomUploadBox } from "../../ui/CustomUploadBox";
import { FullDatePicker } from "../../ui/FullDatePicker";
type Props = {
  user: Main;
};
const cardNumArr = [
  {
    id: 1,
    bank: "melat",
    name: "مهدی حمود نژاد",
    number: "IR 73 7687 8765 7654 8765 7865 67",
  },
  {
    id: 2,
    bank: "melat",
    name: "مهدی حمود نژاد",
    number: "IR 73 7687 8765 7654 8765 7865 68",
  },
];

const Wallet = (props: Props) => {
  const { setUserData } = useUserContext();

  useEffect(() => {
    setUserData(props.user);
  }, []);
  return (
    <ModalProvider>
      <div className="h-full rounded-2xl p-0.5 bg-gradient-to-r from-black to-[#242424]">
        <div className="h-full flex flex-col bg-[#0F0F0F] px-3 pb-5 rounded-2xl w-[366px]">
          <CartLabel />
          <div className="w-full h-full flex flex-col justify-start mt-2 overflow-y-auto">
            <Tabs
              classNames={{
                tabList: "bg-[#18151E] p-0 w-full h-[63px] rounded-xl",
                tab: "text-gray-700 h-full px-4 py-2",
                tabContent: "text-sm",
                panel: "h-full overflow-y-auto mt-[26px]",
              }}
            >
              <Tab
                key="history"
                title={
                  <div className="flex flex-col items-center gap-[1px] pt-[3px]">
                    <HistorySvg />
                    <span className="text-[10px]">تاریخچه</span>
                  </div>
                }
              >
                <HistoryTab />
              </Tab>
              <Tab
                key="deposit"
                title={
                  <div className="flex flex-col items-center gap-[1px] pt-[3px]">
                    <AddMoneySvg />
                    <span className="text-[10px]">افزایش موجودی</span>
                  </div>
                }
              >
                <AddMoneyTab />
              </Tab>
              <Tab
                key="withdraw"
                title={
                  <div className="flex flex-col items-center gap-[1px] pt-[3px]">
                    <GetMoneySvg />
                    <span className="text-[10px]">برداشت</span>
                  </div>
                }
              >
                <GetMoneyTab />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </ModalProvider>
  );
};

export default Wallet;

const CartLabel = () => {
  const withdraw = 100000000;
  const blockedWithdraw = 30000000;
  const [show, setShow] = useState(false);
  return (
    <div className="pt-2">
      <h1 className="pr-2 text-lg font-iranBold">کیف پول</h1>
      <div className="relative w-full h-[166px] mt-[7px] px-4 pt-[19px] bg-gradient-to-r from-[#0084FF] to-[#2A184A] rounded-xl overflow-hidden">
        <Image
          className="absolute -left-2.5 -top-[14px]"
          src="/images/dashboard/Ellipse.png"
          alt=""
          width={90}
          height={80}
        />
        <Image
          className="absolute left-3 top-3"
          src="/images/dashboard/Circles.png"
          alt=""
          width={40}
          height={27}
        />
        <Button
          onPress={() => setShow(!show)}
          className="!bg-transparent absolute right-3 bottom-3"
          isIconOnly
          startContent={
            <Image
              width={25}
              height={25}
              alt=""
              src={show ? "/images/svg/ShowSvg.svg" : "/images/svg/HideSvg.svg"}
              className="w-[22px] h-[22px] opacity-[38%]"
            />
          }
        />
        <div className="flex items-center gap-2">
          <Image
            src="/images/svg/WalletSvg.svg"
            alt=""
            width={18}
            height={18}
          />
          <h1 className="text-lg">حساب دیجیتال</h1>
        </div>
        <div className="w-full mt-[53px] flex justify-end gap-7 text-[11px]">
          <div
            className={`flex flex-col items-end ${
              show ? "gap-1.5" : "gap-2.5"
            }`}
          >
            <span className="">موجودی بلاک شده</span>
            <span className="text-2xl font-iranNumBold">
              {show ? `${formatCurrency(blockedWithdraw, true)}` : " *********"}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className="">موجودی حساب</span>
            <span className="text-[#9BD702] text-2xl font-iranNumBold">
              {formatCurrency(withdraw, true)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const HistoryTab = () => {
  return (
    <div>
      <h1 className="text-[#BCBCBC] text-xs">تاریخچه اخیر</h1>
      <div className="mt-[14px] space-y-[9px]">
        <HistoryCard type="deposit" />
        <HistoryCard type="withdraw" />
        <HistoryCard type="withdraw" />
        <HistoryCard type="deposit" />
        <HistoryCard type="deposit" />
        <HistoryCard type="withdraw" />
        <HistoryCard type="withdraw" />
        <HistoryCard type="deposit" />
      </div>
    </div>
  );
};
const HistoryCard: FC<{ type: "deposit" | "withdraw" }> = ({ type }) => {
  return (
    <div className="w-full h-[131px] p-2.5 rounded-xl bg-[#18151E]">
      <div className="flex items-center justify-between">
        <div className="w-[70px] h-[23px] pt-[3px] bg-[#2E2A37] rounded-md text-center text-xs text-[#9BD702] font-iranRegular">
          {type === "deposit" ? "واریزی" : "برداشت"} موفق
        </div>
        <Image
          src={
            type === "deposit"
              ? "/images/svg/dashboardTap/DownSvg.svg"
              : "/images/svg/dashboardTap/UpSvg.svg"
          }
          alt=""
          width={16}
          height={16}
        />
      </div>
      <div className="mt-[19px] pr-1 pl-3 flex items-center justify-between">
        <span className="text-xs">
          {type === "deposit" ? "واریز به" : "برداشت از"} حساب شما
        </span>
        <span
          className={`text-lg ${
            type === "deposit" ? "text-[#9BD702]" : "text-[#FF4A4A]"
          }`}
        >
          ۲۵۰،۰۰۰
        </span>
      </div>
      <div className="h-[1px] mt-1 bg-gradient-to-r from-[#18151E] via-[#362e42] to-[#18151E]"></div>
      <div className="mt-[5px] pr-1 pl-3 flex items-center justify-between">
        <span className="text-xs">
          تاریخ {type === "deposit" ? "واریزی" : "برداشت"}
        </span>
        <span className="text-sm font-iranRegular">۴۵ / ۰۴ / ۱۴۰۳</span>
      </div>
    </div>
  );
};

const AddMoneyTab = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    amount: number;
  }>();

  const onSubmit = (data: { amount: number }) => {
    console.log("Amount to deposit:", data.amount);
    // می‌تونی اینجا درخواست API بزنی
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-fit min-h-full flex flex-col justify-between gap-10"
    >
      <div>
        <h1 className="text-[22px] font-iranBold">افزایش موجودی</h1>
        <span className="block mt-[27px] mb-[14px] mr-4 text-sm text-[#E1E1E1]">
          مبلغ
        </span>
        <Input
          {...register("amount", {
            required: "لطفاً مبلغ را وارد کنید",
            valueAsNumber: true,
            validate: (value) => {
              if (isNaN(value)) return "مقدار واردشده معتبر نیست";
              if (value < 1000) return "حداقل مبلغ ۱۰۰۰ تومان است";
              return true;
            },
          })}
          classNames={{
            inputWrapper: "!bg-[#18151E] !h-16 !rounded-[18px]",
          }}
        />
        {errors.amount && (
          <p className="text-red-500 text-xs mr-4 mt-1">
            {errors.amount.message}
          </p>
        )}
      </div>
      <Button
        type="submit"
        className="h-[50px] !bg-transparent border border-[#6E6E6E57] rounded-[20px] text-[#C5C5C5] text-lg"
      >
        افزایش
      </Button>
    </form>
  );
};

const GetMoneyTab = () => {
  const searchParams = useSearchParams();
  const step = searchParams.get("step") || "form";

  return (
    <>
      {step === "form" && <GetMoneyForm />}
      {step === "addCard" && <CardManageMentSection />}
      {step === "verifyCard" && <VerifySection />}
    </>
  );
};

const GetMoneyForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{
    amount: number;
    cardNumber: string;
  }>();

  const onSubmit = (data: { amount: number; cardNumber: string }) => {
    console.log("Amount to withdraw:", data);
    // می‌تونی اینجا درخواست API بزنی
  };
  const goToAddCard = () => {
    router.push("?step=addCard");
  };
  const goToVerifyCard = () => {
    router.push("?step=verifyCard");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-fit min-h-full flex flex-col justify-between gap-10"
    >
      <div>
        <h1 className="text-lg font-iranBold">برداشت از حساب</h1>

        <div className="mt-[26px] mb-[15px] mr-4 flex items-center justify-between text-sm text-[#E1E1E1]">
          <span>مبلغ</span>
          <Button
            onPress={goToAddCard}
            className="h-7 w-32 px-2 bg-[#2E2A37] rounded-[10px] text-xs text-[#BABABA] font-iranRegular"
            endContent={<SquarePlus className="w-[15px] h-[15px]" />}
          >
            افزودن کارت جدید
          </Button>
        </div>
        <Input
          placeholder={`موجودی قابل برداشت:  ${formatCurrency(
            1000000,
            true
          )} تومان`}
          {...register("amount", {
            required: "لطفاً مبلغ را وارد کنید",
            valueAsNumber: true,
            validate: (value) => {
              if (isNaN(value)) return "مقدار واردشده معتبر نیست";
              if (value < 1000) return "حداقل مبلغ ۱۰۰۰ تومان است";
              return true;
            },
          })}
          classNames={{
            inputWrapper: "!bg-[#18151E] !h-16 !rounded-[18px]",
            input: "!text-xs placeholder:!text-[#BABABA33]",
          }}
        />

        {errors.amount && (
          <p className="text-red-500 text-xs mr-4 mt-1">
            {errors.amount.message}
          </p>
        )}
        <p className="mt-[17px] text-xs text-[#BABABA] font-iranRegular">
          برای برداشت و تکمیل احراز هویت خود اینجا
          <a
            onClick={goToVerifyCard}
            className="px-1 cursor-pointer text-[#3344D9]"
          >
            کلیک
          </a>
          کنید
        </p>
        <div className="h-[1px] w-full mt-[18px] mb-[21px] bg-gradient-to-r from-transparent via-[#ffffff0e] to-transparent"></div>
        <Controller
          name="cardNumber"
          control={control}
          rules={{ required: "انتخاب کارت الزامی است" }}
          render={({ field, fieldState }) => (
            <div className="space-y-2.5">
              {cardNumArr.map((card) => {
                const isSelected = field.value === card.number;

                return (
                  <button
                    type="button"
                    key={card.id}
                    onClick={() =>
                      field.onChange(isSelected ? "" : card.number)
                    }
                    className={`w-full h-[50px] px-5 flex justify-between items-center rounded-[12px] border border-[#6E6E6E57] text-[#BABABA] text-[10px] font-iranRegular ${
                      isSelected ? "bg-[#4278FFA6]" : "bg-transparent"
                    }`}
                  >
                    <div>{card.name}</div>
                    <div>{card.number}</div>
                    <Image
                      src={`/images/${card.bank}.png`}
                      alt=""
                      width={27}
                      height={27}
                    />
                  </button>
                );
              })}

              {fieldState.error && (
                <p className="text-red-500 text-xs mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      <Button
        type="submit"
        className="h-[50px] !bg-transparent border border-[#6E6E6E57] rounded-[20px] text-[#C5C5C5] text-lg"
      >
        برداشت
      </Button>
    </form>
  );
};

const CardManageMentSection = () => {
  const router = useRouter();

  const goBack = () => {
    router.replace("/user/dashboard");
  };
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-lg font-iranBold">برداشت از حساب</h1>
        <Button
          className="!bg-transparent"
          isIconOnly
          startContent={<ArrowLeft className="w-5 h-5" />}
          onPress={goBack}
        />
      </div>
      <AddCardForm />
      <div className="mt-2.5 space-y-2.5">
        {cardNumArr.map((card, idx) => {
          return <DeleteCardSection key={idx} {...card} />;
        })}
      </div>
    </div>
  );
};
const AddCardForm = () => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<{
    sheba: string;
  }>();
  const goBack = () => {
    router.replace("/user/dashboard");
  };
  const onSubmit = (data: { sheba: string }) => {
    console.log("Amount to withdraw:", data);
    reset({
      sheba: "",
    });
    goBack();
    // می‌تونی اینجا درخواست API بزنی
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-fit min-h-full flex flex-col"
    >
      <div className="relative w-full h-[162px] mt-[20px] pt-3 px-2.5 bg-gradient-to-b from-[#0084FF] to-[#2A184A] rounded-xl overflow-hidden">
        <Image
          className="absolute -left-2.5 -top-[14px]"
          src="/images/dashboard/Ellipse.png"
          alt=""
          width={82}
          height={72}
        />
        <Image
          className="absolute left-2 top-2"
          src="/images/dashboard/Circles.png"
          alt=""
          width={40}
          height={27}
        />
        <div className="flex items-center gap-2">
          <Image
            src="/images/svg/WalletSvg.svg"
            alt=""
            width={18}
            height={18}
          />
          <h1 className="text-sm">حساب دیجیتال</h1>
        </div>
        <div className="mt-4 space-y-1">
          <span className="block mr-4 text-xs text-[#5A8DDE] font-iranRegular">
            شماره شبا خود رو وارد کنید
          </span>
          <div className="w-full h-[49px] pb-[9px] px-3 rounded-[10px] bg-[#170B2D] flex items-end justify-end gap-1 text-xs text-[#fcfcfc22]">
            <Controller
              name="sheba"
              control={control}
              rules={{
                required: "شماره شبا الزامی است",
                pattern: {
                  value: /^\d{24}$/,
                  message: "شماره شبا باید ۲۴ رقم باشد",
                },
              }}
              render={({ field }) => (
                <ShebaInput
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              )}
            />
            IR
          </div>
          {errors.sheba && (
            <span className="text-red-500 text-xs mr-2">
              {errors.sheba.message}
            </span>
          )}
        </div>
      </div>
      <Button
        type="submit"
        className="h-[42px] mt-[11px] !bg-[#1B1B1BA6] border border-[#5c5c5c57] rounded-[12px] text-[#C5C5C5] text-[15px]"
      >
        افزودن کارت
      </Button>
    </form>
  );
};
const ShebaInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [values, setValues] = useState<string[]>(Array(24).fill(""));

  useEffect(() => {
    const updated = value.split("").slice(0, 24);
    const padded = [...updated, ...Array(24 - updated.length).fill("")];
    setValues(padded);
  }, [value]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const val = e.target.value.replace(/\D/g, "");
    if (!val) return;

    const newValues = [...values];
    newValues[index] = val[0];
    setValues(newValues);

    const joined = newValues.join("");
    onChange(joined);

    if (index < 23) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      const newValues = [...values];

      if (values[index]) {
        newValues[index] = "";
        setValues(newValues);
        onChange(newValues.join(""));
      } else if (index > 0) {
        newValues[index - 1] = "";
        setValues(newValues);
        onChange(newValues.join(""));
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const inputGroups = [2, 4, 4, 4, 4, 4, 2];
  let inputIndex = 0;

  return (
    <div dir="ltr" className="w-full pb-[2px] flex flex-wrap justify-between">
      {inputGroups.map((groupSize, groupIdx) => (
        <div key={groupIdx} className="flex gap-[3px]">
          {Array.from({ length: groupSize }).map((_, i) => {
            const index = inputIndex++;

            return (
              <input
                key={index}
                maxLength={1}
                value={values[index]}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                className="w-1.5 h-3 !p-0 bg-transparent border-b border-[#fcfcfc22] !ring-offset-0 !shadow-none text-white text-xs text-center"
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

type userCurrentJobsType = {
  name: string;
  nationalCode: string;
  birthday: string;
  email: string;
  idCardImage: string;
};
const VerifySection = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<userCurrentJobsType>({
    defaultValues: {
      name: "",
      nationalCode: "",
      birthday: "",
      email: "",
      idCardImage: "",
    },
  });

  const goBack = () => {
    router.replace("/user/dashboard");
  };
  const onSubmit = (data: userCurrentJobsType) => {
    console.log(data);
    data;
    reset({
      name: "",
      nationalCode: "",
      birthday: "",
      email: "",
      idCardImage: "",
    });
    goBack();
  };

  return (
    <div className="h-fit min-h-full flex flex-col justify-between gap-10">
      <div className="flex justify-between">
        <h1 className="text-lg font-iranBold">احراز هویت</h1>
        <Button
          className="!bg-transparent"
          isIconOnly
          startContent={<ArrowLeft className="w-5 h-5" />}
          onPress={goBack}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="name"
          control={control}
          rules={{ required: "اسم و فامیل الزامی است" }}
          render={({ field, fieldState }) => (
            <CustomInput
              value={field.value}
              field="name"
              labelTitle="اسم و فامیل"
              error={fieldState.error?.message}
              handleInputChange={field.onChange}
            />
          )}
        />
        <Controller
          name="nationalCode"
          control={control}
          rules={{
            required: "کد ملی الزامی است",
            validate: (value) => {
              if (!/^\d{10}$/.test(value))
                return "کد ملی باید ۱۰ رقم عددی باشد";

              // الگوریتم بررسی صحت کد ملی
              const check = +value[9];
              const sum = value
                .split("")
                .slice(0, 9)
                .reduce((acc, digit, idx) => acc + +digit * (10 - idx), 0);
              const remainder = sum % 11;
              const isValid =
                (remainder < 2 && check === remainder) ||
                (remainder >= 2 && check === 11 - remainder);

              return isValid ? true : "کد ملی نامعتبر است";
            },
          }}
          render={({ field, fieldState }) => (
            <CustomInput
              value={field.value}
              field="nationalCode"
              labelTitle="کد ملی"
              error={fieldState.error?.message}
              handleInputChange={field.onChange}
            />
          )}
        />

        <Controller
          name="birthday"
          control={control}
          rules={{ required: "تاریخ تولد الزامی است" }}
          render={({ field, fieldState }) => (
            <div
              className={`walletVerifySectionDatePicker ${
                fieldState.error && "errorWalletVerifySectionDatePicker"
              }`}
            >
              <FullDatePicker
                value={field.value}
                onChange={field.onChange}
                placeholder="تاریخ تولد"
              />
              {fieldState.error && (
                <span className="text-red-500 text-xs">
                  {fieldState.error.message}
                </span>
              )}
            </div>
          )}
        />

        <Controller
          name="email"
          control={control}
          rules={{
            required: "ایمیل الزامی است",
            pattern: {
              value: /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "فرمت ایمیل نادرست است",
            },
          }}
          render={({ field, fieldState }) => (
            <CustomInput
              value={field.value}
              field="email"
              labelTitle="ایمیل"
              error={fieldState.error?.message}
              handleInputChange={field.onChange}
            />
          )}
        />
        <Controller
          name="idCardImage"
          control={control}
          rules={{ required: "عکس کارت شناسایی الزامی است" }}
          render={({ field, fieldState }) => (
            <CustomUploadBox
              error={fieldState.error?.message}
              imgClassName="rounded-[20px]"
              className="w-full h-[144px] mx-auto bg-[#1B1921F7] flex justify-center items-center rounded-[20px] cursor-pointer"
              selectedFile={field.value || ""}
              onFileChange={(url) => field.onChange(url)}
            >
              <div className="rounded-2xl p-4 text-center">
                <div className="w-[288px] !h-[43px] mx-auto mb-4 border border-dashed border-[#272727] flex items-center justify-center rounded-xl">
                  <Image
                    src="/images/svg/UploadSvg.svg"
                    alt=""
                    width={20}
                    height={20}
                  />
                </div>
                <p className="mt-[35px] text-[#3D3D3D] text-[10px]">
                  آپلود عکس مدرک شناسایی خود رو وارد کنید
                </p>
              </div>
            </CustomUploadBox>
          )}
        />

        <button
          type="submit"
          className="w-full h-[50px] !mt-10 bg-transparent border border-[#6E6E6E57] rounded-[20px] text-[#C5C5C5] text-lg"
        >
          تایید
        </button>
      </form>
    </div>
  );
};

interface IDeleteCardSection {
  id: number;
  name: string;
  number: string;
  bank: string;
}
const DeleteCardSection: FC<IDeleteCardSection> = ({
  id,
  name,
  number,
  bank,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    console.log("کارت حذف شد:", { id, name, number, bank });
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="w-full h-[42px] px-3 bg-transparent flex justify-between items-center rounded-[12px] border border-[#6E6E6E57] text-[#BABABA] text-[10px] font-iranRegular">
        <Button
          className="min-w-0 min-h-0 w-[13px] h-[13px]"
          isIconOnly
          startContent={<CircleX className="!bg-[#FF2F2FB2] text-[#D8D8D8]" />}
          onPress={() => setIsModalOpen(true)}
        />
        <div className="text-[9px]">{name}</div>
        <div>{number}</div>
        <Image src={`/images/${bank}.png`} alt="" width={23} height={23} />
      </div>
      <CustomModal
        isOpen={isModalOpen}
        onOpen={() => setIsModalOpen(true)}
        onOpenChange={setIsModalOpen}
        hideOpenButton
        hideCloseButton
      >
        <div className="w-[300px] px-3 py-5 rounded-2xl border-2 border-red-500 bg-[#161718] flex flex-col items-center gap-5">
          <div className="text-sm text-white font-bold">حذف کارت</div>
          <p className="text-[12px] text-white text-center">
            آیا از حذف این کارت مطمئن هستید؟
          </p>
          <div className="w-full flex gap-2 justify-between">
            <Button
              className="text-xs px-3 py-1 bg-[#FF2F2F] text-white"
              onPress={handleDelete}
            >
              بله، حذف شود
            </Button>
            <Button
              className="text-xs px-3 py-1 bg-[#BABABA] text-black"
              onPress={() => setIsModalOpen(false)}
            >
              خیر
            </Button>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

// Define notification types
type NotificationType = "text" | "image" | "action";

interface NotificationItem {
  id: string;
  type: NotificationType;
  username: string;
  message: string;
  time: string;
  avatar?: string;
  actionLabel?: string;
}

const FilterNotificationContent = ({
  selectedFilter,
}: {
  selectedFilter: string;
}) => {
  // Sample data for notifications
  const [todayNotifications, setTodayNotifications] = useState<
    NotificationItem[]
  >([
    {
      id: "1",
      type: "text",
      username: "hesam_91_47",
      message: "حلقه فیلم شما را پسندید.",
      time: "۲ ساعت",
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    },
    {
      id: "2",
      type: "image",
      username: "about_shamim_1000jobs.ir",
      message: "محتوای دیگر از شما دعوت کرد تا کانال بیشتر؟",
      time: "۵ ساعت",
      avatar: "https://i.pravatar.cc/150?u=b14258114e29026702c",
    },
    {
      id: "3",
      type: "action",
      username: "moha90mmd",
      message: "شما را دنبال کرد.",
      time: "۱ روز",
      avatar: "https://i.pravatar.cc/150?u=c24258114e29026702b",
      actionLabel: "دیدن",
    },
  ]);

  const [lastWeekNotifications, setLastWeekNotifications] = useState<
    NotificationItem[]
  >([
    {
      id: "4",
      type: "text",
      username: "lighter_iiii",
      message: "حلقه فیلم شما را پسندید.",
      time: "۳ روز",
      avatar: "https://i.pravatar.cc/150?u=d34258114e29026702a",
    },
    {
      id: "5",
      type: "image",
      username: "mohadese.akbarabadi",
      message: "حلقه فیلم شما را پسندید.",
      time: "۳ روز",
      avatar: "https://i.pravatar.cc/150?u=e44258114e29026702z",
    },
  ]);

  const [lastMonthNotifications, setLastMonthNotifications] = useState<
    NotificationItem[]
  >([
    {
      id: "6",
      type: "text",
      username: "kani_abbasii",
      message: "و دیگر نظرات را پسندید: زندگی من قبل و بعد کو...",
      time: "۳ روز",
      avatar: "https://i.pravatar.cc/150?u=f54258114e29026702y",
    },
    {
      id: "7",
      type: "image",
      username: "mehdi.m2731",
      message: "حلقه فیلم شما را پسندید.",
      time: "۳ روز",
      avatar: "https://i.pravatar.cc/150?u=g64258114e29026702x",
    },
    {
      id: "8",
      type: "action",
      username: "_mohammadensaeid",
      message: "شما را دنبال کرد.",
      time: "۱ هفته",
      avatar: "https://i.pravatar.cc/150?u=h74258114e29026702w",
      actionLabel: "دیدن",
    },
  ]);

  const filterByType = (data: NotificationItem[]) => {
    if (selectedFilter === "همه") return data;
    if (selectedFilter === "لایک")
      return data.filter((n) => n.message.includes("پسندید"));
    if (selectedFilter === "کامنت")
      return data.filter((n) => n.message.includes("نظر"));
    if (selectedFilter === "فالو")
      return data.filter((n) => n.message.includes("دنبال"));
    return [];
  };

  // Render notification based on its type
  const renderNotification = (notification: NotificationItem) => {
    return (
      <div
        key={notification.id}
        className="flex items-start gap-3 py-3 border-b border-gray-800 "
      >
        {notification.type === "image" && (
          <User
            avatarProps={{
              src: notification.avatar,
            }}
            description={notification.message}
            name={notification.username}
          />
        )}

        {notification.type === "text" && (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={notification.avatar || "/placeholder.svg"}
                alt={notification.username}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <span className="font-bold text-white">
                  {notification.username}
                </span>
              </div>
              <p className="text-gray-300 text-sm">{notification.message}</p>
              <span className="text-gray-500 text-xs">{notification.time}</span>
            </div>
          </div>
        )}

        {notification.type === "action" && (
          <div className="flex items-start justify-between w-full gap-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={notification.avatar || "/placeholder.svg"}
                  alt={notification.username}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-white">
                    {notification.username}
                  </span>
                </div>
                <p className="text-gray-300 text-sm">{notification.message}</p>
                <span className="text-gray-500 text-xs">
                  {notification.time}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-c_secondary text-white h-full p-4 max-w-md mx-auto overflow-y-auto scrollbar-hide rounded-2xl">
      <h1 className="text-xl font-bold mb-4 text-right">جدید</h1>

      <div className="mb-6">
        <h2 className="text-gray-400 text-sm mb-2 text-right">امروز</h2>
        <div className="space-y-1">
          {filterByType(todayNotifications).map((notification) =>
            renderNotification(notification)
          )}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-gray-400 text-sm mb-2 text-right">۷ روز اخیر</h2>
        <div className="space-y-1">
          {filterByType(lastWeekNotifications).map((notification) =>
            renderNotification(notification)
          )}
        </div>
      </div>

      <div>
        <h2 className="text-gray-400 text-sm mb-2 text-right">۳۰ روز اخیر</h2>
        <div className="space-y-1">
          {filterByType(lastMonthNotifications).map((notification) =>
            renderNotification(notification)
          )}
        </div>
      </div>
    </div>
  );
};

const ActionButtons = () => {
  const { setShow, setContent } = useModalContext();
  const { setDeposit, deposit } = useUserContext();
  const actions = [
    {
      name: "برداشت",
      icon: MoveUpRight,
    },
    {
      name: "افزایش",
      icon: MoveDownLeft,
    },
    {
      name: "کارت ها",
      icon: CreditCard,
    },
  ];
  return (
    <div className="h-36 w-full rounded-3xl bg-black flex items-center justify-between box-border  p-2">
      {actions.map((item) => {
        return (
          <div
            className="flex flex-col items-center justify-center gap-1"
            key={item.name}
          >
            <Button
              variant="flat"
              color="default"
              startContent={<item.icon />}
              className="w-24 h-20"
              radius="lg"
              isIconOnly
              size="lg"
              onPress={() => {
                setShow(true);
                setContent(item.name);
                setDeposit({ ...deposit, amount: 0 });
              }}
            ></Button>
            <span className="text-xs">{item.name}</span>
          </div>
        );
      })}
    </div>
  );
};

const FinancialActivities = () => {
  useEffect(() => {}, []);

  return (
    <div className=" max-h-[400px] w-full rounded-xl box-border overflow-y-auto ">
      <Card className="mb-2" radius="sm">
        <CardHeader className="flex gap-2">
          <Button
            radius="full"
            startContent={<MoveDownLeft />}
            variant="flat"
            isDisabled
            color="success"
            isIconOnly
          ></Button>
          <span className="text-lime-500">+ 200,000</span>
          <div className="flex-1"></div>
          <Chip size="md" variant="flat" color="success" className="text-xs">
            موفق
          </Chip>
        </CardHeader>
        <CardBody className="flex mb-5">
          <span className="text-xs">واریز به حساب شما</span>
        </CardBody>

        <CardFooter>
          <span className="text-xs text-foreground-500">
            {new Date().toLocaleDateString("fa-IR", {
              year: "numeric",
              weekday: "long",
              day: "numeric",
              month: "long",
              hour: "numeric",
              minute: "numeric",
            })}
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};

const FilterAction = () => {
  const FilterButton = [
    { name: "فیلتر", icon: Filter },
    { name: "پیام ها", icon: Mail },
    { name: "جستجو", icon: Search },
  ];

  const persianMonths = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ].reverse();

  const getCurrentPersianMonth = (): string => {
    return new Intl.DateTimeFormat("fa-IR", { month: "long" }).format(
      new Date()
    );
  };
  const currentMonth = getCurrentPersianMonth();

  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);

  const monthRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const currentIndex = persianMonths.indexOf(selectedMonth);
    if (currentIndex !== -1 && monthRefs.current[currentIndex]) {
      monthRefs.current[currentIndex].scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    }
  }, [selectedMonth]);

  return (
    <div className="w-full h-auto flex items-center justify-between p-2 gap-2 bg-[#18181b] rounded-2xl">
      <div className="max-w-52  h-14 w-full overflow-x-scroll whitespace-nowrap flex items-center gap-4 px-2 scrollbar-hide">
        {persianMonths.map((item, index) => (
          <div
            key={item}
            ref={(el: any) => (monthRefs.current[index] = el!)}
            className="cursor-pointer"
            onClick={() => setSelectedMonth(item)} // ✅ هنگام کلیک ماه انتخاب‌شده را تنظیم می‌کنیم
          >
            <Chip
              variant={item === selectedMonth ? "solid" : "flat"} // ✅ اگر ماه انتخاب‌شده باشد، حالت "solid" می‌گیرد
              color="primary"
              className="shrink-0"
            >
              {item}
            </Chip>
          </div>
        ))}
      </div>

      {/* دکمه‌های کنترلی */}
      {FilterButton.map((item) => (
        <Button
          size="sm"
          isIconOnly
          variant="flat"
          radius="full"
          color="primary"
          startContent={<item.icon size={16} />}
          key={item.name}
        />
      ))}
    </div>
  );
};

export const CustomRadio = (props: any) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between w-full",
          "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary"
        ),
      }}
    >
      {children}
    </Radio>
  );
};

const FinancialDeposite = () => {
  const { user, setDeposit, deposit } = useUserContext();
  return (
    <Select
      className="max-w-xs"
      items={user?.user_bank_cards}
      label="حساب بانکی"
      size="lg"
      labelPlacement="outside"
      placeholder="کارت بانکی مورد نظر را انتخاب کنید"
      required
    >
      {(card) => (
        <SelectItem
          key={card.id}
          textValue={card.title}
          onPress={() => {
            setDeposit({ ...deposit, card_bank: card.card_number });
            console.log(card.card_number);
          }}
        >
          <div className="flex gap-2 items-center">
            <Avatar
              alt={card.title}
              className="flex-shrink-0"
              size="sm"
              src={"/bank/tejarat.png"}
            />
            <div className="flex flex-col">
              <span className="text-small">{card.title}</span>
              <span className="text-tiny text-default-400">
                {card.card_number}
              </span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
};

const AddNewCardContent = () => {
  const { show, setShow, content } = useModalContext();
  const { user, setDeposit, deposit } = useUserContext();

  const withDrawHandler = async () => {
    const response = await perform_post(
      "api/v1/payment_withdraw_view/",
      deposit
    );
    console.log(response);
    if (response.status == 400) {
      addToast({
        title: "برداشت",
        description: response.data.message,
        color: "danger",
      });
    } else if (response) {
      addToast({
        title: "برداشت",
        description: "درخواست شما با موفقیت ثبت شد تا 72 ساعت واریز خواهد شد",
        color: "success",
      });
      setDeposit({ ...deposit, amount: 0 });
      setShow(false);
    }
  };

  return (
    <div
      className={`w-full h-full flex flex-col gap-4 bg-c_secondary rounded-2xl box-border p-4`}
    >
      {content == "کارت ها" && (
        <>
          <div className="w-full h-14 box-border px-5 flex items-center justify-between">
            <AddNewCard />
          </div>
          <div
            className={`${
              show
                ? "flex-1 flex flex-col gap-2 items-start justify-start w-full overflow-y-auto scrollbar-hide max-h-[420px]"
                : "hidden"
            }`}
            dir="rtl"
          >
            {user?.user_bank_cards.map((item) => {
              return (
                <div
                  key={item.id}
                  className="w-full  mx-auto h-20 rounded-3xl flex gap-4 items-center justify-between box-border px-4 bg-default-50 relative"
                >
                  <Image
                    src={"/bank/tejarat.png"}
                    alt={item.title}
                    width={25}
                    height={25}
                    className="rounded-3xl"
                  />
                  {formatCardNumber(item.card_number)}

                  <DeleteModal
                    title="حذف کارت"
                    description="آیا از حذف کار خود مطمئنید؟"
                    url={`auths/user_cards/?card_id=${item.id}`}
                  />
                </div>
              );
            })}

            {/* <RadioGroup
              className="w-full"
              label="کارت ها"
              defaultValue={"5859831058918326"}
            >
              {user?.user_bank_cards.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="w-full mx-auto flex items-center justify-center"
                  >
                    <CustomRadio
                      description={item.title}
                      value={item.card_number}
                    >
                      <Image
                        src={"/bank/tejarat.png"}
                        alt={item.title}
                        width={25}
                        height={25}
                        className="rounded-3xl"
                      />
                      {formatCardNumber(item.card_number)}
                    </CustomRadio>
                  </div>
                );
              })}
            </RadioGroup> */}
          </div>
        </>
      )}
      {content == "برداشت" && (
        <>
          <div className="w-full h-full  box-border flex flex-col items-center gap-20">
            <FinancialDeposite />

            <Input
              size="lg"
              labelPlacement="outside"
              description="توضیحات مورد نظر برای برداشت"
              label="مبلغ واریزی"
              defaultValue={`${deposit.amount}`}
              placeholder="حداقل مبلغ واریزی 50,0000"
              fullWidth
              onValueChange={(value) => {
                setDeposit({ ...deposit, amount: Number(value) });
              }}
            />
            <div className="flex-1"></div>

            <Button fullWidth color="success" onPress={withDrawHandler}>
              برداشت مستقیم
            </Button>
          </div>
        </>
      )}
      {content == "افزایش" && (
        <>
          <div className="w-full h-14 box-border  flex items-center justify-between"></div>
          <div
            className={`${
              show
                ? "flex-1 flex flex-col items-start justify-center w-full "
                : "hidden"
            }`}
            dir="rtl"
          >
            {/* <FinancialDeposite /> */}

            <Input
              size="lg"
              labelPlacement="outside"
              description="توضیحات مورد نظر برای برداشت"
              label="مبلغ واریزی"
              placeholder="حداقل مبلغ افزایش 50,0000"
              fullWidth
            />
            <div className="flex-1"></div>
            <Button fullWidth color="success">
              افزایش اعتبار
            </Button>
          </div>
        </>
      )}

      <Button
        variant="flat"
        className="text-lime-300"
        fullWidth
        onPress={() => setShow(false)}
      >
        بازگشت
      </Button>
    </div>
  );
};

const ActionButtonModal = ({ children }: { children: React.ReactNode }) => {
  const { show, setShow } = useModalContext();

  return (
    <div
      className={`w-full ${
        show ? "h-3/4" : "h-[0%] opacity-0"
      } absolute -bottom-16 z-50 box-border p-4 transition-all duration-500 ease-out`}
    >
      <div className="w-full h-full flex flex-col gap-4 bg-c_secondary rounded-2xl box-border">
        {/* اینجا از children استفاده شده تا محتوا دینامیک باشد */}
        <div
          className={`${
            show ? "flex-1 flex items-start justify-center w-full" : "hidden"
          }`}
          dir="rtl"
        >
          {children}
        </div>

        {/* <Button variant="flat" className="bg-lime-300 text-black" fullWidth onPress={() => setShow(false)}>
          بازگشت
        </Button> */}
      </div>
    </div>
  );
};

// const ActionButtonModal = ({ type }: { type: string }) => {
//   const { show, setShow } = useModalContext();
//   const { user } = useUserContext();
//   return (
//     <div
//       className={`w-full ${
//         show ? "h-3/4" : "h-[0%] opacity-0"
//       } absolute -bottom-16 z-50 box-border p-4 transition-all duration-500 ease-out`}
//     >

//     </div>
//   );
// };
