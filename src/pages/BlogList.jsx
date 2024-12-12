import { useState, useEffect } from "react"; // Import necessary React hooks for managing state and side effects.
import { useLocation, useNavigate } from "react-router-dom"; // Import hooks for interacting with routing.
import BlogList from "../components/BlogList/BlogList"; // Import BlogList component.
import { posts as initialPosts } from "../data/posts"; // Import initial post data.
import styles from "./Home.module.css"; // Import CSS modules for styling.

function Bloglist() {
  const [posts, setPosts] = useState([]); // State variable for storing all blog posts.
  const [filteredPosts, setFilteredPosts] = useState([]); // State variable for storing filtered blog posts.
  const [isDarkMode] = useState(() => { // State variable for tracking dark mode, initialized from localStorage.
    return localStorage.getItem("theme") === "dark";
  });

  const location = useLocation(); // Get current location object.
  const navigate = useNavigate(); // Get navigation function for programmatic routing.

  // Load posts from localStorage or initialize with default posts
  useEffect(() => {  //runs only once after the initial render
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || []; // Retrieve saved posts from localStorage or initialize an empty array.
    const mergedPosts = [ //merge the saved posts with the initial posts to handle any new posts added
      ...savedPosts, //spread the saved posts
      ...initialPosts.filter( //filter the initial posts and add only those posts which are not present in saved posts
        (initialPost) =>
          !savedPosts.some((savedPost) => savedPost.id === initialPost.id)
      ),
    ];
    localStorage.setItem("posts", JSON.stringify(mergedPosts)); //save the merged posts to the local storage
    setPosts(mergedPosts); //set the posts state with the merged posts
  }, []);

  // Sync filtered posts with query parameters
  useEffect(() => {  //this useEffect will run whenever the location.search or posts value changes
    const queryParams = new URLSearchParams(location.search); // Get query parameters from the URL.
    const filters = {  //extract the filter values from query params
      category: queryParams.get("category") || "",
      author: queryParams.get("author") || "",
      tag: queryParams.get("tag") || "",
      search: queryParams.get("search") || "",
    };

    const filtered = posts.filter((post) => {  //filter the posts based on the filter values
      const matchesCategory = filters.category  //check if category filter is applied
        ? post.category === filters.category //check if post category matches filter category
        : true;  //if no category filter applied set to true
      const matchesAuthor = filters.author  //check if author filter is applied
        ? post.author === filters.author   //check if post author matches filter author
        : true;    //if no author filter applied set to true
      const matchesTag = filters.tag    //check if tag filter is applied
        ? post.tags?.includes(filters.tag)    //check if post tags includes the filter tag
        : true;      //if no tag filter applied set to true
      const matchesSearch = filters.search    //check if search filter is applied    
        ? post.title.includes(filters.search) ||  //check if post title or content includes the search term
          post.content.includes(filters.search)
        : true;  //if no search filter applied set to true

      return matchesCategory && matchesAuthor && matchesTag && matchesSearch; //return true if all the filters match
    });

    setFilteredPosts(filtered); //update the filteredPosts state with the filtered posts
  }, [location.search, posts]);

  // Update query parameters when filters change
  const handleFilterChange = (updatedFilters) => { // Function to handle filter changes and update query parameters.
    const queryParams = new URLSearchParams(location.search); //get the current query parameters

    Object.entries(updatedFilters).forEach(([key, value]) => { // Iterate over updated filter entries.
      if (value) {  // If value exists, set it in query parameters.
        queryParams.set(key, value);
      } else {  // Otherwise, delete the key from query parameters.
        queryParams.delete(key);
      }
    });

    navigate(`?${queryParams.toString()}`); // Navigate to the new URL with updated query parameters.
  };

  return (
    <div className={styles.home}>   {/* Main container for the home page. */}
      <main className={styles.mainContent}>   {/* Main content area. */}
        <BlogList   // Render BlogList component with filtered posts and dark mode state.
          posts={filteredPosts}  // Pass filtered posts to BlogList.
          isDarkMode={isDarkMode}   // Pass dark mode state to BlogList.
          onFilterChange={handleFilterChange}   // Pass filter change handler to BlogList.
        />
      </main>
    </div>
  );
}

export default Bloglist;  // Export the BlogList component as the default export.
