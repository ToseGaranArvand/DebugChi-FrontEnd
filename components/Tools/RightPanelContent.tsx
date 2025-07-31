"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

import DebuggerSidePanelMessages from "@/app/debugger/@side/messages/page";
// import DebuggerNotifications from '@/components/debugger/notifications';

// import StudentMessages from '@/components/student/messages';
// import StudentNotifications from '@/components/student/notifications';

interface Props {
  role: "student" | "debugger" | null;
}

const RightPanelContent: React.FC<Props> = ({ role }) => {
  const searchParams = useSearchParams();
  const side = searchParams.get("side");

  if (!role) return null;

  if (role === "debugger") {
    if (side === "messages") return <DebuggerSidePanelMessages />;
    // if (side === 'notifications') return <DebuggerNotifications />;
  }

  if (role === "student") {
    // if (side === 'messages') return <StudentMessages />;
    // if (side === 'notifications') return <StudentNotifications />;
  }

  return null;
};

export default RightPanelContent;
