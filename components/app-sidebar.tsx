"use client"
import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { MessageCircleCode,LayoutDashboard } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import BadgeNumber from "./Tools/Badge/BadgeNumber"

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "داشبورد شخصی",
      url: "#",
      items: [
        {
          title: "داشبورد",
          url: "/user/dashboard",
          icon:LayoutDashboard,
          isActive:true
        },
        {
          title: "پیام رسان",
          url: "/user/dashboard/chat",
          icon:MessageCircleCode,
          badgeNumber:false
        }
      ],
    },

  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {


  const path = usePathname()
  console.log(path)
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item , index) => (
          <SidebarGroup key={index}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item, index) => (
                  <SidebarMenuItem key={index} className="my-2">
                    <SidebarMenuButton asChild className="w-full h-10 hover:bg-gray-200">
                      <Link href={item.url} className={`relative flex gap-6 text-lg ${path === item.url ? 'bg-blue-100 text-blue-500' : '' }`}>
                      <item.icon className="!w-5 !h-5"/>
                        <span className="text-lg">
                        {item.title}
                        </span>
                        { item.badgeNumber ? <BadgeNumber number={0}/> : null}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
