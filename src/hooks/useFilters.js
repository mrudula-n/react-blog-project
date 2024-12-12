// Import necessary hooks for state management and memoization.
import { useState, useMemo } from "react";

// Define a custom hook called useFilters, which takes items as input.
export function useFilters(items) {
  // Initialize state for filters using the useState hook.
  // The initial state includes category, author, and tags, all set to 'all' or empty arrays.
  const [filters, setFilters] = useState({
    category: "all",
    author: "all",
    tags: [],
  });

  // Use useMemo to memoize the unique categories from the items array.
  // This ensures thFat the categories array is only recalculated when the items array changes.
  const categories = useMemo(
    () => ["all", ...new Set(items.map((item) => item.category))],
    [items]
  );

  // Use useMemo to memoize the unique authors from the items array.
  // This ensures that the authors array is only recalculated when the items array changes.
  const authors = useMemo(
    () => ["all", ...new Set(items.map((item) => item.author))],
    [items]
  );

  // Use useMemo to memoize all unique tags from the items array.
  // This ensures that the allTags array is only recalculated when the items array changes.
  const allTags = useMemo(
    () => [...new Set(items.flatMap((item) => item.tags))],
    [items]
  );

  // Use useMemo to memoize the filtered items based on the current filters.
  // This ensures that the filteredItems array is only recalculated when the items or filters change.
  const filteredItems = useMemo(() => {
    // Filter the items array based on the selected category, author, and tags.
    return items.filter((item) => {
      // Check if the item's category matches the selected category filter or if the filter is set to 'all'.
      const categoryMatch =
        filters.category === "all" || item.category === filters.category;
      // Check if the item's author matches the selected author filter or if the filter is set to 'all'.
      const authorMatch =
        filters.author === "all" || item.author === filters.author;
      // Check if the item's tags match any of the selected tag filters or if no tag filters are selected.
      const tagsMatch =
        filters.tags.length === 0 ||
        filters.tags.some((tag) => (item.tags || []).includes(tag));

      // Return true if all filter conditions are met, otherwise return false.
      return categoryMatch && authorMatch && tagsMatch;
    });
  }, [items, filters]);

  // Define a function to handle changes in filter values.
  const handleFilterChange = (filterType, value) => {
    // Update the filters state with the new filter value.
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  // Return an object containing the filters, filter change handler, filtered items, categories, authors, and all tags.
  return {
    filters,
    handleFilterChange,
    filteredItems,
    categories,
    authors,
    allTags,
  };
}
