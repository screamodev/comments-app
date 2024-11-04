import {CommentFile} from "./commentFile";

export interface Comment {
    id: number;
    username: string;
    email: string;
    homePage?: string;
    parent: Comment;
    text: string;
    createdAt: string;
    files?: CommentFile[];
    replies: Comment[];
}
