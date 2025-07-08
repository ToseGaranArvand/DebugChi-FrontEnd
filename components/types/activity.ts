export interface Main {
    incoming_request: IncomingRequest;
    my_requests:      IncomingRequest;
}

export interface IncomingRequest {
    debug:   Debug[];
    consult: ConsultElement[];
}

export interface ConsultElement {
    id:                 number;
    created_at:         Date;
    updated_at:         Date;
    title:              string;
    description:        string;
    session_id:         string;
    status:             string;
    close_at:           Date;
    mode:               string;
    price:              number;
    discount:           number;
    lnaguage:           string;
    consult:            ConsultApplicatorClass;
    consult_applicator: ConsultApplicatorClass;
}

export interface ConsultApplicatorClass {
    id:               number;
    password:         string;
    last_login:       Date | null;
    is_superuser:     boolean;
    username:         null | string;
    email:            string;
    first_name:       string;
    last_name:        string;
    user_phone:       string;
    is_active:        boolean;
    is_staff:         boolean;
    unlimited:        boolean;
    created:          Date;
    updated:          Date;
    job_title:        null | string;
    uuid:             string;
    intro_completed:  boolean;
    digital_wallet:   number;
    blocked_wallet:   number;
    user_bio:         null | string;
    debugger_bio:     null | string;
    user_score:       number;
    image_profile:    null | string;
    groups:           any[];
    user_permissions: any[];
}

export interface Debug {
    id:                 number;
    created_at:         Date;
    updated_at:         Date;
    title:              string;
    session_id:         string;
    status:             string;
    start_at:           Date;
    close_at:           Date | null;
    mode:               string;
    price:              number;
    discount:           number;
    file:               string;
    description:        string;
    time:               number;
    debuger:            ConsultApplicatorClass;
    debuger_applicator: ConsultApplicatorClass;
}
