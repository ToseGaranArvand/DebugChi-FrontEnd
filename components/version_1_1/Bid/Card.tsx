"use client";
import { useAppDispatch } from "@/redux/store/store";
import {
  addToast,
  Button,
  CardHeader,
  Chip,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Input,
  Card as HeroCard,
  NumberInput,
  Popover,
  PopoverContent,
  PopoverTrigger,
  User,
  CardBody,
  CardFooter,
  user,
} from "@heroui/react";
import {
  Check,
  CheckCircle,
  Coins,
  Download,
  Ellipsis,
  Plus,
} from "lucide-react";
import Cookies from "js-cookie";
import { showLogin } from "@/redux/slices/globalSlice";
import Action from "./action";
import type { Bid, Tender } from "@/components/types/tender.type";
import Link from "next/link";
import { formatCurrency } from "@/utils/tools";
import { useEffect, useRef, useState } from "react";
import { socket, trend_socket } from "@/config/socket-config";
import { perform_post, perform_update } from "@/lib/api";
import { response } from "express";
import { Main } from "@/components/types/user.types";
import { usePathname } from "next/navigation";
import EventCard from "./EventCard";
import { useBidFilter } from "@/context/BidFilterContext";

type Props = {
  tender: Tender;
  bids: Bid[];
};

const Card = ({ tender, bids }: Props) => {
  const { filter, priceValue } = useBidFilter();

  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const token = Cookies.get("token");

  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("user_data");
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  const is_tender = tender.mode == "tender" ? true : false;
  const value = useRef<HTMLInputElement | null>(null);
  const [bidsList, setBidsList] = useState<Bid[]>(bids);

  const submitBid = async (
    action: "submit" | "update",
    tender_id: number,
    price: number
  ) => {
    if (!token) {
      setIsOpen(false);
      dispatch(showLogin({ show: true, path: pathname }));
    } else if (action == "submit") {
      // Handle bid submission
      const response = await perform_post("api/v1/submit_bid/", {
        tender: tender_id,
        amount: price.toString(),
      },
      token || ''
    );
      if (response.success) {
        const newBid: Bid = {
          user: userData || "",
          id: Date.now(), // برای نمایش سریع در UI، بعداً ID واقعی از سرور دریافت می‌شود
          amount: price.toString(),
          created_at: new Date(),
          updated_at: new Date(),
          tender: 0,
          status:false
        };
        addToast({
          title: "درخواست شما ثبت شد",
          description: response.message,
          color: "success",
        });
        // اضافه کردن پیشنهاد جدید به لیست
        setBidsList((prevBids) => [...prevBids, newBid]);
      }

      if (response.status == 400) {
        addToast({
          title: "درخواست شما ثبت نشد",
          description: response.data.message,
          color: "danger",
        });
      }
    } else if (action == "update") {
      const response = await perform_update("api/v1/submit_bid/", {
        tender: tender_id,
        amount: price,
      });

      if (response.success) {
        setBidsList((prevBids) => {
          return prevBids.map((item) =>
            item.user.uuid === userData.uuid
              ? { ...item, amount: price.toString(), updated_at: new Date() }
              : item
          );
        });
        addToast({
          title: "درخواست شما بروزرسانی شد",
          description: response.message,
          color: "success",
        });
      }
    }
  };

  let user_exist: any;
  if (userData) {
    user_exist = bids.find((item) => item.user.uuid == userData.uuid);
  }
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {}, [bidsList]);
  useEffect(() => {
    socket.on("", (msg) => {
      const newBid: Bid = {
        user: msg.user,
        id: msg.id,
        amount: msg.amount.toString(),
        created_at: msg.created_at,
        updated_at: msg.updated_at,
        tender: 0,
        status:false
      };
      setBidsList((prevBids) => [...prevBids, newBid]);
    });
  }, [socket]);

  // Find highest bid
  const highestBid =
    bids.length > 0
      ? bids.reduce(
          (max, bid) => (bid.amount > max.amount ? bid : max),
          bids[0]
        )
      : null;
  const bid = highestBid ? highestBid.amount : tender.start_bid;
  return (
    <div className="flex flex-col gap-2">
      <div
        className="w- min-h-[320px] bg-bg_card border border-default-100 rounded-2xl box-border flex p-4 items-center"
        dir="rtl"
      >
        <div className="relative w-96 h-auto">
          <Image
            className="rounded-lg"
            src={tender.image || "/user.jpg"}
            alt={tender.title}
            width={360}
            height={280}
          />
        </div>
        <div className="flex-1 h-full flex flex-col">
          <div className="flex justify-between py-4 h-14 ">
            <User
              name={`${tender.created_by.first_name} ${tender.created_by.last_name}`}
              avatarProps={{
                src: `${tender.created_by.image_profile}`,
              }}
            />
            <TenderTimer time={tender.end_time} />
          </div>
          <Divider className="my-2" />
          <div className="flex-1 w-3/4 box-border flex flex-col gap-4 p-4">
            <h2 className="text-xl">{tender.title}</h2>
            <p className="font-ultraLightSans text-white text-medium">
              {tender.description.substring(0, 190)}
              {"..."}
            </p>
          </div>
          <div className="min-h-16 grid grid-cols-3 items-center gap-2 ">
            <div className="flex flex-col gap-2 ">
              {tender.created_by.uuid === userData?.uuid ? null :
              is_tender ? (
                <Popover
                  showArrow
                  offset={10}
                  placement="bottom"
                  onOpenChange={(open) => setIsOpen(open)}
                  isOpen={isOpen}
                >
                  <PopoverTrigger>
                    <Button
                      color="secondary"
                      size="md"
                      className="bg-btn_primary"
                      onPress={() =>
                        submitBid(
                          user_exist ? "update" : "submit",
                          tender.id,
                          Number(value)
                        )
                      }
                    >
                      {user_exist ? "بروزرسانی پیشنهاد" : "شرکت در مزایده"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    {(titleProps) => (
                      <div className="px-1 py-2 w-full">
                        <p
                          className="text-small font-bold text-foreground"
                          {...titleProps}
                        ></p>
                        <div className="mt-2 flex flex-col gap-2 w-full">
                          <NumberInput
                            isRequired
                            color="success"
                            ref={value}
                            min={0}
                            label="قیمت"
                            errorMessage="قیمت را وارد نمایید"
                            placeholder="قیمت خود را وارد نمایید"
                            type="number"
                            defaultValue={Number(bid)}
                            endContent={
                              <Button
                                color="success"
                                size="sm"
                                onPress={() =>
                                  submitBid(
                                    user_exist ? "update" : "submit",
                                    tender.id,
                                    Number(value)
                                  )
                                }
                              >
                                تایید
                              </Button>
                            }
                            size="lg"
                            variant="faded"
                          />
                          <Button
                            onPress={() =>
                              submitBid(
                                user_exist ? "update" : "submit",
                                tender.id,
                                Number(bid) * 1.2
                              )
                            }
                          >
                            {formatCurrency(Number(bid) * 1.2)}
                          </Button>
                          <Button
                            onPress={() =>
                              submitBid(
                                user_exist ? "update" : "submit",
                                tender.id,
                                Number(bid) * 1.5
                              )
                            }
                          >
                            {formatCurrency(Number(bid) * 1.5)}
                          </Button>
                        </div>
                      </div>
                    )}
                  </PopoverContent>
                </Popover>
              ) : (
                <ActionBid
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  submitBid={submitBid}
                  tender={tender}
                  value={value}
                  user_exist={user_exist}
                />
              )
              }
              {tender.project != null && <EventCard data={tender.project} />}

              

            </div>
            <div></div>
            <div className="bg-black rounded-2xl h-full">
              {bidsList.length > 0 ? (
                bidsList
                  .map((bid, index) => (
                    <div
                      key={bid.id}
                      className={`flex justify-between flex-row-reverse items-center py-3 px-4 transition-all duration-500 ease-in-out ${
                        index % 2 === 0 && bids.length > 1
                          ? "border-t border-default-100"
                          : ""
                      } `}
                    >
                      <h3 className="text-foreground-300">
                        {bid.user.username ||
                          `${bid.user.first_name} ${bid.user.last_name}`}
                      </h3>
                      <div className="flex gap-2 text-lime-500">
                        <span className="text-foreground">تومان</span>
                        {formatCurrency(Number(bid.amount), false, true)}
                      </div>
                    </div>
                  ))
                  .slice(0, 2)
                  .reverse()
              ) : (
                <div className="text-center py-4 text-gray-500 w-full h-full flex items-center justify-center">
                  هنوز پیشنهادی ثبت نشده است
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-10  flex justify-end items-center mt-2">
          <Action tender_uuid={tender.uuid} comment_id={tender.uuid} is_like={tender.tender_like} like_count={tender.tender_like_count} />

      </div>
    </div>
  );
};

export default Card;
{
  /* <div className="w-full h-20 bg-[#f5f5f5] dark:bg-[#242424] rounded-t-2xl flex items-center justify-between box-border px-4">
  <User
    name={`${tender.created_by.first_name} ${tender.created_by.last_name}`}
    avatarProps={{
      src: `${tender.created_by.image_profile}`,
    }}
  />
  <TenderTimer time={tender.end_time} />

  <div className="flex items-center gap-2">
  
    <Chip>{is_tender ? "مزایده" : "مناقصه"}</Chip>
  </div>
</div> */
}
{
  /* <div className="flex-1 flex box-border px-5 bg-[#f5f5f5] dark:bg-[#242424] ">
  <div className="w-96 flex flex-col bg-main_bg/40 rounded-l-2xl" dir="rtl">
    <div className="flex-1 flex flex-col p-4">
      <div className="mb-4">
        <Chip variant="flat" color="success">
          پیشنهاد دهندگان
        </Chip>
        <div className="max-h-[400px] overflow-y-auto">
          {bidsList.length > 0 ? (
            bidsList
              .map((bid) => (
                <div
                  key={bid.id}
                  className="flex justify-between flex-row-reverse items-center p-3 b my-2 hover:bg-foreground-100 rounded-lg transition-all duration-500 ease-in-out"
                >
                  <h3 className="text-foreground-300">
                    {bid.user.username ||
                      `${bid.user.first_name} ${bid.user.last_name}`}
                  </h3>

                  <Chip variant="flat" color="danger">
                    {formatCurrency(Number(bid.amount))}
                  </Chip>
                </div>
              ))
              .reverse()
          ) : (
            <div className="text-center py-4 text-gray-500">
              هنوز پیشنهادی ثبت نشده است
            </div>
          )}
        </div>
      </div>
    </div>
    <Divider className="w-3/4 mx-auto bg-c_background" />
    <div className="h-20  border-stone-800 flex flex-col items-center justify-center gap-2 box-border px-20 w-full ">
      <div className="flex  items-center justify-between gap-4 w-full">
        {is_tender ? (
          <>
            <Chip variant="flat" color="success" dir="rtl">
              {formatCurrency(Number(bid))}
            </Chip>
            <span>بالاترین قیمت</span>
          </>
        ) : (
          <>
            <Chip variant="flat" color="success" dir="rtl">
              {formatCurrency(Number(bid))}
            </Chip>
            <span>ورودی</span>
          </>
        )}
      </div>
      <div className="border border-t-1 border-dashed border-stone-700 w-full"></div>
    </div>
  </div>

  <Divider orientation="vertical" className="bg-c_background" />

  <div className="flex-1 p-4 flex flex-col overflow-hidden bg-main_bg/40 rounded-r-2xl  ">
    {tender.image && (
      <div className="mb-4">
        <img
          src={`${tender.image}`}
          alt={tender.title}
          className="rounded-lg object-cover w-full h-[200px]"
        />
      </div>
    )}

    <div
      className="flex flex-col gap-4 z-10  w-full mx-auto   box-border  flex-1 relative"
      dir="rtl"
    >
      <h2 className="text-xl font-blackSans mb-4">{tender.title}</h2>

      <div className="mt-4">
        <div className=" rounded-lg">
          <h2 className="font-lightSans leading-7">{tender.description}</h2>
        </div>
      </div>

      <div className="mt-4 w-1/4">
        {tender.project != null && <EventCard data={tender.project} />}
      </div>
    
    </div>
  </div>
</div> */
}

{
  /* <div className="w-full h-20 bg-[#f5f5f5] dark:bg-[#242424] rounded-b-2xl flex items-center justify-between box-border px-4 ">
  {is_tender ? (
    <Popover
      showArrow
      offset={10}
      placement="bottom"
      onOpenChange={(open) => setIsOpen(open)}
      isOpen={isOpen}
    >
      <PopoverTrigger>
        <Button
          color="secondary"
          size="sm"
          className="bg-purple-700 "
          startContent={<Coins />}
          onPress={() => submitBid( user_exist ? "update" : "submit", tender.id, Number(value))}
        >
          {user_exist ? "بروزرسانی پیشنهاد" : "شرکت در مزایده"}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {(titleProps) => (
          <div className="px-1 py-2 w-full">
            <p
              className="text-small font-bold text-foreground"
              {...titleProps}
            ></p>
            <div className="mt-2 flex flex-col gap-2 w-full">
              <NumberInput
                isRequired
                color="success"
                ref={value}
                min={0}
                label="قیمت"
                errorMessage="قیمت را وارد نمایید"
                placeholder="قیمت خود را وارد نمایید"
                type="number"
                defaultValue={Number(bid)}
                endContent={
                  <Button
                    color="success"
                    size="sm"
                    onPress={() =>
                      submitBid( user_exist ? "update" : "submit", tender.id, Number(value))
                    }
                  >
                    تایید
                  </Button>
                }
                size="lg"
                variant="faded"
              />
              <Button
                onPress={() =>
                  submitBid( user_exist ? "update" : "submit", tender.id, Number(bid) * 1.2)
                }
              >
                {formatCurrency(Number(bid) * 1.2)}
              </Button>
              <Button
                onPress={() =>
                  submitBid( user_exist ? "update" : "submit", tender.id, Number(bid) * 1.5)
                }
              >
                {formatCurrency(Number(bid) * 1.5)}
              </Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  ) : (
    <ActionBid
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      submitBid={submitBid}
      tender={tender}
      value={value}
      user_exist={user_exist}
    />
 
  )}

  <Action tender_uuid={tender.uuid} comment_id={tender.uuid} is_like={tender.tender_like} like_count={tender.tender_like_count} />
</div> */
}

const ActionBid = ({
  isOpen,
  setIsOpen,
  value,
  tender,
  submitBid,
  user_exist,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  value: React.RefObject<HTMLInputElement>;
  tender: Tender;
  user_exist: any;
  submitBid: (
    action: "submit" | "update",
    tender_id: number,
    price: number
  ) => void;
}) => {
  if (user_exist) {
    return (
      <Popover
        showArrow
        offset={10}
        placement="bottom"
        onOpenChange={(open) => setIsOpen(open)}
        isOpen={isOpen}
      >
        <PopoverTrigger>
          <Button
            variant="solid"
            color="secondary"
            size="lg"
            radius="lg"
            className="bg-default-100"
          >
            {user_exist ? "بروزرسانی پیشنهاد" : "شرکت با قیمت کمتر"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto">
          {(titleProps) => (
            <div className="px-1 py-2 w-full">
              <p
                className="text-small font-bold text-foreground"
                {...titleProps}
              ></p>
              <div className="mt-2 flex flex-col gap-2 w-full">
                <NumberInput
                  color="success"
                  ref={value}
                  min={0}
                  placeholder="قیمت خود را وارد نمایید"
                  defaultValue={tender.start_bid}
                  endContent={
                    <Button
                      color="success"
                      size="sm"
                      onPress={() =>
                        submitBid(
                          user_exist ? "update" : "submit",
                          tender.id,
                          Number(value)
                        )
                      }
                    >
                      تایید
                    </Button>
                  }
                  size="lg"
                  variant="faded"
                />
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    );
  }
  return (
    <div className="flex gap-4">
      <Button
        variant="solid"
        color="secondary"
        size="sm"
        radius="lg"
        fullWidth
        className="bg-default-100"
        onPress={() => submitBid("submit", tender.id, Number(tender.start_bid))}
      >
        {"شرکت در مناقصه"}
      </Button>
      <Popover
        showArrow
        offset={10}
        placement="bottom"
        onOpenChange={(open) => setIsOpen(open)}
        isOpen={isOpen}
      >
        <PopoverTrigger>
          <Button
            fullWidth
            variant="solid"
            color="secondary"
            size="sm"
            radius="lg"
            className="bg-default-100"
            startContent={<Coins />}
          >
            شرکت با قیمت کمتر
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto">
          {(titleProps) => (
            <div className="px-1 py-2 w-full">
              <p
                className="text-small font-bold text-foreground"
                {...titleProps}
              ></p>
              <div className="mt-2 flex flex-col gap-2 w-full">
                <NumberInput
                  color="success"
                  ref={value}
                  min={0}
                  placeholder="قیمت خود را وارد نمایید"
                  defaultValue={tender.start_bid}
                  endContent={
                    <Button
                      color="success"
                      size="sm"
                      onPress={() =>
                        submitBid(
                          user_exist ? "update" : "submit",
                          tender.id,
                          Number(value)
                        )
                      }
                    >
                      تایید
                    </Button>
                  }
                  size="sm"
                  variant="faded"
                />
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

const TenderTimer = ({ time }: { time: any }) => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const endTime = new Date(time);
      const timeRemaining = endTime.getTime() - now.getTime();

      if (timeRemaining <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    };

    setTimeRemaining(calculateTimeRemaining());

    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  const hasTimeEnded =
    timeRemaining.days === 0 &&
    timeRemaining.hours === 0 &&
    timeRemaining.minutes === 0 &&
    timeRemaining.seconds === 0;

  if (hasTimeEnded) {
    return (
      <Chip variant="dot" color="danger">
        پایان یافته
      </Chip>
    );
  }

  return (
    <div
      className="flex items-center gap-1 justify-center w-auto  h-full"
      dir="ltr"
    >
      <div className="w-8 h-8 border border-dotted rounded-full flex items-center justify-center">
        {timeRemaining.days}
      </div>
      <div className="w-8 h-8 border border-dotted rounded-full flex items-center justify-center">
        {timeRemaining.hours}
      </div>
      <div className="w-8 h-8 border border-dotted rounded-full flex items-center justify-center">
        {timeRemaining.minutes}
      </div>
      <div className="w-8 h-8 border border-dotted rounded-full flex items-center justify-center text-lime-500">
        {timeRemaining.seconds}
      </div>
    </div>
  );
};
