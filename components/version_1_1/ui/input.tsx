import { Input } from "@heroui/react";
import React from "react";
import { UserCircle } from "lucide-react"; // اگر آیکون جایگزین دارید، این را تغییر دهید

type Props = {
  dir?:"rtl" | "ltr";
  startContent?: React.ReactNode;
  isRequired?: boolean;
  errorMessage?: string;
  label?: string;
  labelPlacement?: "inside" | "outside";
  name: string;
  size?: "lg" | "md" | "sm";
  placeholder?: string;
  type?: string;
  variant?: "faded" | "bordered" | "flat";
  validate?: (value: string) => string | undefined;
  value?:string;
  hidden?:boolean;
  autoComplete?:string
};

const Inputs = ({
  dir="rtl",
  autoComplete,
  startContent,
  isRequired,
  errorMessage,
  label,
  labelPlacement = "outside",
  name,
  size= "lg",
  placeholder,
  type = "text",
  variant = "faded",
//   value="",
  hidden,

  validate,
}: Props) => {
  return (
    <Input
    dir={dir}
    autoComplete={autoComplete}
      startContent={startContent}
      isRequired={isRequired}
      errorMessage={errorMessage}
      label={label}
      labelPlacement={labelPlacement}
      name={name}
      size={size}
      placeholder={placeholder}
      type={type}
      variant={variant}
      validate={validate}
      className={`text-sm ${hidden ? 'hidden' : ''}`}
    //   value={value}
      classNames={{
        input: "text-tiny font-lightSans",
      }}
    />
  );
};

export default Inputs;
