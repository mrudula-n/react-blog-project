import { useState } from "react"; // Import useState hook for managing component state.
import PropTypes from "prop-types"; // Import PropTypes for defining data types of the component's props.
import { useSearch } from "../../hooks/useSearch"; // Import custom hook for search functionality.
import { useFilters } from "../../hooks/useFilters"; // Import custom hook for filtering functionality.
import { Oval } from "react-loader-spinner"; // Import loading spinner component.
import BlogFilters from "../BlogFilters/BlogFilters"; // Import BlogFilters component.
import Pagination from "../Pagination/Pagination"; // Import Pagination component.
import BlogPost from "../BlogPost/BlogPost"; // Import BlogPost component.
import styles from "./BlogList.module.css"; // Import CSS modules for styling.

const POSTS_PER_PAGE = 5; // Constant defining the number of posts per page.

function BlogList({ posts, isDarkMode, onEdit }) { // BlogList component definition.
  const [currentPage, setCurrentPage] = useState(1); // State variable for current page number, initialized to 1.

  const { //useFilters custom hook
    filters, // Current filter values.
    handleFilterChange, // Function to handle filter changes.
    filteredItems, // Posts filtered based on the current filters.
    categories, // Available categories for filtering.
    authors, // Available authors for filtering.
    allTags, //all available tags for filtering
  } = useFilters(posts); // Call useFilters hook with posts data.

  const {
    searchTerm, // Current search term.
    handleSearch, // Function to handle search input changes.
    results: searchResults, //filtered and searched results
    isSearching, // Flag indicating if a search is in progress.
    isLoading, // Loading state from useSearch
  } = useSearch(filteredItems, [ // Call useSearch hook with filteredItems and searchable fields.
    "title",
    "content",
    "author",
    "tags",
    "category",
  ]);

  const displayedPosts = isSearching ? searchResults : filteredItems; // Determine posts to display based on search status.
  const totalPages = Math.ceil(displayedPosts.length / POSTS_PER_PAGE); // Calculate total number of pages.
  const currentPosts = displayedPosts.slice( // Get the posts for the current page.
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div>
      <div className={styles.blogControls}> {/* Container for blog controls (filters). */}
        <BlogFilters // BlogFilters component for filtering posts.
          filters={filters} // Current filter values.
          searchTerm={searchTerm} // Current search term.
          onSearch={handleSearch} // Function to handle search input changes.
          resultCount={searchResults.length} //number of search results
          onFilterChange={handleFilterChange} // Function to handle filter changes.
          categories={categories} // Available categories for filtering.
          authors={authors} // Available authors for filtering.
            allTags={allTags}  //all available tags for filtering
        />
      </div>
      <div className={styles.blogList}>  {/* Container for the blog list. */}
        {isLoading ? ( // Conditionally render loading indicator or posts.
          <div className={styles.loading}>  {/* Loading indicator. */}
            <Oval color="#00BFFF" height={50} width={50} />
          </div>
        ) : currentPosts.length > 0 ? ( //check if there are any posts to display after filtering and searching
          <>
            <div className={styles.blogPosts}> {/* Container for blog posts. */}
              {currentPosts.map((post) => ( // Map currentPosts to BlogPost components.
                <BlogPost
                  key={post.id} // Unique key for each post.
                  {...post} // Spread post properties as props for BlogPost.
                  isDarkMode={isDarkMode} // Pass isDarkMode prop to BlogPost.
                  onEdit={() => onEdit(post)} // Pass onEdit function to BlogPost.
                  searchTerm={searchTerm} // Pass searchTerm to BlogPost for highlighting.
                />
              ))}
            </div>
            <Pagination  // Pagination component for navigation between pages.
              currentPage={currentPage} // Current page number.
              totalPages={totalPages} // Total number of pages.
              onPageChange={setCurrentPage} // Function to handle page changes.
            />
          </>
        ) : (
          <div className={styles.noResults}> {/* Message displayed when no posts match criteria. */}
            No posts found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}

BlogList.propTypes = { // Define PropTypes for the component's props.
  posts: PropTypes.arrayOf( //posts is an array of objects
    PropTypes.shape({ //shape of the object
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

export default BlogList; // Export the BlogList component as the default export.
