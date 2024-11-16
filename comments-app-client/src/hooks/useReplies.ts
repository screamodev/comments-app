import { useState } from 'react';
import { loadCommentReplies } from "../api/commentApi";

export const useReplies = (parentId: number) => {
    const [repliesLoaded, setRepliesLoaded] = useState(false);

    const handleRepliesLoading = async () => {
        const loadRepliesRecursively = async (parentId: number) => {
            const loadedReplies = await loadCommentReplies(parentId);
            for (const reply of loadedReplies) {
                if (!reply.replies || reply.replies.length === 0) {
                    const deeperReplies = await loadCommentReplies(reply.id);
                    reply.replies = deeperReplies;
                }
            }
            return loadedReplies;
        };

        const replies = await loadRepliesRecursively(parentId);
        setRepliesLoaded(true);
        return replies;
    };

    return { handleRepliesLoading, repliesLoaded };
};
