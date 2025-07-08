"use client";
import { useAppSelector } from "@/redux/store/store";
import React, { use } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, UserRound } from "lucide-react";
import { SettingsDialog } from "../settings-dialog";
import Link from "next/link";
import Cookies from "js-cookie";
type Props = {};

const ProfileMenu = (props: Props) => {
  const user = useAppSelector((state) => state.user.user);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src={user?.image_profile}
            alt={user?.username || user?.user_phone}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          {user?.username || user?.user_phone}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full">
          <Link href={"/user/dashboard"} className="w-full flex items-center justify-between">
            <UserRound size={16}/>
            <span>داشبورد</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="h-10">
          <SettingsDialog />
        </DropdownMenuItem>

        <DropdownMenuItem
          className="w-full flex justify-between px-2"
          onClick={() => {
            Cookies.remove("token");
            window.location.href = "/";
          }}
        >
          <LogOut className="mr-2 h-4 w-4 rotate-180" color="red" />
          <span>خروج</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
