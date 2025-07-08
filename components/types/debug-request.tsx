export interface Main {
    consult: ConsultElement[];
    debug:   Debug[];
}

export interface ConsultElement {
    id:                 number;
    title:              string;
    description:        string;
    session_id:         string;
    consult:            ConsultApplicatorClass;
    consult_applicator: ConsultApplicatorClass;
    status:             string;
    start_at:           string | null;
    close_at:           string | null;
    mode:               string;
    price:              number;
    discount:           number;
    lnaguage:           string;
    is_realtime:        boolean;
    is_locked:          boolean;
}

export interface ConsultApplicatorClass {
    id:             number;
    email:          string;
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
    created_at: string;
    updated_at: string;
    image:      string;
    video:      null;
    level:      string;
}






export interface Debug {
    id:                 number;
    title:              string;
    session_id:         string;
    debuger:            ConsultApplicatorClass;
    debuger_applicator: ConsultApplicatorClass;
    status:             string;
    start_at:           string | null;
    close_at:           string | null;
    description:        string;
    file:               string;
    price:              number;
    discount:           number;
    mode:               string;
    time:               number;
    is_realtime:        boolean;
    is_locked:          boolean;
}
