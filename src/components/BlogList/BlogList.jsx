import { useState } from "react";
import PropTypes from "prop-types";
// Imports custom hooks for search and filtering functionality.
import { useSearch } from "../../hooks/useSearch";
import { useFilters } from "../../hooks/useFilters";
// Imports a loading spinner component.
import { Oval } from "react-loader-spinner";
// Imports components for filtering, pagination, and displaying blog posts.
import BlogFilters from "../BlogFilters/BlogFilters";
import Pagination from "../Pagination/Pagination";
import BlogPost from "../BlogPost/BlogPost";
// Imports CSS styles for the BlogList component.
import styles from "./BlogList.module.css";

// Defines the number of posts to display per page.
const POSTS_PER_PAGE = 5;

function BlogList({ posts, isDarkMode, onEdit }) {
    // Initializes state for the current page number, defaulting to the first page.
  const [currentPage, setCurrentPage] = useState(1);

    // Uses the useFilters hook to manage filtering of blog posts.
  const {
    filters,
    handleFilterChange,
    filteredItems,
    categories,
    authors,
    allTags,
  } = useFilters(posts);

    // Uses the useSearch hook to manage searching of blog posts.
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

    // Determines which posts to display based on search and filter status.
  const displayedPosts = isSearching ? searchResults : filteredItems;
    // Calculates the total number of pages based on the number of displayed posts and posts per page.
  const totalPages = Math.ceil(displayedPosts.length / POSTS_PER_PAGE);
    // Calculates the current posts to display based on the current page and posts per page.
  const currentPosts = displayedPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div>
      {/* Container for blog controls (filters and search) */}
      <div className={styles.blogControls}>
        <BlogFilters    // Component for filtering blog posts
          filters={filters}     // Current filter values
          searchTerm={searchTerm}   // Current search term
          onSearch={handleSearch}    // Function to handle search input changes
          resultCount={searchResults.length}   // Number of search results
          onFilterChange={handleFilterChange}  // Function to handle filter changes
          categories={categories}  // Available categories for filtering
          authors={authors}      // Available authors for filtering
          allTags={allTags}      // Available tags for filtering
        />
      </div>

        {/* Container for the blog post list */}
      <div className={styles.blogList}>
        {/* Conditionally renders content based on loading and search/filter results */}
        {isLoading ? ( // Displays a loading indicator if isLoading is true
          <div className={styles.loading}>
            <Oval color="#00BFFF" height={50} width={50} />
          </div>
        ) : currentPosts.length > 0 ? ( // Displays blog posts if there are results
          <>
            <div className={styles.blogPosts}>
              {/* Maps over the currentPosts array to render each blog post */}
              {currentPosts.map((post) => (
                <BlogPost     // Component for displaying a single blog post
                  key={post.id}
                  {...post}        // Spreads all post properties as props
                  isDarkMode={isDarkMode}  // Passes the dark mode state
                  onEdit={() => onEdit(post)}   // Function to handle post editing
                  searchTerm={searchTerm}        // Passes the search term for highlighting
                />
              ))}
            </div>
                {/* Component for pagination */}
            <Pagination    
              currentPage={currentPage}     // Current page number
              totalPages={totalPages}       // Total number of pages
              onPageChange={setCurrentPage} // Function to handle page changes
            />
          </>
        ) : (
          // Displays a message if no posts match the search/filter criteria
          <div className={styles.noResults}>
            No posts found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
//proptypes for documentation and to ensure that we are passing correct data type to the component, if we pass wrong data type then it will throw an error in console
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
