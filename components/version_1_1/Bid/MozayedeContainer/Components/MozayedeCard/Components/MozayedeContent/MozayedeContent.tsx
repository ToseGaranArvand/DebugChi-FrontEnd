// base
import { FC, useRef, useState } from "react";
// components
import { BidModal } from "./BidModal/BidModal";
// core
import Link from "next/link";
import Button from "@/components/version_1_1/ui/button";
import { handleOpenModal } from "@/hooks/handleOpenModal";
import { MozayedeFinishedBanner } from "../MozayedeFinishedBanner/MozayedeFinishedBanner";
import { BidList } from "../BidList/BidList";

interface IMozayedeContentProps {
  title: string;
  description: string;
  id: number;
  isCoursedFinish: boolean;
  bids: {
    username: string;
    amount: string;
  }[];
}

const MozayedeContent: FC<IMozayedeContentProps> = ({
  title,
  description,
  id,
  isCoursedFinish,
  bids,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAbove, setIsModalAbove] = useState(false);
  const [modalTop, setModalTop] = useState<number>(0);
  const [inputVal, setInputVal] = useState<number>(450000);

  return (
    <>
      <div className="h-full mb-[15px]">
        <h1 className="sm:mt-3 text-xl sm:text-[28px] sm:font-bold">{title}</h1>
        <p className="text-xs leading-[18px] sm:mt-5 mt-2">{description}</p>
        <div className="sm:flex">
          <div className="sm:w-[202px] mt-[25px] sm:mt-4 flex sm:flex-col gap-5 sm:gap-2">
            <Button
              ref={buttonRef}
              onPress={() =>
                handleOpenModal({
                  buttonRef,
                  setIsModalAbove,
                  setModalTop,
                  setIsModalOpen,
                })
              }
              className="w-full sm:w-full h-[49px] sm:h-[34px] !bg-[#3344D9] sm:!bg-[#0075FF] rounded-2xl text-xl sm:text-base"
            >
              شرکت در مزایده
            </Button>
            <Link href={`/course/${id}`}>
              <Button className="w-[107px] sm:w-full h-[49px] sm:h-[34px] !bg-[#252328] rounded-2xl text-center text-sm">
                برسی سر فصل
              </Button>
            </Link>
          </div>
          <div className="sm:block hidden">
            {isCoursedFinish ? (
              <MozayedeFinishedBanner />
            ) : (
              <BidList bids={bids} />
            )}
          </div>
        </div>
      </div>
      <BidModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isModalAbove={isModalAbove}
        modalTop={modalTop}
        inputVal={inputVal}
        setInputVal={setInputVal}
      />
    </>
  );
};

export { MozayedeContent };
