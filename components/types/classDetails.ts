export interface Main {
    id:                       number;
    type_class:               TypeClass;
    class_session:            string;
    class_title:              string;
    images:                   Image[];
    description:              string;
    educational_heading:      string;
    educational_heading_file: string;
    price:                    number;
    discount:                 number;
    created_at:               Date;
    updated_at:               Date;
    start_date:               Date | null;
    end_date:                 Date | null;
    buffer_date:              number;
    is_deleted:               boolean;
    language:                 null | string;
    expertise:                null | string;
    users:                    any[];
    created_by:               CreatedBy;
    is_tender:                boolean;
    url:                       string;
}


export interface CreatedBy {
    id:            number;
    image_profile: string;
    first_name:    string;
    last_name:     string;
    username:      string;
}


export interface Image {
    id:      number;
    image:   string;
    project: number;
}

export enum TypeClass {
    Private = "private",
    Public = "public",
}
