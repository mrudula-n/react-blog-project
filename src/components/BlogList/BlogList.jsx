import { useState } from "react"; // Imports the useState hook for managing component state.
import PropTypes from "prop-types"; // Imports PropTypes for defining data types of the component's props.
import { useSearch } from "../../hooks/useSearch"; // Imports a custom hook for search functionality.
import { useFilters } from "../../hooks/useFilters"; // Imports a custom hook for filtering functionality.
import { Oval } from "react-loader-spinner"; // Imports a loading spinner component.
import BlogFilters from "../BlogFilters/BlogFilters"; // Imports a custom BlogFilters component.
import Pagination from "../Pagination/Pagination"; // Imports a custom Pagination component.
import BlogPost from "../BlogPost/BlogPost"; // Imports a custom BlogPost component.
import styles from "./BlogList.module.css"; // Imports CSS styles specific to this component.

const POSTS_PER_PAGE = 5; // Constant defining the number of posts to display per page.

function BlogList({ posts, isDarkMode, onEdit }) { // Component to display a list of blog posts.
  const [currentPage, setCurrentPage] = useState(1); // State variable to track the current page number, initialized to 1.

  const { //using useFilters custom hook
    filters, // Current filter values.
    handleFilterChange, // Function to handle filter changes.
    filteredItems, // Items filtered based on the current filter values.
    categories, // Available categories for filtering.
    authors, // Available authors for filtering.
    allTags, // Available tags for filtering.
  } = useFilters(posts); //call the useFilters hooks with posts

  const {
    searchTerm, // Current search term.
    handleSearch, // Function to handle search input changes.
    results: searchResults, //filtered search results
    isSearching, // Flag indicating whether a search is in progress.
    isLoading, // Flag indicating whether data is loading.
  } = useSearch(filteredItems, [  //using useSearch custom hook
    "title",
    "content",
    "author",
    "tags",
    "category",
  ]);  //search in these keys

  const displayedPosts = isSearching ? searchResults : filteredItems; // If searching, display search results; otherwise, display filtered items.
  const totalPages = Math.ceil(displayedPosts.length / POSTS_PER_PAGE); // Calculate the total number of pages.
  const currentPosts = displayedPosts.slice( //get the current posts to display based on current page
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div>
      <div className={styles.blogControls}>  {/* div for blog filters */}
        <BlogFilters   //blog filters component
          filters={filters}
          searchTerm={searchTerm}
          onSearch={handleSearch}
          resultCount={searchResults.length}
          onFilterChange={handleFilterChange}
          categories={categories}
          authors={authors}
          allTags={allTags}
        />
      </div>
      <div className={styles.blogList}>   {/* div for displaying blogpost list */}
        {isLoading ? (   //if loading display loading spinner
          <div className={styles.loading}>
            <Oval color="#00BFFF" height={50} width={50} />
          </div>
        ) : currentPosts.length > 0 ? (  //if posts are there display the post and pagination
          <>
            <div className={styles.blogPosts}>  {/* div for blogposts */}
              {currentPosts.map((post) => (  //map over the currentPosts and render each blogpost
                <BlogPost
                  key={post.id}
                  {...post}
                  isDarkMode={isDarkMode}
                  onEdit={() => onEdit(post)}
                  searchTerm={searchTerm}
                />
              ))}
            </div>
            <Pagination   //pagination component
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (   //if no posts are there display no results found
          <div className={styles.noResults}>
            No posts found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}

BlogList.propTypes = {   //propTypes for the component
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

export default BlogList;  //export the bloglist component
