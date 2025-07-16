"use client";
// base
import { FC, useEffect } from "react";
// components
import { MozayedeCard } from "./Components/MozayedeCard/MozayedeCard";
// core
import { GradientDivider } from "./Components/GradientDivider/GradientDivider";
import { Result } from "@/components/types/tender.type";
import { useBidFilter } from "@/context/BidFilterContext";

type Props = {
  results: Result[];
};
const MozayedeContainer: FC<Props> = ({ results }) => {
  const { setData } = useBidFilter();

  useEffect(() => {
    setData((prevData) => {
      if (JSON.stringify(prevData) !== JSON.stringify(results)) {
        return results;
      }
      return prevData;
    });
  }, [results, setData]);
  return (
    <>
      <div className="w-full grid grid-cols-1 max-[1023px]:grid-cols-2 max-[833px]:grid-cols-1 place-content-start text-white">
        {results.map((item, index) => (
          <div className="h-fit" key={index}>
            <MozayedeCard tender={item.tender} bids={item.bids} />
          </div>
        ))}
      </div>
      <div className="lg:hidden">
        <GradientDivider />
      </div>
    </>
  );
};

export { MozayedeContainer };
