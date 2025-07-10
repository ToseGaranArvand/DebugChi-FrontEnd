// base
import React from "react";
// components
import { SuggestedAmounts } from "./SuggestedAmounts/SuggestedAmounts";
// core
import Image from "next/image";
import Button from "@/components/version_1_1/ui/button";
import { Input } from "@/components/ui/input";
import { CustomModal } from "@/components/version_1_1/ui/Modal";

interface BidModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalAbove: boolean;
  modalTop: number;
  inputVal: number;
  setInputVal: React.Dispatch<React.SetStateAction<number>>;
  submitBid: () => void;
}

const suggestedAmounts = [450000, 450000];

const BidModal: React.FC<BidModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  isModalAbove,
  modalTop,
  inputVal,
  setInputVal,
  submitBid,
}) => {
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
      <div
        className={`relative w-full h-[271px] px-[10px] ${
          isModalAbove ? "py-4" : "py-[27px]"
        }`}
      >
        <Image
          src="/images/common/Rectangle.png"
          alt=""
          className={`absolute -z-10 inset-0 w-full h-full transition-transform duration-300 [transform-style:preserve-3d] ${
            isModalAbove ? "[transform:rotateX(180deg)]" : ""
          }`}
          width={430}
          height={280}
        />
        <div className="h-[92px] px-4 py-1 bg-[#151515] border border-[#6E6E6E1F] rounded-2xl text-white">
          <h1 className="text-right text-sm">قیمت</h1>
          <div className="w-full h-[35px] mt-2.5 flex gap-1.5">
            <Button
              onPress={() => submitBid()}
              className="w-[95px] h-full !bg-[#4A9909] rounded-xl"
            >
              تایید
            </Button>
            <Input
              onChange={(e) => setInputVal(Number(e.target.value))}
              value={inputVal}
              className="h-full !bg-[#222222] border-none rounded-xl text-center text-sm text-[#fff70089]"
            />
          </div>
        </div>
        <SuggestedAmounts amounts={suggestedAmounts} />
      </div>
    </CustomModal>
  );
};

export { BidModal };
