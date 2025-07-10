// base
import { FC, useEffect, useRef, useState } from "react";
// components
import { BidModal } from "./BidModal/BidModal";
// core
import Link from "next/link";
import Button from "@/components/version_1_1/ui/button";
import { handleOpenModal } from "@/hooks/handleOpenModal";
import { MozayedeFinishedBanner } from "../MozayedeFinishedBanner/MozayedeFinishedBanner";
import { BidList } from "../BidList/BidList";
import Cookies from "js-cookie";
import EventCard from "@/components/version_1_1/Bid/EventCard";
import { Tender } from "@/components/types/tender.type";
import { perform_post } from "@/lib/api";
interface IMozayedeContentProps {
  title: string;
  description: string;
  id: number;
  isCoursedFinish: boolean;
  bids: {
    username: string;
    amount: string;
  }[];
  tender: Tender;
}

const MozayedeContent: FC<IMozayedeContentProps> = ({
  title,
  description,
  id,
  isCoursedFinish,
  bids,
  tender,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAbove, setIsModalAbove] = useState(false);
  const [modalTop, setModalTop] = useState<number>(0);
  const [inputVal, setInputVal] = useState<number>(450000);
  const token = Cookies.get("token");
  const [userData, setUserData] = useState<any>(null);
  const value = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const data = localStorage.getItem("user_data");
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  const submitBid = async () => {
    const bidPrice = inputVal;
    if (!token) {
      // هدایت به صفحه ورود یا نشان دادن مودال ورود
      alert("لطفاً ابتدا وارد شوید.");
      return;
    }
    if (!bidPrice) {
      alert("مقدار قیمت را وارد کنید.");
      return;
    }

    const response = await perform_post(
      "api/v1/submit_bid/",
      {
        tender: tender.id,
        amount: bidPrice.toString(),
      },
      token
    );

    if (response.success) {
      alert("پیشنهاد با موفقیت ثبت شد.");
    } else {
      alert(response?.data?.message || "خطا در ثبت پیشنهاد");
    }
  };

  return (
    <>
      <div className="h-full mb-[15px]">
        <h1 className="lg:mt-3 text-xl lg:text-[28px] lg:font-bold">{title}</h1>
        <p className="min-h-[54px] text-xs leading-[18px] lg:mt-5 mt-2">
          {description}
        </p>
        <div className="lg:flex lg:gap-3">
          <div className="lg:w-[202px] mt-[25px] lg:mt-4 flex lg:flex-col gap-5 lg:gap-2">
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
              className="w-full lg:w-full h-[49px] lg:h-[34px] !bg-[#3344D9] lg:!bg-[#0075FF] rounded-2xl text-xl lg:text-base"
            >
              شرکت در مزایده
            </Button>
            <EventCard data={tender.project} />
          </div>
          <div className="lg:block hidden w-full">
            {isCoursedFinish ? (
              <MozayedeFinishedBanner />
            ) : (
              <BidList bids={bids} />
            )}
          </div>
        </div>
      </div>
      <BidModal
        submitBid={submitBid}
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
