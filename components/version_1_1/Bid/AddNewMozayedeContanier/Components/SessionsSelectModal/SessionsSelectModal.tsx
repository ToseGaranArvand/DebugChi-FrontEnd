import React, { FC, useEffect, useState } from "react";
import { SessionUploader } from "./SessionUploader/SessionUploader";
import Image from "next/image";
import Button from "@/components/version_1_1/ui/button";
import { Input } from "@/components/ui/input";

const SessionsSelectModal: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sessions, setSessions] = useState<string[]>([
    "آموزش مقدماتی",
    "آشنایی با محیط نرم‌افزار",
  ]);
  const [newSession, setNewSession] = useState("");

  // جلوگیری از اسکرول بک‌گراند هنگام باز بودن مودال
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  // اضافه کردن سرفصل با زدن Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newSession.trim()) {
      setSessions((prev) => [...prev, newSession.trim()]);
      setNewSession(""); // پاک کردن اینپوت
    }
  };

  return (
    <>
      <Button
        onPress={() => setIsModalOpen(true)}
        className="w-full mxa-[420px] h-[50px] pr-[26px] justify-between !bg-transparent rounded-[20px] border border-[#6E6E6E36] text-sm"
      >
        سرفصل‌ها
        <Image
          src="/images/svg/DownArrowSvg.svg"
          alt=""
          className="rotate-90"
          width={20}
          height={20}
        />
      </Button>

      {isModalOpen && (
        <div className="fixed !mt-0 inset-0 z-50 bg-black flex flex-col items-end p-2 pt-10 gap-2">
          <Button
            onPress={() => setIsModalOpen(false)}
            className="!bg-transparent px-0 ml-3"
          >
            <Image
              src="/images/svg/BackSvg.svg"
              alt="بازگشت"
              width={20}
              height={20}
            />
          </Button>

          <div className="w-full h-full bg-[#151515c2] rounded-[20px] flex flex-col justify-between">
            <div>
              <h1 className="h-[33px] w-[300px] mt-3 !border-none !ring-offset-0 !bg-transparent text-white placeholder:text-white text-[18px] font-iranBold">
                سرفصل‌ها را وارد کنید
              </h1>
              <div
                style={{
                  background:
                    "linear-gradient(to right, #ffffff0a 0%, #ffffff30 50%, #ffffff0a 100%)",
                }}
                className="h-[1px] mt-[10px] mb-[26px]"
              ></div>
              {sessions.map((title, index) => (
                <h1 key={index} className="mr-6 mt-3 text-sm text-white">
                  {index + 1}. {title}
                </h1>
              ))}
              <Input
                value={newSession}
                onChange={(e) => setNewSession(e.target.value)}
                onKeyDown={handleKeyDown}
                style={
                  {
                    "--tw-ring-shadow": "0 0 0 3px transparent",
                  } as React.CSSProperties
                }
                className="h-[33px] w-[300px] mt-3 pr-6 !border-none !ring-offset-0 !bg-transparent text-white placeholder:text-white text-[18px] font-iranBold"
                placeholder="چیزی تایچ کنید ..."
              />
            </div>
            <div>
              <SessionUploader />
              <Button
                onPress={() => setIsModalOpen(false)}
                className="w-full h-[50px] mt-[18px] text-center text-[18px] text-[#C5C5C5] border border-[#6E6E6E57] !bg-transparent rounded-[20px]"
              >
                تایید سر فصل
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { SessionsSelectModal };
