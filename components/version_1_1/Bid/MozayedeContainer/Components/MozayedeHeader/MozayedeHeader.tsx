// base
import React, { FC, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/version_1_1/ui/button";
import { handleOpenModal } from "@/hooks/handleOpenModal";
import { CustomModal } from "@/components/version_1_1/ui/Modal";
import { SearchInput } from "@/components/version_1_1/ui/SearchInput";
import { RangeFilter } from "@/components/version_1_1/ui/RangeFilter";
import { CustomCollapse } from "@/components/version_1_1/ui/CustomCollapse";
// core

const MozayedeHeader: FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTop, setModalTop] = useState<number>(0);
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };
  return (
    <>
      <div className="pr-4 pl-8 flex justify-between items-center">
        <div className="flex items-center gap-5">
          <Button
            className="!p-0 !bg-transparent"
            ref={buttonRef}
            onPress={() =>
              handleOpenModal({
                buttonRef,
                setModalTop,
                setIsModalOpen,
              })
            }
          >
            <Image
              src="/images/svg/FilterSvg.svg"
              alt=""
              width={20}
              height={20}
            />
          </Button>
          <Button
            onPress={() => handleNavigate("/notification")}
            className="!p-0 !bg-transparent"
          >
            <Image
              src="/images/svg/BellSvg.svg"
              alt=""
              width={20}
              height={20}
            />
          </Button>
          <Button
            onPress={() => handleNavigate("/activeClasses")}
            className="!p-0 !bg-transparent"
          >
            <Image src="/images/svg/BagSvg.svg" alt="" width={20} height={20} />
          </Button>
          <Image src="/images/svg/hourSvg.svg" alt="" width={20} height={20} />
        </div>
        <div className="flex items-center gap-5">
          <Button
            onPress={() => handleNavigate("/addNewMozayede")}
            className="!p-0 !bg-transparent"
          >
            <Image src="/images/svg/AddSvg.svg" alt="" width={20} height={20} />
          </Button>
          <Button
            onPress={() => handleNavigate("/")}
            className="px-0 !bg-transparent border-none"
          >
            <Image
              src="/images/svg/BackSvg.svg"
              alt=""
              width={20}
              height={20}
            />
          </Button>
        </div>
      </div>
      <div
        style={{
          background:
            "linear-gradient(to right, #ffffff0a 0%, #ffffff30 50%, #ffffff0a 100%)",
        }}
        className="h-[1px] mt-[22px] mb-[18px]"
      ></div>
      <FilterModal
        isModalOpen={isModalOpen}
        modalTop={modalTop}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export { MozayedeHeader };

const dataItems = [
  { key: "all", label: "همه" },
  { key: "tender", label: "مناقصه" },
  { key: "auction", label: "مزایده" },
  { key: "advertisement", label: "آگهی" },
  { key: "saved", label: "سیو شده‌ها" },
];

interface IFilterModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalTop: number;
}

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
      isOpen={isModalOpen}
      hideCloseButton={true}
      style={{ top: `${modalTop}px` }}
      bodyClassName="absolute left-[10px]"
      onOpen={() => setIsModalOpen(!isModalOpen)}
      onOpenChange={setIsModalOpen}
      modalFooter={<></>}
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
