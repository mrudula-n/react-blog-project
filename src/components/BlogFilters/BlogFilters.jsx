// src/components/BlogFilters
import { memo } from "react";
import PropTypes from "prop-types";
import styles from "./BlogFilters.module.css";

const BlogFilters = memo(function BlogFilters({
  filters,
  onFilterChange,
  categories = [],
  authors = [],
  allTags = [],
}) {
  return (
    <div className={styles.blogFilters}>
      <div className={styles.filterGroup}>
        <label htmlFor="category">Category: </label>
        <select
          id="category"
          value={filters.category || ""}
          onChange={(e) => onFilterChange("category", e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) =>
            category ? (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ) : null
          )}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="author">Author: </label>
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
        <label>Tags</label>
        <div className={styles.tagsFilter}>
          {allTags.map((tag) =>
            tag ? (
              <label key={tag} className={styles.tagCheckbox}>
                <input
                  type="checkbox"
                  checked={filters.tags.includes(tag)}
                  onChange={(e) => {
                    const newTags = e.target.checked
                      ? [...filters.tags, tag]
                      : filters.tags.filter((t) => t !== tag);
                    onFilterChange("tags", newTags);
                  }}
                />
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </label>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
});

BlogFilters.propTypes = {
  filters: PropTypes.shape({
    category: PropTypes.string,
    author: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string),
  authors: PropTypes.arrayOf(PropTypes.string),
  allTags: PropTypes.arrayOf(PropTypes.string),
};

export default BlogFilters;
