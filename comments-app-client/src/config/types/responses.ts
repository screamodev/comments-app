import { User } from './user'

export type AuthResponse = {
    user: User
    token: string
}

export type PreUploadFileResponse = {
    jobIds: string[]
}
