import ProfileWithImageCard from "@/components/Tools/cards/ProfileWithImageCard";
import RequestConsultant from "@/components/Tools/Request/RequestConsultant";
import { LevelTranslations, Main, User } from "@/components/types/UserByRole";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, FastForward, FastForwardIcon, MessageCircle, MonitorPlay, Phone, PhoneCall, ScreenShare, Star, VideoIcon } from "lucide-react";
import { cookies, headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { title } from "process";
import React from "react";

type Props = {
  data: User;
  debugger_applicator:number;

};


const size = 14
const options = [
    {
        title:"پاسخ سریع",
        icon:FastForwardIcon
    },
    {
        title:"مشاوره آنلاین",
        icon:PhoneCall
    },
    {
        title:"ریموت سریع",
        icon:ScreenShare 
    }
]
const options_2 = [
    {
        title:"تلفنی",
        icon:Phone
    },
    {
        title:"متنی",
        icon:MessageCircle
    },
    {
        title:"ویدیویی",
        icon:MonitorPlay
    }
]



const DebuggerCards = ({ data ,debugger_applicator}: Props) => {
  
  return (
        <Link href={`/debugger/${data.uuid}`} className="hover:bg-slate-100 hover:dark:bg-slate-800 box-border rounded-lg p-2 ">
    <Card >
      <CardHeader >
    <CardTitle className="flex items-center">
        {/* <ProfileWithImageCard
          name={`${data.first_name} ${data.last_name}`}
          image={data.image_profile}
          speciality={data.user_expertise}
          user_score={data.user_score}
          /> */}
        <div className="flex-1"></div>
        <div className="w-auto h-full flex items-center">
          <RequestConsultant debugger={data.id} debugger_applicator={debugger_applicator} uuid={data.uuid}/>
        </div>
          </CardTitle>
        
      </CardHeader>
      <CardContent>
        <div className="flex flex-col w-3/4 gap-4">
          <p className="text-base text-muted-foreground">{data.debugger_bio}</p>
          <div className="flex gap-4 flex-wrap">
            {data.user_language
              .map((lang) => (
                <div key={lang.language_name.id}>
                  <Badge
                    variant={"secondary"}
                    className=" flex gap-4 items-center"
                  >
                    <Image
                      src={lang.language_name.image}
                      width={20}
                      height={20}
                      alt={
                        lang.language_name.name + " " + LevelTranslations[lang.language_name.level]
                      }
                    />
                    <span>
                      {lang.language_name.name} {LevelTranslations[lang.language_name.level]}
                    </span>
                  </Badge>
                </div>
              ))
              .slice(0, 6)}
            {data.user_language.length > 6 && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                 
                    <EllipsisVertical size={16} />
    
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {data.user_language
                    .map((lang) => (
                      <DropdownMenuItem
                        key={lang.language_name.id}
                        className=" flex gap-4 items-center justify-between box-border px-4"
                      >
                        <span>
                          {lang.language_name.name} {lang.language_name.level}
                        </span>
                        <Image
                          src={lang.language_name.image}
                          width={20}
                          height={20}
                          alt={
                            lang.language_name.name +
                            " " +
                            lang.language_name.level
                          }
                        />
                      </DropdownMenuItem>
                    ))
                    .slice(6, data.user_language.length)}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardContent>
      <hr />
      <CardFooter className="flex items-end justify-end gap-4 bg-slate-50 dark:bg-slate-900 rounded-bl-xl rounded-br-xl">
       <div className="flex-1 flex gap-4">
       {options_2.map((item)=>{
        return(
            <Badge  variant={"secondary"} key={item.title} className="flex gap-2 text-sm mt-4">
                <item.icon size={size} color="gray"/>
                <span className="text-muted-foreground">{item.title}</span>
            </Badge>
        )
       })}
       </div>
       {/* <div className="flex-1"></div> */}
       {options.map((item)=>{
        return(
            <Badge variant={"secondary"} key={item.title} className="flex gap-2 text-sm mt-4">
                <item.icon size={size} color="red"/>
                <span>{item.title}</span>
            </Badge>
        )
       })}
       
      </CardFooter>
    </Card>
    </Link>

  );
};

export default DebuggerCards;
