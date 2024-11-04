import axios from 'axios';
import {SortOrder} from "../config/enums/sortOrder";

export const fetchComments = async (page: number, limit: number, field: string | null, order: SortOrder.asc | SortOrder.desc) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_KEY}/comments`, {
            params: { page, limit, field, order }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw error;
    }
};


export const createComment = async (formData: FormData) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_KEY}/comments`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
            return response.data;
    } catch (error) {
        console.error("Error creating comment:", error);
        throw error;
    }
};

export const loadCommentReplies = async (commentId: number) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_KEY}/comments/${commentId}/replies`);
        return response.data;
    } catch (error) {
        console.error("Error fetching replies:", error);
        throw error;
    }
};
