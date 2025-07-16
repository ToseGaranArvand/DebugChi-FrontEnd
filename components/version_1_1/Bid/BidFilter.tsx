"use client";
import React, { useEffect, useState } from "react";
import { Input, Badge, Button } from "@heroui/react";
import { useBidFilter } from "@/context/BidFilterContext";
import {
  Backpack,
  Bell,
  History,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import Cookies from "js-cookie";
import { perform_get } from "@/lib/api";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { CustomPopover } from "../ui/popover";
import { RangeFilter } from "../ui/RangeFilter";
import { CustomCollapse } from "../ui/CustomCollapse";
import { SearchInput } from "../ui/SearchInput";
type Props = {};

const BidFilter = (props: Props) => {
  const { filter, setFilter, priceValue, setValue } = useBidFilter();

  return (
    <div
      className="w-full px-2 sm:px-4 flex sm:gap-4 gap-2 items-center justify-center"
      dir="rtl"
    >
      <RightSide />
      <Input
        type="text"
        className="w-[512px] sm:!text-base !text-xs"
        classNames={{
          inputWrapper: "bg-input border border-default-100",
        }}
        placeholder="جستجو..."
        isClearable
        startContent={<Search className="fill-none" />}
        onValueChange={(value) => {
          setFilter({
            ...filter,
            search_text: value,
          });
        }}
      />
      <LeftSide />
    </div>
  );
};

export default BidFilter;

const FilterContent = () => {
  const dataItems = [
    { key: "all", label: "همه" },
    { key: "tender", label: "مناقصه" },
    { key: "auction", label: "مزایده" },
    { key: "advertisement", label: "آگهی" },
    { key: "saved", label: "سیو شده‌ها" },
  ];

  const [priceRange, setPriceRange] = useState([0, 3000000]);
  const formatPrice = (price: number) => {
    return price.toLocaleString("fa-IR") + " تومان";
  };
  return (
    <div
      className="w-full max-w-md mx-auto text-white py-[13px] pt-[26px] px-4 rounded-lg"
      dir="rtl"
    >
      {/* Search Section */}
      <SearchInput
        placeholder="جستجو ..."
        className="w-full h-[43px] pl-5 flex-row-reverse !bg-[#1C1C1CB2] rounded-[20px] border !border-[#252525] text-[#BBBBBB] placeholder:text-[#BBBBBB] text-[15px]"
        onChange={(e) => console.log("جستجو:", e.target.value)}
      />

      {/* Price Filter Section */}
      <div className="mt-2 pt-1 pb-[10px] px-2 bg-[#151515] rounded-2xl">
        <h3 className="mb-[8px] mr-2 text-white font-medium text-sm">
          فیلتر قیمت
        </h3>

        <div>
          {/* Price Range Display */}
          <div className="flex justify-between items-center pb-2 text-xs text-gray-300">
            <span>{formatPrice(priceRange[1])}</span>
            <span>{formatPrice(priceRange[0])}</span>
          </div>

          {/* Price Range Slider */}
          <div className="px-3">
            <RangeFilter
              className="!mt-2"
              min={0}
              max={3000000}
              step={50000}
              range={priceRange}
              setRange={setPriceRange}
            />
          </div>
        </div>
      </div>

      {/* Project Type Dropdown */}
      <div className="h-[92px] mt-[4px] pt-[3px] px-[14px] flex flex-col items-center gap-[13px] bg-[#151515] rounded-2xl">
        <h3 className="w-full text-white font-medium text-sm">
          نوع پروژه مزایده ای
        </h3>
        <CustomCollapse
          dataItems={dataItems}
          defaultValue={dataItems[0].label}
          textColor="#BBBBBB"
          containerClassName="!w-[93%] max-w-[364px] rounded-xl bg-[#222222] border-[#252525]"
          className="w-full h-[35px] text-xs"
        ></CustomCollapse>
      </div>
    </div>
  );
};
const AddCourseContent = () => {
  return (
    <div className="p-[1px] w-[278px] h-[28px] rounded-[20px] bg-gradient-to-r from-[#6E6E6E] to-[#0F0F0F]">
      <div className="flex bg-[#0F0F0F] w-full h-full rounded-[20px] overflow-hidden">
        <Button
          as={Link}
          href="/bid/addCourse"
          className="!min-h-[27px] h-full w-1/2 bg-transparent"
        >
          مزایده جدید
        </Button>
        <Button
          as={Link}
          href="/bid/addCourse"
          className="!min-h-[27px] h-full w-1/2 border-l border-[#6E6E6E] bg-[#252328]"
        >
          آگهی جدید
        </Button>
      </div>
    </div>
  );
};
const RightSide = () => {
  const pathname = usePathname();
  const { setSidePanelContent } = useBidFilter();

  return (
    <>
      {pathname !== "/bid/addCourse" && (
        <CustomPopover placement="right" content={<AddCourseContent />}>
          <Button
            className="sm:!w-10 sm:min-w-10 min-w-6 w-6 sm:h-10 h-6"
            variant="light"
            isIconOnly
            startContent={
              <Image
                className="sm:w-5 w-4 sm:h-5 h-4"
                alt=""
                src="/images/svg/AddSvg.svg"
                width={20}
                height={20}
              />
            }
          ></Button>
        </CustomPopover>
      )}
      <Button
        className="sm:!w-10 sm:min-w-10 min-w-6 w-6 sm:h-10 h-6"
        onPress={() => setSidePanelContent("notification")}
        variant="light"
        isIconOnly
        startContent={<Bell className="sm:w-6 w-4 sm:h-6 h-4" />}
      ></Button>

      <CustomPopover
        PopoverContentClassName="bg-[url('/images/common/GradientRectangle.png')] bg-transparent bg-cover w-[410px] h-[271px]"
        placement="bottom-end"
        content={<FilterContent />}
      >
        <Button
          className="sm:!w-10 sm:min-w-10 min-w-6 w-6 sm:h-10 h-6 !bg-transparent !border-none"
          variant="light"
          isIconOnly
          startContent={
            <SlidersHorizontal className="sm:w-6 w-4 sm:h-6 h-4 !text-white" />
          }
        ></Button>
      </CustomPopover>
    </>
  );
};
const LeftSide = () => {
  const [number, setNumber] = useState(0);
  const pathname = usePathname();

  const getAllClassData = async () => {
    const response = await perform_get("api/v1/my-classes/");

    setNumber(response.length || 0);
  };
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      getAllClassData();
    }
  }, []);

  const { show, setShow } = useBidFilter();

  return (
    <div className="flex sm:gap-4 gap-2">
      {pathname === "/bid" ? (
        <Badge content={number} placement="bottom-left" color="danger">
          <Button
            className="sm:!w-10 sm:min-w-10 min-w-6 w-6 sm:h-10 h-6"
            as={Link}
            href="/bid/activeClasses"
            variant="light"
            isIconOnly
            startContent={<Backpack className="sm:w-6 w-4 sm:h-6 h-4" />}
          ></Button>
        </Badge>
      ) : (
        <Button
          className="sm:!w-10 sm:min-w-10 min-w-6 w-6 sm:h-10 h-6"
          as={Link}
          href="/bid"
          variant="light"
          isIconOnly
          startContent={
            <Image
              className="sm:w-5 w-4 sm:h-5 h-4"
              src="/images/svg/BackSvg.svg"
              alt=""
              width={20}
              height={20}
            />
          }
        ></Button>
      )}
      <Button
        className="sm:!w-10 sm:min-w-10 min-w-6 w-6 sm:h-10 h-6"
        as={Link}
        variant="light"
        isIconOnly
        startContent={<History className="sm:w-6 w-4 sm:h-6 h-4" />}
        href="/user-services"
      ></Button>
    </div>
  );
};
