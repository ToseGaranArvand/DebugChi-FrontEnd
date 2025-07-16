// base
import { FC } from "react";
// core
import Image from "next/image";

interface IMozayedeBannerProps {
  image: string | null;
}

const MozayedeBanner: FC<IMozayedeBannerProps> = ({ image }) => {
  return (
    <>
      <div
        style={{
          background:
            "linear-gradient(to right, #ffffff00 0%, #ffffff44 50%, #ffffff00 100%)",
        }}
        className="h-[1px]"
      ></div>
      <div className="lg:hidden h-[89px] w-full overflow-hidden my-[3px]">
        <Image
          // بعدا اصلی رو بزار
          src={"/images/general/LabelSample2.png"}
          alt="banner"
          className="w-full h-full"
          width={300}
          height={90}
        />
      </div>
      <div
        style={{
          background:
            "linear-gradient(to right, #ffffff00 0%, #ffffff44 50%, #ffffff00 100%)",
        }}
        className="lg:hidden h-[1px]"
      ></div>
    </>
  );
};

export { MozayedeBanner };
