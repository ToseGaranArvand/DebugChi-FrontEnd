// base
import { FC, useEffect, useState } from "react";
// components
// core
import Image from "next/image";
import { startCountdown } from "@/hooks/startCountDown";

interface IMozayedeCardHeaderProps {
  username: string;
  profile: string;
  targetDate: Date;
}

const MozayedeCardHeader: FC<IMozayedeCardHeaderProps> = ({
  username,
  profile,
  targetDate,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const stop = startCountdown(targetDate, setTimeLeft);

    return () => stop();
  }, []);
  return (
    <div className="flex sm:flex-row flex-col-reverse sm:items-start items-center justify-between sm:gap-0 gap-3 p-4 sm:pb-[19px] pb-[5px]">
      <div className="sm:mt-1 sm:w-fit w-full flex items-center gap-2">
        <Image
          // بعدا اصلی رو بزار
          src={"/images/general/Profile.png"}
          alt="profile"
          className="sm:w-[30px] w-[39px] sm:h-[30px] h-[38px] border border-white rounded-full object-cover"
          width={40}
          height={40}
        />
        <h1 className="text-[15px]">{username}</h1>
      </div>

      <div className="flex gap-1">
        {[
          { label: "ثانیه", value: timeLeft.seconds, green: true },
          { label: "دقیقه", value: timeLeft.minutes },
          { label: "ساعت", value: timeLeft.hours },
          { label: "روز", value: timeLeft.days },
        ].map(({ label, value, green }) => (
          <div key={label} className="flex flex-col items-center gap-[3px]">
            <div
              className={`sm:w-7 w-[41px] sm:h-7 h-[41px] sm:pb-0 sm:pt-0.5 pb-0.5 flex justify-center items-center rounded-full border border-[#BABABA] text-[15px] ${
                green ? "text-[#0EE520]" : ""
              }`}
            >
              {value}
            </div>
            <span className="sm:hidden text-[8px] font-iranBold">{label}</span>
          </div>
        ))}
      </div>

      {/* <Button className="sm:hidden pt-3 px-0 !bg-transparent">
        <Image
          src="/images/svg/MoreSvg.svg"
          alt=""
          width={20}
          height={20}
          className="w-4 h-4"
        />
      </Button> */}
    </div>
  );
};

export { MozayedeCardHeader };
