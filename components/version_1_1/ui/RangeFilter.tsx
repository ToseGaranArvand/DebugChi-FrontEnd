import React from "react";
import { Slider } from "@heroui/react";

type RangeFilterProps = {
  min?: number;
  max?: number;
  step?: number;
  range: number[];
  className?: string;
  setRange: React.Dispatch<React.SetStateAction<number[]>>;
};

const RangeFilter: React.FC<RangeFilterProps> = ({
  min = 0,
  max = 10000,
  step = 100,
  setRange,
  range,
}) => {
  const handleChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setRange(value);
    } else {
      setRange([value, value]);
    }
  };
  return (
    <div>
      <Slider
        aria-label="Temperature"
        className="max-w-md"
        size="sm"
        color={"success"}
        value={range}
        onChange={handleChange}
        maxValue={max}
        minValue={min}
        step={step}
      />
    </div>
  );
};

export { RangeFilter };
