export interface Main {
  id: number;
  email: string;
  username: string;
  image_profile: string;
  password: string;
  user_phone: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  is_staff: boolean;
  intro_completed: boolean;
  unlimited: boolean;
  job_title: string;
  created: Date;
  updated: Date;
  uuid: string;
  user_roles: string[];
  user_resume: UserResume[];
  user_language: UserLanguage[];
  user_expertise: Expertise[];
  user_bio: string;
  debugger_bio: string;
  user_score: number;
  digital_wallet: number;
  blocked_wallet: number;
  followers: Followers;
  user_bank_cards: UserBankCard[];
  user_portfolios: UserPortfolio[];
  user_job_history: UserJobHistory[];
  user_degree: UserDegree[];
  user_main_comment: UserMainComment[];
  user_foreign_language: []
}

export interface Followers {
  count: number;
  users: User[];
}

export interface User {
  id: number;
  username: string;
  image: string;
  uuid: string;
}

export interface UserBankCard {
  id: number;
  title: string;
  card_number: string;
  default_card: boolean;
}

export interface UserDegree {
  id?: number;
  title: string;
  degree_file?: string;
  created_at?: string;
  updated_at?: string;
  user?: number;
}
export interface Expertise {
  id: number;
  expertise?: Expertise[];
  created_at: Date;
  updated_at: Date;
  title?: string;
}

export interface UserLanguage {
  language_name: LanguageName;
}

export interface UserJobHistory {
  id: number;
  created_at?: string;
  updated_at?: string;
  companyName: string;
  jobTitle: string;
  description: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
  user: number;
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

export interface UserPortfolio {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  images: Image[];
}

export interface Image {
  id: number;
  created_at: Date;
  updated_at: Date;
  image: string;
  user_portfolio: number;
}

export interface UserResume {
  id: number;
  title: string;
  description: string;
  image: null;
  cv_file: string;
  created_at: Date;
  updated_at: Date;
  user: number;
}
export interface UserMainComment {
  id: number;
  description: string;
  user: CommentedUserClass;
  commented_user: CommentedUserClass;
  rate: number;
  tags:string;
}

export interface CommentedUserClass {
  id: number;
  image_profile: string;
  first_name: string;
  last_name: string;
  username: string;
  uuid: string;
}

export interface UserForiegnLanguage {
  id: number,
  created_at: string,
  updated_at: string,
  name: string,
  rate: number,
  user: number
}