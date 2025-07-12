// components/version_1_1/AppSidebar.tsx
"use client";

import Sidebar from "@/components/version_1_1/Sidebar";
import SidebarBody from "@/components/version_1_1/Sidebar/SideBar";
import SidebarFooter from "@/components/version_1_1/Sidebar/sidebar-footer";
import SidebarLoginLogout from "@/components/version_1_1/Sidebar/SidebarLoginLogout"; // کامپوننت جدید
import { Main } from "@/components/types/user.types";
import React from "react";

interface AppSidebarProps {
  token?: string;
  user?: Main;
}

const AppSidebar = ({ token, user }: AppSidebarProps) => {
  return (
    <Sidebar>
      <div className="flex flex-col h-full justify-between py-4">
   
        {user ? (
          <div className="py-4 flex justify-center">
            <SidebarFooter token={token} user={user} />
          </div>
        ) : null}

     
        <div className="flex-1 flex items-center justify-center">
          <SidebarBody />
        </div>

     
        <div className="py-4 flex justify-center">
          <SidebarLoginLogout token={token} user={user} />
        </div>
      </div>
    </Sidebar>
  );
};

export default AppSidebar;