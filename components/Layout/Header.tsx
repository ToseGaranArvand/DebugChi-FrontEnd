//#region old_header
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import NextTopLoader from "nextjs-toploader";
// import {
//   ArrowRightIcon,
//   Book,
//   Edit2Icon,
//   Home,
//   LogIn,
//   LogOut,
//   Settings,
//   UserRound,
// } from "lucide-react";
// import { ThemeToggle } from "../ThemeToggle";
// import Cookies from "js-cookie";

// import { Button } from "../ui/button";
// import { useRouter } from "next/navigation";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import axios from "axios";
// import { useAppDispatch, useAppSelector } from "@/redux/store/store";
// import { setUser } from "@/redux/slices/userSlice";
// import { SettingsDialog } from "../settings-dialog";
// import Notifications from "./Notifications";
// import { Separator } from "../ui/separator";
// import LoadingBar from "../Tools/LoadingBar/LoadingBar";
// import { updateRequest } from "@/redux/slices/consultSlice";

// type Props = {};

// const Header = (props: Props) => {
//   const [activeMenu, setActiveMenu] = useState<string | null>(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const router = useRouter();
//   const dispatch = useAppDispatch();
//   const user = useAppSelector((state) => state.user);

//   const menuItems = [
//     {
//       title: "دیباگ",
//       description:
//         "دیباگر مثل یک همراه باهوش است که در هر قدم برنامه‌نویسی کنارتان می‌ماند تا خطاها را شناسایی و برطرف کنید.",
//       icon: <Book />,
//       url: "/debugger",
//     },
//     {
//       title: "کوچ پروژه برنامه نویسی",
//       description:
//         "شرکت در مناقصه فرصتی برای ارائه بهترین پیشنهاد و کسب پروژه‌های کلیدی در رقابتی شفاف و هدفمند است.",
//       icon: <Edit2Icon />,
//       url: "/project/amoozeshi",
//     },
//     {
//       title: "برگزاری کلاس آموزشی",
//       description:
//         "کلاس خصوصی فرصتی برای یادگیری اختصاصی و متمرکز با توجه به نیازها و سرعت فردی فراهم می‌کند.",
//       icon: <Edit2Icon />,
//       url: "/project/amoozeshi",
//     },
//     {
//       title: "وبینار و سمینار",
//       description:
//         "وبینار فرصتی برای یادگیری اختصاصی و متمرکز با توجه به نیازها و سرعت فردی فراهم می‌کند.",
//       icon: <Edit2Icon />,
//       url: "/project/amoozeshi",
//     },
//   ];

//   useEffect(() => {

//     const token = Cookies.get("token");
//     if (token) {
//       axios
//         .get(`${process.env.server}/auths/user_info/`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         .then((res) => {
//           dispatch(setUser(res.data))
//           dispatch(updateRequest({debuger_applicator:res.data.id}))
//         })
//         .catch((err) => console.log(err));

//       setIsLoggedIn(token !== undefined);
//     }
//   }, []);

//   return (
//     <nav className="relative w-full h-20 shadow-md shadow-gray-300 dark:shadow-slate-900  flex items-center justify-start px-10 gap-10">
//       <NextTopLoader
//         color="#2299DD"
//         initialPosition={0.08}
//         crawlSpeed={200}
//         height={5}
//         crawl={true}
//         showSpinner={true}
//         easing="ease"
//         speed={200}
//         shadow="0 0 10px #2299DD,0 0 5px #2299DD"
//       />
//       <Link href={"/"}>
//         <Home />
//       </Link>

//       <ul className="h-full flex items-center">
//         <li
//           className="h-full relative flex items-center border-b-4 border-transparent hover:border-b-amber-500"
//           onMouseEnter={() => setActiveMenu("first")}
//           onMouseLeave={() => setActiveMenu(null)}
//         >
//           <Link
//             href={"/"}
//             className="hover:boder-bottom transition-all duration-500"
//           >
//             برنامه نویسم
//           </Link>

//           <ul
//             className={`absolute  -right-full top-[82px] mx-auto w-[98.5vw] bg-slate-50 dark:bg-slate-950 shadow-md ${
//               activeMenu === "first"
//                 ? "grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4 p-4"
//                 : "hidden"
//             }`}
//           >
//             {menuItems.map((item, index) => (
//               <Link href={item.url || ""} key={index}>
//                 <li key={index}>
//                   <div className="bg-white dark:bg-slate-900 text-black  rounded-lg px-6 py-8 min-h-52   ring-1 ring-slate-900/5 shadow-xl hover:bg-gradient-to-b from-slate-100 to-blue-50 dark:from-slate-900 dark:to-blue-950 transition-all ">
//                     <div>
//                       <span className="inline-flex items-center justify-center p-2 bg-indigo-500 rounded-md shadow-lg text-white">
//                         {item.icon}
//                       </span>
//                     </div>
//                     <h3 className="mt-5 text-base font-medium tracking-tight dark:text-white">
//                       {item.title}
//                     </h3>
//                     <p className=" text-muted-foreground leading-8 mt-2 text-sm">
//                       {item.description}
//                     </p>
//                   </div>
//                 </li>
//               </Link>
//             ))}
//           </ul>
//         </li>
//       </ul>

//       <Link
//         href={"/"}
//         className="hover:boder-bottom border-b-4 border-transparent hover:border-slate-900 transition-all duration-500"
//       >
//         برنامه نویس شو!
//       </Link>
//       <div className="flex-1"></div>
//       <ThemeToggle />
//       <Notifications />

//       {isLoggedIn ? (
//         <>
//           <DropdownMenu>
//             <DropdownMenuTrigger>
//               <Avatar>
//                 <AvatarImage src={user.user?.image_profile} />
//                 <AvatarFallback>CN</AvatarFallback>
//               </Avatar>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent>
//               <DropdownMenuLabel>
//                 {user.user?.username || user.user?.user_phone}
//               </DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem
//                 className="w-full flex justify-between px-2"
//                 onClick={() => router.push("/user/dashboard")}
//               >
//                 <UserRound />
//                 <span>داشبورد</span>
//               </DropdownMenuItem>
//               <DropdownMenuItem asChild className="h-10">
//                 <SettingsDialog />
//               </DropdownMenuItem>

//               <DropdownMenuItem
//                 className="w-full flex justify-between px-2"
//                 onClick={() => {
//                   Cookies.remove("token");
//                   window.location.href = "/";
//                 }}
//               >
//                 <LogOut className="mr-2 h-4 w-4 rotate-180" color="red" />
//                 <span>خروج</span>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </>
//       ) : (
//         <Link
//           href={"/auth/register"}
//           className="text-foreground bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gary-800 gap-2"
//         >
//           <LogIn />
//           <span>ورود&nbsp;یا&nbsp;ثبت نام</span>
//         </Link>
//       )}

//       <Link
//         href={"/new_project"}
//         className=" text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center inline-flex items-center me-2 dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//       >
//         پروژه سریع
//       </Link>
//     </nav>
//   );
// };

// export default Header;

//#endregion

import { Button } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { CoustomUserIcon, CustomLoginIcon, LogoIcon } from "../ui/icons";
import Link from "next/link";
import SignUp from "../routes/auth/sign-up/sign-up";
import Login from "../routes/auth/login";
import Cookies from "js-cookie";
import axios from "axios";
import { perform_get } from "@/lib/api";
import ProfileMenuButton from "../routes/user/ProfileMenuButton";
import { useAppDispatch, useAppSelector } from "@/redux/store/store";
import { showLogin, showSignUp } from "@/redux/slices/globalSlice";
type Props = {};

const Header = (props: Props) => {
  const [userData, setUserData] = useState(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const token = Cookies.get("token");
    const getUserData = async () => {
      const response = await perform_get("auths/user_info/");
      console.log(response);
      setUserData(response);
    };
    if (token) {
      getUserData();
    }
  }, []);

  return (
    <header className="flex items-center gap-4 mt-4 max-w-7xl mx-auto">
      {userData ? (
        <ProfileMenuButton user={userData} />
      ) : (
        <>
          <Button
            // onPress={() => dispatch(showSignUp(true))}
            variant="flat"
            color="default"
            startContent={<CoustomUserIcon />}
          >
            <span className="text-foreground">ثبت نام</span>
          </Button>
          <Button
            // onPress={() => dispatch(showLogin(true))}
            variant="flat"
            color="default"
            startContent={<CustomLoginIcon />}
          >
            <span className="text-foreground">ورود</span>
          </Button>
        </>
      )}
      <div className="flex-1"></div>
      <Link href={"/"}>
        <LogoIcon />
      </Link>
    </header>
  );
};

export default Header;
