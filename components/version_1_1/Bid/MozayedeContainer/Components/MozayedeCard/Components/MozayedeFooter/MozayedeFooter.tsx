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
    <div className="w-[186px] sm:w-[147px] h-[40px] sm:h-[28px] mt-3 sm:mt-2 sm:mb-2.5 mr-0.5 px-4 flex justify-between items-center sm:border sm:border-[#1F1F1F] rounded-[20px] bg-[#242424B2] sm:bg-[#0F0F0F] text-[15px] sm:text-[10px] text-[#E6E6E6]">
      {icons.map((item, idx) => (
        <div
          key={idx}
          className={`flex items-center gap-1.5 sm:gap-1 ${
            item.count ? "" : "w-[22px] h-5"
          }`}
        >
          <div className="w-[22px] sm:w-[11px] h-5 sm:h-2">
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
