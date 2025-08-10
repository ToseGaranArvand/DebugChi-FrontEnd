"use client";
import BackgroundGlobalGradient from "@/components/version_1_1/ui/backgorund-gradiant-global";
import { cookies } from "next/headers";
import { perform_get } from "@/lib/api";
import { Chrome, Gavel, Home, LogIn, WalletMinimal } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button, Tooltip, Avatar } from "@heroui/react";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/store/store";
import { showLogin } from "@/redux/slices/globalSlice";
import { Main } from "@/components/types/user.types";

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

const linkData = [
  { name: "خانه", path: "/", icon: Home },
  { name: "اکسپلور", path: "/landing", icon: Chrome },
  { name: "مزایده و مناقصه", path: "/bid", icon: Gavel },
  { name: "جامعه", path: "/community?type=debugers", icon: WalletMinimal },
];
interface ISideNavCol {
  userData?: Main;
}
const SideNavCol: FC<ISideNavCol> = ({ userData }) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  return (
    <div className="relative w-[98px] bg-[#0F0F0F] flex flex-col">
      <div className="absolute left-1/2 top-5 -translate-x-1/2 rounded-full overflow-hidden">
        {userData && (
          <Tooltip
            classNames={{
              content: "!text-[12px]",
            }}
            placement="bottom"
            content={userData.first_name + " " + userData.last_name}
          >
            <Button
              className="min-w-0 min-h-0 w-fit h-fit !p-3"
              variant="light"
              radius="full"
              as={Link}
              href="/user/dashboard"
            >
              <Avatar
                className="!w-[50px] h-[50px]"
                src={userData.image_profile || "/user.jpg"}
                name={userData.first_name}
                fallback={userData.first_name}
              />
            </Button>
          </Tooltip>
        )}
      </div>
      <div className="w-full flex-1 flex flex-col items-center justify-center py-4 box-border gap-4">
        <div className="w-[50px] h-[218px] p-2 flex flex-col items-center justify-between bg-[#1C1C1CB2] border border-[#252525] rounded-full">
          {linkData.map((item, index) => {
            const isActive =
              item.path === pathname ||
              (item.path.startsWith("/community") &&
                pathname.startsWith("/community"));

            return (
              <Tooltip content={item.name} placement="right" key={index}>
                <Button
                  as={Link}
                  href={item.path}
                  className={`${
                    isActive
                      ? "bg-black text-background dark:text-foreground"
                      : ""
                  } min-w-0 min-h-0 w-fit h-fit p-2 transition-all duration-500 ease-in-out`}
                  variant={"light"}
                  name={item.name}
                  isIconOnly
                  radius="full"
                  startContent={<item.icon size={29} />}
                  size="lg"
                ></Button>
              </Tooltip>
            );
          })}
        </div>
      </div>
      <div className="absolute left-1/2 bottom-5 -translate-x-1/2 rounded-full overflow-hidden">
        {!userData && (
          <Tooltip
            classNames={{
              content: "!text-[12px]",
            }}
            placement="top"
            content={"ورود"}
          >
            <Button
              className="pr-1 w-[50px] h-[50px]"
              size="lg"
              variant="light"
              radius="full"
              isIconOnly
              startContent={<LogIn color="green" size={24} />}
              onPress={() =>
                dispatch(showLogin({ show: true, path: pathname }))
              }
            />
          </Tooltip>
        )}
      </div>
    </div>
  );
};
