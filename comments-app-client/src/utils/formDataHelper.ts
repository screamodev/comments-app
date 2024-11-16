import { CommentFormData } from "../config/types/commentFormData";

export const createCommentFormData = (data: CommentFormData): FormData => {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('text', data.text);
    formData.append('captcha', data.captcha);

    if (data.parentId) formData.append('parentId', String(data.parentId));
    if (data.homePage) formData.append('homePage', data.homePage);
    if (data.jobIds?.length) formData.append('jobIds', JSON.stringify(data.jobIds));

    return formData;
};
