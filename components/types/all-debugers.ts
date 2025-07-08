export interface Main {
    id:             number;
    email:          string;
    username:       string;
    image_profile:  string;
    user_phone:     string;
    first_name:     string;
    last_name:      string;
    uuid:           string;
    user_language:  UserLanguage[];
    user_expertise: Expertise[];
    user_bio:       string;
    debugger_bio:   string;
    user_score:     number;
}

export interface Expertise {
    id:         number;
    expertise?: Expertise[];
    created_at: Date;
    updated_at: Date;
    title?:     string;
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

