// base
import React, { FC } from "react";

// core
import Image from "next/image";
import { Input } from "@/components/ui/input";

interface ISearchInputPropTypes {
  placeholder?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


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
        className={`w-full pr-3 !ring-offset-0 !shadow-none pl-12 flex-row-reverse ${className}`}
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
