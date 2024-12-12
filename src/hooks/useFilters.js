// src/hook/useFilters.js
import { useState, useMemo } from 'react'; // Import useState for managing state and useMemo for memoizing values.

export function useFilters(items) { // A custom hook for filtering items based on category, author, and tags.  Takes an array of items as input.
  const [filters, setFilters] = useState({  // State variable to store the current filter values. Initialized with 'all' for category and author, and an empty array for tags.
    category: 'all',
    author: 'all',
    tags: []
  });

  //useMemo hook memoizes the value returned by a function. It helps in performance optimization by preventing recalculations.
  const categories = useMemo(  // Memoized array of unique categories, including 'all'.
    () => ['all', ...new Set(items.map(item => item.category))], //creates a new set to get unique categories and then spreads it into an array with 'all' option prepended.
    [items] // Dependency array: recalculate only when items changes.
  );

  const authors = useMemo(   // Memoized array of unique authors, including 'all'.
    () => ['all', ...new Set(items.map(item => item.author))], //creates a new set to get unique authors and then spreads it into an array with 'all' option prepended.
    [items]  // Dependency array: recalculate only when items changes.
  );

  const allTags = useMemo(   // Memoized array of unique tags across all items.
    () => [...new Set(items.flatMap(item => item.tags))],// Flattens the array of tags from each item, creates a Set to get unique tags, and then spreads it into an array
    [items] // Dependency array: recalculate only when items changes.
  );

  const filteredItems = useMemo(() => {    // Memoized array of filtered items based on the current filter values.
    return items.filter(item => {    //filters the items array based on category,author and tags match
      const categoryMatch =        // Check if the item's category matches the selected category filter. If 'all' is selected, it's a match.
        filters.category === 'all' || item.category === filters.category;
      const authorMatch =          // Check if the item's author matches the selected author filter. If 'all' is selected, it's a match.
        filters.author === 'all' || item.author === filters.author;
      const tagsMatch =          // Check if the item's tags match the selected tags filter. if no tags are selected in filter,then its a match.
        filters.tags.length === 0 ||
        filters.tags.some((tag) => (item.tags || []).includes(tag)); // Check if at least one selected tag is present in the item's tags. If the item has no tags (item.tags is null or undefined), treat it as an empty array to avoid errors.

      return categoryMatch && authorMatch && tagsMatch;  // Return true if all filter criteria match.
    });
  }, [items, filters]); // Dependency array: recalculate only when items or filters change.

  const handleFilterChange = (filterType, value) => {  // Function to update the filter state when a filter value changes.  Takes the filter type (e.g., 'category', 'author', 'tags') and the new value.
    setFilters(prev => ({    
      ...prev,   //spread previous filter values
      [filterType]: value    //update the filterType with new value
    }));
  };

  return {     //returns an object containing filter related data and functions
    filters,     //current filter values
    handleFilterChange,    //function to handle filter changes
    filteredItems,   //filtered items based on filter values
    categories,    //available categories
    authors,      //available authors
    allTags       //available tags
  };
}
