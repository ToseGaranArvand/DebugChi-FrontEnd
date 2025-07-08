"use client";
import React, { useEffect, useState } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { Bell, Dot, Clock, Video, PhoneCall, User, MessageCircleCodeIcon } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import {socket} from '@/config/socket-config'
import { useAppSelector } from '@/redux/store/store'
import Cookies from 'js-cookie'
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { getCookies } from '@/utils/tools';
import Link from 'next/link';

type Debug = {
  id: number
  session_id: string
  debuger_applicator: {
    username: string
    image_profile: string
    first_name: string
    last_name: string
    user_phone:string
  }
  status: string
  mode: string
  price: number
  time: number
  description: string
}

const Notifications = () => {
  const [new_message, set_new_message] = useState(false)
  const [accepted,setAccepted] = useState(false)
  const token = Cookies.get("token")
  const user = useAppSelector(state => state.user)
  const [debug, setNewDebug] = useState<Debug[]>([])
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const uuid = getCookies('uuid')
  useEffect(() => {
    const fetchNewData = async () => {
      
      try {
        if(token){

          const response = await fetch(`${process.env.server}/api/v1/get-request-debug/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setNewDebug(data)
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (uuid) {
      socket.emit("join", uuid)
      socket.on('recieve_notification', (data) => {
        if (data.new_debugg) {
          set_new_message(true)
          fetchNewData()
        }
      })
    }
    socket.on("sessionAccepted",(data)=>{
      if (data.success) {
        set_new_message(true)
        setAccepted(true)
      }
    })

    fetchNewData()
  }, [socket])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className='relative' onClick={() =>{
         set_new_message(false);
         setOpen(true)
      }}>
        <Dot size={36} className={`absolute bottom-0 left-0 ${new_message ? 'animate-ping' : 'hidden'}`} color='blue' />
        <Bell className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]" side={"left"}>
        <SheetHeader>
          <SheetTitle>اعلانات</SheetTitle>
          <SheetDescription>
            {new_message ? 'پیام جدید دارید' : 'پیام جدید ندارید'}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          {accepted && <Card>
            <CardHeader>
              <CardTitle>درخواست</CardTitle>
              <CardContent>درخواست شما پذیرفته شده است</CardContent>
              <CardFooter>
                <Link href={'/user/dashboard/chat'}>
                <Button>مشاهده</Button>
                </Link>
              </CardFooter>
            </CardHeader>
            
            </Card>}
          {debug.length > 0 && debug.filter(item=>item.status == 'pending').map((item) => (
            <Card key={item.id} className="relative overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={item.debuger_applicator.image_profile} alt={item.debuger_applicator.username || item.debuger_applicator.user_phone} />
                    <AvatarFallback><User /></AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{item.debuger_applicator.username || item.debuger_applicator.user_phone}</p>
                      <Badge variant={item.status === 'pending' ? 'outline' : 'default'} className="capitalize">
                        <span>در انتظار شما</span>
                      </Badge>
                    </div>

                    
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">

                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {item.time} mins
                      </div>
                      <div className="flex items-center gap-1">
                      {item.mode === 'chat' && <MessageCircleCodeIcon className='h-3 w-3'/>}
                      {item.mode === 'video_call' && <Video className='h-3 w-3'/>}
                      {item.mode === 'voice_call' && <PhoneCall className='h-3 w-3'/>}
                        <span>{item.mode}</span> 
                      </div>
                      <div className="flex items-center gap-1 my-4">
                        <span className="font-medium">{item.price}</span>
                        <span>تومان</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.description}</p>

                  </div>
                </div>
              </CardContent>
              <CardFooter className='flex gap-4'>
                <Button variant={"default"} className='w-full' onClick={()=>{
                  router.push('/user/dashboard?tab_id=درخواست ها')
                  setOpen(false)
                }
               
                  }>مشاهده</Button>
                <Button variant={"outline"} className='w-full text-red-400 border hover:text-red-400'>لغو</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default Notifications

