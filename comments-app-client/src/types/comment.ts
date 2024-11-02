export interface Comment {
    id: number;
    username: string;
    email: string;
    homePage?: string;
    text: string;
    createdAt: string;
    files?: { id: number; image: string }[];
    replies?: Comment[];
}
