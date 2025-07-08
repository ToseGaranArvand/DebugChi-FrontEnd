"use client"
import { Main } from "@/components/types/user.types";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem,
    Button,
    User,
    Avatar,
  } from "@heroui/react";
  import Cookies from "js-cookie";
import { LogOut } from "lucide-react";
  export const PlusIcon = (props:any) => {
    return (
      <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="1em"
        role="presentation"
        viewBox="0 0 24 24"
        width="1em"
        {...props}
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        >
          <path d="M6 12h12" />
          <path d="M12 18V6" />
        </g>
      </svg>
    );
  };
  

type Props = {
    user:Main
}


  export default function MenuButton({user}:Props) {
    
    return (
      <Dropdown
        
        // classNames={{
        //   base: "before:bg-default-200", // change arrow background
        //   content: "p-0 border-small border-divider bg-background",
        // }}
        radius="sm"
      >
        <DropdownTrigger >
          <Button radius="full" isIconOnly variant="flat" color="warning"
          size="sm"
            startContent={
                <Avatar isBordered color="warning" name={user.first_name} size="sm" src={user.image_profile} fallback={user.username[0]} />
            }
          >
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Custom item styles"
          className="p-3"
          disabledKeys={["profile"]}
          itemClasses={{
            base: [
              "rounded-md",
              "text-default-500",
              "transition-opacity",
              "data-[hover=true]:text-foreground",
              "data-[hover=true]:bg-default-100",
              "dark:data-[hover=true]:bg-default-50",
              "data-[selectable=true]:focus:bg-default-50",
              "data-[pressed=true]:opacity-70",
              "data-[focus-visible=true]:ring-default-500",
            ],
          }}
        >
          <DropdownSection showDivider aria-label="Profile & Actions">
            <DropdownItem key="profile" isReadOnly className="h-14 gap-2 opacity-100">
              <User
                avatarProps={{
                  size: "sm",
                  src: user.image_profile,
                }}
                classNames={{
                  name: "text-default-600",
                  description: "text-default-500",
                }}
                description={user.email}
                name={user.first_name + " " + user.last_name}
              />
            </DropdownItem>
            <DropdownItem key="dashboard">Dashboard</DropdownItem>
            <DropdownItem key="settings">Settings</DropdownItem>
            <DropdownItem key="new_project" endContent={<PlusIcon className="text-large" />}>
              New Project
            </DropdownItem>
          </DropdownSection>
  
          <DropdownSection showDivider aria-label="Preferences">
            <DropdownItem key="quick_search" shortcut="⌘K">
              Quick search
            </DropdownItem>
            <DropdownItem
              key="theme"
              isReadOnly
              className="cursor-default"
              endContent={
                <select
                  className="z-10 outline-none w-16 py-0.5 rounded-md text-tiny group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent text-default-500"
                  id="theme"
                  name="theme"
                >
                  <option>System</option>
                  <option>Dark</option>
                  <option>Light</option>
                </select>
              }
            >
              Theme
            </DropdownItem>
          </DropdownSection>
  
          <DropdownSection aria-label="Help & Feedback">
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" onPress={()=>{
                Cookies.remove('token');
                window.location.href = "/";
            }} endContent={<LogOut />} variant="faded" color="danger">خروج</DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    );
  }
  