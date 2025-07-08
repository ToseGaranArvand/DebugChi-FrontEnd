export interface Main {
    id:    number;
    name:  string;
    users: User[];
}

export interface User {
    id:             number;
    user_bio:       string;
    debugger_bio:   string;
    email:          string;
    username:       string;
    image_profile:  string;
    uuid:           string;
    user_phone:     string;
    first_name:     string;
    last_name:      string;
    user_language:  UserLanguage[];
    user_expertise: string[];
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
    level:      Level;
}

export enum Level {
    Advanced = "advanced",
    Beginner = "beginner",
    Intermediate = "intermediate",
}

export const LevelTranslations: Record<Level, string> = {
    [Level.Advanced]: "پیشرفته",
    [Level.Beginner]: "مبتدی",
    [Level.Intermediate]: "متوسط",
};