"use client";
// base
import { useEffect, useState } from "react";
// components
import { MozayedeCard } from "./Components/MozayedeCard/MozayedeCard";
import { MozayedeHeader } from "./Components/MozayedeHeader/MozayedeHeader";
// core
import { GradientDivider } from "./Components/GradientDivider/GradientDivider";
import { auctionData } from "@/data/db";

const MozayedeContainer = () => {
  return (
    <div
      dir="rtl"
      className="min-h-screen text-white py-[80px] bg-gradient-to-b from-black to-[#000026]"
    >
      <MozayedeHeader />
      {auctionData.map((item) => (
        <div key={item.id}>
          <MozayedeCard auctionData={item} />
          <GradientDivider />
        </div>
      ))}
    </div>
  );
};

export { MozayedeContainer };
