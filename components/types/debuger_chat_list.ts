export interface Main {
    opened_debug:   OpenedDebug[];
    opened_consult: OpenedConsult[];
}

export interface OpenedConsult {
    id:                 number;
    title:              string;
    description:        string;
    session_id:         string;
    consult:            Consult;
    consult_applicator: Consult;
    status:             string;
    close_at:           Date;
    mode:               string;
    price:              number;
    discount:           number;
    lnaguage:           string;
    is_realtime:        boolean;

}

export interface Consult {
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

export interface OpenedDebug {
    id:                 number;
    title:              string;
    session_id:         string;
    debuger:            Consult;
    debuger_applicator: Consult;
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
}
