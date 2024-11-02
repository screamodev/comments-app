import axios from 'axios';

export const fetchComments = async (page: number, limit: number, field: string | null, order: 'ASC' | 'DESC') => {
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
    return axios.post(`${process.env.REACT_APP_API_KEY}/comments`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    });
};

export const loadCommentReplies = async (commentId: number) => {
    const response = await axios.get(`${process.env.REACT_APP_API_KEY}/comments/${commentId}/replies`);
    return response.data;
};
