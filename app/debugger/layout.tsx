import BackgroundGlobalGradient from "@/components/version_1_1/ui/backgorund-gradiant-global";
import { cookies } from "next/headers";
import { perform_get } from "@/lib/api";
import { SideNavCol } from "@/components/SideNavigation/Debugger/Desktop/SideNavCol/SideNavCol";
import RightPanelContent from "@/components/Tools/RightPanelContent";
import { SideNavRow } from "@/components/SideNavigation/Debugger/Desktop/SideNavRow/SideNavRow";

const DebuggerLayout = async ({ main }: { main: React.ReactNode }) => {
  const token = (await cookies()).get("token")?.value;
  const response = token ? await perform_get("auths/user_info/", token) : null;
  const userRole = response?.user_roles?.includes("debugger")
    ? "debugger"
    : response?.user_roles?.includes("student")
    ? "student"
    : null;

  return (
    <main className="w-screen h-screen overflow-hidden relative flex">
      <BackgroundGlobalGradient />
      <SideNavCol userData={response} />
      <div className="flex-1 h-full overflow-hidden pt-8 px-4 flex flex-col gap-[5px]">
        <SideNavRow />
        <div className="flex-1 max-h-full overflow-hidden">{main}</div>
      </div>
      <RightPanelContent role={userRole} />
    </main>
  );
};

export default DebuggerLayout;
