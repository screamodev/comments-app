import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Comment } from "../../config/types/comment";
import Modal from '../Modal/Modal';
import CommentForm from './CommentForm';
import { loadCommentReplies, createComment } from "../../api/commentApi";
import { CommentFormData } from "../../config/types/commentFormData";
import { useComments } from "../../context/CommentsContext";

interface CommentItemProps {
    comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
    const [showReplies, setShowReplies] = useState(false);
    const [repliesLoaded, setRepliesLoaded] = useState(!!comment.replies);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { updateReplies } = useComments(); // Функция из контекста для обновления replies

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

    const toggleReplies = async () => {
        if (!showReplies && !repliesLoaded) {
            try {
                const loadedReplies = await loadRepliesRecursively(comment.id);
                updateReplies(comment.id, loadedReplies); // Обновляем replies через контекст
                setRepliesLoaded(true);
            } catch (error) {
                console.error("Failed to load replies: ", error);
            }
        }
        setShowReplies(!showReplies);
    };

    const handleReplySubmit = async (data: CommentFormData, files?: File[]) => {
        const formData = new FormData();

        formData.append('username', data.username);
        formData.append('email', data.email);
        formData.append('text', data.text);
        formData.append('parentId', String(comment.id));

        if (files?.length) {
            files.forEach((file) => {
                formData.append('files', file);
            });
        }

        try {
            await createComment(formData);

            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed to submit reply: ", error);
        }
    };

    return (
        <div className="flex mb-4 mt-4">
            <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
            <div className="flex-1">
                <div className="bg-gray-100 rounded-md p-3">
                    <div className="flex items-center justify-between">
                        <p className="font-bold text-indigo-600">{comment.username || "No name"}</p>
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

                {showReplies && comment.replies && comment.replies.map(reply => (
                    <div className="ml-6" key={reply.id}>
                        <CommentItem key={reply.id} comment={reply} />
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
