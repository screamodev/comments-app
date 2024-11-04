import React, { useState, useEffect } from 'react';
import { CommentFormData } from "../../config/types/commentFormData";
import { createComment } from "../../api/commentApi";
import { useSorting } from "../../hooks/useSorting";
import {usePagination} from "../../hooks/usePagination";
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import SortPanel from "../SortPanel/SortPanel";
import PaginationPanel from "../PaginationPanel/PaginationPanel";
import {useComments} from "../../context/CommentsContext";

const CommentsList: React.FC = () => {
    const { comments, loading, loadComments } = useComments();

    const {
        currentPage,
        commentsPerPage,
        handleNextPage,
        handlePreviousPage
    } = usePagination();

    const {
        sortField,
        sortOrder,
        handleSortFieldChange,
        toggleSortOrder,
        resetSort,
        renderSortOrderIcon
    } = useSorting();

    useEffect(() => {
        loadComments(currentPage, sortField, sortOrder);
    }, [currentPage, sortField, sortOrder]);

    const handleSubmitMainComment = async (data: CommentFormData, files?: File[]) => {
        const formData = new FormData();

        formData.append('username', data.username);
        formData.append('email', data.email);
        formData.append('text', data.text);

        if (files) {
            Array.from(files).forEach((file) => {
                formData.append('files', file);
            });
        }

        try {
            await createComment(formData);
        } catch (error) {
            console.error('Failed to submit comment: ', error);
        }
    };

    return (
        <div className="container mx-auto mt-6 flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
            {loading ? (
                <p>Loading comments...</p>
            ) : (
                <>
                    <div className="lg:w-2/3 space-y-4">
                       <SortPanel
                           sortField={sortField}
                           toggleSortOrder={toggleSortOrder}
                           resetSort={resetSort}
                           renderSortOrderIcon={renderSortOrderIcon}
                           handleSortFieldChange={handleSortFieldChange}
                       />

                        {comments.map(comment => (
                            <CommentItem
                                key={comment.id}
                                comment={comment}
                            />
                        ))}

                        <PaginationPanel
                            currentPage={currentPage}
                            handlePreviousPage={handlePreviousPage}
                            handleNextPage={handleNextPage}
                        />
                    </div>

                    <div className="lg:w-1/3 border border-gray-300 rounded-md bg-white p-4 shadow-md">
                        <h2 className="text-lg font-medium mb-4">Add a Comment</h2>
                        <CommentForm onSubmitComment={handleSubmitMainComment} />
                    </div>
                </>
            )}
        </div>
    );
};

export default CommentsList;
