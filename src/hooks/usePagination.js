// src/hooks/usePagination.js
import { useMemo, useState, useCallback } from 'react';

export function usePagination(items, itemsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => 
    Math.ceil(items.length / itemsPerPage),
    [items.length, itemsPerPage]
  );

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const goToPage = useCallback((page) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  }, [totalPages]);

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const prevPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  return {
    items: paginatedItems,
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1
  };
}
