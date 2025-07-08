export interface Main {
    id:            number;
    category_name: string;
    title:         string;
    description:   string;
    icon:          string;
    ai_category:   AICategory[];
    created_at:    string;
    updated_at:    string;
}

export interface AICategory {
    id:          number;
    category:    number;
    title:       string;
    description: string;
    answers:     string;
    ai_answer:   AIAnswer[];
    sound:       null;
}

export interface AIAnswer {
    id:          number;
    created_at:     string;
    updated_at:     string;
    answer:         string;
    description:    string;
    type:           string;
    question:       number;
    language_type : string;
}
