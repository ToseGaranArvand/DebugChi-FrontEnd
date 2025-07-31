import React from "react";
import { StudentHomePageContainer } from "@/components/Student/StudentHomePageContainer/StudentHomePageContainer";
import { cookies } from "next/headers";
import { perform_get } from "@/lib/api";
import { redirect } from "next/navigation";

const StudentHomePage = async () => {
  const token = cookies().get("token")?.value;
  if (!token) return redirect("/guest");

  const response = await perform_get("auths/user_info/", token);
  if (!response || !response.user_roles?.includes("student"))
    return redirect("/guest");

  const questions = await perform_get("questions/list/");

  const userRole = response?.user_roles;
  return (
    <div className="w-full max-w-[893px] h-full overflow-hidden mx-auto pb-8 flex flex-col">
      <StudentHomePageContainer userRole={userRole} question={questions} />
    </div>
  );
};

export default StudentHomePage;
