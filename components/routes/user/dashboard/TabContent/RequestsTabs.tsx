// "use client";

// import React, { useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import axios from "axios";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Database, Download, MessageSquare, Phone, Video } from "lucide-react";
// import { Skeleton } from "@/components/ui/skeleton";
// import { decodeToken } from "@/utils/tools";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
// } from "@/components/ui/card";
// import Image from "next/image";
// import { Separator } from "@/components/ui/separator";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import ProfileWithImageCard from "@/components/Tools/cards/ProfileWithImageCard";
// import { performUpdate } from "@/lib/api";
// import socket from "@/config/socket-config";

// type Language = {
//   language_name: {
//     id: number;
//     name: string;
//     level: string;
//     image: string;
//     video: string | null;
//     created_at: string;
//     updated_at: string;
//   };
// };

// type User = {
//   id: number;
//   email: string;
//   username: string | null;
//   image_profile: string | null;
//   user_phone: string;
//   first_name: string;
//   last_name: string;
//   uuid: string;
//   user_language: Language[];
//   user_expertise: string[];
//   user_bio: string | null;
//   debugger_bio: string | null;
//   user_score: number;
// };

// type ConsultRequest = {
//   id: number;
//   session_id: string;
//   debuger: User;
//   debuger_applicator: User;
//   status: "pending" | "open" | "close";
//   start_at: string | null;
//   close_at: string | null;
//   description: string;
//   file: string ;
//   price: number;
//   discount: number;
//   mode: "chat" | "voice_call" | "video_call";
//   time: number;
// };

// const getModeIcon = (mode: string) => {
//   switch (mode) {
//     case "chat":
//       return <MessageSquare className="h-4 w-4" color="green" />;
//     case "voice_call":
//       return <Phone className="h-4 w-4" color="blue" />;
//     case "video_call":
//       return <Video className="h-4 w-4" color="red" />;
//     default:
//       return null;
//   }
// };

// const getStatusBadge = (status: string) => {
//   const variants = {
//     pending: "bg-yellow-500",
//     open: "bg-green-500",
//     close: "bg-red-500",
//   };

//   return (
//     <Badge className={`${variants[status as keyof typeof variants]}`}>
//       {status === "pending"
//         ? "در انتظار"
//         : status === "open"
//         ? "تایید شده"
//         : "لغو شده"}
//     </Badge>
//   );
// };






// const RequestsData = ({ filter }: { filter: "debuger_applicator" | "debuger" }) => {
//   const [requests, setRequests] = useState<ConsultRequest[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const token = Cookies.get("token");
//   const user = decodeToken(token || "");

//   useEffect(() => {
//     const fetchRequests = async () => {
//       if (token) {
//         try {
//           const response = await axios.get(
//             `${process.env.server}/api/v1/get-request-debug/`,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           console.log(response.data)
//           setTimeout(() => {
//             setRequests(response.data);
//             setLoading(false); // پایان لودینگ
//           }, 1000);
//         } catch (err) {
//           setError("خطا در دریافت اطلاعات");
//         } finally {
//           setTimeout(() => setLoading(false), 1000);
//         }
//       }
//     };

//     fetchRequests();
//   }, [token]);


//   const AcceptHandler = async (id:number,session_id:string,uuid:string,debuger:string,applicator:string)=>{
//       // const request = await performUpdate(`/api/v1/debug-hub/${id}/`,{
//       //   session_id:session_id,
//       //   status: "open"
//       // })
//       // if (request.success) {
        
//       // }

//       socket.emit("acceptedSession", {
//         success:true,
//         uuid:uuid
//       })
//       axios.post(`${process.env.nodejs_server}/api/chat/create/`,{
//         session_id:session_id,
//         debuger:debuger,
//         applicator:applicator
//       }).then(res=>{
//         if(res){
//           setRequests((prevRequests) =>
//             prevRequests.map((req) =>
//               req.id === id ? { ...req, status: "open" } : req
//         )
//       );
//     }
//       }).catch(err=>console.log(err))
//       console.log(requests)
//   }

//   if (loading) {
//     return (
//       <div className="grid gap-4 p-4">
//         {[1, 2, 3].map((i) => (
//           <Card key={i}>
//             <CardHeader>
//               <Skeleton className="h-4 w-[250px]" />
//             </CardHeader>
//             <CardContent>
//               <Skeleton className="h-4 w-[200px]" />
//             </CardContent>
//             <CardFooter>
//               <Skeleton className="h-4 w-[150px]" />
//             </CardFooter>
//           </Card>
//         ))}
//       </div>
//     );
//   }

//   const filteredRequests = requests.filter((request) =>
//     filter === "debuger_applicator"
//       ? request.debuger_applicator.id === Number(user?.user_id)
//       : request.debuger.id === Number(user?.user_id)
//   );

//   if (filteredRequests.length === 0) {
//     return <div className="p-4 text-center h-96">هیچ درخواستی یافت نشد</div>;
//   }

//   return (
//     <div className="grid gap-4 p-4">
//       {filteredRequests.map((request) => (
//         <Card key={request.id}>
//           <CardHeader className="flex flex-row items-center justify-between">
//             <div className="flex items-center gap-2">
             
//               <ProfileWithImageCard image={`http://localhost:8000/${request.debuger_applicator.image_profile}` || ''} name={request.debuger_applicator.first_name + " " + request.debuger_applicator.last_name}  speciality={request.debuger_applicator.user_expertise} user_score={request.debuger_applicator.user_score} />

//             </div>
//             {getStatusBadge(request.status)}
//           </CardHeader>
//           <Separator />

//           <CardContent className="grid grid-cols-1 h-auto">
//           <div className=" my-4">
//             <p className="text-base text-wrap text-foreground ">{request.description}</p>
//           </div>
//                 <div className="flex gap-4">
//                 {
//                   request.status === "pending" ?
//                         <>
//                         <Button onClick={()=>AcceptHandler(request.id,request.session_id,request.debuger_applicator.uuid,request.debuger.uuid,request.debuger_applicator.uuid)}>تایید</Button>
//                         <Button variant={"outline"} className="text-red-400 hover:bg-transparent">لغو</Button>
//                         </> :
//                         request.status === "open" ? (
//                           <Link href={'dashboard/chat'}>
//                             <Button variant={"default"}>ورود به چت</Button>
//                           </Link>
//                         ):<span>این چت بسته شده</span>
//                 }
            
//                 </div>
//           </CardContent>
//           <Separator />

//           <CardFooter className="flex justify-between items-center bg-slate-100">
//             <span className="text-sm text-muted-foreground">
//               قیمت: {request.price.toLocaleString()} تومان
//             </span>
//             <span className="text-sm text-muted-foreground">
//               زمان: {request.time} دقیقه
//             </span>
//             {
//         request.file &&
//           <Link
//         href={request.file}
//         download={request.file}
//         className="flex items-center gap-2 border rounded-md w-36 h-9 px-2 hover:bg-slate-100 dark:hover:bg-slate-800"
//       >
//         <span>دانلود فایل</span>
//         <Separator orientation="vertical" />
//         <Download />
//       </Link>
//       }
//           </CardFooter>
//         </Card>
//       ))}
//     </div>
//   );
// };

// const RequestsTabs = () => {
//   const [tab_id, setTabId] = useState(1);

//   const TabList = [
//     {
//       id: 1,
//       label: "پیشنهادهای من",
//       content: () => <RequestsData filter="debuger" />,
//       icon: Database,
//     },
//     {
//       id: 2,
//       label: "درخواست های من",
//       content: () => <RequestsData filter="debuger_applicator" />,
//       icon: Phone,
//     },
//   ];

//   return (
//     <div className="md:flex" dir="rtl">
//       <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0 border rounded-md p-4 box-border max-h-fit sticky top-0">
//         {TabList.map((item) => (
//           <li key={item.id}>
//             <button
//               onClick={() => setTabId(item.id)}
//               className={`${
//                 item.id === tab_id
//                   ? "bg-blue-700 dark:bg-blue-600 text-background dark:text-foreground"
//                   : "text-foreground dark:text-foreground"
//               } flex items-center px-10 py-3 rounded-lg w-full`}
//               aria-current="page"
//             >
//               <item.icon />
//               <span className="w-auto px-4 text-nowrap">{item.label}</span>
//             </button>
//           </li>
//         ))}
//       </ul>
//       {TabList.map((item) => (
//         <div
//           key={item.id}
//           className={`${
//             tab_id === item.id ? "" : "hidden"
//           } h-full bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full`}
//         >
//           <item.content />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default RequestsTabs;
