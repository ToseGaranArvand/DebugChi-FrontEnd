"use client";
import { Main } from "@/components/types/user.types";
import { ModalSettings, ModalTask } from "@/components/debuger-modals";
import {
  Accordion,
  AccordionItem,
  addToast,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Radio,
  RadioGroup,
  Tab,
  Tabs,
  Textarea,
  useDisclosure,
} from "@heroui/react";
import axios from "axios";
import {
  Activity,
  ChevronLeft,
  ChevronRight,
  File,
  Headset,
  History,
  MoveDownLeft,
  Search,
  Share2,
  Sparkles,
  Star,
} from "lucide-react";
import React, { useState } from "react";
import { GetUserActivityHistoryTab } from "../TabsData";
import RequetsList from "./RequetsList";
import ChatList from "../../chatList";
import OnlineAction from "../OnlineAction";
import NewRequestIncoming from "../NewRequestIncoming";
import { useRequestFilter } from "@/context/RequetsFilterProvider";
import ClassActivities from "./ClassActivity";
import TicketsTracking from "./TicketsTracking";
import { useAppSelector } from "@/redux/store/store";

interface Props {
  user: any;
  faq: any;
  containerWidth?: number;
}

export const DebugerHome = ({ user, faq, containerWidth }: Props) => {
  const [selectedTab, setSelectedTab] = useState<string>("home");
  const { showNewRequest } = useAppSelector((state: any) => state.gloabal);
  const [showSettings, setShowSettings] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const settingsDisclosure = useDisclosure();
  const taskDisclosure = useDisclosure();


  const [taskRefreshKey, setTaskRefreshKey] = useState(0);

  const handleFilterChange = () => {
    setTaskRefreshKey((prevKey) => prevKey + 1);
  };
  

  const handleSettingsClick = () => {
    settingsDisclosure.onOpen();
    setShowSettings(true);
  };

  const handleSupportClick = () => {
    taskDisclosure.onOpen();
    setShowTask(true);
  };

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
        <div className="bg-[#0F0F0F] w-full flex-shrink-0">
          <div className="flex justify-between items-center h-20 px-4">
            <Tabs
              aria-label="Tabs variants"
              variant="underlined"
              className="bg-transparent"
              selectedKey={selectedTab}
              onSelectionChange={(key) => setSelectedTab(key as string)}
              classNames={{
                tabList: "gap-6",
                cursor: "bg-white",
                tab: "px-2 py-1 text-sm text-gray-400 data-[selected=true]:text-white",
              }}
            >
              <Tab key="home" title="بخش اصلی" />
              <Tab key="activities" title="کلاس ها" />
              <Tab key="support" title="پشتیبانی" />
              <Tab key="History" title="تاریخچه" />
              <Tab key="Rate" title="رتبه" />
            </Tabs>
            <div className="flex gap-6">
              <button
                onClick={handleSupportClick}
                className="text-gray-400 hover:text-white transition-colors px-2 py-1 text-sm"
              >
                تسک منتخب
              </button>
              <button
                onClick={handleSettingsClick}
                className="text-gray-400 hover:text-white transition-colors px-2 py-1 text-sm"
              >
                تنظیمات
              </button>
            </div>
          </div>
          <div
            className="w-full h-[0.5px]"
            style={{
              borderBottom: "0.5px solid",
              borderImageSource:
                "linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.27) 53.37%, rgba(255, 255, 255, 0) 100%)",
              borderImageSlice: "1",
            }}
          ></div>
        </div>

        <div className="flex-1 overflow-hidden">
          {selectedTab === "home" && (
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
                    <NewRequestIncoming key={taskRefreshKey} />
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
          )}

          {selectedTab === "activities" && (
            <div className="h-full overflow-hidden p-5">
              <ClassActivities />
            </div>
          )}

          {selectedTab === "support" && (
            <div className="h-full overflow-hidden">
              <div className="h-full p-5 overflow-y-auto gap-3 flex flex-col custom-scrollbar">
                <Chip variant="faded">پرتکرارترین ها</Chip>
                <SupportFAQ data={faq} user={user} />
                <TicketsTracking phone={user.user_phone} />
              </div>
            </div>
          )}

          {selectedTab === "History" && (
            <div className="h-full overflow-hidden">
              <div className="h-full overflow-y-auto p-5 custom-scrollbar">
                <GetUserActivityHistoryTab />
              </div>
            </div>
          )}

          {selectedTab === "Rate" && (
            <div className="h-full overflow-hidden">
              <div className="h-full p-5">
                <RankTab user={user} />
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedTab === "home" && (
        <OnlineAction containerWidth={containerWidth} />
      )}

      <ModalSettings
        setShow={setShowSettings}
        show={showSettings}
        isOpen={settingsDisclosure.isOpen}
        onOpen={settingsDisclosure.onOpen}
        onOpenChange={settingsDisclosure.onOpenChange}
      />

      <ModalTask
        setShow={setShowTask}
        show={showTask}
        isOpen={taskDisclosure.isOpen}
        onOpen={taskDisclosure.onOpen}
        onOpenChange={taskDisclosure.onOpenChange}
        onFilterChange={handleFilterChange}
      />
    </>
  );
};

const FilterDropDown = () => {
  const [selectedKey, setSelectedKey] = React.useState("همه");
  const { filter, setFilter } = useRequestFilter();
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="capitalize" variant="bordered">
          {selectedKey}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        closeOnSelect={true}
        selectedKeys={new Set([selectedKey])}
        selectionMode="single"
        variant="flat"
        onSelectionChange={(keys) => {
          const key: any = Array.from(keys)[0];
          setSelectedKey(key);
          if (key == "همه") {
            setFilter("");
          } else {
            setFilter(key);
          }
        }}
      >
        <DropdownItem key="همه">همه</DropdownItem>
        <DropdownItem key="دیباگ">دیباگ</DropdownItem>
        <DropdownItem key="کلاس خصوصی">کلاس خصوصی</DropdownItem>
        <DropdownItem key="مشاوره">مشاوره</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const NotificationActitvities = () => {
  return (
    <div className=" w-full rounded-xl box-border overflow-y-auto ">
      <ChatList />
    </div>
  );
};

export const DebugerRequest = () => {
  const { filter, setFilter } = useRequestFilter();

  return (
    <>
      <div className="h-20 w-full flex bg-[#0F0F0F] gap-2 p-5 box-border rounded-tr-2xl rounded-tl-2xl">
        <Input
          startContent={<Search className="stroke-foreground-300" />}
          placeholder="جستجوی پیام ها ..."
          onValueChange={(value) => {
            setFilter(value);
          }}
        />
        <FilterDropDown />
      </div>
      <div className="flex flex-wrap bg-[#0F0F0F] flex-col gap-4 w-full h-full">
        <Tabs
          aria-label="Options"
          radius="full"
          size="sm"
          fullWidth
          className="rounded-tr-2xl rounded-tl-2xl flex items-center justify-start box-border py-2 px-5"
          classNames={{
            tabList: "gap-6 w-full relative  rounded-none p-0 border-divider",
            cursor: "w-full !bg-foreground-100",
            tab: "w-full px-5",
            tabContent: "group-data-[selected=true]:text-[#ffffff]",
          }}
          variant="light"
        >
          <Tab key="messages" title="پیام ها">
            <div className="w-full ">
              <NotificationActitvities />
            </div>
          </Tab>
          <Tab key="requests" title="درخواست ها">
            <div className="w-full flex flex-col">
              <RequetsList />
            </div>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export const SupportFAQ = ({ data, user }: { data: any[]; user: Main }) => {
  const [state, setState] = useState({
    title: "",
    description: "",
    problem: "",
    email: user.email,
    phone: user.user_phone,
    created_at: new Date(),
  });
  const [isLoading, setIsloading] = useState<boolean>(false);

  const submitRequest = async () => {
    setIsloading(true);
    await axios
      .post("/api/support/", state)
      .then((res) => {
        if (res.status == 201) {
          addToast({
            title: "درخواست پشتیبانی",
            description: `درخواست شما با موفقیت ثبت شد به زودی به شماره تلفن ${user.user_phone} تماس گرفته خواهد شد`,
            color: "success",
          });
          setIsloading(false);
        }
      })
      .catch((err) => {
        setIsloading(false);
        console.log(err);
      });
  };

  return (
    <Accordion variant="splitted">
      {data &&
        data
          .sort((a, b) => a.priority - b.priority)
          .map((item, index) => {
            return (
              <AccordionItem
                className="bg-c_background/30"
                key={item._id}
                aria-label="Accordion 1"
                title={item.title}
                onPress={() => setState({ ...state, problem: item.title })}
              >
                <div key={item.title} className="flex flex-col w-full gap-4">
                  <span className="text-default-foreground text-xs font-lightSans">
                    {item.description}
                  </span>
                  <RadioGroup
                    onValueChange={(value) =>
                      setState({ ...state, title: value })
                    }
                  >
                    {item.option &&
                      item.options.map((option: any) => {
                        return (
                          <Radio key={option.title} value={option.title}>
                            {option.title}
                          </Radio>
                        );
                      })}
                  </RadioGroup>

                  <Textarea
                    minRows={4}
                    maxRows={6}
                    variant="underlined"
                    onValueChange={(value) =>
                      setState({ ...state, description: value })
                    }
                    placeholder="توضیحات خود را بنویسید"
                    endContent={
                      <div className="flex gap-4 ">
                        <Button
                          isIconOnly
                          size="md"
                          color="primary"
                          startContent={<File />}
                          variant="flat"
                        ></Button>
                        <Button
                          variant="flat"
                          color="primary"
                          size="md"
                          onPress={submitRequest}
                          isLoading={isLoading}
                        >
                          ارسال تیکت
                        </Button>
                      </div>
                    }
                  />
                </div>
              </AccordionItem>
            );
          })}
    </Accordion>
  );
};

export const RankTab = ({ user }: { user: Main }) => {
  const comments = user.user_main_comment;
  const rateCalc = () => {
    if (!comments.length) return { total: 0, average: 0 };

    const total = comments.reduce((sum, item) => sum + item.rate, 0);
    const average = total / comments.length;

    return { total, average };
  };

  const { total, average } = rateCalc();
  return (
    <div className="min-h-[600px] text-white">
      <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-4">
        <div className="flex justify-between items-center mb-4">
          <div></div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">
            {total == 0 && "نظری ثبت نشده"}
          </h1>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-gray-300 text-sm">{total} از تعداد</span>
          </div>
        </div>

        <div className="bg-[#252a32] flex flex-col gap-3 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 ml-1" />
              <span className="text-sm">5</span>
            </div>
            <div className="flex-1 mx-2">
              <div className="h-2 bg-[#3a3f47] rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full"
                  style={{ width: "0%" }}
                ></div>
              </div>
            </div>
            <span className="text-sm text-gray-400">0</span>
          </div>

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 ml-1" />
              <span className="text-sm">4</span>
            </div>
            <div className="flex-1 mx-2">
              <div className="h-2 bg-[#3a3f47] rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full"
                  style={{ width: "0%" }}
                ></div>
              </div>
            </div>
            <span className="text-sm text-gray-400">0</span>
          </div>

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 ml-1" />
              <span className="text-sm">3</span>
            </div>
            <div className="flex-1 mx-2">
              <div className="h-2 bg-[#3a3f47] rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full"
                  style={{ width: "0%" }}
                ></div>
              </div>
            </div>
            <span className="text-sm text-gray-400">0</span>
          </div>

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 ml-1" />
              <span className="text-sm">2</span>
            </div>
            <div className="flex-1 mx-2">
              <div className="h-2 bg-[#3a3f47] rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full"
                  style={{ width: "0%" }}
                ></div>
              </div>
            </div>
            <span className="text-sm text-gray-400">0</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 ml-1" />
              <span className="text-sm">1</span>
            </div>
            <div className="flex-1 mx-2">
              <div className="h-2 bg-[#3a3f47] rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full"
                  style={{ width: "0%" }}
                ></div>
              </div>
            </div>
            <span className="text-sm text-gray-400">0</span>
          </div>

          <div className="text-xs text-gray-400 text-center mt-4 rtl">
            بر اساس ۱۰۰ خدمات دهی امتیازدهی شده اخیر
          </div>
        </div>

        <div className="mb-6">
          <h2 className="font-bold text-lg mb-4">
            :پرتکرارترین گزینه‌های انتخابی کاربرا
          </h2>
          {comments.length <= 0 ? (
            <div className="w-full h-20 border border-slate-800 rounded-lg flex items-center justify-center">
              هنوز نظری برای شما ثبت نشده
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {comments.map((item) => {
                const tags = item.tags.split(",");
                return tags.map((tag) => {
                  return (
                    <button className="bg-[#252a32] border border-green-600 text-green-500 rounded-lg py-3 px-4 text-sm">
                      {tag}
                    </button>
                  );
                });
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};