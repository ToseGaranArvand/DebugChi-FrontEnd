import React from "react";
import { Slider } from "antd";

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
  range,
  setRange,
  className,
}) => {
  const handleChange = (value: number[]) => {
    setRange(value as number[]);
  };

  return (
    <div>
      <Slider
        range
        step={step}
        min={min}
        max={max}
        value={range}
        onChange={handleChange}
        className={className}
        styles={{
          track: { backgroundColor: "#80FF00", height: 3 },
          handle: { backgroundColor: "#80FF00", borderColor: "#80FF00" },
          rail: { backgroundColor: "#737373", height: 3 },
        }}
      />
    </div>
  );
};

export { RangeFilter };
