"use client";
import { ModalProvider } from "@/context/ModalContext";
import { formatCurrency } from "@/utils/tools";
import { Button, Input, Tab, Tabs } from "@heroui/react";
import { ArrowLeft, CircleX, SquarePlus } from "lucide-react";
import React, { FC, useEffect, useRef, useState } from "react";

import Image from "next/image";
import { HistorySvg } from "@/public/images/svg/dashboardTap/HistorySvg";
import { AddMoneySvg } from "@/public/images/svg/dashboardTap/AddMoneySvg";
import { GetMoneySvg } from "@/public/images/svg/dashboardTap/GetMoneySvg";
import { Controller, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { CustomModal } from "@/components/version_1_1/ui/Modal";
import { CustomInput } from "./CustomInput/CustomInput";
import { CustomUploadBox } from "@/components/version_1_1/ui/CustomUploadBox";
import { FullDatePicker } from "@/components/version_1_1/ui/FullDatePicker";
import { perform_get } from "@/lib/api";

type WalletTransaction = {
  id: number;
  type: "withdraw" | "deposit"; // یا هر نوع دیگه‌ای که API برمی‌گردونه
  amount: number;
  bank_card_to_with_draw: string;
  created_at: string; // یا Date اگر تبدیلش کنی
  description: string;
  status: "pending" | "success"; // بسته به وضعیت‌های ممکن
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

const DebuggerWalletPanel = () => {
  const [walletTransactions, setWalletTransactions] = useState<
    WalletTransaction[]
  >([]);

  useEffect(() => {
    const getWalletTransactions = async () => {
      const response = await perform_get("payment/wallet/transactions/");
      setWalletTransactions(response);
    };
    getWalletTransactions();
  }, []);
  return (
    <ModalProvider>
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
              <HistoryTab walletTransactions={walletTransactions} />
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
    </ModalProvider>
  );
};

export default DebuggerWalletPanel;

const CartLabel = () => {
  const [withdraw, setWithdraw] = useState(0);
  const [blockedWithdraw, setBlockedWithdraw] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const getWithdraw = async () => {
      const response = await perform_get("payment/wallet/balance/");
      setWithdraw(response.digital_wallet);
      setBlockedWithdraw(response.blocked_wallet);
    };
    getWithdraw();
  }, []);
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

const HistoryTab = ({
  walletTransactions,
}: {
  walletTransactions: WalletTransaction[];
}) => {
  return (
    <div>
      <h1 className="text-[#BCBCBC] text-xs">تاریخچه اخیر</h1>
      <div className="mt-[14px] space-y-[9px]">
        {walletTransactions.map((transaction, idx) => {
          return <HistoryCard key={idx} transaction={transaction} />;
        })}
      </div>
    </div>
  );
};
const HistoryCard: FC<{ transaction: WalletTransaction }> = ({
  transaction,
}) => {
  return (
    <div className="w-full h-[131px] p-2.5 rounded-xl bg-[#18151E]">
      <div className="flex items-center justify-between">
        <div className="w-[70px] h-[23px] pt-[3px] bg-[#2E2A37] rounded-md text-center text-xs text-[#9BD702] font-iranRegular">
          {transaction.type === "deposit" ? "واریزی" : "برداشت"} موفق
        </div>
        <Image
          src={
            transaction.type === "deposit"
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
          {transaction.type === "deposit" ? "واریز به" : "برداشت از"} حساب شما
        </span>
        <span
          className={`text-lg ${
            transaction.type === "deposit" ? "text-[#9BD702]" : "text-[#FF4A4A]"
          }`}
        >
          ۲۵۰،۰۰۰
        </span>
      </div>
      <div className="h-[1px] mt-1 bg-gradient-to-r from-[#18151E] via-[#362e42] to-[#18151E]"></div>
      <div className="mt-[5px] pr-1 pl-3 flex items-center justify-between">
        <span className="text-xs">
          تاریخ {transaction.type === "deposit" ? "واریزی" : "برداشت"}
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
  const searchParams = useSearchParams();

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
    const params = new URLSearchParams(searchParams.toString());
    params.set("step", "addCard"); // اضافه یا آپدیت step
    router.push(`?${params.toString()}`);
  };

  const goToVerifyCard = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("step", "verifyCard");
    router.push(`?${params.toString()}`);
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
    router.back(); // برمی‌گرده به صفحه قبلی در هیستوری مرورگر
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
    router.back(); // برمی‌گرده به صفحه قبلی در هیستوری مرورگر
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
    router.back(); // برمی‌گرده به صفحه قبلی در هیستوری مرورگر
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

type DeleteModalProps = {
  title: string;
  description: string;
  url: string;
};
