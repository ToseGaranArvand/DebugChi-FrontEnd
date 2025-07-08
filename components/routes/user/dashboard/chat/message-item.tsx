import { Message } from "@/components/types/chat.type"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Download, File, ImageIcon } from 'lucide-react'
import { WaveAudioPlayer } from "./wave-audio-player"
import { CodeBlock } from "./code-block"
import { ZoomableImage } from "./zoomable-image"
import { formatTimeAgo } from "@/utils/tools"

interface MessageItemProps {
  message: Message
  isUser: boolean
}

export function MessageItem({ message, isUser }: MessageItemProps) {
  const renderContent = () => {
    switch (message.type) {
      case 'image':
        return (
          <div className="w-64">
            <ZoomableImage
              src={message.fileUrl!}
              alt="تصویر پیام"
              className="w-full"
            />
          </div>
        )
      case 'file':
        return (
          <div className="flex items-center gap-2 bg-background/50 p-2 rounded-lg">
            <File className="h-8 w-8" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{message.fileName}</p>
              <p className="text-xs text-muted-foreground">{message.fileSize}</p>
            </div>
            <Button variant="ghost" size="icon" asChild>
              <a href={message.fileUrl} download>
                <Download className="h-4 w-4" />
              </a>
            </Button>
          </div>
        )
      case 'voice':
        return (
          <WaveAudioPlayer url={message.fileUrl!} duration={message.duration!} />
        )
      case 'code':
        return (
          <CodeBlock code={message.content} language={message.language!} />
        )
      default:
        return <p>{message.content}</p>
    }
  }

  return (
    <div
      className={`flex gap-3 ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <Avatar className="w-8 h-8">
        <AvatarImage src="/placeholder.svg" />
        <AvatarFallback>کا</AvatarFallback>
      </Avatar>
      <div
        className={`rounded-lg p-3 max-w-[80%] ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        }`}
      >
        {renderContent()}
        <span className="text-xs opacity-70 mt-1 block">
          {formatTimeAgo(message.timestamp)}
        </span>
      </div>
    </div>
  )
}

