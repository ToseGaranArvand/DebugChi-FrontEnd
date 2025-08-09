import Action from "@/components/chat/header/action";
import Conversation from "@/components/Conversation";
import InputMessage from "@/components/Conversation/Input";
import RequestModal from "@/components/Modal/RequestModal";
import MoreRequest from "@/components/Modal/RequestModal/MoreRequest";
import ChatList from "@/components/version_1_1/chatList";
import UserNormalChatList from "@/components/version_1_1/chatList/noramal-user-chatlist";
import Sidebar from "@/components/version_1_1/Sidebar";
import SidebarBody from "@/components/version_1_1/Sidebar/SideBar";
import SidebarFooter from "@/components/version_1_1/Sidebar/sidebar-footer";
import { RequestFilterProvider } from "@/context/RequetsFilterProvider";
import { perform_get } from "@/lib/api";
import { cookies } from "next/headers";

const page = async ({ params }: any) => {
  const token = (await cookies()).get("token")?.value;
  const { uuid } = await params;
  const response = await perform_get(
    `api/v1/debug/get-session-info/${uuid}`,
    token
  );

  if (!token) {
    return <div>not found</div>;
  }

  return (
    <main className="w-full h-screen flex" style={{ background: "#0F0F0F" }}>
      <Sidebar>
        <SidebarBody />
        <SidebarFooter token={token} />
      </Sidebar>
      <div className="flex-1 flex h-full box-border p-5 gap-4">
        <div className="bg-[#1C1C1C] rounded-3xl h-full overflow-y-auto w-96">
          <RequestFilterProvider>
            {response.is_debuger ? <ChatList /> : <UserNormalChatList />}
          </RequestFilterProvider>
        </div>
        <div className="bg-[#0F0F0F] flex flex-col rounded-3xl flex-1 w-full relative">
          <RequestModal />
          <MoreRequest />

          <div
            className="absolute top-0 left-0 right-0 z-50 p-4"
            style={{ background: "#0F0F0F" }}
          >
            <div className="flex justify-start gap-2">
              <Action
                reciever={
                  response.data.debuger_applicator ||
                  response.data.consult_applicator
                }
              />
            </div>
          </div>

          <div
            className="w-full box-border p-5 flex-1 relative overflow-y-auto"
            style={{ paddingTop: "80px" }}
          >
            <Conversation
              is_commented={response.is_commneted}
              is_closed={response.data.status}
              user={response.data.debuger || response.data.consult}
              user_applicator={
                response.data.debuger_applicator ||
                response.data.consult_applicator
              }
              session_id={response.data.session_id}
            />
          </div>

          <div
            className="w-full h-auto box-border pb-1 absolute bottom-0 z-20 bg-[#0F0F0F]"
            dir="rtl"
          >
            {response.is_debuger ? (
              <InputMessage
                data={response}
                reciever={
                  response.data.debuger_applicator ||
                  response.data.consult_applicator
                }
              />
            ) : (
              <InputMessage
                data={response}
                reciever={response.data.debuger || response.data.consult}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
