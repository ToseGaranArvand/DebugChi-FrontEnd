export type UserInfo = {
  email: string;
  username: string;
  image_profile: string | null;
  user_phone: string;
  first_name: string;
  last_name: string;
  job_title: string | null;
  user_bio?: string | null;
  debugger_bio: string | null;
  user_score: number | null;
  id: number | null;
  uuid: string | null;
};

export type Applicator = UserInfo & {
  user_language: string[];
  user_expertise: string[];
  id: number;
  uuid: string;
};

type SessionData = {
  id: number;
  title: string;
  description: string;
  session_id: string;
  consult: UserInfo;
  debuger: UserInfo;
  consult_applicator: Applicator;
  debuger_applicator: Applicator;
  status: "pending" | "accepted" | "rejected" | string; // اگر فقط این سه مقدار نیستن، `string` رو نگه دار
  start_at: string | null;
  close_at: string | null;
  mode: "text" | "file" | "audio" | "picture" | "anydesk" | "code" | "payment";
  price: number;
  discount: number;
  language: string;
  is_realtime: boolean;
  is_locked: boolean;
  is_payed: boolean;
  is_rejected: boolean;
  rejected_by: string | null;
};

export type SessionInfoResponse = {
  data: SessionData;
  sender: string;
  receiver: string;
  teacher_id: number | null;
  extra_services: additionalServicesType[];
  is_debuger: boolean;
  is_commented: boolean;
};

export type additionalServicesType = {
  can_cancel: boolean;
  price: number;
  service_type: "debug" | "consultation" | "private_class";
  voiceCall?: boolean;
  videoCall?: boolean;
  session_duration_minutes: number;
  session_date: string;
};

export interface SessionInfoResponse2 {
  session_id: string;
  sender: string;
  receiver: string;
  data: chatData2;
}

export interface chatData2 {
  id: string;
  type: "file" | "text" | "audio" | "picture" | "anydesk" | "code" | "payment";
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
