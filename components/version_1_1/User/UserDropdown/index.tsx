import { Main } from "@/components/types/user.types";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@heroui/react";
import { LogOut } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
type Props = {};

const UserDropdown = (props: Props) => {
  const [user, setUser] = useState<Main>();

  useEffect(() => {
    const user_data_in_localstorage = localStorage.getItem("user_data");
    user_data_in_localstorage
      ? setUser(JSON.parse(user_data_in_localstorage))
      : null;
  }, []);




  const LogoutHandler = ()=>{
    Cookies.remove('token')
    localStorage.removeItem('user_data')
    window.location.href = '/landing'
  }

  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <User
          dir="ltr"
          as="button"
          avatarProps={{
            isBordered: true,
            src: user?.image_profile && `${process.env.server}/${user?.image_profile}`,
          }}
          className="transition-transform"
          description={user?.username}
          name={`${user?.first_name} ${user?.last_name}`}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem key="settings" as={Link} href="/">خانه</DropdownItem>
        <DropdownItem key="logout" color="danger" onPress={LogoutHandler} endContent={<LogOut />}>
          خروج
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserDropdown;
