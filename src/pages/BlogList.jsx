// src/pages/BlogList.jsx
// Import necessary hooks from React library
import { useState, useEffect } from "react";
// Import useLocation and useNavigate hooks from react-router-dom for routing and query parameters
import { useLocation, useNavigate } from "react-router-dom";
// Import the BlogList component to display the list of blog posts
import BlogList from "../components/BlogList/BlogList";
// Import CSS styles for the component
import styles from "./Home.module.css";
// Import the useBlog hook to access blog data from context
import { useBlog } from "../contexts/BlogContext";

// Define the Bloglist functional component
function Bloglist() {
  // Access the blog context state using the useBlog hook
  const { state } = useBlog();
  // Destructure posts, isLoading, and error from the blog context state
  const { posts, isLoading, error } = state;
  // Initialize state for filtered posts using useState hook, initially set to an empty array
  const [filteredPosts, setFilteredPosts] = useState([]);
    // Initialize state for dark mode using useState hook
  // The initial value is retrieved from localStorage, defaulting to false if not found
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });


  // Get the current location object using useLocation hook
  const location = useLocation();
  // Get the navigate function from useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  // UseEffect hook to synchronize filtered posts with query parameters
  useEffect(() => {
    // Create a URLSearchParams object from the current location's search string
    const queryParams = new URLSearchParams(location.search);
    // Create an object to store filter values from query parameters
    const filters = {
      category: queryParams.get("category") || "",
      author: queryParams.get("author") || "",
      tag: queryParams.get("tag") || "",
      search: queryParams.get("search") || "",
    };

    // Filter the posts array based on the filter values
    const filtered = posts.filter((post) => {
      // Check if the post matches each filter criteria
      const matchesCategory = filters.category
        ? post.category === filters.category
        : true;
      const matchesAuthor = filters.author
        ? post.author === filters.author
        : true;
      const matchesTag = filters.tag ? post.tags?.includes(filters.tag) : true;
      const matchesSearch = filters.search
        ? post.title.includes(filters.search) ||
          post.content.includes(filters.search)
        : true;

      // Return true if the post matches all filter criteria
      return matchesCategory && matchesAuthor && matchesTag && matchesSearch;
    });

        // Log the found post for debugging
    console.log('filtered', filtered);

    // Update the filteredPosts state with the filtered results
    setFilteredPosts(filtered);
  // Specify the dependency array for the useEffect to run only when location.search or posts change
  }, [location.search, posts]);

  // Function to handle changes in filter values
  const handleFilterChange = (updatedFilters) => {
    // Create a URLSearchParams object from the current location's search string
    const queryParams = new URLSearchParams(location.search);

    // Iterate over the updated filter values
    Object.entries(updatedFilters).forEach(([key, value]) => {
      // If the filter value is not empty, set it in the query parameters
      if (value) {
        queryParams.set(key, value);
        // If the filter value is empty, delete it from the query parameters
      } else {
        queryParams.delete(key);
      }
    });

    // Navigate to the new URL with updated query parameters
    navigate(`?${queryParams.toString()}`);
  };

    // Render the component JSX
  return (
        // Container div with styles from Home.module.css
    <div className={styles.home}>
            {/* Main content area */}
      <main className={styles.mainContent}>
                {/* Render the BlogList component, passing the filteredPosts and dark mode setting as props */}
        <BlogList
          filteredPosts={filteredPosts}
          isDarkMode={isDarkMode}
          onFilterChange={handleFilterChange}
        />
      </main>
    </div>
  );
}

// Export the Bloglist component as the default export
export default Bloglist;
