import DebuggerExam from "@/components/debugger-exam";
import { DebuggerHomePageContainer } from "@/components/Debugger/DebuggerHomePageContainer/DebuggerHomePageContainer";
import { perform_get } from "@/lib/api";
import clientPromise from "@/lib/mongodb";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React, { FC } from "react";

const DebuggerHomePage = async () => {
  const token = cookies().get("token")?.value;
  if (!token) return redirect("/guest");

  const response = await perform_get("auths/user_info/", token);
  const hasDebuggerRole = response?.user_roles?.includes("debugger");

  if (!response || !hasDebuggerRole) return redirect("/guest");

  const verified = response.verifications?.score_verified;

  if (!verified) return <DebuggerExam token={token} />;

  const client = await clientPromise;
  const db = client.db("debugchi_front");
  const faq = await db.collection("faq").find().toArray();

  const serializedFaq = faq.map((item) => ({
    ...item,
    _id: item._id.toString(),
  }));
  return (
    <div
      className="h-full flex flex-1 box-border gap-4 pt-2 overflow-hidden"
      dir="rtl"
    >
      <DebuggerHomePageContainer
        token={token}
        serializedFaq={serializedFaq}
      />
    </div>
  );
};

export default DebuggerHomePage;
