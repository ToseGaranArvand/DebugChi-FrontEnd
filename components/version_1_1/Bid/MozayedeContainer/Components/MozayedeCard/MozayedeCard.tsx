// base
import React, {
  FC,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
// Components
import { MozayedeCardHeader } from "./Components/MozayedeCardHeader/MozayedeCardHeader";
import { MozayedeBanner } from "./Components/MozayedeBanner/MozayedeBanner";
import { MozayedeContent } from "./Components/MozayedeContent/MozayedeContent";
import { BidList } from "./Components/BidList/BidList";
import { MozayedeFooter } from "./Components/MozayedeFooter/MozayedeFooter";
// core
import { MozayedeFinishedBanner } from "./Components/MozayedeFinishedBanner/MozayedeFinishedBanner";
import Image from "next/image";
import type { Bid, Tender } from "@/components/types/tender.type";
import { comment_socket } from "@/config/socket-config";

type IMozayedeCardProps = {
  tender: Tender;
  bids: Bid[];
};

const useCommentCount = (comment_id: string) => {
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    // درخواست گرفتن کامنت‌ها از سوکت
    comment_socket.emit("get_comments", `${comment_id}`);

    // پاسخ به رویداد سوکت
    comment_socket.on(`${comment_id}`, (data) => {
      if (data?.comments) {
        setCommentCount(data.comments.length);
      }
    });

    // پاک‌سازی هنگام unmount
    return () => {
      comment_socket.off(`${comment_id}`);
    };
  }, [comment_id]);

  return commentCount;
};

const MozayedeCard: FC<IMozayedeCardProps> = ({ tender, bids }) => {
  const [isCoursedFinish, setIsCoursedFinish] = useState(false);
  const commentCount = useCommentCount(tender.uuid);
  

  return (
    <div className="w-full px-1 flex flex-col lg:items-end">
      <div className="w-full p-[1px] bg-gradient-to-l from-black to-[#242424] rounded-2xl">
        <div className="w-full flex items-center lg:bg-[#0F0F0F] bg-[#1C1C1CB2] lg:border-none border border-[#ffffff63] lg:rounded-2xl rounded-[20px]">
          <div className="lg:block hidden w-[343px] h-[280px] mr-2">
            <Image
              // بعدا اصلی رو بزار
              src={"/images/general/LabelSample3.png"}
              alt=""
              width={343}
              height={280}
              className="w-full h-full rounded-2xl"
            />
          </div>
          <div className="lg:w-[calc(100%-343px)] flex-1">
            <MozayedeCardHeader
              username={tender.created_by.username}
              profile={tender.created_by.image_profile}
              targetDate={tender.end_time}
            />

            <MozayedeBanner image={tender.image} />
            <div className="px-3 pt-[11px] lg:pb-[1px] pb-[15px]">
              <MozayedeContent
                bids={bids}
                isCoursedFinish={isCoursedFinish}
                tender={tender}
              />
              <div className="lg:hidden">
                {isCoursedFinish ? (
                  <MozayedeFinishedBanner />
                ) : (
                  <BidList bids={bids} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <MozayedeFooter
        likeCount={tender.tender_like_count}
        commentCount={commentCount}
      />
    </div>
  );
};

export { MozayedeCard };
