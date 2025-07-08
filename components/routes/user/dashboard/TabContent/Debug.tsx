// import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";
// import { Database, icons, Phone } from "lucide-react";
// import React, { useState } from "react";

// type Props = {};

// const Debug = (props: Props) => {
//   const [tab_id, setTabId] = useState(1);
//   const TabList = [
//     {
//       id: 1,
//       label: "پیشنهادهای من",
//       content: "asdsad",
//       icon: Database,
//     },
//     {
//       id: 2,
//       label: "درخواست های من",
//       content: "fghfhfgh",
//       icon: Phone,
//     },
//   ];
//   return (
//     <div className="md:flex" dir="rtl">
//       <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0 border rounded-md p-4 box-border">
//         {TabList.map((item) => {
//           return (
//             <li key={item.id}>
//               <button
//                 onClick={() => setTabId(item.id)}
//                 className={`${
//                   item.id === tab_id ? "bg-blue-700 dark:bg-blue-600 text-background dark:text-foreground" : "text-foreground dark:text-foreground"
//                 } flex items-center px-10 py-3  rounded-lg w-full`}
//                 aria-current="page"
//               >
//                 <item.icon />
//                 <span className="w-auto px-4 text-nowrap">{item.label}</span>
//               </button>
//             </li>
//           );
//         })}
//       </ul>
//       {TabList.map((item) => {
//         return (
//           <div
//             key={item.id}
//             className={`${
//               tab_id === item.id ? "" : "hidden"
//             } p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full`}
//           >
//             {item.content}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Debug;
