// import Dashboard from "@/components/routes/user/dashboard/Dashboard";
// import { headers, performRequest } from "@/lib/api";
// import axios from "axios";
// import React from "react";
// import Cookies from "js-cookie";
// import { cookies } from "next/headers";
// import { jwtDecode } from "jwt-decode";
// import { AppSidebar } from "@/components/app-sidebar";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { Separator } from "@/components/ui/separator";
// import {
//   SidebarInset,
//   SidebarProvider,
//   SidebarTrigger,
// } from "@/components/ui/sidebar";
// import ProfileMenu from "@/components/Layout/ProfileMenu";
// import Notifications from "@/components/Layout/Notifications";

// type Props = {};

// const dashboard = async () => {

//   const cookieStore = await cookies();
//   const token = cookieStore.get("token")?.value;

//   let fetchData = null;
//   let user: any;
//   if (token) {
//     user = jwtDecode(token);
//     try {
//       const response = await axios.get(
//         `${process.env.server}/auths/user_info/`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       fetchData = response.data;
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   }

//   return (
//     <SidebarProvider>
//       <AppSidebar side="right"/>
//       <SidebarInset>
//         <div className="flex h-16 shrink-0 items-center gap-2 border-b z-50 w-full bg-white">
//           <div className="flex items-center gap-2 px-3 ">
//             <SidebarTrigger />
//             <Separator orientation="vertical" className="mr-2 h-4" />
//             <Breadcrumb>
//               <BreadcrumbList>
//                 <BreadcrumbItem className="hidden md:block">
//                   <BreadcrumbLink href="#">
//                     Building Your Application
//                   </BreadcrumbLink>
//                 </BreadcrumbItem>
//                 <BreadcrumbSeparator className="hidden md:block" />
//                 <BreadcrumbItem>
//                   <BreadcrumbPage>Data Fetching</BreadcrumbPage>
//                 </BreadcrumbItem>
//               </BreadcrumbList>
//             </Breadcrumb>
//           </div>
//           <div className="flex flex-1 justify-end px-4 gap-4">
//             <Notifications />
//             <ProfileMenu />
//           </div>
//         </div>

//         <main className='flex flex-1 flex-col gap-4 p-4"relative'>
//           <section className="w-full absolute top-16 ">
//             <Dashboard
//               user={fetchData}
//               is_me={user.user_id === fetchData.id ? true : false}
//             />
//           </section>
//         </main>
//       </SidebarInset>
//     </SidebarProvider>
//   );
// };

// export default dashboard;
import Logout from "@/components/routes/auth/logout";
import Sidebar from "@/components/version_1_1/Sidebar";
import SidebarBody from "@/components/version_1_1/Sidebar/SideBar";
import SidebarFooter from "@/components/version_1_1/Sidebar/sidebar-footer";
import ProfileEdit from "@/components/version_1_1/User/Edit/ProfileEdit";
import UserDashboard from "@/components/version_1_1/User/UserDashboard";
import Wallet from "@/components/version_1_1/User/Wallet";
import { UserInfoProvider } from "@/context/userContext";
import { perform_get } from "@/lib/api";
import { cookies } from "next/headers";
import React from "react";

type Props = {};

const page = async ({ params }: any) => {
  const token = (await cookies()).get("token")?.value;
  const response = await perform_get("auths/user_info/", token);
  const posts = await perform_get("api/v1/get_post/", token);

  // console.log(posts);

  if (response.status == 401) {
    return <div className="flex items-center justify-center w-full h-screen">کاربر پیدا نشد</div>;
  } else {
    return (
      <main className="w-full h-screen flex">
        <Sidebar>
          <SidebarBody />
          <SidebarFooter user={response} token={token} />
        </Sidebar>
        <div className="flex-1 flex flex-row-reverse h-full box-border p-5 gap-4">
          <div className="bg-foreground-100 rounded-3xl h-full w-96">
            <UserInfoProvider>
              <Wallet user={response} />
            </UserInfoProvider>
          </div>
          <div
            className=" bg-gradient-to-bl from-c_background/50 to-c_background/40 flex flex-col rounded-3xl flex-1 w-full box-border relative"
            dir="rtl"
          >
            <div className="flex  items-center px-12 box-border justify-start gap-4 h-16 rounded-t-2xl w-full bg-foreground-50 sticky top-0">
              <span className="text-xl">{response.username}</span>
              <div className="flex-1"></div>
              <ProfileEdit user={response} />
              <Logout />
            </div>

            <div className="w-full box-border flex-1 overflow-y-auto px-4">
              <UserDashboard user={response} posts={posts} />
            </div>
          </div>
        </div>
      </main>
    );
  }
};

export default page;
