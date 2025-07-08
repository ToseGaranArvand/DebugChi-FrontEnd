import { useState, useRef, useEffect } from 'react'
import { Message, User } from './type'
import MessageItem from './MessageItem'
import FileUpload from './FileUpload'
import AudioRecorder from './AudioRecorder'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Paperclip, Mic } from 'lucide-react'

interface ChatAreaProps {
  messages: Message[]
  currentUser: User | null
  selectedUser: User | null
  onSendMessage: (message: Message) => void
}

export default function ChatArea({
  messages,
  currentUser,
  selectedUser,
  onSendMessage,
}: ChatAreaProps) {
  const [inputMessage, setInputMessage] = useState('')
  const [showFileUpload, setShowFileUpload] = useState(false)
  const [showAudioRecorder, setShowAudioRecorder] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      onSendMessage({
        type: 'text',
        content: inputMessage,
        sender: currentUser?.id || '',
        receiver: selectedUser?.id || '',
      })
      setInputMessage('')
    }
  }

  const handleFileUpload = (file: File, type: 'image' | 'document') => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const base64 = event.target?.result as string
      onSendMessage({
        type,
        content: base64,
        sender: currentUser?.id || '',
        receiver: selectedUser?.id || '',
        fileName: file.name,
      })
    }
    reader.readAsDataURL(file)
    setShowFileUpload(false)
  }

  const handleAudioUpload = (audioBlob: Blob) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const base64 = event.target?.result as string
      onSendMessage({
        type: 'audio',
        content: base64,
        sender: currentUser?.id || '',
        receiver: selectedUser?.id || '',
        fileName: 'audio_message.wav',
      })
    }
    reader.readAsDataURL(audioBlob)
    setShowAudioRecorder(false)
  }

  return (
    <div className="flex-1 flex flex-col">
      <ScrollArea className="flex-1 p-4">
        {messages.map((message, index) => (
          <MessageItem key={index} message={message} currentUser={currentUser} />
        ))}
        <div ref={messagesEndRef} />
      </ScrollArea>
      <div className="border-t border-border p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Button variant="outline" size="icon" onClick={() => setShowFileUpload(true)}>
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setShowAudioRecorder(true)}>
            <Mic className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </div>
      {showFileUpload && (
        <FileUpload onUpload={handleFileUpload} onClose={() => setShowFileUpload(false)} />
      )}
      {showAudioRecorder && (
        <AudioRecorder onUpload={handleAudioUpload} onClose={() => setShowAudioRecorder(false)} />
      )}
    </div>
  )
}

