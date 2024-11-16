import React from 'react';
import { Comment } from "../../config/types/comment";
import CommentItem from './CommentItem';

interface CommentRepliesProps {
    replies?: Comment[];
}

const CommentReplies: React.FC<CommentRepliesProps> = ({ replies }) => {
    if (!replies || replies.length === 0) return null;

    return (
        <div className="ml-6">
            {replies.map(reply => (
                <CommentItem key={reply.id} comment={reply} />
            ))}
        </div>
    );
};

export default CommentReplies;
