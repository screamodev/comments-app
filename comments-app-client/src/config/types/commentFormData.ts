export interface CommentFormData {
    username: string;
    email: string;
    homePage?: string;
    captcha: string;
    parentId?: number;
    text: string;
    files?: File[];
    jobIds?: string[];
}