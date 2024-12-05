// src/hook/useFilters.js
import { useState, useMemo } from 'react';

export function useFilters(items) {
  const [filters, setFilters] = useState({
    category: 'all',
    author: 'all',
    tags: []
  });

  const categories = useMemo(
    () => ['all', ...new Set(items.map(item => item.category))],
    [items]
  );

  const authors = useMemo(
    () => ['all', ...new Set(items.map(item => item.author))],
    [items]
  );

  const allTags = useMemo(
    () => [...new Set(items.flatMap(item => item.tags))],
    [items]
  );

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const categoryMatch =
        filters.category === 'all' || item.category === filters.category;
      const authorMatch =
        filters.author === 'all' || item.author === filters.author;
      const tagsMatch =
        filters.tags.length === 0 ||
        filters.tags.some((tag) => (item.tags || []).includes(tag));

      return categoryMatch && authorMatch && tagsMatch;
    });
  }, [items, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return {
    filters,
    handleFilterChange,
    filteredItems,
    categories,
    authors,
    allTags
  };
}
