export interface User {
    id: number;
    username: string;
    password: string;
    role: "ADMIN" | "USER";
    refresh_token: string | null;
    created_at: Date;
}