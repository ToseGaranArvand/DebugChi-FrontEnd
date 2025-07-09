// base
import React, { FC } from "react";
// lib
import { Input } from "antd";
// core
import { ISearchInputPropTypes } from "@/src/core/types/props/ISearchInputPropTypes";
import Image from "next/image";

const SearchInput: FC<ISearchInputPropTypes> = ({
  placeholder = "جستجو کنید...",
  onChange,
  className,
}) => {
  return (
    <div className="relative w-full">
      <Input
        style={
          ({
            "--tw-ring-shadow": "0 0 0 3px transparent",
          } as React.CSSProperties,
          { resize: "none" })
        }
        className={`w-full !ring-offset-0 !shadow-none pl-12 flex-row-reverse ${className}`}
        placeholder={placeholder}
      />
      <Image
        src="/images/svg/SearchSvg.svg"
        alt=""
        className="absolute top-1/2 left-4 -translate-y-1/2"
        width={20}
        height={20}
      />
    </div>
  );
};

export { SearchInput };
