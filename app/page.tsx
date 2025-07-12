import AppSidebar from "@/components/version_1_1/AppSidebar";
import FindUser from "@/components/version_1_1/FindUser";
import { cookies } from "next/headers";
import { perform_get } from "@/lib/api";
import clientPromise from "@/lib/mongodb";
import AiQuestion from "@/components/version_1_1/AiQuestions";
import Answers from "@/components/version_1_1/AiQuestions/Answers";
import { AnswerProvider } from "@/context/AiContextAnswer";
import BackgroundGlobalGradient from "@/components/version_1_1/ui/backgorund-gradiant-global";
import ClientDebuggerWrapper from "@/components/client-debugger-wrapper";
import DebuggerExam from "@/components/debugger-exam";

export default async function Home() {
  const token = (await cookies()).get("token")?.value;
  const client = await clientPromise;
  const db = client.db("debugchi_front");
  const faq = await db.collection("faq").find().toArray();

  const serializedFaq = faq.map((item) => ({
    ...item,
    _id: item._id.toString(),
  }));

  const questions = await perform_get("questions/list/");

  
  let user = null;
  if (token) {
    try {
      const response = await perform_get("auths/user_info/", token);
      console.log(response);
      
      if (response.user_roles.includes("debugger")) {
        if(response.verifications.score_verified){
          return <ClientDebuggerWrapper response={response} serializedFaq={serializedFaq} token={token} />;
        } else {
          return <DebuggerExam token={token} />;
        }
      }
  
      user = response;
    } catch (error) {
      console.error("Failed to fetch user info", error);
    }
  }

  return (
    <main className="w-full h-screen flex">
      <AppSidebar token={token} user={user} />
      
      <div className="flex-1 flex relative h-full overflow-hidden box-border p-4 gap-4">
        <BackgroundGlobalGradient />
        <div className="relative flex flex-col h-full w-full">
          <FindUser />
          <AnswerProvider>
            <div className="flex-1 w-full">
              <AiQuestion question={questions} />
            </div>
            <div className="w-full h-auto py-4">
              <Answers />
            </div>
          </AnswerProvider>
        </div>
      </div>
    </main>
  );
}