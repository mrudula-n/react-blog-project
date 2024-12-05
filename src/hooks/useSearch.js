import { useState, useEffect, useMemo, useCallback } from 'react';

export function useSearch(items, searchFields = ['title', 'content']) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timerId = setTimeout(() => {
      setDebouncedTerm(searchTerm);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  const results = useMemo(() => {
    if (!debouncedTerm) return items;

    return items.filter(item =>
      searchFields.some(field => {
        const fieldValue = item[field];
        return (
          typeof fieldValue === 'string' &&
          fieldValue.toLowerCase().includes(debouncedTerm.toLowerCase())
        );
      })
    );
  }, [items, debouncedTerm, searchFields]);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  },[]);

  return {
    searchTerm,
    handleSearch,
    results,
    isSearching: searchTerm !== '',
    isLoading,
  };
}


