export interface Main {
    id:          number;
    user:        User;
    thumbnail:   string;
    media_type:  string;
    post_type:   string;
    title:       string;
    caption:     string;
    file:        string;
    comments:    any[];
    likes:       any[];
    likes_count: number;
    created_at:  string;
    order:       number;
}

export interface User {
    id:            number;
    first_name:    string;
    last_name:     string;
    username:      string;
    image_profile: string;
    uuid:          string;
}
