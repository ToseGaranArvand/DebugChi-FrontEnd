import { io, Socket } from "socket.io-client"

interface ServerToClientEvents {
  receive_message: (data: { 
    user_id: string
    message: any
    timestamp: string 
  }) => void
  user_joined: (data: { user_id: string }) => void
}

interface ClientToServerEvents {
  join_room: (data: { room_id: string; user_id: string }) => void
  send_message: (data: { 
    room_id: string
    user_id: string
    message: {
      room_id: string
      sender_id: string
      receiver_id: string
      content: string
      type: string
      file?: any
    }
  }) => void
}

// Singleton pattern for socket connection
class SocketClient {
  private static instance: Socket<ServerToClientEvents, ClientToServerEvents>
  
  public static getInstance(): Socket<ServerToClientEvents, ClientToServerEvents> {
    if (!SocketClient.instance) {
      SocketClient.instance = io("http://localhost:3000", {
        autoConnect: false,
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5
      })

      // Global error handling
      SocketClient.instance.on("connect_error", (error) => {
        console.error("Socket connection error:", error)
      })

      SocketClient.instance.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason)
      })
    }
    return SocketClient.instance
  }
}

export const socket = SocketClient.getInstance()

export const connectSocket = (userId: string) => {
  if (!socket.connected) {
    socket.connect()
    console.log("Socket connecting with user:", userId)
  }
}

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect()
  }
}

export const joinRoom = (roomId: string, userId: string) => {
  socket.emit("join_room", { room_id: roomId, user_id: userId })
}

export const sendMessage = (
  roomId: string, 
  userId: string, 
  message: {
    room_id: string
    sender_id: string
    receiver_id: string
    content: string
    type: string
    file?: any
  }
) => {
  socket.emit("send_message", {
    room_id: roomId,
    user_id: userId,
    message
  })
}

