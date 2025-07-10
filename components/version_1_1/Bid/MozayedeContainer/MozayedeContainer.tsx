"use client";
// base
import { FC, useEffect, useState } from "react";
// components
import { MozayedeCard } from "./Components/MozayedeCard/MozayedeCard";
import { MozayedeHeader } from "./Components/MozayedeHeader/MozayedeHeader";
// core
import { GradientDivider } from "./Components/GradientDivider/GradientDivider";
import { auctionData } from "@/data/db";
import { Tender } from "@/components/types/tender.type";
type Props = {
  tender: Tender;
};
const MozayedeContainer: FC<Props> = ({ tender }) => {
  return (
    <div
      dir="rtl"
      className="min-h-screen text-white lg:py-0 py-[80px] lg:bg-none bg-gradient-to-b from-black to-[#000026]"
    >
      <div className="lg:hidden">
        <MozayedeHeader />
      </div>
      {auctionData.map((item, index) => (
        <div key={index}>
          <MozayedeCard auctionData={item} tender={tender} />
          <div className="lg:hidden">
            <GradientDivider />
          </div>
        </div>
      ))}
    </div>
  );
};

export { MozayedeContainer };
