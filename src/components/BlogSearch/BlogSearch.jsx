import { memo } from "react";
import PropTypes from "prop-types";
import styles from "./BlogSearch.module.css"; // Import CSS as a module

const BlogSearch = memo(function BlogSearch({
  searchTerm,
  onSearch,
  resultCount,
}) {
  return (
    <div className={styles.blogSearch}>
      <div className={styles.searchGroup}>
        <label htmlFor="searchPosts">Search Posts:</label>
        <input
          id="searchPosts"
          type="text"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className={styles.searchInput}
        />
        {searchTerm && (
          <span className={styles.searchResultsCount}>
            {resultCount} results found
          </span>
        )}
      </div>
    </div>
  );
});

BlogSearch.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  resultCount: PropTypes.number.isRequired,
};

export default BlogSearch;
