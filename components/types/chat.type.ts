export type MessageType = 'text' | 'image' | 'file' | 'voice' | 'code';

export interface User {
  id: string
  name: string
  avatar?: string
  status: "online" | "offline"
  lastSeen?: string
  unreadCount?: number
}

export interface Message {
  id: number
  room_id: string
  sender_id: string
  receiver_id: string
  content: string
  type: MessageType
  file?: any
  timestamp: string
  fileName?: string
  fileSize?: string
  fileUrl?: string
  duration?: string
  language?: string
}

export interface ChatRoom {
  room_id: string
  participants: User[]
  messages: Message[]
}

