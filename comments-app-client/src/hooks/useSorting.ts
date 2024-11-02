import { useState } from 'react';

export const useSorting = () => {
    const [sortField, setSortField] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC');

    const handleSortFieldChange = (field: string | null) => {
        setSortField(field);
        setSortOrder('ASC');
    };

    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === 'ASC' ? 'DESC' : 'ASC'));
    };

    const resetSort = () => {
        setSortField(null);
        setSortOrder('ASC');
    };

    const renderSortOrderIcon = () => {
        return sortOrder === 'ASC' ? '▲' : '▼';
    };

    return {
        sortField,
        sortOrder,
        handleSortFieldChange,
        toggleSortOrder,
        resetSort,
        renderSortOrderIcon
    };
};
