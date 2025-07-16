// base
import React, { useState } from "react";
// components
import { TimeCounter } from "./TimeCounter/TimeCounter";
// core
import Image from "next/image";
import Button from "@/components/version_1_1/ui/button";
import { CustomModal } from "@/components/version_1_1/ui/Modal";

interface IDatePickerModalPropsTypes {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const DatePickerModal: React.FC<IDatePickerModalPropsTypes> = ({
  value,
  onChange,
  placeholder,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalStyles = {
    mask: {
      backdropFilter: "blur(10px)",
      backgroundColor: "#0A0B0F80",
    },
  };

  return (
    <>
      <CustomModal
        btnClassName="h-full pr-4 justify-start !bg-transparent rounded-[20px] border border-[#6E6E6E36] text-sm w-full"
        modalHeaderClassname="!pb-0"
        isOpen={isModalOpen}
        onOpenChange={() => setIsModalOpen(false)}
        onOpen={() => setIsModalOpen(true)}
        btnText={value || placeholder}
        modalHeader={
          <Button
            className="!bg-transparent"
            isIconOnly
            onPress={() => setIsModalOpen(false)}
            startContent={
              <Image
                src="/images/svg/BackSvg.svg"
                alt=""
                width={20}
                height={20}
              />
            }
          ></Button>
        }
      >
        <div className="relative w-full h-[280px] py-[10px] pb-[22px] rounded-[21px] flex flex-col gap-[26px] items-center">
          <Image
            src="/images/common/NoArrowRectangle.png"
            alt=""
            className="absolute -z-10 inset-0 w-full h-full transition-transform duration-300"
            width={420}
            height={280}
          />
          <TimeCounter />
          <Button
            onPress={() => setIsModalOpen(false)}
            className="w-[326px] h-[45px] pt-1 mx-auto !bg-[#1B1B1B] border border-[#BABABA38] rounded-[15px] text-xl font-iranRegular"
          >
            تایید
          </Button>
        </div>
      </CustomModal>
    </>
  );
};

export { DatePickerModal };
