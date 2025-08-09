import { DebuggerExtraServicesPanel } from "@/components/SidePanels/Debugger/DebuggerExtraServicesPanel/DebuggerExtraServicesPanel";
import React, { FC } from "react";

interface Props {
  role: "student" | "debugger" | null;
}

const ExtraServicesSidePanel: FC<Props> = ({ role }) => {
  return (
    <div className="h-full p-[2px] bg-gradient-to-r from-[#0F0F0F] to-[#242424] flex flex-col rounded-2xl">
      <DebuggerExtraServicesPanel />
    </div>
  );
};

export default ExtraServicesSidePanel;
