import { socket } from "./../config/socket-config";
import { io, Socket } from "socket.io-client";

let socket1: Socket;

export function connectSocket(userId: string): Socket {
  socket1 = io(process.env.nodejs_server, {
    autoConnect: true,
    query: { userId },
    // transports: ["websocket"],
  });

  socket1.on("connect", () => {
    console.log("✅ اتصال برقرار شد", socket1.id);
  });

  socket1.on("connect_error", (err) => {
    console.error("❌ خطای اتصال:", err.message);
  });

  return socket1;
}
export async function createChatRoom(
  debuger: string,
  applicator: string,
  session_id: string,
  token: string
): Promise<any> {
  try {
    const response = await fetch(
      `${process.env.nodejs_server}/api/chat/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          debuger: debuger,
          applicator: applicator,
          session_id: session_id,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "خطا در ایجاد اتاق چت");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export function joinRoom(roomId: string, userId: string) {
  socket1.emit("join_room", { room_id: roomId, user_id: userId });
  console.log(`📥 وارد اتاق شد`);
}
export function sendMessage(
  roomId: string,
  senderId: string,
  receiverId: string,
  content: string,
  type: "text" | "code" | "image" | "file" = "text",
  language?: string
) {
  socket1.emit("send_message", {
    room_id: roomId,
    message: {
      sender_id: senderId,
      receiver_id: receiverId,
      content,
      type,
      language,
    },
  });
}
export function onReceiveMessage(callback: (data: any) => void) {
  socket1.on("receive_message", (data) => {
    console.log("📩 پیام دریافت شد", data);
    callback(data);
  });
}
export function sendAudioMessage(
  sessionId: string,
  sender: string,
  receiver: string,
  base64Audio: any
) {
  socket1.emit("send_audio", {
    session_id: sessionId,
    sender,
    receiver,
    data: {
      audioUrl: base64Audio,
      type: "audio",
      created_at: new Date().toISOString(),
      status: "pending",
    },
  });
}
export function sendFileMessage(
  roomId: string,
  senderId: string,
  receiverId: string,
  base64File: any,
  fileType = "image"
) {
  const socket1 = getSocket();
  socket1.emit("send_message", {
    room_id: roomId,
    message: {
      sender_id: senderId,
      receiver_id: receiverId,
      content: "فایل ارسال شد",
      type: fileType,
      file: base64File,
    },
  });
}
export async function fetchMessages(roomId: string): Promise<any> {
  return new Promise((resolve, reject) => {
    if (!socket1 || !socket1.connected) {
      return reject("اتصال به سرور برقرار نیست");
    }

    socket1.emit("get_messages", { roomId });

    socket1.on("get_messages", (data) => {
      resolve(data);
    });
  });
}

export function updateMessageStatus(
  roomId: string,
  messageId: string,
  updates: object
) {
  socket1.emit("update_message", {
    room_id: roomId,
    message_id: messageId,
    updated_data: updates,
  });
}
export function leaveRoom(roomId: string, userId: string) {
  socket1.emit("leave_room", { room_id: roomId, user_id: userId });
  console.log(`🚪 خارج شد از اتاق ${roomId}`);
}
export function disconnectSocket() {
  if (socket1) {
    socket1.disconnect();
    console.log("🔌 اتصال قطع شد");
  }
}
export function getSocket(): Socket {
  if (!socket1) throw new Error("❌ Socket not connected yet.");
  return socket1;
}
