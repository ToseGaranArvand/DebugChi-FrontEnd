export interface Main {
    public:  Public[];
    private: Public[];
}

export interface Public {
    id:          number;
    uuid:        string;
    active:      boolean;
    title:       string;
    description: string;
    image:       null | string;
    project:     number;
    start_time:  Date;
    end_time:    Date;
    created_by:  number;
    start_bid:   number;
    highest_bid: number;
    winner:      null;
    language:    null;
    expertise:   null;
    skills:      null;
    mode:        string;
    tender_like: boolean;
    bids:        Bid[];
}

export interface Bid {
    id:         number;
    user:       User;
    amount:     string;
    created_at: string;
    updated_at: string;
    tender:     number;
    status:     boolean;
}

export interface User {
    id:             number;
    email:          string;
    username:       string;
    image_profile:  string;
    user_phone:     string;
    first_name:     string;
    last_name:      string;
    job_title:      string;
    uuid:           string;
    user_language:  any[];
    user_expertise: any[];
    user_bio:       string;
    debugger_bio:   string;
    user_score:     number;
}
