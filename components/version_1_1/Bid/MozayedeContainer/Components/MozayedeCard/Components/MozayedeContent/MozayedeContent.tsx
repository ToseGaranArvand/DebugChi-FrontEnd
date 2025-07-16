// base
import { FC, useEffect } from "react";
// components
// core
import Link from "next/link";
import { MozayedeFinishedBanner } from "../MozayedeFinishedBanner/MozayedeFinishedBanner";
import { BidList } from "../BidList/BidList";
import { Bid, Tender } from "@/components/types/tender.type";
import { useBidFilter } from "@/context/BidFilterContext";
import { CustomPopover } from "@/components/version_1_1/ui/popover";
import { BidContent } from "./BidContent/BidContent";
import { Button } from "@heroui/react";

interface IMozayedeContentProps {
  isCoursedFinish: boolean;
  bids: Bid[];
  tender: Tender;
}

const MozayedeContent: FC<IMozayedeContentProps> = ({
  isCoursedFinish,
  bids,
  tender,
}) => {
  const { setSidePanelContent } = useBidFilter();

  return (
    <>
      <div className="h-full mb-[15px]">
        <h1 className="lg:mt-3 text-xl lg:text-[28px] lg:font-bold">
          {tender.title}
        </h1>
        <p className="min-h-[54px] text-xs leading-[18px] lg:mt-5 mt-2">
          {tender.description}
        </p>
        <div className="lg:flex lg:gap-3">
          <div className="lg:w-[202px] mt-[25px] lg:mt-4 flex lg:flex-col gap-5 lg:gap-2">
            <CustomPopover
              PopoverContentClassName="bg-[url('/images/common/Rectangle.png')] bg-transparent bg-cover w-[410px] h-[271px]"
              placement="bottom-end"
              content={<BidContent bids={bids} start_bid={tender.start_bid} />}
            >
              <Button className="lg:w-full flex-1 h-[49px] lg:h-[34px] !bg-[#3344D9] lg:!bg-[#0075FF] rounded-2xl text-base sm:text-xl lg:text-base">
                شرکت در مزایده
              </Button>
            </CustomPopover>
            <Button
              className="w-[107px] lg:w-full h-[49px] lg:h-[34px] !bg-[#252328] rounded-2xl text-center text-sm"
              onPress={() => setSidePanelContent({ id: tender.id })}
            >
              بررسی سرفصل
            </Button>
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
    </>
  );
};

export { MozayedeContent };
