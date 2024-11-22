import { User } from './user'

export type Comment = {
    id: number
    text: string
    createdAt: string
    parent: Comment
    user: User
    files?: CommentFile[]
    replies: Comment[]
}

export type CommentFile = {
    id: number
    filename: string
    fileType: string
    fileSize: number
    url: string
}

export type CommentFormData = {
    captcha: string
    parentId?: number
    text: string
    jobIds?: string[]
}
