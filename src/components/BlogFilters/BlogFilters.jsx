import { memo } from "react"; // Import memo for performance optimization.
import PropTypes from "prop-types"; // Import PropTypes for defining data types of the component's props.
import styles from "./BlogFilters.module.css"; // Import CSS modules for styling.
import BlogSearch from "../BlogSearch/BlogSearch"; // Import the BlogSearch component.

const BlogFilters = memo(function BlogFilters({
  // Memoized BlogFilters component function.
  filters, // Current filter values.
  onFilterChange, // Function to handle filter changes.
  searchTerm, // Current search term.
  onSearch, // Function to handle search.
  resultCount, // Number of search results.
  categories = [], // Available categories for filtering.
  authors = [], // Available authors for filtering.
  allTags = [], // All available tags for filtering.
}) {
  return (
    <div className={styles.blogFilters}>
      {" "}
      {/* Container for blog filters. */}
      {/* Row 1: Search Posts and Category */}
      <div className={styles.filterRow}>
        {" "}
        {/* First row for Search and Category filters. */}
        <div className={styles.filterGroup}>
          {" "}
          {/*group for search component*/}
          <BlogSearch // BlogSearch component for searching posts.
            searchTerm={searchTerm} // Current search term.
            onSearch={onSearch} // Function to handle search input.
            resultCount={resultCount} // Number of search results to display.
          />
        </div>
        <div className={styles.filterGroup}>
          {" "}
          {/* Group for Category filter */}
          <label htmlFor="category">Category:</label>{" "}
          {/* Label for category select. */}
          <select // Select dropdown for filtering by category.
            id="category"
            value={filters.category || ""} // Set selected value based on current filter.
            onChange={(e) => onFilterChange("category", e.target.value)} // Call onFilterChange with category and selected value.
          >
            <option value="">All Categories</option>{" "}
            {/* Default option for all categories. */}
            {categories.map(
              (
                category //map through and create option value for each category
              ) =>
                category ? ( // Conditionally render option if category exists.
                  <option key={category} value={category}>
                    {" "}
                    {/* Option for each category. */}
                    {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
                    {/* Capitalize the first letter of the category. */}
                  </option>
                ) : null
            )}
          </select>
        </div>
      </div>
      {/* Row 2: Author and Tags */}
      <div className={styles.filterRow}>
        {" "}
        {/* Second row for Author and Tags filters. */}
        <div className={styles.filterGroup}>
          <label htmlFor="author">Author:</label>
          <select
            id="author"
            value={filters.author || ""}
            onChange={(e) => onFilterChange("author", e.target.value)}
          >
            <option value="">All Authors</option>
            {authors.map((author) =>
              author ? (
                <option key={author} value={author}>
                  {author.charAt(0).toUpperCase() + author.slice(1)}
                </option>
              ) : null
            )}
          </select>
        </div>
        <div className={styles.filterGroup}>
          {" "}
          {/* Group for tag filter */}
          <label>Tags:</label>
          <div className={styles.tagsFilter}>
            {" "}
            {/*div to hold all the tags checkboxes*/}
            {allTags.map(
              (
                tag // Map through all available tags.
              ) =>
                tag ? ( // Conditionally render if tag exists.
                  <label key={tag} className={styles.tagCheckbox}>
                    {" "}
                    {/*label for each tag checkbox*/}
                    <input // Checkbox for filtering by tag.
                      type="checkbox"
                      checked={filters.tags.includes(tag)} // Set checked state based on current filter.
                      onChange={(e) => {
                        const newTags = e.target.checked //if checked add the tag to filter.tags array else remove it from the array
                          ? [...filters.tags, tag]
                          : filters.tags.filter((t) => t !== tag);
                        onFilterChange("tags", newTags); // Call onFilterChange with tags and updated tag array.
                      }}
                    />
                    {tag.charAt(0).toUpperCase() + tag.slice(1)}{" "}
                    {/*capitalize first letter of tag name and display*/}
                  </label>
                ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

BlogFilters.propTypes = {
  // Define PropTypes for the component's props.
  filters: PropTypes.shape({
    //filters prop is an object
    category: PropTypes.string,
    author: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  resultCount: PropTypes.number.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string),
  authors: PropTypes.arrayOf(PropTypes.string),
  allTags: PropTypes.arrayOf(PropTypes.string),
};

export default BlogFilters; // Export the memoized BlogFilters component as the default export.
