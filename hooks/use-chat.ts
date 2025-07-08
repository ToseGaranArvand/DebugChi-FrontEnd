import { useEffect, useState, useCallback } from 'react'
import { Message, User } from '@/components/types/chat.type'
import { socket, connectSocket, joinRoom, sendMessage } from '@/lib/socket'

interface UseChatProps {
  currentUserId: string
  roomId: string
  otherUser: User
}

export function useChat({ currentUserId, roomId, otherUser }: UseChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [isJoined, setIsJoined] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Connect to socket
    connectSocket(currentUserId)
    
    // Join the room
    joinRoom(roomId, currentUserId)

    // Socket event listeners
    socket.on('connect', () => {
      setIsConnected(true)
      // Rejoin room after reconnection
      joinRoom(roomId, currentUserId)
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
      setIsJoined(false)
    })

    socket.on('user_joined', (data) => {
      setOnlineUsers(prev => new Set(prev).add(data.user_id))
      setIsJoined(true)
    })

    socket.on('receive_message', (data) => {
      setMessages(prev => [...prev, {
        id: Date.now(), // In real app, get from server
        ...data.message,
        timestamp: data.timestamp
      }])
    })

    // Cleanup
    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('user_joined')
      socket.off('receive_message')
    }
  }, [currentUserId, roomId])

  const sendChatMessage = useCallback(async (
    content: string, 
    type: Message['type'] = 'text',
    file?: any
  ) => {
    const messageData = {
      room_id: roomId,
      sender_id: currentUserId,
      receiver_id: otherUser.id,
      content,
      type,
      file,
    }

    sendMessage(roomId, currentUserId, messageData)
  }, [roomId, currentUserId, otherUser.id])

  return {
    messages,
    isConnected,
    isJoined,
    onlineUsers,
    sendMessage: sendChatMessage
  }
}

