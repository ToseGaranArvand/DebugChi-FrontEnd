// import DebugerProfile from "@/components/version_1_1/DebugerProfile";
import Sidebar from "@/components/version_1_1/Sidebar";
import SidebarBody from "@/components/version_1_1/Sidebar/SideBar";
import SidebarFooter from "@/components/version_1_1/Sidebar/sidebar-footer";
import UserResume from "@/components/version_1_1/User/Resume";
import  {
  UserProfile,
} from "@/components/version_1_1/User/UserDashboard";
import { perform_get } from "@/lib/api";
import { cookies } from "next/headers";
import React from "react";


const page = async ({ params }: { params: Promise<{ uuid: string }> }) => {

  const {uuid }= await params 
  const response = await perform_get(`api/v1/user/${uuid}/`);
  const token = (await cookies()).get("token")?.value;

  return (
    // <div className="w-full h-full mx-auto" dir="rtl">
    <main className="w-full h-screen flex  ">
      <Sidebar>
        <SidebarBody />
        <SidebarFooter token={token} />
      </Sidebar>
      <div className="flex-1" dir="rtl">
        <div className="flex flex-col mx-auto overflow-y-scroll h-screen box-border px-24">
          <UserProfile user={response.user} />
          <UserResume data={response.user} />
        </div>
        {/* <DebugerProfile user={response.user}/> */}
      </div>
    </main>

    // </div>
  );
};

export default page;
