import Sidebar from "@/components/version_1_1/Sidebar";
import SidebarBody from "@/components/version_1_1/Sidebar/SideBar";
import SidebarFooter from "@/components/version_1_1/Sidebar/sidebar-footer";
import BackgroundGlobalGradient from "@/components/version_1_1/ui/backgorund-gradiant-global";
import { BidFilterProvider } from "@/context/BidFilterContext";
import { TenderProvider } from "@/context/UploadTenderContext";
import { cookies } from "next/headers";
import BidFilter from "@/components/version_1_1/Bid/BidFilter";
import { SideListComponent } from "@/components/version_1_1/Bid/SideListComponent/SideListComponent";

const BidLayout = async ({ children }: { children: React.ReactNode }) => {
  const token = (await cookies()).get("token")?.value;

  return (
    <main className="w-full h-screen flex overflow-hidden">
      <Sidebar>
        <SidebarBody />
        <SidebarFooter token={token} />
      </Sidebar>

      <BidFilterProvider>
        <div className="flex-1 flex flex-col h-full box-border relative p-5 gap-4 overflow-hidden">
          <BackgroundGlobalGradient />
          <div
            style={{
              background:
                "linear-gradient(to right, #242424 0%, #000000 50% , #242424 100%)",
            }}
            className="h-24 p-0.5 rounded-2xl"
          >
            <div className="flex items-center justify-center bg-[#0F0F0F] z-30 w-full h-full rounded-2xl">
              <BidFilter />
            </div>
          </div>

          <div
            dir="rtl"
            className="flex flex-row-reverse h-full box-border gap-4 min-h-0 overflow-hidden"
          >
            <div
              className={`flex flex-col ${
                token ? "w-full flex-1" : "max-w-7xl mx-auto"
              }  min-h-0 overflow-hidden`}
            >
              {children}
            </div>

            {token ? (
              <TenderProvider>
                <SideListComponent />
              </TenderProvider>
            ) : null}
          </div>
        </div>
      </BidFilterProvider>
    </main>
  );
};

export default BidLayout;
