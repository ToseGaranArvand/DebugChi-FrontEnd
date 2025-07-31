import { Button } from "@heroui/react";
import React, { FC, RefObject } from "react";
import { ErrorSection } from "./ErrorSection";
import { RequestType } from "./StudentHomePageContainer";

interface OptionButtonsProps {
  userRole?: string[];
  error?: string;
  setError: (err: string) => void;
  setChatType: (type: RequestType) => void;
  chatType: RequestType;
  optionRef: RefObject<HTMLDivElement>;
}
const loginErrText = "برای چت با هوش مصنوعی دیباگچی وارد حساب کاربری خود شوید";
const btnClassname =
  "min-h-0 !h-10 border border-[#6E6E6E30] rounded-[10px] bg-gradient-to-tr from-black to-[#13151B] text-[15px] text-[#BBBBBB] font-iranLight py-3";
const selectedBtnClassName = "border-2 border-[#6e6e6e83]";
const OptionButtons: FC<OptionButtonsProps> = ({
  userRole,
  error,
  setError,
  chatType,
  setChatType,
  optionRef,
}) => {
  const handleErrorClick = (errText?: string) => {
    if (!userRole) {
      setError(errText || "");
      return;
    }
  };

  const handleClick = (type: RequestType) => {
    if (!userRole) {
      handleErrorClick(loginErrText);
      return;
    }
    if (chatType === type) {
      setChatType("");
      return;
    }
    setChatType(type);
    setError("");
  };
  return (
    <>
      <h1 className="text-[28px]">چطور میتونم کمکت کنم ؟</h1>

      {/* گزینه‌ها */}
      <div
        ref={optionRef}
        className="mt-6 grid  grid-cols-5 gap-x-2 gap-y-[10px]"
      >
        <Button
          onPress={() => handleClick("debug")}
          className={`col-span-2 ${btnClassname} ${
            chatType === "debug" && selectedBtnClassName
          }`}
        >
          دیباگینگ میخوام
        </Button>
        <Button
          onPress={() => handleClick("consultation")}
          className={`col-span-3 ${btnClassname} ${
            chatType === "consultation" && selectedBtnClassName
          }`}
        >
          به مشاوره نیاز دارم
        </Button>
        <Button
          onPress={() => handleClick("private_class")}
          className={`col-span-3 ${btnClassname} ${
            chatType === "private_class" && selectedBtnClassName
          }`}
        >
          کلاس خصوصی
        </Button>
        <Button
          onPress={() => handleClick("public_class")}
          className={`col-span-2 ${btnClassname} ${
            chatType === "public_class" && selectedBtnClassName
          }`}
        >
          کلاس عمومی
        </Button>
      </div>

      {/* ارور */}
      <ErrorSection error={error} />
    </>
  );
};

export { OptionButtons };
