// "use client"

// import * as React from "react"
// import { Send, ImageIcon, Paperclip, Code } from 'lucide-react'
// import { Message, MessageType, User } from "@/components/types/chat.type"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { MessageItem } from "./message-item"
// import { VoiceRecorder } from "./voice-recorder"
// import { CodeEditor } from "./code-editor"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { useChat } from "@/hooks/use-chat"
// import PreviewDialog from "./preview-dialog"
// import { cn } from "@/lib/utils"
// import { useAppDispatch, useAppSelector } from "@/redux/store/store"
// import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
// import { FeedbackForm } from "./feedback"
// import { addFeedback } from "@/redux/slices/feedbackSlice"

// // Mock current user - In real app, get from auth


// interface PreviewState {
//   type: "voice" | "image" | "file" | null
//   file: File | null
// }

// const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
// type Props = {
//   user_id: any,
//   data:any
// }
// export default function Chat(props:Props) {
//   const dispatch = useAppDispatch()
//   const new_user = props.data[0]
//   const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)

  
//   const name = new_user.debuger.id === props.user_id ? "مهدی حیدری" : "علیرضا یوسف نژاد"
//   const CURRENT_USER_ID = "user_1"
//   console.log(props.user_id)
//   // Mock users - In real app, get from API
//   const users: User[] = [
//     {
//       id: 'user_1',
//       name:name,
//       status: "online",
//       unreadCount: 3,
//     }
//   ]
  
 
  
 
//   const [selectedUser, setSelectedUser] = React.useState<string>("")
//   const [newMessage, setNewMessage] = React.useState("")
//   const [isUploading, setIsUploading] = React.useState(false)
//   const [preview, setPreview] = React.useState<PreviewState>({
//     type: null,
//     file: null
//   })
  
//   const fileInputRef = React.useRef<HTMLInputElement>(null)
//   const scrollRef = React.useRef<HTMLDivElement>(null)

//   // Generate room ID from user IDs
//   const roomId = [CURRENT_USER_ID, selectedUser.id].sort().join('_')

//   const { 
//     messages, 
//     isConnected, 
//     isJoined,
//     onlineUsers,
//     sendMessage: sendChatMessage 
//   } = useChat({
//     currentUserId: CURRENT_USER_ID,
//     roomId,
//     otherUser: selectedUser
//   })

//   React.useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight
//     }
//   }, [messages])




//   const handleFeedbackSubmit = (rating: number, comment: string) => {
//     dispatch(addFeedback({
//       sessionId: String(selectedUser),
//       rating,
//       comment,
//       timestamp: new Date().toISOString()
//     }))
//     setIsDrawerOpen(false)
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!newMessage.trim()) return
    
//     sendChatMessage(newMessage, 'text')
//     setNewMessage("")
//   }

//   const handleFileUpload = async (file: File) => {
//     if (file.size > MAX_FILE_SIZE) {
//       alert("حجم فایل نباید بیشتر از 5 مگابایت باشد")
//       return
//     }

//     const type = file.type.startsWith('image/') ? 'image' : 'file'
//     setPreview({ type, file })
//   }

//   const handleVoiceRecordingComplete = async (blob: Blob) => {
//     const file = new File([blob], "voice-message.webm", { type: "audio/webm" })
//     setPreview({ type: 'voice', file })
//   }

//   const handlePreviewConfirm = async () => {
//     if (!preview.file) return

//     setIsUploading(true)
//     try {
//       // In real app, upload file to server first
//       const fileUrl = URL.createObjectURL(preview.file)
      
//       if (preview.type === 'image') {
//         sendChatMessage("", 'image', {
//           url: fileUrl,
//           name: preview.file.name,
//           size: preview.file.size
//         })
//       } else if (preview.type === 'file') {
//         sendChatMessage("", 'file', {
//           url: fileUrl,
//           name: preview.file.name,
//           size: preview.file.size
//         })
//       } else if (preview.type === 'voice') {
//         sendChatMessage("", 'voice', {
//           url: fileUrl,
//           duration: "0:30" // In real app, calculate duration
//         })
//       }
//     } catch (error) {
//       console.error('Error uploading file:', error)
//       alert('خطا در آپلود فایل')
//     } finally {
//       setIsUploading(false)
//       setPreview({ type: null, file: null })
//     }
//   }

//   const handleCodeSubmit = (code: string, language: string) => {
//     sendChatMessage(code, 'code')
//   }

//   return (
//     <div className="flex flex-col md:flex-row gap-4 w-full max-w-6xl mx-auto h-[90vh]">
//       {/* لیست کاربران */}
//       <Card className="md:w-80 h-full">
//         <div className="p-4 border-b">
//           <h2 className="font-semibold">گفتگوها</h2>
//           <div className="text-sm text-muted-foreground">
//             {/* {!isConnected ? (
//               "در حال اتصال..."
//             ) : !isJoined ? (
//               "در حال پیوستن به گفتگو..."
//             ) : null} */}
//           </div>
//         </div>
//         <ScrollArea className="h-[calc(100%-69px)]">
//           <div className="p-2" dir="rtl">
//             {users.map((user) => (
//               <button
//                 key={user.id}
//                 onClick={() => setSelectedUser(user)}
//                 className={cn(
//                   "w-full flex items-center gap-3 p-3 rounded-lg transition-colors",
//                   selectedUser.id === user.id ? 'bg-muted' : 'hover:bg-muted/50'
//                 )}
//               >
//                 <Avatar>
//                   <AvatarImage src={user.avatar || "/placeholder.svg"} />
//                   <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
//                 </Avatar>
//                 <div className="flex-1 text-start">
//                   <div className="flex justify-between items-center">
//                     <span className="font-medium">{user.name}</span>
//                     {user.unreadCount && (
//                       <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                         {user.unreadCount}
//                       </span>
//                     )}
//                   </div>
//                   <p className="text-sm text-muted-foreground">
//                     {onlineUsers.has(user.id) ? "آنلاین" : user.lastSeen}
//                   </p>
//                 </div>
//               </button>
//             ))}
//           </div>
//         </ScrollArea>
//       </Card>

    
//       {/* <Card className="flex-1 flex flex-col">
     
//         <div className="p-4 border-b">
//           <div className="flex items-center gap-3">
//             <Avatar>
//               <AvatarImage src={selectedUser.avatar || "/placeholder.svg"} />
//               <AvatarFallback>{selectedUser.name.slice(0, 2)}</AvatarFallback>
//             </Avatar>
//             <div>
//               <h3 className="font-semibold">{selectedUser.name}</h3>
//               <p className="text-sm text-muted-foreground">
//                 {selectedUser.status === "online" ? "آنلاین" : selectedUser.lastSeen}
//               </p>
//             </div>
//           </div>
//         </div>

    
//         <ScrollArea ref={scrollRef} className="flex-1 p-4">
//           <div className="space-y-4">
//             {messages.map((message) => (
//               <MessageItem
//                 key={message.id}
//                 message={message}
//                 isUser={message.sender_id === CURRENT_USER_ID}
//               />
//             ))}
//           </div>
//         </ScrollArea>

        
//         <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
//           <input
//             type="file"
//             ref={fileInputRef}
//             className="hidden"
//             onChange={(e) => {
//               const file = e.target.files?.[0]
//               if (file) {
//                 handleFileUpload(file)
//               }
//             }}
//           />
//           <Button
//             type="button"
//             variant="ghost"
//             size="icon"
//             onClick={() => fileInputRef.current?.click()}
//             disabled={isUploading}
//           >
//             <Paperclip className="h-4 w-4" />
//           </Button>
//           <Button
//             type="button"
//             variant="ghost"
//             size="icon"
//             onClick={() => {
//               fileInputRef.current!.accept = "image/*"
//               fileInputRef.current?.click()
//             }}
//             disabled={isUploading}
//           >
//             <ImageIcon className="h-4 w-4" />
//           </Button>
//           <Dialog>
//             <DialogTrigger asChild>
//               <Button variant="ghost" size="icon">
//                 <Code className="h-4 w-4" />
//               </Button>
//             </DialogTrigger>
//             <DialogContent className="max-w-4xl">
//               <DialogHeader>
//                 <DialogTitle>ارسال کد</DialogTitle>
//               </DialogHeader>
//               <div className="mt-4">
//                 <CodeEditor onSubmit={handleCodeSubmit} />
//               </div>
//             </DialogContent>
//           </Dialog>
//           <VoiceRecorder onRecordingComplete={handleVoiceRecordingComplete} />
//           <Input
//             placeholder="پیام خود را بنویسید..."
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             className="flex-1"
//           />
//           <Button type="submit" size="icon" disabled={!newMessage.trim()}>
//             <Send className="h-4 w-4" />
//           </Button>
//         </form>
//       </Card> */}

   
//       <PreviewDialog
//         open={preview.type !== null}
//         onOpenChange={(open) => {
//           if (!open) setPreview({ type: null, file: null })
//         }}
//         type={preview.type as "voice" | "image" | "file"}
//         file={preview.file as File}
//         onConfirm={handlePreviewConfirm}
//       />
//         <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
//         <DrawerContent>
//           <div className="mx-auto w-full max-w-sm">
//             <DrawerHeader>
//               <DrawerTitle>نظر شما درباره این جلسه</DrawerTitle>
//             </DrawerHeader>
//             <div className="p-4">
//               <FeedbackForm onSubmit={handleFeedbackSubmit} />
//             </div>
//           </div>
//         </DrawerContent>
//       </Drawer>
//     </div>
//   )
// }

