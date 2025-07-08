export interface Main {
    id:          number;
    is_slider:   boolean;
    title:       string;
    description: string;
    collection:  Collection[];
    created_at:  Date;
    updated_at:  Date;
}

export interface Collection {
    id:          number;
    thumbnail:   string;
    media_type:  "picture" | "video";
    post_type:   string;
    title:       string;
    caption:     string;
    file:        string;
    comments:    Comment[];
    likes:       Like[];
    likes_count: number;
    created_at:  Date;
    order:       number;
}

export interface Comment {
    id:         number;
    user:       User;
    text:       string;
    created_at: Date;
    post:       number;
}

export interface User {
    id:            number;
    first_name:    string;
    last_name:     string;
    username:      null | string;
    image_profile: null | string;
    uuid:          string;
}

export interface Like {
    id:         number;
    user:       User;
    is_liked:   boolean;
    created_at: Date;
}
