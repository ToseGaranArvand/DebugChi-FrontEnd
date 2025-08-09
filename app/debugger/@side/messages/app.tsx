import { DebuggerMessagesPanel } from "@/components/SidePanels/Debugger/DebuggerMessagesPanel/DebuggerMessagesPanel";
import { RequestFilterProvider } from "@/context/RequetsFilterProvider";
import React, { FC } from "react";

interface Props {
  role: "student" | "debugger" | null;
}

const MessagesSidePanel: FC<Props> = ({ role }) => {
  return (
    <div className="h-full p-[2px] bg-gradient-to-r from-[#0F0F0F] to-[#242424] flex flex-col rounded-2xl">
      <RequestFilterProvider>
        <DebuggerMessagesPanel />
      </RequestFilterProvider>
    </div>
  );
};

export default MessagesSidePanel;
