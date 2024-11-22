import React from 'react'

interface PaginationPanelProps {
    currentPage: number
    handlePreviousPage: () => void
    handleNextPage: () => void
}

const PaginationPanel = ({
    currentPage,
    handlePreviousPage,
    handleNextPage,
}: PaginationPanelProps) => {
    return (
        <div className="pagination flex justify-center space-x-2 mt-4">
            <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded disabled:opacity-50"
            >
                Previous
            </button>
            <button
                onClick={handleNextPage}
                className="px-4 py-2 border rounded"
            >
                Next
            </button>
        </div>
    )
}

export default PaginationPanel
