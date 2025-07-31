// base
import React, { FC } from "react";
// components
// core
import { Input } from "@/components/ui/input";

interface ICustomInputPropTypes {
  field: string;
  value: string;
  containerClassName?: string;
  labelTitle?: string;
  error?: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput: FC<ICustomInputPropTypes> = ({
  value,
  handleInputChange,
  labelTitle,
  containerClassName,
  field,
  error,
}) => {
  return (
    <div>
      <div
        className={`${
          error ? "border-red-500" : "border-[#6E6E6E4D]"
        } py-2 flex items-center border rounded-[14px] h-[50px] ${containerClassName}`}
      >
        <Input
          placeholder={labelTitle}
          id={field}
          style={
            {
              "--tw-ring-shadow": "0 0 0 3px transparent",
            } as React.CSSProperties
          }
          className="bg-transparent border-none !ring-offset-0 text-[#797979] placeholder:text-[#797979] text-sm"
          value={value}
          onChange={handleInputChange}
        />
      </div>
      {/* نمایش خطا */}
      {error && (
        <p className="text-red-500 text-xs mt-1 px-2 font-iranMedium">
          {error}
        </p>
      )}
    </div>
  );
};

export { CustomInput };
