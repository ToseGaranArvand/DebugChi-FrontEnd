import ForgetPassword from "@/components/Forms/forget-password";
import Sidebar from "@/components/version_1_1/Sidebar";
import SidebarBody from "@/components/version_1_1/Sidebar/SideBar";
import SidebarFooter from "@/components/version_1_1/Sidebar/sidebar-footer";
import BackgroundGlobalGradient from "@/components/version_1_1/ui/backgorund-gradiant-global";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import React from "react";

const page = () => {




  return (
      <main className="w-full h-screen flex">
      <Sidebar>
        <SidebarBody />
        <SidebarFooter />
      </Sidebar>

      <div className="flex-1 h-screen w-full flex items-center justify-center relative">
        <BackgroundGlobalGradient />

            <ForgetPassword />

      </div>
    </main>
  );
};

export default page;
