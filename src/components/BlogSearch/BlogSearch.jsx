// src/components/BlogSearch
import { memo } from "react";
import PropTypes from "prop-types";
import styles from "./BlogSearch.module.css";

const BlogSearch = memo(function BlogSearch({ searchTerm, onSearch, resultCount }) {
  return (
    <div className={styles.blogSearch}>
      <div className={styles.searchInputWrapper}>
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search posts..."
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
