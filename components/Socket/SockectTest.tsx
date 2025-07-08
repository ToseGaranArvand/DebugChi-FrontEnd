// "use client"
// import socket from '@/config/socket-config'
// import axios from 'axios'
// import React, { useEffect, useRef, useState } from 'react'
// import Cookies from 'js-cookie'
// import { Input } from '../ui/input'
// import { Button } from '../ui/button'
// import { useRouter } from 'next/navigation'
// type Props = {}

// const SockectTest = (props: Props) => {
//     const user = useRef<HTMLInputElement| null>(null)
//     const [welcome,setWelcome] = useState<string>()
//     const message = useRef<HTMLInputElement | null>(null)
//     const router = useRouter()

//     const getUserInfo = async ()=>{
//         try{

//             const response = await axios.get(`${process.env.server}/auths/user_info/`,{
//                 headers: {
//                     Authorization: `Bearer ${Cookies.get("token")}`
//                 }})
//                 const data = await response.data
//                 Cookies.set("uuid",data.uuid)
//                 setWelcome(data.uuid)
//             }catch(err:any){
//                 if (err?.response.status == 401){
//                     router.push('/login')
//                 }
//             }
//     }

    
//     const sendMessage = ()=>{
//         socket.emit("message",{
//             sender_uuid:Cookies.get("uuid"),
//             receiver_uuid:user.current?.value,
//             message:message.current?.value
//         }
//             )
//     }
//     const leaveHandler = ()=>{
//         socket.emit("leave",welcome)
//     }
    
//     useEffect(()=>{

//         getUserInfo()
        
//         socket.emit("join",{uuid:Cookies.get("uuid")})
//         socket.on("welcome",(payload)=>{
//             setWelcome(payload)
          
//         })

//         socket.on("response",(payload)=>{
//             console.log(payload)
//         })
//     },[])

//   return (
//     <div className='flex flex-col gap-2 w-96'>
//        <h1>hello {welcome}</h1>
//         <Input type="text" ref={user} placeholder='user'/>
//         <Input type="text" ref={message} placeholder='message'/>
//         <Button onClick={sendMessage}>
//             send
//         </Button>
//         <Button variant={"secondary"} onClick={leaveHandler}>leave</Button>
//     </div>
//   )
// }

// export default SockectTest