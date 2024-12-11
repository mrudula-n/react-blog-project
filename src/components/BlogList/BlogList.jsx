import { useState } from "react";
import PropTypes from "prop-types";
import { useSearch } from "../../hooks/useSearch";
import { useFilters } from "../../hooks/useFilters";
import { Oval } from "react-loader-spinner";
import BlogSearch from "../BlogSearch/BlogSearch";
import BlogFilters from "../BlogFilters/BlogFilters";
import Pagination from "../Pagination/Pagination";
import BlogPost from "../BlogPost/BlogPost";
import styles from "./BlogList.module.css";

const POSTS_PER_PAGE = 5;

function BlogList({ posts, isDarkMode, onEdit }) {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    filters,
    handleFilterChange,
    filteredItems,
    categories,
    authors,
    allTags,
  } = useFilters(posts);

  const {
    searchTerm,
    handleSearch,
    results: searchResults,
    isSearching,
    isLoading, // Loading state from useSearch
  } = useSearch(filteredItems, [
    "title",
    "content",
    "author",
    "tags",
    "category",
  ]);

  const displayedPosts = isSearching ? searchResults : filteredItems;
  const totalPages = Math.ceil(displayedPosts.length / POSTS_PER_PAGE);
  const currentPosts = displayedPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div>
      <div className={styles.blogControls}>
        {/* <BlogSearch
          searchTerm={searchTerm}
          onSearch={handleSearch}
          resultCount={searchResults.length}
        /> */}
        <BlogFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          categories={categories}
          authors={authors}
          allTags={allTags}
        />
      </div>
      <div className={styles.blogList}>
        {isLoading ? ( // Show loading indicator when isLoading is true
          <div className={styles.loading}>
            <Oval color="#00BFFF" height={50} width={50} />
          </div>
        ) : currentPosts.length > 0 ? (
          <>
            <div className={styles.blogPosts}>
              {currentPosts.map((post) => (
                <BlogPost
                  key={post.id}
                  {...post}
                  isDarkMode={isDarkMode}
                  onEdit={() => onEdit(post)}
                  searchTerm={searchTerm}
                />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <div className={styles.noResults}>
            No posts found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}

BlogList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      image: PropTypes.string,
    })
  ).isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default BlogList;
