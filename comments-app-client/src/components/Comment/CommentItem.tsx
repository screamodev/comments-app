import React, { useState } from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { createComment } from '../../api/commentApi'
import { Comment, CommentFormData } from '../../config/types/comment'
import { useAuth } from '../../context/AuthContext'
import { useComments } from '../../context/CommentsContext'
import { useReplies } from '../../hooks/useReplies'
import Modal from '../Modal/Modal'
import CommentFiles from './CommentFiles'
import CommentForm from './CommentForm'
import CommentReplies from './CommentReplies'

interface CommentItemProps {
    comment: Comment
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
    const [showReplies, setShowReplies] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const { handleRepliesLoading, repliesLoaded } = useReplies(comment.id)
    const { updateReplies } = useComments()
    const { isAuthenticated, token } = useAuth()

    const toggleReplies = async () => {
        if (!showReplies && !repliesLoaded) {
            try {
                const loadedReplies = await handleRepliesLoading()
                updateReplies(comment.id, loadedReplies)
            } catch (error) {
                console.error('Failed to load replies: ', error)
            }
        }
        setShowReplies(!showReplies)
    }

    const handleReplySubmit = async (data: CommentFormData) => {
        try {
            await createComment({ ...data, parentId: comment.id }, token)
            setIsModalOpen(false)
        } catch (error) {
            console.error('Failed to submit reply:', error)
        }
    }

    return (
        <div className="flex mb-4 mt-4">
            <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
            <div className="flex-1">
                <div className="bg-gray-100 rounded-md p-3">
                    <div className="flex items-center justify-between">
                        <p className="font-bold text-indigo-600">
                            {comment.user.username || 'No name'}
                        </p>
                        <p className="text-xs text-gray-400">
                            {new Date(comment.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <p
                        className="mt-2 text-gray-700"
                        dangerouslySetInnerHTML={{ __html: comment.text }}
                    ></p>
                    <CommentFiles files={comment.files} />
                    <div className="flex items-center space-x-4 mt-2 text-sm text-blue-500">
                        <button
                            onClick={toggleReplies}
                            className="flex items-center space-x-1"
                        >
                            {showReplies ? <FiChevronUp /> : <FiChevronDown />}
                            <span>
                                {showReplies ? 'Hide Replies' : 'Show Replies'}
                            </span>
                        </button>
                        {isAuthenticated && (
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="hover:underline"
                            >
                                Reply
                            </button>
                        )}
                    </div>
                </div>
                {showReplies && <CommentReplies replies={comment.replies} />}
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-lg font-medium mb-4">
                    Reply to the comment
                </h2>
                <CommentForm onSubmitComment={handleReplySubmit} />
            </Modal>
        </div>
    )
}

export default CommentItem
