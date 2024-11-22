import { useState } from 'react'

export const usePagination = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const commentsPerPage = 25

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1)
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1)
        }
    }

    return {
        currentPage,
        commentsPerPage,
        handleNextPage,
        handlePreviousPage,
    }
}
