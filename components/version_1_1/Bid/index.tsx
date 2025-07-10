"use client";

import { useBidFilter } from "@/context/BidFilterContext";
import Card from "./Card";
import type { Main } from "@/components/types/tender.type";
import type { Main as ClassDetails } from "@/components/types/classDetails";
import { formatTimeAgo } from "@/utils/tools";
import Image from "next/image";
import {
  addToast,
  Button,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  User,
} from "@heroui/react";
import CardGradient from "../ui/CardGradient";
import { useEffect, useState } from "react";
import { MessageCircle, Mic, PhoneCall, Video } from "lucide-react";
import { perform_get } from "@/lib/api";
import { MozayedeContainer } from "./MozayedeContainer/MozayedeContainer";

type Props = {
  data: Main;
};

const Bid = ({ data }: Props) => {
  const { filter, priceValue, show } = useBidFilter();

  const filterType =
    filter.type === "all" ? ["tender", "auction"] : [filter.type];
  const [minPrice, maxPrice] = priceValue.toString().split(",").map(Number);

  const filteredResults = data.results
    ?.filter((item) => item.tender)
    .filter((item) =>
      filterType.includes(item.tender.mode as "tender" | "auction")
    )
    .filter(
      (item) =>
        item.tender.start_bid >= minPrice && item.tender.start_bid <= maxPrice
    )
    .filter((item) => {
      if (!filter.search_text?.trim()) return true; // اگر متن خالیه، فیلتر نکن
      const text = filter.search_text.toLowerCase();
      return (
        item.tender.title.toLowerCase().includes(text) ||
        item.tender.description.toLowerCase().includes(text)
      );
    });

  return (
    <div
      className={`w-full flex-1 ${
        show === false && "overflow-y-auto"
      } scrollbar-hide relative`}
    >
      <div className="w-full h-full flex flex-col gap-4 mt-24 relative ">
        {show && <AllActivitiesCLass />}
        {filteredResults && filteredResults.length > 0 ? (
          filteredResults.map((result, index) => (
            // <Card key={index} tender={result.tender} bids={result.bids} />
            <MozayedeContainer  tender={result.tender}/>
          ))
        ) : (
          <div className="flex items-center justify-center w-full h-full text-center text-gray-500">
            مزایده‌ای پیدا نشد
          </div>
        )}
      </div>
    </div>
  );
};

export default Bid;

const AllActivitiesCLass = () => {
  const [data, setData] = useState<ClassDetails[]>([]);
  const getData = async () => {
    const response = await perform_get("api/v1/my-classes/");
    if (response.message === false) {
      setData(response.data);
    } else {
      setData(response);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const sendRequest = (mode: string, title: string) => {
    addToast({
      title: title,
      description: `درخواست شما برای ارتباط ${mode} ارسال شد`,
      variant: "flat",
      color: "default",
      timeout: 5000,
      shouldShowTimeoutProgess: true,
    });
  };

  return (
    <>
      {data.length === 0 || !Array.isArray(data) ? (
        <div
          className="w-full  backdrop-blur-xl box-border h-full bg-bg_card/30 absolute z-30 rounded-2xl p-10"
          dir="rtl"
        >
          <div className="w-full h-96 flex items-center justify-center bg-default-50 rounded-md">
            کلاسی برای برگزاری وجود ندارد
          </div>
        </div>
      ) : (
        data.map((item) => {
          return (
            <div
              key={item.id}
              className="w-full backdrop-blur-xl box-border h-full bg-bg_card/30 absolute z-30 rounded-2xl"
              dir="rtl"
            >
              <div className="w-full rounded-xl space-y-4 flex flex-col items-center gap-2 my-2 ">
                <div className="w-full bg-default-100 h-auto pb-4 border border-default-200 rounded-2xl space-y-4">
                  <div className="flex-1 h-16 flex gap-2 items-center bg-default-50 rounded-2xl border border-default-200 relative justify-between">
                    <CardGradient />

                    <div
                      className="flex items-center gap-2 box-border px-4"
                      dir="rtl"
                    >
                      <h2 className="text-lime-500 z-50 text-2xl">
                        {item.class_title}
                      </h2>
                    </div>
                  </div>
                  <div className="w-full py-4 ">
                    <div className="w-full flex justify-between box-border px-4">
                      <Popover placement="right">
                        <PopoverTrigger>
                          <Button variant="light">
                            <User
                              name={
                                item.created_by.first_name +
                                " " +
                                item.created_by.last_name
                              }
                              avatarProps={{
                                src: item.created_by.image_profile,
                                alt: item.created_by.username,
                              }}
                              description={item.created_by.username}
                            />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className="px-1 py-2">
                            <div className="text-small font-bold">
                              Popover Content
                            </div>
                            <div className="text-tiny">
                              This is the popover content
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="w-full flex-1 flex flex-col gap-2 items-center relative justify-between box-border px-4">
                    <div></div>

                    <div className="flex justify-between flex-row-reverse items-center box-border px-10 w-full">
                      <div className="flex gap-4">
                        <Button
                          variant="flat"
                          isIconOnly
                          size="lg"
                          radius="full"
                          startContent={<PhoneCall />}
                          onPress={() => sendRequest("phone", "تماس تلفنی")}
                        ></Button>
                        <Button
                          variant="flat"
                          isIconOnly
                          size="lg"
                          radius="full"
                          startContent={<Video />}
                          onPress={() => sendRequest("video", "تماس ویدیویی")}
                        ></Button>
                        <Button
                          variant="flat"
                          isIconOnly
                          size="lg"
                          radius="full"
                          startContent={<MessageCircle />}
                          onPress={() => sendRequest("chat", "پیام متنی")}
                        ></Button>
                      </div>
                      <div className="w-1/4">
                        <Button
                          as={Link}
                          href={item.url || "https://meet.google.com"}
                          fullWidth
                          size="lg"
                          className=" bg-gradient-to-r  from-black to-btn_primary h-14 flex justify-between box-border px-4"
                        >
                          <span>پیوست به کلاس</span>
                          <Image
                            className="bg-white rounded-md"
                            src={"/images/google/meet.png"}
                            alt="google-meet"
                            width={56}
                            height={56}
                          />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};
