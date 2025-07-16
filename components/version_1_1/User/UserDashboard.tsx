"use client";
import { Main as UserType } from "@/components/types/user.types";
import { Main as PostType } from "@/components/types/posts";
import { Button, Card, CardBody, Tab, Tabs } from "@heroui/react";
import {
  Edit2,
  Eye,
  Heart,
  Music,
  PictureInPicture,
  Play,
  Plus,
  ProjectorIcon,
  UserRound,
  UserRoundPlus,
  Video,
  X,
} from "lucide-react";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { ModalPicturePlayer, ModalVideoPlayer } from "../ModalVideoPlayer";
// import HistoryCard from "../HistoryCard";
import { GetUserActivityHistoryTab } from "./TabsData";
import AddPost from "../AddPost";
import UploadResume from "./AddBadge";
import { usePathname } from "next/navigation";
import e from "express";
const jobHistoryData = [
  {
    company: "توسعه‌گر",
    position: "Full-stack Developer",
    start: "۱۴۰۱/۰۶/۰۱",
    end: "۱۴۰۳/۰۵/۱۵",
    project: "مدیریت پروژه دیباگچی",
    description: `در شرکت توسعه‌گر مشغول به کار بودم و مسئولیت مدیریت پروژه‌ها را بر عهده داشتم. در این موقعیت، با تیم‌های فنی، طراحی و فروش همکاری نزدیکی داشتم تا پروژه‌ها طبق زمان‌بندی و با کیفیت مطلوب به نتیجه برسند. یکی از دستاوردهای مهم من، پیاده‌سازی سیستم مدیریت وظایف داخلی و بهینه‌سازی فرایند ارتباط با مشتریان بود.`,
  },
  {
    company: "شرکت نوآوران داده",
    position: "Backend Developer",
    start: "۱۳۹۹/۰۲/۱۰",
    end: "۱۴۰۱/۰۴/۲۵",
    project: "طراحی API سامانه پرداخت",
    description: `در این شرکت به عنوان توسعه‌دهنده‌ی بک‌اند فعالیت داشتم و روی پروژه‌هایی با تمرکز بر Django و FastAPI کار می‌کردم. مسئول طراحی و مستندسازی APIها و اتصال به درگاه‌های بانکی بودم.`,
  },
  {
    company: "آریا وب",
    position: "Front-end Developer",
    start: "۱۳۹۸/۰۴/۰۱",
    end: "۱۳۹۹/۰۱/۲۵",
    project: "طراحی رابط کاربری اپلیکیشن آموزش آنلاین",
    description: `در تیم فرانت‌اند آریا وب، مسئول طراحی و پیاده‌سازی رابط کاربری با استفاده از React و Tailwind CSS بودم. در کنار طراحی، تجربه کار با ابزارهایی مانند Figma و Storybook را نیز به دست آوردم.`,
  },
];
const resumeImgs = [
  "/images/ResumeSample.png",
  "/images/ResumeSample.png",
  "/images/ResumeSample.png",
  "/images/ResumeSample.png",
  "/images/ResumeSample.png",
  "/images/ResumeSample.png",
  "/images/ResumeSample.png",
  "/images/ResumeSample.png",
  "/images/ResumeSample.png",
];

const UserDashboard = () => {
  return (
    <div className="max-w-[892px] p-0.5 bg-gradient-to-r rounded-[28px] from-[#242424] to-[#010A1900]">
      <div className="relative w-full h-[2500px] bg-[#181818E5] rounded-[28px]">
        <SideButtons />
        <div className="flex gap-[90px] pt-10 px-7 justify-between">
          <TopRightSection />
          <TopLeftSection />
        </div>
        <div className="max-w-[618px] w-full mx-auto">
          <DashboardTab />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

const SideButtons = () => {
  return (
    <div className="absolute left-[18px] top-4 flex gap-1">
      <Button
        className="w-7 h-7 bg-[#0F0F0F] rounded-full !min-w-0"
        isIconOnly
        startContent={
          <Image
            src="/images/svg/dashboardTap/RingingBellSvg.svg"
            alt=""
            width={12}
            height={12}
          />
        }
      />
      <Button
        className="w-7 h-7 bg-[#0F0F0F] rounded-full !min-w-0"
        isIconOnly
        startContent={
          <Image
            src="/images/svg/dashboardTap/LogoutSvg.svg"
            alt=""
            width={12}
            height={12}
          />
        }
      />
    </div>
  );
};
const TopRightSection = () => {
  return (
    <div>
      <div className="flex items-end gap-[14px]">
        <div className="p-[1px] w-[72px] h-[72px] rounded-full bg-gradient-to-l from-[#499BFF] via-[#C8D506]  to-[#FFFFFF]">
          <Image
            // بعدا اصلی رو بزار
            src={"/images/general/Profile.png"}
            alt="profile"
            className="w-[70px] h-[70px] mb-[1px] ml-[1px] border-2 border-black rounded-full object-cover"
            width={70}
            height={70}
          />
        </div>
        <div className="text-nowrap text-lg">
          <h1 className="text-[30px]">Mehdihamodi</h1>
          <h2 className="mt-1 text-[#BBBBBB]">
            مهدی حمود نژاد |
            <span className="mr-2 text-[#0084FFCC]">مدرس پایتون</span>
          </h2>
        </div>
      </div>
      <div className="h-10 mt-[53px] flex items-center justify-evenly">
        <div className="flex flex-col items-center">
          <span className="text-2xl">65</span>
          <span className="text-sm">دنبال کننده</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl">24</span>
          <span className="text-sm">آموزش ها</span>
        </div>
      </div>
      <CustomBtn text="ویرایش" className="mt-[58px]" />
    </div>
  );
};
const TopLeftSection = () => {
  const tags = [
    "phyton | UI",
    "C#",
    "javascript",
    "phyton | UI",
    "phyton | UI",
    "phyton | UI",
  ];
  const [expanded, setExpanded] = useState(false);

  const content = `آموزش ساخت اپلیکیشن با هوش مصنوعی بدون کدنویسی
در این آموزش، یاد می‌گیریم چگونه بدون نیاز به دانش برنامه‌نویسی، یک اپلیکیشن هوشمند طراحی و پیاده‌سازی کنیم. با استفاده از ابزارهای No-Code و Low-Code مانند Glide، Bubble، Adalo یا سرویس‌های مبتنی بر هوش مصنوعی مثل ChatGPT API، Zapier، و Make.com، می‌توان اپلیکیشن‌هایی ساخت که قابلیت‌های پیشرفته‌ای مانند پاسخ‌گویی خودکار، تحلیل داده‌ها، و حتی تولید محتوا را داشته باشند.`;

  const characterLimit = 60;

  const isLongText = content.length > characterLimit;
  const displayedText =
    expanded || !isLongText ? content : content.slice(0, characterLimit);

  return (
    <div className="flex w-full h-[339px] gap-8 text-[#BBBBBB]">
      <div className="w-[1px] h-[315px] bg-gradient-to-b from-transparent via-[#ffffff41] to-transparent"></div>
      <div className="h-full w-full pt-4 flex flex-col">
        <h1 className="text-2xl">تخصص ها</h1>
        <div className="w-fit mt-[25px] grid grid-cols-3 gap-x-4 gap-y-4">
          {tags.map((text, index) => (
            <CustomBtn
              key={index}
              className="!w-[115px] !h-7 font-iranMedium"
              text={text}
            />
          ))}
        </div>
        <h1 className="mt-[26px] text-[#BBBBBB] text-sm">درباره من</h1>
        <p className="w-full h-[37%] p-4 pr-0 pt-0 mt-2 overflow-auto mx-auto text-white text-[14px] leading-relaxed text-justify">
          {displayedText}
          {isLongText && (
            <Button
              className="!min-w-0 mr-2 !p-0 bg-transparent text-[#898989]"
              onPress={() => setExpanded((prev) => !prev)}
            >
              {expanded ? "کمتر" : "بیشتر .."}
            </Button>
          )}
        </p>
      </div>
    </div>
  );
};
const CustomBtn: FC<{ text: string; className?: string }> = ({
  text,
  className,
}) => {
  return (
    <div
      className={`rounded-[10px] w-[300px] h-[35px] p-[1px] bg-gradient-to-r from-[#181818E5] to-[#666666] text-sm font-iranBold ${className}`}
    >
      <Button className="rounded-[10px] !m-0 bg-[#212121] w-full h-full text-[#a1a1a1]">
        {text}
      </Button>
    </div>
  );
};
const DashboardTab = () => {
  return (
    <Tabs
      classNames={{
        tabList: "bg-[#1C1C1CB2] p-0 w-[618px] h-[50px] rounded-2xl",
        tab: `text-gray-700 h-full px-4 py-2 !rounded-2xl overflow-hidden [&>span]:!bg-[#292929]`,
        tabContent: "text-sm",
      }}
    >
      <Tab key="resume" title="رزومه">
        <ResumeTab />
      </Tab>
      <Tab key="history" title="تاریخچه">
        <Card>
          <CardBody>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </CardBody>
        </Card>
      </Tab>
    </Tabs>
  );
};

const ResumeTab = () => {
  return (
    <div className="mt-[37px] flex flex-col gap-[7px]">
      <AboutUserSkills />
      <UserLangsChart />
      <UserJobHistory />
      <UserResume />
    </div>
  );
};

const AboutUserSkills = () => {
  const [expanded, setExpanded] = useState(false);

  const content = `من نمی‌تونم مستقیم ویدیو بسازم یا خروجی ویدیویی صادر کنم، ولی می‌تونم دقیق‌ترین و کامل‌ترین متنِ دستور ساخت، سناریو، و دیالوگ‌هایی که باید در ویدیو گفته بشه رو برات آماده کنم؛ به‌طوری‌که فقط با کپی کردن این متن‌ها در یک ابزار تولید ویدیو یا وویس‌اُور مثل Pictory، Synthesia، HeyGen یا حتی CapCut، بتونی محتوای حرفه‌ای بسازی — بدون اینکه نیازی به تجربه قبلی در ساخت ویدیو یا تدوین داشته باشی.`;
  const characterLimit = 107;

  const isLongText = content.length > characterLimit;
  const displayedText =
    expanded || !isLongText ? content : content.slice(0, characterLimit);
  return (
    <div className="w-full rounded-[19px] bg-[#09090D] p-5">
      <h1 className="text-lg text-[#BBBBBB]">درباره تخصص هام</h1>
      <p
        className={`w-full mt-[18px] text-[13px] font-iranRegular !text-[#A4A4A4] text-justify ${
          expanded ? "leading-[22px]" : "leading-[1px]"
        }`}
      >
        {displayedText}
        {isLongText && (
          <Button
            className="!min-w-0 mr-2 !p-0 bg-transparent text-[#898989]"
            onPress={() => setExpanded((prev) => !prev)}
          >
            {expanded ? "کمتر" : "بیشتر .."}
          </Button>
        )}
      </p>
    </div>
  );
};
const UserLangsChart = () => {
  const langs = [
    {
      language: "French",
      grade: 75,
    },
    {
      language: "Arabic",
      grade: 100,
    },
    {
      language: "Espanish",
      grade: 50,
    },
  ];
  return (
    <div className="w-full pt-[16px] pb-[29px] px-7 rounded-[19px] border border-[#1e1e1e] bg-gradient-to-tr from-[#191929] via-[#000000] to-[#191929]">
      <h1 className="text-[#BBBBBB] text-lg">تسلط بر زبان</h1>
      <div className="mt-[27px] flex flex-col gap-[11px]">
        {langs.map((lang, index) => {
          const filledCount = lang.grade / 25;
          return (
            <div key={index} className="flex items-center justify-between">
              {lang.grade === 100 ? (
                <div className="w-[96px] h-[9px] rounded-full bg-[#00FF44]"></div>
              ) : (
                <div className="flex flex-row-reverse gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-[11px] h-[11px] rounded-full ${
                        i < filledCount ? "bg-[#4278FF]" : "bg-[#FFFFFF4D]"
                      }`}
                    ></div>
                  ))}
                </div>
              )}

              <h1 className="">{lang.language}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};
const UserJobHistory = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const characterLimit = 100;
  const [showAll, setShowAll] = useState(false);
  const visibleJobs = showAll ? jobHistoryData : [jobHistoryData[0]];

  return (
    <div className="relative w-full py-[15px] pb-[48px] px-7 rounded-[19px] border border-[#1e1e1e] bg-gradient-to-tr from-[#191929] via-[#000000] to-[#191929]">
      <h1 className="text-[#BBBBBB] text-lg mb-6">سوابق شغلی من</h1>

      <div className="flex flex-col gap-6">
        {visibleJobs.map((job, index) => {
          const isExpanded = expandedIndex === index;
          const isLongText = job.description.length > characterLimit;
          const displayedText =
            isExpanded || !isLongText
              ? job.description
              : job.description.slice(0, characterLimit);

          return (
            <div
              key={index}
              className="flex justify-between items-start text-[#BBBBBB]"
            >
              <div className="relative w-[205px] h-[140px]">
                <div className="w-full h-7 flex items-center justify-center rounded-xl border border-[#FFFFFF80] text-sm">
                  {job.company}
                </div>
                <div className="absolute top-[18px] right-0 h-full w-[2px] bg-gradient-to-b from-[#ffffff3c] to-transparent" />
                <div className="p-[15px] flex flex-col justify-center gap-[11px] font-iranRegular text-xs">
                  <span>{job.position}</span>
                  <span>
                    {job.start} | {job.end}
                  </span>
                  <span>{job.project}</span>
                </div>
              </div>

              <div>
                <span className="text-xs">توضیح</span>
                <p
                  className={`w-[294px] max-h-[110px] mt-[4px] p-4 overflow-y-auto bg-[#1A1A1A] rounded-lg text-[10px] font-iranRegular text-justify ${
                    isExpanded ? "leading-[22px]" : "leading-[1px]"
                  }`}
                >
                  {displayedText}
                  {isLongText && (
                    <Button
                      className="!min-w-0 mr-2 !p-0 bg-transparent text-[10px] text-[#898989]"
                      onPress={() =>
                        setExpandedIndex(isExpanded ? null : index)
                      }
                    >
                      {isExpanded ? "کمتر" : "بیشتر .."}
                    </Button>
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <Button
        onPress={() => setShowAll(!showAll)}
        startContent={
          <Image
            className={`transition-all ${showAll ? "rotate-180" : ""}`}
            src="/images/svg/DownArrowSvg.svg"
            alt=""
            width={10}
            height={13}
          />
        }
        className="absolute left-5 bottom-2 min-w-0 flex-row-reverse bg-transparent font-iranRegular text-xs text-[#747474]"
      >
        {showAll ? "کمتر" : "بیشتر"}
      </Button>
    </div>
  );
};
const UserResume = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const classes = [
    "h-[90%] self-start rounded-b-[10px]",
    "h-full",
    "h-[90%] self-end rounded-t-[10px]",
  ];
  return (
    <div className="relative w-full py-[12px] h-[342px] px-7 rounded-[19px] border border-[#1e1e1e] bg-gradient-to-tr from-[#191929] via-[#000000] to-[#191929]">
      <h1 className="text-[#BBBBBB] text-lg mb-[16px]">نمونه کار</h1>
      <div className="w-[555px] mx-auto">
        <div
          dir="ltr"
          className="h-[163px] w-full rounded-t-[11px] overflow-x-auto"
        >
          <div className="h-full w-fit px-10 flex items-center gap-[60px] bg-[url('/ResumeBg.png')] bg-cover bg-center">
            {resumeImgs.map((src, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImg(src)}
                className={`w-[110px] overflow-hidden cursor-pointer ${classes[idx % 3]}`}
              >
                <Image
                  className="h-full"
                  src={src}
                  alt=""
                  width={300}
                  height={300}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex items-center pr-6 h-[52px] bg-[#212121] rounded-b-[11px]">
          <h1 className="text-[#BBBBBB]">نمونه ساخت اپلیکیشن</h1>
        </div>
      </div>
      {selectedImg && (
        <div
          onClick={() => setSelectedImg(null)}
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-[90%] max-h-[90%]"
          >
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute -top-5 -right-5 bg-white text-black rounded-full p-1 hover:bg-red-500 hover:text-white transition"
            >
              <X size={24} />
            </button>
            <Image
              src={selectedImg}
              alt="full view"
              width={500}
              height={500}
              className="w-[500px] h-[500px] rounded-lg object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export const UserProfile = ({ user }: { user: UserType }) => {
  return (
    <div className="w-full flex h-auto gap-4  ">
      <div className="max-w-[500px] flex flex-col box-border p-4">
        <div className="rounded-full w-[90px] h-[90px] p-1 box-border border-2 border-secondary-500">
          <Image
            src={user.image_profile || "/user.jpg"}
            alt="avatar"
            width={90}
            height={90}
            className="rounded-full aspect-square  bg-black"
          />
        </div>
        <div className=" w-3/4 h-full flex items-center justify-center gap-4 ">
          <Button
            variant="light"
            color="default"
            size="lg"
            className="flex flex-col py-2 box-border h-24"
          >
            {user &&
            user.user_roles &&
            user.user_roles?.includes("debugger") ? (
              <>
                <span>دنبال کنندگان</span>
                <span>{user?.followers?.count}</span>
              </>
            ) : (
              <>
                <span>دنبال شوندگان</span>
                <span>{user && user.followers ? user.followers.count : 0}</span>
              </>
            )}
          </Button>
          <Button
            variant="light"
            color="default"
            size="lg"
            className="flex flex-col py-2 box-border h-24"
          >
            {user &&
            user.user_roles &&
            user.user_roles?.includes("debugger") ? (
              <>
                <span>پروژه های انجام شده</span>
                <span>220</span>
              </>
            ) : (
              <>
                <span>خدمات دریافت شده</span>
                <span>220</span>
              </>
            )}
          </Button>
        </div>
        <p className="text-foreground-500 text-justify">
          {user.user_bio || "برای بایو خود یک متن خوب بنویسید..."}
        </p>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-4 relative">
        <h1 className="text-5xl py-2  font-bold bg-gradient-to-tr from-orange-900 to-orange-500 bg-clip-text text-transparent">
          {user.job_title || "عنوان شغلی شما"}
        </h1>

        <div className="flex items-center justify-between  flex-row-reverse gap-4  absolute bottom-0">
          {user &&
            user.user_roles &&
            user.user_roles?.includes("debugger") &&
            user.user_resume.map((item) => {
              return (
                <div
                  className="rounded-full flex flex-col items-center gap-2 w-auto h-auto aspect-square box-border p-2"
                  key={item.id}
                >
                  <Image
                    className="rounded-full aspect-square"
                    src={item.cv_file}
                    width={60}
                    height={60}
                    alt={item.title}
                  />
                  <span>{item.title}</span>
                </div>
              );
            })}

          {user &&
            user.user_roles &&
            user.user_roles?.includes("debugger") &&
            user.user_resume.length != 5 && <UploadResume />}
        </div>
      </div>
    </div>
  );
};
