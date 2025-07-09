// base
import React, { FC, useState } from "react";
// Components
import { MozayedeCardHeader } from "./Components/MozayedeCardHeader/MozayedeCardHeader";
import { MozayedeBanner } from "./Components/MozayedeBanner/MozayedeBanner";
import { MozayedeContent } from "./Components/MozayedeContent/MozayedeContent";
import { BidList } from "./Components/BidList/BidList";
import { MozayedeFooter } from "./Components/MozayedeFooter/MozayedeFooter";
// core
import { MozayedeFinishedBanner } from "./Components/MozayedeFinishedBanner/MozayedeFinishedBanner";
import Image from "next/image";

interface IauctionDataPropTypes {
  id: number;
  username: string;
  profile: string;
  time: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  image: string;
  title: string;
  description: string;
  bids: {
    username: string;
    amount: string;
  }[];
  likeCount: number;
  commentCount: number;
}
type IMozayedeCardProps = {
  auctionData: IauctionDataPropTypes;
};

const MozayedeCard: FC<IMozayedeCardProps> = ({ auctionData }) => {
  const [isCoursedFinish, setIsCoursedFinish] = useState(false);

  return (
    <div className="px-1">
      <div className="p-[1px] bg-gradient-to-l from-black to-[#242424] rounded-2xl">
        <div className="w-full flex items-center sm:bg-[#0F0F0F] bg-[#1C1C1CB2] sm:border-none border border-[#ffffff63] sm:rounded-2xl rounded-[20px]">
          <div className="w-[351px] h-[288px] p-2">
            <Image
              src="/images/general/LabelSample3.png"
              alt=""
              width={343}
              height={280}
              className="w-full h-full rounded-2xl"
            />
          </div>
          <div className="flex-1">
            <MozayedeCardHeader
              username={auctionData.username}
              profile={auctionData.profile}
              time={auctionData.time}
            />

            <MozayedeBanner image={auctionData.image} />
            <div className="px-3 pt-[11px] pb-[15px]">
              <MozayedeContent
                id={auctionData.id}
                title={auctionData.title}
                description={auctionData.description}
                bids={auctionData.bids}
                isCoursedFinish={isCoursedFinish}
              />
              <div className="sm:hidden">
                {isCoursedFinish ? (
                  <MozayedeFinishedBanner />
                ) : (
                  <BidList bids={auctionData.bids} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <MozayedeFooter
        likeCount={auctionData.likeCount}
        commentCount={auctionData.commentCount}
      />
    </div>
  );
};

export { MozayedeCard };
