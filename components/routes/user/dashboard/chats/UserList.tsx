'use client'

import { RootState, useAppDispatch, useAppSelector } from '@/redux/store/store'
import { selectRoom, selectRoomUUID } from '@/redux/slices/chatSlice'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function UserList({uuid}: {uuid: string}) {
  const chatRooms = useAppSelector((state: RootState) => state.chat.chatRooms)
  const selectedRoomId = useAppSelector((state: RootState) => state.chat.selectedRoomId)
  const roomUUId = useAppSelector((state:RootState)=>state.chat.room_id)
  const dispatch = useAppDispatch()

  return (
    <div className="w-1/4 border-l border-border h-[80vh]">
      <h2 className="text-xl font-semibold p-4 border-b border-border">کاربران</h2>
      <ScrollArea className="h-[calc(80vh-5rem)]">
        {chatRooms && chatRooms.map((room) => {
          // اگر uuid برابر با debuger باشد، اطلاعات applicator را نمایش می‌دهیم
          const isDebuger = room.debuger.uuid === uuid;
          const user = isDebuger ? room.applicator : room.debuger;
            
          return (
            <div
              key={room._id}
              className={`flex border-b border-b-slate-100 border-r-4 items-center p-4 cursor-pointer hover:bg-accent ${selectedRoomId === room._id ? 'bg-accent border-r-4 border-slate-900' : 'border-r-transparent'}`}
              dir='rtl'
              onClick={() => {
                dispatch(selectRoom(room._id))
                dispatch(selectRoomUUID(room.room_id))
            }}
            >

              <Avatar className="h-10 w-10 ml-3">
                <AvatarImage src={`${process.env.server}/${user.image_profile}`} alt={`${user.first_name} ${user.last_name}`} />
                <AvatarFallback>{user.first_name[0]}{user.last_name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <span className="text-foreground">{user.first_name} {user.last_name}</span>
                <p className="text-sm text-muted-foreground">{room.messages[room.messages.length - 1]?.content.slice(0, 20)}...</p>
              </div>
            </div>
          );
        })}
      </ScrollArea>
    </div>
  )
}
