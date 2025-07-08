import Image from 'next/image'
import { Message, User } from './type'
import AudioPlayer from './AudioPlayer'
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface MessageItemProps {
  message: Message
  currentUser: User | null
}

export default function MessageItem({ message, currentUser }: MessageItemProps) {
  const isOwnMessage = message.sender === currentUser?.id

  const renderContent = () => {
    switch (message.type) {
      case 'text':
        return <p>{message.content}</p>
      case 'image':
        return (
          <Dialog>
            <DialogTrigger>
              <Image
                src={message.content || "/placeholder.svg"}
                alt="Image message"
                width={200}
                height={200}
                className="cursor-pointer"
              />
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <Image
                src={message.content || "/placeholder.svg"}
                alt="Full size image"
                width={800}
                height={800}
                className="max-w-full max-h-full"
              />
            </DialogContent>
          </Dialog>
        )
      case 'document':
        return (
          <a
            href={message.content}
            download={message.fileName}
            className="text-blue-500 hover:underline"
          >
            Download {message.fileName}
          </a>
        )
      case 'audio':
        return <AudioPlayer audioUrl={message.content} />
      default:
        return null
    }
  }

  return (
    <div className={`mb-4 ${isOwnMessage ? 'text-right' : 'text-left'}`}>
      <Card className={`inline-block ${isOwnMessage ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
        <CardContent className="p-3">
          {renderContent()}
        </CardContent>
      </Card>
    </div>
  )
}

