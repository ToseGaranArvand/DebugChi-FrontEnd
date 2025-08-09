export interface Main {
  session_id: string;
  sender: string;
  receiver: string;
  data: chatData;
}

export interface chatData {
  id?: string;
  type: "text" | "file" | "audio" | "picture" | "anydesk" | "code" | "payment";
  text?: string;
  filename?: string;
  data?: any;
  language?: string;
  url?: string;
  time?: string;
  audioUrl?: string;
  status?: "sent" | "pending" | "recieved";
  reply?: boolean;
  uuid?: string;
  file?: File;
  created_at?: string;


  
}
