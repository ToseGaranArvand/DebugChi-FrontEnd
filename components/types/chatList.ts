export interface Main {
    id:                 number;
    session_id:         string;
    debuger:            Debuger;
    debuger_applicator: Debuger;
    status:             string;
    start_at:           null;
    close_at:           null;
    description:        string;
    file:               null;
    price:              number;
    discount:           number;
    mode:               string;
    time:               number;
}

export interface Debuger {
    id:             number;
    email:          null | string;
    username:       null | string;
    image_profile:  null | string;
    user_phone:     string;
    first_name:     string;
    last_name:      string;
    uuid:           string;
    user_language:  UserLanguage[];
    user_expertise: string[];
    user_bio:       null | string;
    debugger_bio:   null | string;
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
