export interface Main {
  [x: string]: any;
  results: Result[];
}

export interface Result {
  tender: Tender;
  bids: Bid[];
}

export interface Bid {
  id: number;
  user: CreatedBy;
  amount: string;
  created_at: Date;
  updated_at: Date;
  tender: number;
  status: boolean;
}

export interface CreatedBy {
  id: number;
  email: string;
  username: string;
  image_profile: string;
  user_phone: string;
  first_name: string;
  last_name: string;
  uuid: string;
  user_language: UserLanguage[];
  user_expertise: string[];
  user_bio: string;
  debugger_bio: string;
  user_score: number;
}

export interface UserLanguage {
  language_name: LanguageName;
}

export interface LanguageName {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  image: string;
  video: null;
  level: string;
}

export interface Tender {
  id: number;
  uuid: string;
  created_by: CreatedBy;
  active: boolean;
  title: string;
  description: string;
  image: null | string;
  project: Project | null;
  start_time: Date;
  end_time: Date;
  start_bid: number;
  highest_bid: number;
  winner: null;
  language: null | string;
  skills: null | string;
  mode: string;
  tender_like: boolean;
  tender_like_count: number;
}

export interface Project {
  id: number;
  type_class: string;
  class_session: string;
  class_title: string;
  images: Image[];
  description: string;
  educational_heading: string;
  educational_heading_file: string;
  price: number;
  discount: number;
  created_at: string;
  updated_at: string;
  start_date: string | null;
  end_date: string | null;
  buffer_date: number;
  is_deleted: boolean;
  language: null;
  expertise: null;
  users: any[];
  created_by: number;
  is_tender: boolean;
}

export interface Image {
  id: number;
  image: string;
  project: number;
}
export interface TenderDetail {
  id: number;
  uuid: string;
  active: boolean;
  title: string;
  description: string;
  image: string;
  language: string;
  skills: string;
  mode: string; // احتمالاً فقط "tender"
  tender_like: boolean;
  tender_like_count: number;
  view_count: number;
  comments_count: number;
  likes_count: number;
  start_time: string; // ISO Date
  end_time: string; // ISO Date
  start_bid: number;
  highest_bid: number;

  created_by: UserProfile;
  winner: WinnerProfile | null;

  project: ProjectDetail;
}

export interface UserProfile {
  id: number;
  email?: string;
  username: string;
  first_name: string;
  last_name: string;
  job_title?: string | null;
  image_profile: string | null;
  user_phone: string;
  uuid: string;
  user_language: UserLanguageEntry[];
  user_expertise: UserExpertiseEntry[];
  user_bio: string | null;
  debugger_bio: string | null;
  user_score: number | null;
}

export interface UserLanguageEntry {
  language_name: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    image: string;
    video: string | null;
    level: "beginner" | "intermediate" | "advanced";
  };
}

export interface UserExpertiseEntry {
  id: number;
  created_at: string;
  updated_at: string;
  expertise: {
    id: number;
    created_at: string;
    updated_at: string;
    title: string;
  }[];
}

export interface WinnerProfile {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  user_phone: string;
  job_title: string | null;
  uuid: string;
  image_profile: string | null;
  intro_completed: boolean;
  digital_wallet: number;
  blocked_wallet: number;
  safe_withdraw: number;
  user_bio: string | null;
  debugger_bio: string | null;
  user_score: number;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  created: string;
  updated: string;
  password?: string; // معمولاً نباید باشه در کلاینت
}

export interface ProjectDetail {
  id: number;
  type_class: string;
  class_session: string;
  class_title: string;
  description: string;
  educational_heading: string;
  educational_heading_file: string;
  price: number;
  discount: number;
  start_date: string;
  end_date: string;
  buffer_date: number;
  is_deleted: boolean;
  language: string;
  expertise: string;
  users: any[]; // اگر ساختار مشخص داری بگو دقیق‌تر تعریفش کنم
  created_at: string;
  updated_at: string;
  url: string;
  session_duration: number;
  view_count: number;
  comments_count: number;
  created_by: {
    id: number;
    image_profile: string;
    first_name: string;
    last_name: string;
    username: string;
  };
  images: {
    id: number;
    image: string;
    project: number;
  }[];
}
