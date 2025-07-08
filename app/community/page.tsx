import EngineersList from "@/components/version_1_1/community/EngineersList";
import FilterControls from "@/components/version_1_1/community/FilterControl";
import VideoList from "@/components/version_1_1/community/VideoList";
import Sidebar from "@/components/version_1_1/Sidebar";
import SidebarBody from "@/components/version_1_1/Sidebar/SideBar";
import SidebarFooter from "@/components/version_1_1/Sidebar/sidebar-footer";
import { FilterProvider } from "@/context/AllDebugersContext";
import { perform_get } from "@/lib/api";
import { Button } from "@heroui/react";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";



const page = async ({ searchParams }: {
  searchParams:Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const token = (await cookies()).get("token")?.value;
  const { type } = await searchParams;
  let response;
  if (type == "debugers") {
    response = await perform_get("auths/all_debuger/");
  } else {
    response = await perform_get("post/course_list/");
  }

  if (!response) {
    return (
      <main className="w-full h-screen flex">
        <Sidebar>
          <SidebarBody />
          <SidebarFooter token={token} />
        </Sidebar>
        <div className="flex flex-1 box-border gap-4" dir="rtl">
          <div className="flex-1 flex flex-col h-full box-border p-4">
            دیتایی یافت نشد دوباره اقدام کنید
            <Button as={Link} href="/community?type=debugers"></Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full h-screen flex  ">
      <Sidebar>
        <SidebarBody />
        <SidebarFooter token={token} />
      </Sidebar>
      <div className="flex flex-1 box-border gap-4 bg-community " dir="rtl">
        <div className="flex-1 flex flex-col h-full overflow-y-auto">
          {type == "debugers" ? (
            <FilterProvider users={response}>
              <FilterControls />
              <EngineersList users={response} />
            </FilterProvider>
          ) : (
            <FilterProvider users={[]}>
              <FilterControls />
              <VideoList data={response} />
              {/* <EngineersList users={response} /> */}
            </FilterProvider>
          )}
        </div>
      </div>
    </main>
  );
};

export default page;
