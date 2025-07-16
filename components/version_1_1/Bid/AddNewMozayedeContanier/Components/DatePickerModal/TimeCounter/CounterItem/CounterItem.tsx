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
    <div className="flex flex-col gap-0.5 items-center">
      <Button
        className="text-white !bg-transparent !border-none"
        onPress={increment}
      >
        <ChevronUp className="h-5 w-5 text-[#BABABABB]" />
      </Button>
      <div className="w-[62px] h-[74px] text-center border-[0.5px] border-[#BABABA38] rounded-[15px]">
        <span className="text-white text-[45px] font-iranNumUltraLight">
          {formattedValue}
        </span>
      </div>
      <Button
        className="text-white !bg-transparent !border-none"
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
