export interface Main {
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
  status:boolean;
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
