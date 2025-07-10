// base
import { FC } from "react";
// components
// core
import Image from "next/image";
import Button from "@/components/version_1_1/ui/button";

interface IMozayedeCardHeaderProps {
  username: string;
  profile: string;
  time: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
}

const MozayedeCardHeader: FC<IMozayedeCardHeaderProps> = ({
  username,
  profile,
  time,
}) => {
  return (
    <div className="flex items-start justify-between p-4 lg:pb-[19px] pb-[5px]">
      <div className="lg:mt-1 flex items-center gap-2">
        <Image
          src={profile}
          alt="profile"
          className="lg:w-[27px] w-[39px] lg:h-[26px] h-[38px] border border-white rounded-full object-cover"
          width={40}
          height={40}
        />
        <h1 className="text-[15px]">{username}</h1>
      </div>

      <div className="flex gap-1">
        {[
          { label: "ثانیه", value: time.seconds, green: true },
          { label: "دقیقه", value: time.minutes },
          { label: "ساعت", value: time.hours },
          { label: "روز", value: time.days },
        ].map(({ label, value, green }) => (
          <div key={label} className="flex flex-col items-center gap-[3px]">
            <div
              className={`lg:w-7 w-[41px] lg:h-7 h-[41px] lg:pb-0 lg:pt-0.5 pb-0.5 flex justify-center items-center rounded-full border border-[#BABABA] text-[15px] ${
                green ? "text-[#0EE520]" : ""
              }`}
            >
              {value}
            </div>
            <span className="lg:hidden text-[8px] font-iranBold">{label}</span>
          </div>
        ))}
      </div>

      <Button className="lg:hidden pt-3 px-0 !bg-transparent">
        <Image
          src="/images/svg/MoreSvg.svg"
          alt=""
          width={20}
          height={20}
          className="w-4 h-4"
        />
      </Button>
    </div>
  );
};

export { MozayedeCardHeader };
