// import { PieChartsComponent } from "@/components/Charts/PieChartsComponent";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { ArrowLeft, ChartNoAxesCombined, Code2, Crown, Edit, GitBranchPlus, Hash, Plus, User, Users } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import React, { use } from "react";
// interface LanguageName {
//   id:         number;
//   name:       string;
//   created_at: Date;
//   updated_at: Date;
//   image:      string;
//   video:      null;
//   level:      Level;
// }
// interface User {
//   id: number;
//   email: string;
//   username: string;
//   image_profile: string;
//   password: string;
//   user_phone: string;
//   first_name: string;
//   last_name: string;
//   is_active: boolean;
//   is_staff: boolean;
//   unlimited: boolean;
//   created: string; // ISO date string
//   updated: string; // ISO date string
//   uuid: string;
//   user_roles: string[];
//   user_resume: Resume[];
//   user_language: UserLanguage[];
//   user_expertise: string[];
// }
// export enum Level {
//   Advanced = "advanced",
//   Beginner = "beginner",
//   Intermediate = "intermediate",
// }
// interface UserLanguage {
//   language_name: LanguageName;
// }


// interface Resume {
//   id: number;
//   title: string;
//   description: string;
//   cv_file: string;
//   created_at: string; // ISO date string
//   updated_at: string; // ISO date string
//   user: number;
//   image:string;
  
// }
// export interface UserResume {
//   id:          number;
//   title:       string;
//   description: string;
//   image:       string;
//   cv_file:     string;
//   created_at:  Date;
//   updated_at:  Date;
//   user:        number;
// }
// type Props = {
//   is_me : boolean;
//   user: any | null;
// };

// const Profile = (props: Props) => {
//   const user: User = props.user;

//   const stats = [
//     {
//       label: "رتبه دیباگچی",
//       value: "1",
//       icon: Hash,
//     },
//     {
//       label: "تعداد بازدید",
//       value: 398,
//       icon: GitBranchPlus,
//     },
//     {
//       label: "محبوبیت",
//       value: 655,
//       icon: Crown,
//     },
//     {
//       label: "دنبال کنندگان",
//       value: 2000,
//       icon: Users,
//     },
//   ];

//   return (
//     <div className="container w-full h-auto grid grid-cols-1 gap-4">
//       <Card>
//         <CardHeader dir="rtl">
//           <CardTitle className="flex">
//             <div className="flex gap-3 items-center">
//               <Avatar className="w-14 h-14 border-2 p-2 box-border">
//                 <AvatarImage
//                   src={props.user?.image_profile || ""}
//                   alt={props.user?.first_name + " " + props.user?.last_name || ""}
//                 />
//                 <AvatarFallback>
//                   <User />
//                 </AvatarFallback>
//               </Avatar>
//               <div className="flex flex-col gap-1">
//                 <span className="text-base">
//                   {props.user?.first_name + " " + props.user?.last_name}
//                 </span>
//                 <span className="text-sm text-muted-foreground">
//                   {props.user?.email}
//                 </span>
//               </div>
//             </div>
//             <div className="flex-1"></div>
//             {
//               props.is_me ?
//             <Button variant={"outline"}>
              
//               <Edit />
//               <span>ویرایش اطلاعات</span>
//             </Button> :
//             <Button>
//               درخواست مشاوره
//             </Button>
//             }
//           </CardTitle>
//           <CardDescription></CardDescription>
//         </CardHeader>
//         <hr />
//         <CardContent className="grid grid-cols-[25%_50%_25%] gap-4" dir="rtl">
//           <div className="w-full h-full grid grid-cols-2 border box-border p-4 rounded-md">
//             <div className="flex flex-col gap-2">
//               <span>نام کاربری</span>
//               <span>ایمیل</span>
//               <span>شماره همراه</span>
//               <span>تاریخ ثبت نام</span>
//             </div>
//             <div className="flex flex-col  gap-2">
//               <span>
//                 {user.first_name}&nbsp;{user.last_name}
//               </span>
//               <span>{user.email}</span>
//               <span>{user.user_phone}</span>
//               <span>{new Date(user.created).toLocaleDateString("fa-IR")}</span>
//             </div>
//           </div>

//           <div className="w-full h-full grid grid-cols-2 gap-4">
//             {stats.map((stat: any) => {
//               return (
//                 <div
//                   className="flex flex-col gap-2 items-center justify-start border rounded-md p-4 box-border"
//                   key={stat.label}
//                 >
//                   <div className="flex w-full gap-4 items-center ">
//                     <div className="rounded-full w-12 h-12 bg-blue-600 text-background flex items-center justify-center">
//                       <span>
//                         <stat.icon />
//                       </span>
//                     </div>
//                       <span className="font-extrabold text-lg">{stat.label}</span>
                
//                     <div className="flex-1"></div>
//                   <span className="font-extrabold text-xl">{stat.value}</span>
//                   </div>
//                     <div className="w-full flex flex-row-reverse items-center gap-4 text-green-500">
//                       <ChartNoAxesCombined />
//                         <span>26+</span>
//                     </div>
//                 </div>
//               );
//             })}
//           </div>

//           <div className="border h-full rounded-md">
//             <PieChartsComponent />
//           </div>
//         </CardContent>
//         <CardFooter></CardFooter>
//       </Card>

//       <Card>
//         <CardHeader dir="rtl">
//           <CardTitle className="flex">
//             <div className="flex gap-3 items-center">
//               <Avatar className="w-14 h-14 border-2 p-2 box-border">
//                 {/* <AvatarImage
//                   src={""}
//                   alt={props.user?.first_name + " " + props.user?.last_name}
//                 /> */}
//                 <AvatarFallback>
//                   <Code2 />
//                 </AvatarFallback>
//               </Avatar>
//               <div className="flex flex-col gap-1">
//                 <span className="text-base">
//                   مهارت های من
//                 </span>
//               </div>
//             </div>
//             <div className="flex-1"></div>
//             {
//               props.is_me &&
//             <Button variant={"outline"} className="text-blue-500">
//               <Plus />
//               <span>مهارت جدید</span>
//             </Button>
//             }
//           </CardTitle>
//           <CardDescription></CardDescription>
//         </CardHeader>
//         <hr />
//         <CardContent className="flex gap-4" dir="rtl">
//               {
//                 user.user_language.map((item)=>{
//                   return(
//                     <div key={item.language_name.id} className="flex flex-col w-40 items-center h-40 border rounded-md">
//                         <Image src={item.language_name.image || ""} alt={item.language_name.name + " " + item.language_name.level} width={100} height={100}/>
//                         <span>{item.language_name.name}</span>
//                         <span className="text-muted-foreground">{item.language_name.level}</span>
//                     </div>
//                   )
//                 })
//               }
//         </CardContent>
//         <CardFooter></CardFooter>
//       </Card>
      
//       <Card>
//         <CardHeader dir="rtl">
//           <CardTitle className="flex">
//             <div className="flex gap-3 items-center">
//               <Avatar className="w-14 h-14 border-2 p-2 box-border">
//                 {/* <AvatarImage
//                   src={""}
//                   alt={props.user?.first_name + " " + props.user?.last_name}
//                 /> */}
//                 <AvatarFallback>
//                   <Code2 />
//                 </AvatarFallback>
//               </Avatar>
//               <div className="flex flex-col gap-1">
//                 <span className="text-base">
//                  رزومه های من
//                 </span>
//               </div>
//             </div>
//             <div className="flex-1"></div>
//             {
//               props.is_me &&
//             <Button variant={"outline"}>
//               <Plus />
//               <span>رزومه جدید</span>
//             </Button>
//             }
//           </CardTitle>
//           <CardDescription></CardDescription>
//         </CardHeader>
//         <hr />
//         <CardContent className="flex flex-wrap gap-4 h-96" dir="rtl">
//               {
//                 user.user_resume.map((item)=>{
//                   return(
//                     <div key={item.id} className="flex flex-col gap-2 w-72 h-full border rounded-md">
                    
//                       <Image src={item.image  ? item.image : '/images/domingo.jpg'} alt={item.title} width={300} height={500}  className="border"/>
//                       <div className=" flex justify-between px-4 h-full items-center">
//                       <span>{item.title}</span>
//                       {/* <span className="text-muted-foreground">{item.description}</span> */}
//                       <Link href={`/user/resume/${item.id}`} className=" flex text-sm gap-3 items-center text-blue-500">
//                       <span>مشاهده رزومه</span>
//                       <ArrowLeft size={16}/>
//                       </Link>
//                       </div>
//                     </div>
//                   )
//                 })
//               }
//         </CardContent>
//         {/* <CardFooter></CardFooter> */}
//       </Card>
      
        
//     </div>
//   );
// };

// export default Profile;
