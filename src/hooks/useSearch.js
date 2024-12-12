// Import necessary hooks for state management, memoization, and callbacks.
import { useState, useEffect, useMemo, useCallback } from "react";

// Define a custom hook called useSearch, which takes items and an optional array of searchFields as input.
export function useSearch(items, searchFields = ["title", "content"]) {
  // Initialize state variables using the useState hook:
  // searchTerm: The current search term entered by the user.
  const [searchTerm, setSearchTerm] = useState("");
  // debouncedTerm: The debounced search term, used to delay the search execution.
  const [debouncedTerm, setDebouncedTerm] = useState("");
  // isLoading: A boolean indicating whether a search is currently in progress.
  const [isLoading, setIsLoading] = useState(false);

  // Use useEffect to debounce the search term.
  useEffect(() => {
    // Set isLoading to true to indicate that a search is starting.
    setIsLoading(true);
    // Set a timeout to update debouncedTerm with the current searchTerm after a delay (1000ms).
    const timerId = setTimeout(() => {
      setDebouncedTerm(searchTerm);
      // Set isLoading to false after the debounced term is updated.
      setIsLoading(false);
    }, 1000);

    // Cleanup function to clear the timeout if the component unmounts or the searchTerm changes before the timeout completes.
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  // Use useMemo to memoize the search results.
  // This ensures that the results are only recalculated when the items, debouncedTerm, or searchFields change.
  const results = useMemo(() => {
    // If debouncedTerm is empty, return all items.
    if (!debouncedTerm) return items;

    // Filter the items array based on the debounced search term.
    return items.filter((item) =>
      searchFields.some((field) => {
        const fieldValue = item[field];
        // Check if the field value is a string and if it includes the debounced search term (case-insensitive).
        return (
          typeof fieldValue === "string" &&
          fieldValue.toLowerCase().includes(debouncedTerm.toLowerCase())
        );
      })
    );
  }, [items, debouncedTerm, searchFields]);

  // Use useCallback to memoize the handleSearch function.
  // This ensures that the function reference remains the same between re-renders as long as the searchTerm doesn't change.
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  // Return an object containing the search term, search handler, results, a flag indicating if searching is active, and a loading flag.
  return {
    searchTerm,
    handleSearch,
    results,
    isSearching: searchTerm !== "",
    isLoading,
  };
}
