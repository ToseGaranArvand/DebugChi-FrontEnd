import React from "react";
import { DebuggerChatPageContainer } from "@/components/Debugger/DebuggerChatPageContainer/DebuggerChatPageContainer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const DebuggerChatPage = async ({ params }: any) => {
  const token = (await cookies()).get("token")?.value;
  const { session_id } = await params;
  if (!token) redirect("/guest");
  return <DebuggerChatPageContainer token={token} id={session_id} />;
};

export default DebuggerChatPage;
