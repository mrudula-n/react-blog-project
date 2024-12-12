import { useFilters } from "../../hooks/useFilters";
import { useSearch } from "../../hooks/useSearch";
import { usePagination } from "../../hooks/usePagination";
import BlogSearch from "../BlogSearch/BlogSearch";
import BlogFilters from "../BlogFilters/BlogFilters";
import Pagination from "../Pagination/Pagination";
import BlogPost from "../BlogPost/BlogPost";
import { Oval } from "react-loader-spinner";
import PropTypes from "prop-types";
import styles from "./BlogList.module.css";
import { useBlog } from "../../contexts/BlogContext";
import AnimatedList from "../../components/AnimatedList/AnimatedList";
import LoadingState from "../LoadingState/LoadingState";

const POSTS_PER_PAGE = 5;

function BlogList({ isDarkMode, onFilterChange, filteredPosts }) {
  const { state } = useBlog();
  const { posts, isLoading, error } = state;

  const {
    filters,
    handleFilterChange,
    filteredItems,
    categories,
    authors,
    allTags,
  } = useFilters(filteredPosts || posts);

  console.log(filteredItems, 'Bloglist component', filteredPosts, posts);

  const {
    searchTerm,
    handleSearch,
    results: searchResults,
    isSearching,
  } = useSearch(filteredItems, ["title", "content", "author", "tags", "category"]);

  const displayedPosts = isSearching ? searchResults : filteredItems;

  const {
    items: currentPosts,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
  } = usePagination(displayedPosts, POSTS_PER_PAGE);

  if (error) {
    return (
      <div className={styles.error}>
        <p>Something went wrong: {error}</p>
      </div>
    );
  }

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
          onFilterChange={onFilterChange || handleFilterChange}
          categories={categories}
          authors={authors}
          allTags={allTags}
        />
      </div>
      <div className={styles.blogList}>
        {isLoading ?
          <LoadingState count={3}/>: currentPosts.length > 0 ? (
          <>
            <div className={styles.blogPosts}>
              <AnimatedList items={currentPosts} renderItem={(post) => <BlogPost
                  key={post.id}
                  {...post}
                  isDarkMode={isDarkMode}
                  searchTerm={searchTerm}
                /> }/>
              {/* {currentPosts.map((post) => (
                <BlogPost
                  key={post.id}
                  {...post}
                  isDarkMode={isDarkMode}
                  searchTerm={searchTerm}
                />
              ))} */}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
            />
          </>
        ) : (
          <div className={styles.noResults}>
            <p>No posts found matching your criteria.</p>
            <p>
              Try adjusting your search or filters. If no posts are available, please add
              a new post to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

BlogList.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  onFilterChange: PropTypes.func,
  filteredPosts: PropTypes.array,
};

export default BlogList;
