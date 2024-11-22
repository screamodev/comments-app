import axios from 'axios'
import { SortOrder } from '../config/enums/sortOrder'
import { CommentFormData } from '../config/types/comment'

const API_BASE_URL = process.env.REACT_APP_API_KEY

export const fetchComments = async (
    page: number,
    limit: number,
    field: string | null,
    order: SortOrder.asc | SortOrder.desc
) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/comments`, {
            params: { page, limit, field, order },
        })
        return response.data
    } catch (error) {
        console.error('Error fetching comments:', error)
        throw error
    }
}

export const createComment = async (
    commentData: CommentFormData,
    token: string | null
) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/comments`,
            commentData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        return response.data
    } catch (error) {
        console.error('Error creating comment:', error)
        throw error
    }
}

export const preUploadFiles = async (files: File[], token: string) => {
    const formData = new FormData()
    files.forEach((file) => formData.append('files', file))

    const { data } = await axios.post(
        `${API_BASE_URL}/comments/pre-upload`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        }
    )

    const uploadedFiles = files.map((file, index) => ({
        file,
        jobId: data.jobIds[index],
    }))

    return { uploadedFiles, jobIds: data.jobIds }
}

export const loadCommentReplies = async (commentId: number) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/comments/${commentId}/replies`
        )
        return response.data
    } catch (error) {
        console.error('Error fetching replies:', error)
        throw error
    }
}
