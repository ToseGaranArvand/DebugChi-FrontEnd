// components/version_1_1/Sidebar/sidebar-footer.tsx
"use client";
import { useAppDispatch } from "@/redux/store/store";
import { Button, Link, Tooltip } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { Main } from "@/components/types/user.types";
import { usePathname } from "next/navigation";

type Props = {
  user?: Main;
  token?: string;
};

const SidebarFooter = ({ user, token }: Props) => {
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState<any>(null);
  const pathname = usePathname();
  
  useEffect(() => {
    if (typeof window !== "undefined" && token) {
      const user_data = localStorage.getItem("user_data");
      if (user_data) {
        setUserData(JSON.parse(user_data));
      }
    }
  }, [token]);


  const userInfo = userData || user;


  if (!userInfo) {
    return null;
  }

  return (
    <div className="py-4 flex justify-center">
      <Tooltip
        placement="right"
        content={userInfo.first_name + " " + userInfo.last_name}
      >
        <Button
          size="lg"
          className="flex flex-col h-auto w-auto"
          variant="light"
          radius="full"
          as={Link}
          href="/user/dashboard"
        >
      
          <div className="relative w-14 h-14">
       
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <circle cx="28" cy="28" r="24" fill="#BABABA" />
            </svg>
       
            <svg
              width="15"
              height="21"
              viewBox="0 0 16 20"
              fill="none"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <path
                d="M15 19V17C15 15.9391 14.5786 14.9217 13.8284 14.1716C13.0783 13.4214 12.0609 13 11 13H5C3.93913 13 2.92172 13.4214 2.17157 14.1716C1.42143 14.9217 1 15.9391 1 17V19M12 5C12 7.20914 10.2091 9 8 9C5.79086 9 4 7.20914 4 5C4 2.79086 5.79086 1 8 1C10.2091 1 12 2.79086 12 5Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </Button>
      </Tooltip>
    </div>
  );
};

export default SidebarFooter;