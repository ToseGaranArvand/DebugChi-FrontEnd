"use client";
// base
import React, { FC } from "react";
// core

import { useBidFilter } from "@/context/BidFilterContext";

const AddNewMozayedeHeader: FC = () => {
  const { setSidePanelContent } = useBidFilter();

  return (
    <>
      <h1 className="mr-6 text-[18px] font-iranBold">بارگذاری مزایده</h1>
      <div
        style={{
          background:
            "linear-gradient(to right, #ffffff0a 0%, #ffffff30 50%, #ffffff0a 100%)",
        }}
        className="h-[1px] mt-[15px]  mb-[15px]"
      ></div>
    </>
  );
};

export { AddNewMozayedeHeader };
