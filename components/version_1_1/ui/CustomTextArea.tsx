// base
import React from "react";

// core
interface ICustomTextAreaPropTypes {
  placeHolder?: string;
  error?: string;
  value: string;
  handleInputChange: (field: string, value: string) => void;
  field: string;
  rows?: number;
  id?: string;
  className?: string;
}

const CustomTextArea: React.FC<ICustomTextAreaPropTypes> = ({
  placeHolder,
  value,
  handleInputChange,
  field,
  rows = 4,
  id,
  className,
  error,
}) => {
  return (
    <div className="w-full">
      <textarea
        id={id}
        rows={rows}
        placeholder={placeHolder}
        className={`w-full text-sm rounded-[20px] border ${
          error ? "border-red-500" : "border-[#6E6E6E36]"
        } focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary resize-none p-2 ${className}`}
        style={
          {
            "--tw-ring-shadow": "0 0 0 3px transparent",
            resize: "none",
          } as React.CSSProperties
        }
        value={value}
        onChange={(e) => handleInputChange(field, e.target.value)}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
};

export { CustomTextArea };
