import React from 'react'
import { createComment } from '../api/commentApi'
import AuthForm from '../components/Auth/AuthForm'
import CommentForm from '../components/Comment/CommentForm'
import CommentsList from '../components/Comment/CommentList'
import { CommentFormData } from '../config/types/comment'
import { useAuth } from '../context/AuthContext'

const Home: React.FC = () => {
    const { isAuthenticated, token } = useAuth()

    const handleSubmitMainComment = async (data: CommentFormData) => {
        try {
            await createComment(data, token)
        } catch (error) {
            console.error('Failed to submit comment:', error)
        }
    }

    return (
        <div className="container mx-auto mt-6 flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
            <CommentsList />
            {isAuthenticated ? (
                <CommentForm onSubmitComment={handleSubmitMainComment} />
            ) : (
                <AuthForm />
            )}
        </div>
    )
}

export default Home
