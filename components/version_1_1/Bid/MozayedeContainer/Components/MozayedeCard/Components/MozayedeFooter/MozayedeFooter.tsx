// base
import { FC } from "react";
// core
import Image from "next/image";

interface IMozayedeFooterProps {
  likeCount: number;
  commentCount: number;
  isSaved?: boolean;
}

const MozayedeFooter: FC<IMozayedeFooterProps> = ({
  likeCount,
  commentCount,
}) => {
  const icons = [
    { icon: "LikeSvg.svg", count: likeCount },
    { icon: "CommentSvg.svg", count: commentCount },
    { icon: "SaveSvg.svg" },
  ];

  return (
    <div className="w-[186px] lg:w-[147px] h-[40px] lg:h-[28px] mt-3 lg:mt-2 lg:mb-2.5 mr-0.5 px-4 flex justify-between items-center lg:border lg:border-[#1F1F1F] rounded-[20px] bg-[#242424B2] lg:bg-[#0F0F0F] text-[15px] lg:text-[10px] text-[#E6E6E6]">
      {icons.map((item, idx) => (
        <div
          key={idx}
          className={`flex items-center gap-1.5 lg:gap-1 ${
            item.count ? "" : "w-[22px] h-5"
          }`}
        >
          <div className="w-[22px] lg:w-[11px] h-5 lg:h-2">
            <Image
              src={`/images/svg/${item.icon}`}
              alt=""
              width={20}
              height={20}
            />
          </div>
          <span className="mt-1">{item.count && item.count}</span>
        </div>
      ))}
    </div>
  );
};

export { MozayedeFooter };
