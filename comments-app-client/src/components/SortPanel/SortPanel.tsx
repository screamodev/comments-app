import React from 'react';

interface SortPanelProps {
    sortField: string | null;
    toggleSortOrder: () => void;
    resetSort: () => void;
    renderSortOrderIcon: () => '▲' | '▼';
    handleSortFieldChange: (field: string | null) => void;
}

const SortPanel = ({
                       sortField,
                       toggleSortOrder,
                       resetSort,
                       renderSortOrderIcon,
                       handleSortFieldChange
                   }: SortPanelProps) => {

    return (
        <div className="sort-options flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
                <select
                    value={sortField || ''}
                    onChange={(e) => handleSortFieldChange(e.target.value || null)}
                    className="px-4 py-2 border rounded bg-white shadow"
                >
                    <option value="">Sort by</option>
                    <option value="username">User Name</option>
                    <option value="email">Email</option>
                    <option value="createdAt">Date</option>
                </select>
                <button
                    onClick={toggleSortOrder}
                    disabled={!sortField}
                    className={`px-4 py-2 border rounded ${!sortField ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {sortField ? renderSortOrderIcon() : 'Order'}
                </button>
            </div>
            <button
                onClick={resetSort}
                disabled={!sortField}
                className="px-4 py-2 bg-gray-300 text-gray-700 border rounded hover:bg-gray-400 disabled:opacity-50"
            >
                Reset
            </button>
        </div>
    );
};

export default SortPanel;
