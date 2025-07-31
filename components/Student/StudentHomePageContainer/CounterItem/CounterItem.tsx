// base
import { FC } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
// lib
// core
import Button from "@/components/version_1_1/ui/button";
interface ICounterItemPropTypes {
  label: string;
  value: number;
  max: number;
  onChange: (val: number) => void;
}

const CounterItem: FC<ICounterItemPropTypes> = ({
  label,
  value,
  max,
  onChange,
}) => {
  const formattedValue = String(value).padStart(2, "0");

  const increment = () => onChange(value >= max ? 0 : value + 1);
  const decrement = () => onChange(value <= 0 ? max : value - 1);

  return (
    <div className="flex flex-col gap-0 items-center">
      <Button
        className="min-h-0 h-5 my-2.5 text-white !bg-transparent !border-none"
        onPress={increment}
      >
        <ChevronUp className="h-5 w-5 text-[#BABABABB]" />
      </Button>
      <div className="w-[62px] h-[74px] text-center border border-[#bababa1d] rounded-[15px]">
        <span className="h-full flex items-center justify-center text-white text-[43px] font-iranNumUltraLight">
          {formattedValue}
        </span>
      </div>
      <Button
        className="min-h-0 h-5 my-2.5 text-white !bg-transparent !border-none"
        onPress={decrement}
      >
        <ChevronDown className="h-5 w-5 text-[#BABABABB]" />
      </Button>
      <span className="text-white text-xl mt-1 font-iranUltraLight">
        {label}
      </span>
    </div>
  );
};
export { CounterItem };
