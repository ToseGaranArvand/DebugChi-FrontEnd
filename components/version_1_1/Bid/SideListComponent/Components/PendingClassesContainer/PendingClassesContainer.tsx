import React, { FC } from "react";
import { PendingClassCard } from "./PendingClassCard/PendingClassCard";
import { tenderContext } from "@/context/UploadTenderContext";

const PendingClassesContainer:FC<{header: React.ReactNode }> = ({header}) => {
   const { acceptModal, setAcceptModal } = tenderContext();
   
  return (
    <div className="text-white h-full flex flex-col">
     {header}
      <div className="px-1 space-y-[6px] flex-1 overflow-y-auto">
        <PendingClassCard />
        <PendingClassCard />
      </div>
    </div>
  );
};

export { PendingClassesContainer };
