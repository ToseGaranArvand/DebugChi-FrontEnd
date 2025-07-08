// "use client";
// import React, { useState } from "react";
// import SendChat from "../send";
// import TopChat from "../header";
// import ChatWithAi from "../send_ai";
// import { useSearchParams } from "next/navigation";
// import { Button, Tooltip } from "@heroui/react";
// import { Search, Volume2, VolumeOff } from "lucide-react";
// import { AnyDeskIcon } from "../../ui/icons";
// import Action from "../header/action";
// import ChatContent from "../content";
// import { ScrollArea } from "../../ui/scroll-area";
// import AiContent from "../content_ai";

// type Props = {
//   mode: string;
// };

// const MainChat = (props: Props) => {
//   return (
//     <div className="w-full flex flex-col h-full p-5 box-border bg-[#181818] rounded-tl-lg rounded-bl-lg">
//       <div className="h-24 rounded-lg bg-[#282828] flex items-center justify-start box-border px-5 max-w-4xl mx-auto w-full gap-4">
//         <TopChat />
//         <Action />
//       </div>
//       <ScrollArea className="flex-1 w-full mx-auto h-full ">
//         {props.mode == "chat" ? <ChatContent /> : ""}
//       </ScrollArea>
//       {props.mode == "ai" ? (
//         <div className="max-w-7xl h-full">
//           <AiContent />
//         </div>
//       ) : (
//         ""
//       )}
//       {props.mode == "chat" && (
//         <div className="h-24 grid grid-cols-1 rounded-md">
//           <div className=" border-stone-700 h-full">
//             <SendChat />
//           </div>
//         </div>
//       )}
//       {props.mode == "ai" && <ChatWithAi />}
//     </div>
//   );
// };

// export default MainChat;
