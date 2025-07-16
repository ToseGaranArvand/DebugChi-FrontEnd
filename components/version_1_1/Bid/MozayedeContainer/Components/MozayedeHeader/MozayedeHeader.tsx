// base
import React, { FC, useRef, useState } from "react";
import { FilterModal } from "../../../../ui/popover";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/version_1_1/ui/button";
import { handleOpenModal } from "@/hooks/handleOpenModal";
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
