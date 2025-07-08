"use client"
import {socket} from '@/config/socket-config'
import React, { useEffect, useState } from 'react'

type Props = {}
type ChatMessage = {
    sender_uuid: string;
    message: string;
  };
const ChatSpcket = (props: Props) => {
    const [chat,setChat] = useState<ChatMessage[]>([])

    useEffect(()=>{
        socket.on("response",(payload:any)=>{
            console.log(payload)
            setChat((prev)=>[
                ...prev,payload
            ])
        })
    },[])

  return (
    <div>
        {chat && chat.map((message:any,index)=>{
            return(
                <div key={index + 1}>
                    <span>{message.sender_uuid} : {message.message} - {index + 1}</span>
                </div>
            )
        })}
    </div>
  )
}

export default ChatSpcket