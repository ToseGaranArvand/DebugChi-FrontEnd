import Action from "@/components/chat/header/action";
import RequestModal from "@/components/Modal/RequestModal";
import MoreRequest from "@/components/Modal/RequestModal/MoreRequest";
import ChatList from "@/components/version_1_1/chatList";
import UserNormalChatList from "@/components/version_1_1/chatList/noramal-user-chatlist";
import Sidebar from "@/components/version_1_1/Sidebar";
import SidebarBody from "@/components/version_1_1/Sidebar/SideBar";
import SidebarFooter from "@/components/version_1_1/Sidebar/sidebar-footer";
import { perform_get } from "@/lib/api";
import { MessageCircle } from "lucide-react";
import { cookies } from "next/headers";
import React from "react";

const page = async ({ params }: any) => {
  const token = (await cookies()).get("token")?.value;

  const { uuid } = await params;
  const response = await perform_get(
    `api/v1/debug/get-session-info/${uuid}`,
    token
  );
  console.log(response);

  if (!token) {
    return <div>not found</div>;
  }

  return (
    <main className="w-full h-screen flex">
      <Sidebar>
        <SidebarBody />
        <SidebarFooter token={token} />
      </Sidebar>
      <div className="flex-1 flex  h-full box-border p-5 gap-4">
        <div className="bg-foreground-100 rounded-3xl h-full overflow-y-auto w-96">
          {response.is_debuger ? (
            <ChatList />
          ) : (
            <UserNormalChatList
            />
          )}
        </div>
        <div className="bg-foreground-100 flex flex-col rounded-3xl flex-1 w-full relative">
          <RequestModal />
          <MoreRequest />
          <div className="flex items-center gap-4 absolute left-0 top-0 w-full rounded-2xl h-20 box-border px-5 bg-foreground-50 z-50">
            <Action
              reciever={
                response.data.debuger_applicator ||
                response.data.consult_applicator
              }
            />
          </div>
          <div className=" w-full box-border p-5  flex-1 relative overflow-y-auto py-28">
            <MessageCircle />
            <span>
          برای شروع یک گفتگو را انتخاب کنید 
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
