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
type Props = {
  user: Main;
};

const Wallet = (props: Props) => {
  const { setUserData } = useUserContext();
  useEffect(() => {
    setUserData(props.user);
  }, []);
  return (
    <ModalProvider>
      <div className="rounded-2xl p-0.5 bg-gradient-to-r from-black to-[#242424]">
        <div className="bg-[#0F0F0F] px-3 pb-[6px] rounded-2xl w-[366px] ">
          <CartLabel />
          <div className="flex w-full mt-2 flex-col">
            <Tabs
              classNames={{
                tabList: "bg-[#18151E] p-0 w-full h-[63px] rounded-xl",
                tab: "text-gray-700 h-full px-4 py-2",
                tabContent: "text-sm",
              }}
            >
              <Tab
                key="photos"
                title={
                  <div className="flex flex-col items-center gap-[1px] pt-[3px]">
                    <HistorySvg />
                    <span className="text-[10px]">تاریخچه</span>
                  </div>
                }
              >
                <TabHistory />
              </Tab>
              <Tab
                key="music"
                title={
                  <div className="flex flex-col items-center gap-[1px] pt-[3px]">
                    <AddMoneySvg />
                    <span className="text-[10px]">افزایش موجودی</span>
                  </div>
                }
              >
                <Card>
                  <CardBody>
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                    irure dolor in reprehenderit in voluptate velit esse cillum
                    dolore eu fugiat nulla pariatur.
                  </CardBody>
                </Card>
              </Tab>
              <Tab
                key="videos"
                title={
                  <div className="flex flex-col items-center gap-[1px] pt-[3px]">
                    <GetMoneySvg />
                    <span className="text-[10px]">برداشت</span>
                  </div>
                }
              >
                <Card>
                  <CardBody>
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </CardBody>
                </Card>
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

const TabHistory = () => {
  return (
    <div>
      <h1 className="pt-[26px] text-[#BCBCBC] text-xs">تاریخچه اخیر</h1>
      <div className="max-h-[272px] overflow-auto mt-[14px] space-y-[9px]">
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
