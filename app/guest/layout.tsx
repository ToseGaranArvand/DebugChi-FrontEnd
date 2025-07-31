import BackgroundGlobalGradient from "@/components/version_1_1/ui/backgorund-gradiant-global";

import { SideNavCol } from "@/components/SideNavigation/Guest/Desktop/SideNavCol/SideNavCol";

const GuestLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-screen h-screen overflow-hidden relative flex">
      <BackgroundGlobalGradient />
      <SideNavCol />
      <div className="flex-1 h-full overflow-hidden pt-8 px-4 flex flex-col gap-[5px]">
        <div className="flex-1 max-h-full overflow-hidden">{children}</div>
      </div>
    </main>
  );
};

export default GuestLayout;
