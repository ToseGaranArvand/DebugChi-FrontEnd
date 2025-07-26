"use client";
import { Main as UserType } from "@/components/types/user.types";
import { Main as PostType } from "@/components/types/posts";
import { As, Button, Card, CardBody, Tab, Tabs } from "@heroui/react";
import {
  Edit2,
  Eye,
  Headset,
  Heart,
  MessageCircleMore,
  Music,
  Package,
  PictureInPicture,
  Play,
  Plus,
  ProjectorIcon,
  SquarePlus,
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
import { usePathname, useRouter } from "next/navigation";
import e from "express";
import { Input } from "@/components/ui/input";
import { CustomUploadBox } from "@/components/version_1_1/ui/CustomUploadBox";
import Link from "next/link";
import { formatCurrency, getCookies } from "@/utils/tools";
import { AnimatedTooltip } from "@/components/ui/ace/animated-tooltip";
import { handleRole } from "./handleRole";

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
const resumeProjects = [
  {
    title: "ساخت اپلیکیشن",
    images: resumeImgs,
  },
  {
    title: "طراحی وب‌سایت",
    images: resumeImgs,
  },
  {
    title: "سیستم مدیریت محتوا",
    images: resumeImgs,
  },
];
const educationData = [
  {
    title: "دکترای IT",
    image: "/PHD.png",
  },
  {
    title: "کارشناسی ارشد مهندسی نرم‌افزار",
    image: "/PHD.png",
  },
  {
    title: "کارشناسی علوم کامپیوتر",
    image: "/PHD.png",
  },
  {
    title: "دیپلم ریاضی‌فیزیک",
    image: "/PHD.png",
  },
  {
    title: "دوره تخصصی طراحی UX/UI",
    image: "/PHD.png",
  },
  {
    title: "دوره برنامه‌نویسی MERN",
    image: "/PHD.png",
  },
  {
    title: "مدرک ICDL",
    image: "/PHD.png",
  },
];
const commentArr = [
  {
    profile: "/images/general/Profile.png",
    comment:
      "بیتاب دلم، دوست کجایی آمدن رفتند چشمم راه را دوخته است کجایی تو دیده ات برام خوش استبیتاب دلم، دوست کجایی آمدن رفتند چشمم راه را دوخته است ...",
    star: 3,
  },
  {
    profile: "/images/general/Profile.png",
    comment:
      "بیتاب دلم، دوست کجایی آمدن رفتند چشمم راه را دوخته است کجایی تو دیده ات برام خوش استبیتاب دلم، دوست کجایی آمدن رفتند چشمم راه را دوخته است ...",
    star: 4,
  },
  {
    profile: "/images/general/Profile.png",
    comment:
      "بیتاب دلم، دوست کجایی آمدن رفتند چشمم راه را دوخته است کجایی تو دیده ات برام خوش استبیتاب دلم، دوست کجایی آمدن رفتند چشمم راه را دوخته است ...",
    star: 5,
  },
  {
    profile: "/images/general/Profile.png",
    comment:
      "بیتاب دلم، دوست کجایی آمدن رفتند چشمم راه را دوخته است کجایی تو دیده ات برام خوش استبیتاب دلم، دوست کجایی آمدن رفتند چشمم راه را دوخته است ...",
    star: 2,
  },
];
const historyArr = [
  {
    id: 1,
    profile: "/images/general/Profile.png",
    type: "مشاوره",
    price: 1150000,
    teacher: "مهدی حمود نژاد",
    duration: 15,
    date: "۱۴۰۴/۰۶/۲۸",
    startTime: "۱۸:۲۵",
  },
  {
    id: 2,
    profile: "/images/general/Profile.png",
    type: "مشاوره",
    price: 1150000,
    teacher: "مهدی حمود نژاد",
    duration: 15,
    date: "۱۴۰۴/۰۶/۲۸",
    startTime: "۱۸:۲۵",
  },
  {
    id: 3,
    profile: "/images/general/Profile.png",
    type: "مشاوره",
    price: 1150000,
    teacher: "مهدی حمود نژاد",
    duration: 15,
    date: "۱۴۰۴/۰۶/۲۸",
    startTime: "۱۸:۲۵",
  },
];

const UserDashboard = () => {
  const [userRole, setUserRole] = useState(null);
  console.log(userRole);

  useEffect(() => {
    const fetchData = async () => {
      const res = await handleRole();
      setUserRole(res);
    };
    fetchData();
  }, []);
  return (
    <div className="p-0.5 max-w-[892px] overflow-y-auto bg-gradient-to-r rounded-[28px] from-[#242424] to-[#010A19]">
      <div className="relative w-full pb-10 bg-[#181818E5] rounded-[28px]">
        <SideButtons />
        <div className="flex gap-[90px] pt-10 px-7 justify-between">
          <TopRightSection />
          <div className="flex w-full h-[339px] gap-8 text-[#BBBBBB]">
            <div className="w-[1px] h-[315px] bg-gradient-to-b from-transparent via-[#ffffff41] to-transparent"></div>
            {userRole === "student" && <TopLeftSectionForStudent />}
            {userRole === "debugger" && <TopLeftSectionForTeacher />}
          </div>
        </div>
        <div className="max-w-[618px] w-full mx-auto">
          <DashboardTab />
        </div>
        <div className="mt-[72px] px-[55px]">
          <CommentSection />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

const SideButtons = () => {
  return (
    <div className="absolute left-[18px] top-4 flex gap-1">
      {/* <Button
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
      /> */}
      <Button
        className="w-7 h-7 bg-[#0F0F0F] rounded-full !min-w-0"
        isIconOnly
        startContent={
          <Image
            src="/images/svg/dashboardTap/LogoutSvg.svg"
            alt=""
            width={12}
            height={12}
            className="ml-1"
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
      <CustomBtn
        as={Link}
        href="/user/dashboard/edit"
        text="ویرایش"
        className="mt-[58px]"
      />
    </div>
  );
};
const TopLeftSectionForTeacher = () => {
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
    <>
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
    </>
  );
};
const TopLeftSectionForStudent = () => {
  const router = useRouter();
  const goToSupport = () => {
    router.push("?support");
  };
  return (
    <div className="w-full h-full pb-[40px] flex flex-col items-center justify-center gap-5">
      <StudentOptionsButtons
        onPress={goToSupport}
        text="پشتیبانی"
        icon={<Headset className="w-[26px] h-[26px]" />}
      />
      <StudentOptionsButtons
        text="پیام ها"
        icon={<MessageCircleMore className="w-8 h-8" />}
        iconContainer="bg-[#0084FFCC]"
      />
      <StudentOptionsButtons
        text="سفارش ها"
        icon={<Package className="w-[29px] h-[29px]" />}
      />
    </div>
  );
};
interface IStudentOptionsButtonsType {
  text: string;
  icon: React.ReactNode;
  iconContainer?: string;
  onPress?: () => void;
}
const StudentOptionsButtons: FC<IStudentOptionsButtonsType> = ({
  text,
  icon,
  iconContainer,
  onPress,
}) => {
  return (
    <Button
      onPress={onPress}
      className="h-fit w-[165px] !justify-start !pr-0 !bg-transparent text-base"
      startContent={
        <div
          className={`w-[54px] h-[54px] flex justify-center items-center border-[1.5px] border-[#242424] rounded-xl ${iconContainer}`}
        >
          {icon}
        </div>
      }
    >
      {text}
    </Button>
  );
};
interface ICustomBtnTypes {
  text: string;
  className?: string;
  as?: As;
  href?: string;
}
const CustomBtn: FC<ICustomBtnTypes> = ({ text, className, as, href }) => {
  return (
    <div
      className={`rounded-[10px] w-[300px] h-[35px] p-[1px] bg-gradient-to-r from-[#181818E5] to-[#666666] text-sm font-iranBold ${className}`}
    >
      <Button
        as={as}
        href={href}
        className="rounded-[10px] !m-0 bg-[#212121] w-full h-full text-[#a1a1a1]"
      >
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
      <Tab className="!px-0" key="resume" title="رزومه">
        <ResumeTab />
      </Tab>
      <Tab key="history" title="تاریخچه">
        <HistoryTap />
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
      <UserAcademicDegrees />
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
    <div className="relative w-full py-[15px] pb-[48px] px-7 rounded-[19px] border border-[#212121] bg-gradient-to-tr from-[#191929] via-[#000000] to-transparent">
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
                <span className="mr-4 text-xs">توضیح</span>
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
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? resumeProjects : [resumeProjects[0]];

  const classes = [
    "h-[90%] self-start rounded-b-[10px]",
    "h-full",
    "h-[90%] self-end rounded-t-[10px]",
  ];
  return (
    <div className="relative w-full py-[12px] pb-[45px] px-7 rounded-[19px] border border-[#1e1e1e] bg-gradient-to-tr from-[#191929] via-[#000000] to-[#191929]">
      <h1 className="text-[#BBBBBB] text-lg mb-[16px]">نمونه کار</h1>
      {visibleProjects.map((project, projectIndex) => (
        <div className="w-[555px] mx-auto mb-6" key={projectIndex}>
          <div
            dir="ltr"
            className="h-[163px] w-full rounded-t-[11px] overflow-x-auto"
          >
            <div className="h-full min-w-full w-fit px-10 flex items-center gap-[60px] bg-[url('/ResumeBg.png')] bg-cover bg-center">
              {project.images.map((src, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImg(src)}
                  className={`w-[110px] overflow-hidden cursor-pointer ${
                    classes[idx % 3]
                  }`}
                >
                  <Image
                    className="h-full w-auto object-cover"
                    src={src}
                    alt=""
                    width={300}
                    height={300}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* عنوان پروژه */}
          <div className="w-full flex items-center pr-6 h-[52px] bg-[#212121] rounded-b-[11px]">
            <h1 className="text-[#BBBBBB]">{project.title}</h1>
          </div>
        </div>
      ))}
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
const UserAcademicDegrees = () => {
  const [addDegree, setAddDegree] = useState(false);

  if (addDegree === true)
    return (
      <div className="w-full p-2.5 pb-[9px] border border-[#333333] rounded-[19px] bg-gradient-to-tl from-[#69698529] via-[#00000011] to-[#69698529]">
        <h1 className="mb-3 mr-4 text-[#BBBBBB] text-[18px]">
          اضافه کردن تحصیلات
        </h1>
        <Input
          className="h-[45px] bg-[#1a1a1a] border-[#333333] rounded-xl !text-[12px] !text-[#6b6b6b] placeholder:!text-[#6b6b6b] !font-iranRegular"
          placeholder="عنوان مدرک"
        />
        <CustomUploadBox className="h-[89px] mt-2 p-2 bg-[#1a1a1a] border border-[#333333] rounded-xl !text-[12px] !text-[#6b6b6b] placeholder:!text-[#6b6b6b] !font-iranRegular">
          <div className="w-full h-full px-5 pr-6 mx-auto mb-4 border border-dashed border-[#272727] flex items-center justify-between rounded-xl text-[16px] font-iranRegular text-[#343434]">
            آپلود تصویر
            <Image
              src="/images/svg/UploadSvg.svg"
              alt=""
              width={28}
              height={28}
            />
          </div>
        </CustomUploadBox>
        <div className="mt-[11px] h-[46px] flex gap-5">
          <Button className="w-1/2 h-full bg-[#3344D9] rounded-xl text-[15px] font-iranRegular">
            اضافه کردن
          </Button>
          <Button
            onPress={() => setAddDegree(false)}
            className="w-1/2 h-full bg-[#1a1a1a] border border-[#333333] rounded-xl text-[15px] font-iranRegular"
          >
            لغو
          </Button>
        </div>
      </div>
    );

  if (addDegree === false)
    return (
      <div className="relative w-full py-3 pb-[54px] px-5 rounded-[19px] border border-[#1e1e1e] bg-gradient-to-tr from-[#191929] via-[#000000] to-[#191929]">
        <h1 className=" text-lg mt-3 mr-1 mb-[29px]">
          تحصیلات آکادمیک و دانشگاهی
        </h1>
        <div dir="ltr" className="w-full overflow-x-auto">
          <div className="w-fit flex gap-[9px]">
            {educationData.map((item, idx) => (
              <div
                key={idx}
                className="relative w-[186px] h-[120px] rounded-[11px] overflow-hidden"
              >
                <Image
                  className="w-full h-full"
                  src={item.image}
                  alt={item.title}
                  width={186}
                  height={120}
                />
                <div className="absolute left-0 bottom-0 w-full h-[34px] flex justify-center items-center bg-[#212121e2] text-[#BBBBBB] text-xs">
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Button
          onPress={() => setAddDegree(true)}
          className="absolute left-5 top-6 w-[140px] h-7 pl-0 pr-4 justify-between bg-[#3344D9] rounded-lg text-xs"
        >
          اضافه کردن مدرک
          <div className="min-w-7 h-7 flex justify-center items-center rounded-lg bg-[#727FE9] ">
            <SquarePlus className="w-[19px] h-[19px]" />
          </div>
        </Button>
      </div>
    );
};
const CommentSection = () => {
  return (
    <>
      <h1 className="text-lg">نظرات دانشجویان راضی</h1>
      <div className="grid grid-cols-2 gap-y-[29px] gap-x-[60px] mt-[7px]">
        {commentArr.map((comment, idx) => (
          <div
            key={idx}
            className="relative h-[105px] p-1.5 border border-[#333333] rounded-[15px] bg-gradient-to-br from-[#202021] to-[#151515]"
          >
            <Image
              className="w-[18px] h-[18px] border border-white rounded-full"
              src={comment.profile}
              alt=""
              width={18}
              height={18}
            />
            <div className="h-[60px] overflow-y-auto">
              <p className="px-4 pt-1 text-[#BBBBBB] text-xs font-iranLight">
                {comment.comment}
              </p>
            </div>
            <div className="absolute left-5 -top-[26px] flex">
              {Array.from({ length: comment.star }).map((_, idx) => (
                <Image
                  className="w-[28px] -ml-1.5"
                  key={idx}
                  src="/images/svg/StarSvg.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const HistoryTap = () => {
  return (
    <div className="mt-[37px] grid grid-cols-2 gap-2">
      {historyArr.map((card, idx) => {
        const isLastSingle =
          historyArr.length % 2 === 1 && idx === historyArr.length - 1;

        return (
          <div key={idx} className={isLastSingle ? "col-span-2" : ""}>
            <HistoryCard {...card} />
          </div>
        );
      })}
    </div>
  );
};
interface IHistoryCard {
  id: number;
  profile: string;
  type: string;
  price: number;
  teacher: string;
  duration: number;
  date: string;
  startTime: string;
}
const HistoryCard: FC<IHistoryCard> = ({
  id,
  profile,
  type,
  price,
  teacher,
  duration,
  date,
  startTime,
}) => {
  return (
    <div className="pt-5 pb-[14px] px-2.5 rounded-xl bg-[#151515] border border-[#2F2F2F]">
      <AnimatedTooltip image={profile} name={teacher} id={id} />

      <div className="mt-[16px] w-full rounded-[10px] bg-[#1F1F1F] border border-[#2F2F2F]">
        <div className="h-[46px] px-[25px] pb-1 flex items-center justify-between rounded-[10px] bg-gradient-to-br from-[#0F0F0F] to-[#000A1B] font-iranBold">
          <h1 className="text-[#0EE520]">{type}</h1>
          <div>
            <span className="text-[#BABABA] font-iranNumBold">
              {formatCurrency(price, true)}
            </span>
            <span className="mr-2.5 text-[10px] text-[#BABABA] font-iranRegular">
              تومان
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-[17px] pt-[9px] pb-[15px] px-6">
          <HistoryCardDataBanner title="اطلاعات مدرس" value={teacher} />
          <HistoryCardDataBanner
            title="مدت زمان جلسه"
            value={duration}
            placeholder="دقیقه"
          />
          <HistoryCardDataBanner title="تاریخ" value={date} />
          <HistoryCardDataBanner title="زمان برگزاری" value={startTime} />
        </div>
      </div>
      <Button className="mt-1.5 min-h-0 h-[36px] w-full flex items-center justify-center rounded-[10px] bg-[#1F1F1F] border border-[#2F2F2F] text-sm font-iranBold">
        دیدن اطلاعات
      </Button>
    </div>
  );
};
interface IHistoryCardDataBannerTypes {
  title: string;
  value: string | number;
  placeholder?: string;
}
const HistoryCardDataBanner: FC<IHistoryCardDataBannerTypes> = ({
  title,
  value,
  placeholder,
}) => {
  return (
    <div className="flex gap-2 items-center text-nowrap text-[10px] text-[#BABABA] font-iranNumMedium">
      <h1>{title}</h1>
      <div className="h-[0.5px] flex-1 bg-[#bababa0c]"></div>
      <h1 className="w-[66px] text-right">
        {value}
        {placeholder && <span className="mr-1">{placeholder}</span>}
      </h1>
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
