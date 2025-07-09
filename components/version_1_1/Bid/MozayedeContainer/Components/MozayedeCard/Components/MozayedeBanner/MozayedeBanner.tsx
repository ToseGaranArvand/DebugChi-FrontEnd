// base
import { FC } from "react";
// core
import Image from "next/image";

interface IMozayedeBannerProps {
  image: string;
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
      <div className="sm:hidden h-[89px] my-[3px]">
        <Image
          src={image}
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
        className="sm:hidden h-[1px]"
      ></div>
    </>
  );
};

export { MozayedeBanner };
