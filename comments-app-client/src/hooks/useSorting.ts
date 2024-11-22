import { useState } from 'react'
import { SortOrder } from '../config/enums/sortOrder'

export const useSorting = () => {
    const [sortField, setSortField] = useState<string | null>(null)
    const [sortOrder, setSortOrder] = useState<SortOrder.asc | SortOrder.desc>(
        SortOrder.desc
    )

    const handleSortFieldChange = (field: string | null) => {
        setSortField(field)
        setSortOrder(SortOrder.asc)
    }

    const toggleSortOrder = () => {
        setSortOrder((prevOrder) =>
            prevOrder === SortOrder.asc ? SortOrder.desc : SortOrder.asc
        )
    }

    const resetSort = () => {
        setSortField(null)
        setSortOrder(SortOrder.asc)
    }

    const renderSortOrderIcon = () => {
        return sortOrder === SortOrder.asc ? '▲' : '▼'
    }

    return {
        sortField,
        sortOrder,
        handleSortFieldChange,
        toggleSortOrder,
        resetSort,
        renderSortOrderIcon,
    }
}
