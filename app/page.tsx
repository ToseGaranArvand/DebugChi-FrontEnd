import AIBotProfile from "@/components/ui/Profile/aibotprofile";
import Sidebar from "@/components/version_1_1/Sidebar";
import SidebarBody from "@/components/version_1_1/Sidebar/SideBar";
import SidebarFooter from "@/components/version_1_1/Sidebar/sidebar-footer";
import * as React from "react";
import FindUser from "@/components/version_1_1/FindUser";
import { cookies } from "next/headers";
import { perform_get } from "@/lib/api";
import {
  DebugerHome,
  DebugerRequest,
} from "@/components/version_1_1/User/home";
import clientPromise from "@/lib/mongodb";
import { RequestFilterProvider } from "@/context/RequetsFilterProvider";
import AiQuestion from "@/components/version_1_1/AiQuestions";
import Answers from "@/components/version_1_1/AiQuestions/Answers";
import { AnswerProvider } from "@/context/AiContextAnswer";
import BackgroundGlobalGradient from "@/components/version_1_1/ui/backgorund-gradiant-global";
import ClientDebuggerWrapper from "@/components/client-debugger-wrapper";
import DebuggerExam from "@/components/debugger-exam";
import { redirect } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import StudentHomePage from "./student/dashboard/page";
import StudentLayout from "./student/layout";
import DebuggerHomePage from "./debugger/@main/dashboard/page";
import DebuggerLayout from "./debugger/layout";

export default async function Home() {
  const token = cookies().get("token")?.value;
  const response = token ? await perform_get("auths/user_info/", token) : null;

  if (!token || !response) return redirect("/guest");

  if (response.user_roles.includes("debugger"))
    return redirect("/debugger/dashboard?side=messages");
  if (response.user_roles.includes("student"))
    return redirect("/student/dashboard");

  return redirect("/guest");

  // const isGuest = !token || !response || !response.user_roles;
  // const isStudent =
  //   token &&
  //   response &&
  //   Array.isArray(response.user_roles) &&
  //   response.user_roles.includes("student");
  // const isDebugger =
  //   token &&
  //   response &&
  //   Array.isArray(response.user_roles) &&
  //   response.user_roles.includes("debugger");

  // const client = await clientPromise;
  // const db = client.db("debugchi_front");
  // const faq = await db.collection("faq").find().toArray();

  // const serializedFaq = faq.map((item) => ({
  //   ...item,
  //   _id: item._id.toString(),
  // }));

  // const questions = await perform_get("questions/list/");
  // if (isGuest)
  //   return (
  //     <StudentLayout>
  //       <StudentHomePage />
  //     </StudentLayout>
  //   );
  // if (isStudent)
  //   return (
  //     <StudentLayout>
  //       <div className="h-full w-full">
  //         <StudentHomePage userData={response} question={questions} />
  //       </div>
  //     </StudentLayout>
  //   );

  // if (isDebugger) {
  //   const response = await perform_get("auths/user_info/", token);

  //   if ("user_roles" in response && "verifications" in response) {
  //     if (response.user_roles.includes("debugger")) {
  //       if (response.verifications.score_verified) {
  //         return (
  //           <DebuggerLayout>
  //             <DebuggerHomePage
  //               response={response}
  //               serializedFaq={serializedFaq}
  //               token={token}
  //             />
  //           </DebuggerLayout>
  //         );
  //       } else {
  //         return <DebuggerExam token={token} />;
  //       }
  //     }
  //   }

  //   // اگر response ساختار نداشت:
  //   console.warn("ساختار پاسخ نامعتبر بود:", response);
  // }

  // return (
  //   <main className="w-full h-screen flex">
  //     <Sidebar>
  //       <SidebarBody />
  //       <SidebarFooter token={token} />
  //     </Sidebar>

  //     <div className="flex-1 flex relative h-full overflow-hidden box-border p-4 gap-4">
  //       <BackgroundGlobalGradient />
  //       <div className="relative flex flex-col h-full w-full">
  //         <FindUser />
  //         <AnswerProvider>
  //           <div className="flex-1 w-full">
  //             <AiQuestion question={questions} />
  //           </div>
  //           <div className="w-full h-auto py-4">
  //             <Answers />
  //           </div>
  //         </AnswerProvider>
  //       </div>
  //     </div>
  //   </main>
  // );
}

// 09303362613      دانش اموز
// 09361226758
// 12345678

// const { user, isLoading } = useAuth();
