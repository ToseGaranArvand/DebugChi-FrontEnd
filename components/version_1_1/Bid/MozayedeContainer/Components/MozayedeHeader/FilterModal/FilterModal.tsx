// base
import React, { FC, useState } from "react";
// components

// core
import Image from "next/image";
import { CustomModal } from "@/components/version_1_1/ui/Modal";
import { SearchInput } from "@/components/version_1_1/ui/SearchInput";
import { RangeFilter } from "@/components/version_1_1/ui/RangeFilter";
import { CustomCollapse } from "@/components/version_1_1/ui/CustomCollapse";

interface IFilterModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalTop: number;
}

const dataItems = [
  { key: "all", label: "همه" },
  { key: "tender", label: "مناقصه" },
  { key: "auction", label: "مزایده" },
  { key: "advertisement", label: "آگهی" },
  { key: "saved", label: "سیو شده‌ها" },
];

const FilterModal: FC<IFilterModalProps> = ({
  isModalOpen,
  modalTop,
  setIsModalOpen,
}) => {
  const [priceRange, setPriceRange] = useState([0, 3000000]);

  const formatPrice = (price: number) => {
    return price.toLocaleString("fa-IR") + " تومان";
  };
  return (
    <CustomModal
      open={isModalOpen}
      closable={false}
      style={{ top: `${modalTop}px` }}
      className="absolute left-[10px]"
      onCancel={() => setIsModalOpen(false)}
      onOk={() => {
        console.log("تأیید شد");
        setIsModalOpen(false);
      }}
      footer={<></>}
    >
      <div className="relative w-full !h-[289px] px-[10px] py-[27px]">
        <Image
          src="/images/common/GradientRectangle.png"
          alt=""
          className={`absolute -z-10 inset-0 w-full h-full transition-transform duration-300 `}
          width={440}
          height={289}
        />

        <div
          className="w-full max-w-md mx-auto text-white py-[13px] rounded-lg"
          dir="rtl"
        >
          {/* Search Section */}
          <SearchInput
            placeholder="جستجو ..."
            className="w-full h-[43px] pl-5 flex-row-reverse !bg-[#1C1C1CB2] rounded-[20px] border !border-[#252525] text-[#BBBBBB] placeholder:text-[#BBBBBB] text-[15px]"
            onChange={(e) => console.log("جستجو:", e.target.value)}
          />

          {/* Price Filter Section */}
          <div className="mt-2 pt-1 pb-[5px] px-2 bg-[#151515] rounded-2xl">
            <h3 className="mb-[8px] mr-2 text-white font-medium text-sm">
              فیلتر قیمت
            </h3>

            <div>
              {/* Price Range Display */}
              <div className="flex justify-between items-center text-xs text-gray-300">
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
      </div>
    </CustomModal>
  );
};

export { FilterModal };
