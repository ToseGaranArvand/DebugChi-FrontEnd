export interface Consult {
    id: number;
    email: string;
    username: string | null;
    image_profile: string | null;
    user_phone: string;
    first_name: string;
    last_name: string;
    job_title?: string | null;
    user_bio?: string | null;
    debugger_bio?: string | null;
    user_score: number | null;
}

export interface PendingDebug {
    id: number;
    title: string;
    session_id: string;
    debuger: Consult;
    debuger_applicator: Consult;
    status: string;
    start_at: Date | null;
    close_at: Date | null;
    description: string;
    file: string | null;
    price: number;
    discount: number;
    mode: string;
    time: number;
}

export interface PendingConsult {
    id: number;
    title: string;
    description: string;
    session_id: string;
    consult: Consult;
    consult_applicator: Consult;
    status: string;
    start_at: Date | null;
    close_at: Date | null;
    mode: string;
    price: number;
    discount: number;
    language: string;
}

export interface PendingPrivateClass {
    id: number;
    title: string;
    private_class_teacher: Consult;
    private_class_applicator: Consult;
    description: string;
    level: string;
    time: number;
    price: number;
    discount: number;
    status: string;
    mode: string;
    language: string;
    framework: string;
    created_at: string;
    updated_at: string;
    session_id: string;
}

export interface Main {
    pending_debug: PendingDebug[];
    pending_consult: PendingConsult[];
    pending_private_class: PendingPrivateClass[];
}