import React, { useEffect } from 'react'
import { useComments } from '../../context/CommentsContext'
import { usePagination } from '../../hooks/usePagination'
import { useSorting } from '../../hooks/useSorting'
import PaginationPanel from '../PaginationPanel/PaginationPanel'
import SortPanel from '../SortPanel/SortPanel'
import CommentItem from './CommentItem'

const CommentsList: React.FC = () => {
    const { comments, loading, loadComments } = useComments()
    const { currentPage, handleNextPage, handlePreviousPage } = usePagination()
    const {
        sortField,
        sortOrder,
        handleSortFieldChange,
        toggleSortOrder,
        resetSort,
        renderSortOrderIcon,
    } = useSorting()

    useEffect(() => {
        loadComments(currentPage, sortField, sortOrder)
    }, [currentPage, sortField, sortOrder])

    if (loading) {
        return <p>Loading comments...</p>
    }

    return (
        <div className="lg:w-2/3 space-y-4">
            <SortPanel
                sortField={sortField}
                toggleSortOrder={toggleSortOrder}
                resetSort={resetSort}
                renderSortOrderIcon={renderSortOrderIcon}
                handleSortFieldChange={handleSortFieldChange}
            />

            {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
            ))}

            <PaginationPanel
                currentPage={currentPage}
                handlePreviousPage={handlePreviousPage}
                handleNextPage={handleNextPage}
            />
        </div>
    )
}

export default CommentsList
