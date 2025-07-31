import { MessagesPanel } from "@/components/SidePanels/Debugger/MessagesPanel/MessagesPanel";
import { RequestFilterProvider } from "@/context/RequetsFilterProvider";
import React from "react";

const DebuggerSidePanelMessages = () => {
  return (
    <div className="w-[366px] h-screen pr-5 py-[28px]">
      <div className="h-full p-[2px] bg-gradient-to-r from-[#0F0F0F] to-[#242424] flex flex-col rounded-2xl">
        <RequestFilterProvider>
          <MessagesPanel />
        </RequestFilterProvider>
      </div>
    </div>
  );
};

export default DebuggerSidePanelMessages;
