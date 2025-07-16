// base
import React, { FC } from "react";
// components
// core
import { Input } from "@/components/ui/input";

interface ICustomInputPropTypes {
  field: string;
  value: string;
  labelTitle: string;
  containerClassName?: string;
  labelClassName?: string;
  error?: string;
  handleInputChange: (field: string, value: string) => void;
}

const CustomInput: FC<ICustomInputPropTypes> = ({
  value,
  handleInputChange,
  labelClassName,
  labelTitle,
  containerClassName,
  field,
  error,
}) => {
  return (
    <>
      <div
        className={`py-2 flex items-center border border-[#6E6E6E4D] text-[#E5E5E5] rounded-[20px] h-[58px] ${containerClassName}`}
      >
        <label
          htmlFor={field}
          className={`h-full !m-0 px-[14px] flex items-center border-l border-[#6E6E6E4D] mb-2 text-nowrap text-sm ${labelClassName}`}
        >
          {labelTitle}
        </label>
        <Input
          id={field}
          style={
            {
              "--tw-ring-shadow": "0 0 0 3px transparent",
            } as React.CSSProperties
          }
          className="bg-transparent border-none !ring-offset-0"
          value={value}
          onChange={(e) => handleInputChange(field, e.target.value)}
        />
      </div>
      {/* نمایش خطا */}
      {error && (
        <p className="text-red-500 text-xs mt-1 px-2 font-iranMedium">
          {error}
        </p>
      )}
    </>
  );
};

export { CustomInput };
