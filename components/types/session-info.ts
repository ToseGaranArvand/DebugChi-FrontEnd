export interface Main {
    is_debuger:   boolean;
    data:         Data;
    is_commented: boolean; 
}

export interface Data {
    id:                 number;
    title:              string;
    session_id:         string;
    debuger:            Debuger;
    debuger_applicator: Debuger;
    status:             string;
    start_at:           Date;
    close_at:           null;
    description:        string;
    file:               string;
    price:              number;
    discount:           number;
    mode:               string;
    time:               number;
    is_realtime:        boolean;
    is_locked:          boolean;
    is_payed:           boolean;
}

export interface Debuger {
    id:             number;
    email:          string;
    username:       string;
    image_profile:  string;
    user_phone:     string;
    first_name:     string;
    last_name:      string;
    uuid:           string;
    user_language:  UserLanguage[];
    user_expertise: string[];
    user_bio:       string;
    debugger_bio:   string;
    user_score:     number;
}

export interface UserLanguage {
    language_name: LanguageName;
}

export interface LanguageName {
    id:         number;
    name:       string;
    created_at: Date;
    updated_at: Date;
    image:      string;
    video:      null;
    level:      string;
}
