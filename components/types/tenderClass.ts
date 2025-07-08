export interface Main {
    id:                       number;
    type_class:               "public" | "private";
    class_session:            string;
    class_title:              string;
    images:                   Image[];
    description:              string;
    educational_heading:      string;
    educational_heading_file: string;
    price:                    number;
    discount:                 number;
    created_at:               string;
    updated_at:               string;
    start_date:               string | null;
    end_date:                 string | null;
    buffer_date:              number;
    is_deleted:               boolean;
    language:                 null | string;
    expertise:                null | string;
    users:                    any[];
    created_by:               number;
    is_tender:                boolean;
}

export interface Image {
    id:      number;
    image:   string;
    project: number;
}
