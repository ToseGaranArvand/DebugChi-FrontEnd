import { Card, CardContent } from "@/components/ui/card"
import { Message } from '@/redux/slices/chatSlice'
import WaveformAudio from './WaveformAudio'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface MessageItemProps {
  message: Message
  currentUserId: string
}

export default function MessageItem({ message, currentUserId }: MessageItemProps) {
  const isOwnMessage = message.sender === currentUserId


  const renderContent = () => {
    switch (message.type) {
      case 'text':
        return <p>{message.content}</p>
      case 'image':
        return <img src={message.fileUrl || "/placeholder.svg"} alt="تصویر پیام" className="max-w-xs rounded" />
      case 'file':
        return (
          <a href={message.fileUrl} download={message.content} className="text-blue-500 hover:underline">
            دانلود {message.content}
          </a>
        )
      case 'audio':
        return <WaveformAudio audioUrl={message.fileUrl || ''} />
      case 'code':
        return (
          <SyntaxHighlighter 
            language={message.language || 'javascript'} 
            style={vscDarkPlus}
            showLineNumbers={true}
            customStyle={{
              padding: '1em',
              borderRadius: '0.5em',
              fontSize: '0.8em',
            }}
          >
            {message.content}
          </SyntaxHighlighter>
        )
      default:
        return null
    }
  }

  return (
    <div className={`mb-4  ${isOwnMessage ? 'text-right' : 'text-left'}`}>
        
        
      <Card className={`inline-block max-w-md ${isOwnMessage ? 'bg-slate-300 text-secondary-foreground rounded-tr-none' : 'bg-secondary'}`}>
        <CardContent className="p-3">
          {renderContent()}
          <div className="text-xs mt-1 text-secondary-foreground">
            {new Date(message.createdAt).toLocaleTimeString('fa-IR')}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

