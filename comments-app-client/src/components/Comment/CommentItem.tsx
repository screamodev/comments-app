import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Comment } from "../../types/comment";
import Modal from '../Modal/Modal';
import CommentForm from './CommentForm';
import { loadCommentReplies, createComment } from "../../api/commentApi";
import { CommentFormData } from "../../types/commentFormData";

interface CommentItemProps {
    comment: Comment;
    onReplyAdded: (newReply: Comment) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onReplyAdded }) => {
    const [showReplies, setShowReplies] = useState(false);
    const [replies, setReplies] = useState<Comment[]>(comment.replies || []);
    const [repliesLoaded, setRepliesLoaded] = useState(!!comment.replies);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleReplies = async () => {
        if (!showReplies && !repliesLoaded) {
            const loadedReplies = await loadCommentReplies(comment.id);
            setReplies(loadedReplies);
            setRepliesLoaded(true);
        }
        setShowReplies(!showReplies);
    };

    const handleReplySubmit = async (data: CommentFormData, files?: File[]) => {
        const formData = new FormData();

        formData.append('username', data.username);
        formData.append('email', data.email);
        formData.append('text', data.text);
        formData.append('parentId', String(data.parentId));

        if (files?.length) {
            files.forEach((file) => {
                formData.append('files', file);
            });
        }

        try {
            const response = await createComment(formData);
            const newReply = response.data;
            setReplies((prevReplies) => [...prevReplies, newReply]);
            onReplyAdded(newReply);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Failed to submit reply: ', error);
        }
    };

    return (
        <div className="flex mb-4 mt-4">
            <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
            <div className="flex-1">
                <div className="bg-gray-100 rounded-md p-3">
                    <div className="flex items-center justify-between">
                        <p className="font-bold text-blue-600">{comment.username || "No name"}</p>
                        <p className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleDateString()}</p>
                    </div>
                    <p
                        className="mt-2 text-gray-700"
                        dangerouslySetInnerHTML={{ __html: comment.text }}
                    ></p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-blue-500">
                        <button onClick={toggleReplies} className="flex items-center space-x-1">
                            {showReplies ? <FiChevronUp /> : <FiChevronDown />}
                            <span>{showReplies ? 'Hide Replies' : 'Show Replies'}</span>
                        </button>
                        <button onClick={() => setIsModalOpen(true)} className="hover:underline">Reply</button>
                    </div>
                </div>

                {showReplies && replies.map(reply => (
                    <div className="ml-6" key={reply.id}>
                        <CommentItem comment={reply} onReplyAdded={onReplyAdded} />
                    </div>
                ))}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-lg font-medium mb-4">Reply to the comment</h2>
                <CommentForm onSubmitComment={handleReplySubmit} />
            </Modal>
        </div>
    );
};

export default CommentItem;
