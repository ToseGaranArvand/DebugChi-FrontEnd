// base
import { FC } from "react";
// core
import { IMozayedeFooterProps } from "@/src/core/types/props/IMozayedeFooterProps";
import Image from "next/image";

const MozayedeFooter: FC<IMozayedeFooterProps> = ({
  likeCount,
  commentCount,
}) => {
  const icons = [
    { icon: "LikeSvg.svg", count: likeCount },
    { icon: "CommentSvg.svg", count: commentCount },
    { icon: "SaveSvg.svg" }, // ذخیره، بدون شمارنده
  ];

  return (
    <div className="w-[186px] h-[40px] mt-3 mr-0.5 px-4 flex justify-between items-center rounded-[20px] bg-[#242424B2] text-[15px] text-[#E6E6E6]">
      {icons.map((item, idx) => (
        <div
          key={idx}
          className={`flex items-center gap-1.5 ${
            item.count ? "" : "w-[22px] h-5"
          }`}
        >
          <div className="w-[22px] h-5">
            <Image
              src={`/images/svg/${item.icon}`}
              alt=""
              width={20}
              height={20}
            />
          </div>
          {item.count && item.count}
        </div>
      ))}
    </div>
  );
};

export { MozayedeFooter };
