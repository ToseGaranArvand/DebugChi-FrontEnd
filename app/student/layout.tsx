import BackgroundGlobalGradient from "@/components/version_1_1/ui/backgorund-gradiant-global";
import { cookies } from "next/headers";
import { perform_get } from "@/lib/api";
import { SideNavCol } from "@/components/SideNavigation/Student/Desktop/SideNavCol/SideNavCol";

const StudentLayout = async ({ children }: { children: React.ReactNode }) => {
  const token = (await cookies()).get("token")?.value;

  const response = token ? await perform_get("auths/user_info/", token) : null;
  const isGuest = !token || !response || !response.user_roles;

  return (
    <main className="w-screen h-screen overflow-hidden relative flex">
      <BackgroundGlobalGradient />
      <SideNavCol userData={response} />
      <div className="flex-1 h-full overflow-hidden pt-8 px-4 flex flex-col gap-[5px]">
        {!isGuest && (
          <div className="p-0.5 rounded-2xl bg-gradient-to-r from-[#242424] via-transparent to-[#242424]">
            <div className="h-[88px] rounded-2xl bg-[#0F0F0F]"></div>
          </div>
        )}
        <div className="flex-1 max-h-full overflow-hidden">{children}</div>
      </div>
    </main>
  );
};

export default StudentLayout;
