"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

import MessagesSidePanel from "@/app/debugger/@side/messages/app";
import ExtraServicesSidePanel from "@/app/debugger/@side/extraServices/app";

interface Props {
  role: "student" | "debugger" | null;
}

const RightPanelContent: React.FC<Props> = ({ role }) => {
  const searchParams = useSearchParams();
  const side = searchParams.get("side");

  if (!role) return null;

  if (side === "messages") return <MessagesSidePanel role={role} />;
  if (side === "extraServices") return <ExtraServicesSidePanel role={role} />;

  return null;
};

export default RightPanelContent;
