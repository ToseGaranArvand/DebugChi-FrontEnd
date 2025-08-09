import DebuggerWalletPanel from "@/components/SidePanels/Debugger/DebuggerWalletPanel/DebuggerWalletPanel";
import React, { FC } from "react";

interface Props {
  role: "student" | "debugger" | null;
}

const WalletSidePanel: FC<Props> = ({ role }) => {
  return (
    <div className="h-full p-[2px] bg-gradient-to-r from-[#0F0F0F] to-[#242424] flex flex-col rounded-2xl">
      <DebuggerWalletPanel />
    </div>
  );
};

export default WalletSidePanel;
