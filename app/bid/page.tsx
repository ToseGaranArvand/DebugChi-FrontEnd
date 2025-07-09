import { Main } from "@/components/types/tender.type";
import Bid from "@/components/version_1_1/Bid";
import BidFilter from "@/components/version_1_1/Bid/BidFilter";
import BidIncomingList from "@/components/version_1_1/Bid/BidIncomingList";
import Sidebar from "@/components/version_1_1/Sidebar";
import SidebarBody from "@/components/version_1_1/Sidebar/SideBar";
import SidebarFooter from "@/components/version_1_1/Sidebar/sidebar-footer";
import BackgroundGlobalGradient from "@/components/version_1_1/ui/backgorund-gradiant-global";
import { BidFilterProvider } from "@/context/BidFilterContext";
import { TenderProvider } from "@/context/UploadTenderContext";
import { perform_get } from "@/lib/api";
import { cookies } from "next/headers";
import React from "react";

const page = async ({ params }: any) => {
  const token = (await cookies()).get("token")?.value;
  const tender: Main = await perform_get("api/v1/bids_tender_list/", token);
  return (
    <main className="w-full h-screen flex overflow-hidden">
      <Sidebar>
        <SidebarBody />
        <SidebarFooter token={token} />
      </Sidebar>
      <BidFilterProvider>
        <div className="flex-1 flex flex-col h-full box-border relative p-5 gap-4 overflow-hidden ">
          <BackgroundGlobalGradient />
          <div className="flex items-center justify-center bg-bg_card/50 backdrop-blur-lg absolute top-2 z-30 border border-default-100 w-[98%] rounded-2xl h-24 ">
            <BidFilter />
          </div>
          <div className="flex h-full box-border gap-4 min-h-0 overflow-hidden">
            <div
              className={`flex flex-col ${
                token ? "w-full flex-1" : "max-w-7xl mx-auto"
              }  min-h-0 overflow-hidden`}
            >
              <Bid data={tender} />
            </div>
            {/* {token ? (
              <div className="bg-bg_card border border-default-100 rounded-2xl w-auto p-4 mt-24">
                <TenderProvider>
                  <BidIncomingList />
                </TenderProvider>
              </div>
            ) : null} */}
          </div>
        </div>
      </BidFilterProvider>
    </main>
  );
};

export default page;
