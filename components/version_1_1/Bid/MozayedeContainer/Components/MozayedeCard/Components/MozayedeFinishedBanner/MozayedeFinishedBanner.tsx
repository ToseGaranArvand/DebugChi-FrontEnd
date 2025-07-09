// base
import Image from "next/image";
import { FC } from "react";

const MozayedeFinishedBanner: FC = () => {
  return (
    <div className="p-[1px] h-[78px] rounded-[14px] bg-gradient-to-r from-[#242424] to-black">
      <div className="h-full bg-[#040404] rounded-[14px] flex items-center justify-center gap-2">
        <Image src="/images/svg/TimesUpSvg.svg" alt="" width={20} height={20} />
        <h1 className="text-lg">پایان مزایده</h1>
      </div>
    </div>
  );
};

export { MozayedeFinishedBanner };
