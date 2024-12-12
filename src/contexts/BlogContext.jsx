// Import necessary hooks from React library
import { createContext, useContext, useReducer, useEffect } from "react";
// Import PropTypes for prop type validation
import PropTypes from "prop-types";
// Import initial post data from the data/posts file
import { posts as initialPosts } from "../data/posts";

// Create a context for the blog data
const BlogContext = createContext();

// Define the initial state for the blog context
const initialState = {
  posts: [...initialPosts], // Initial posts array from imported data
  categories: [], // Empty array for categories
  tags: [], // Empty array for tags
  isLoading: false, // Loading state initially set to false
  error: null, // Error state initially set to null
};

// Define the reducer function to handle state updates
function blogReducer(state, action) {
  // Use a switch statement to handle different action types
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload }; // Update isLoading state
    case "SET_ERROR":
      return { ...state, error: action.payload, isLoading: false }; // Update error state and set isLoading to false
    case "SET_POSTS":
      return { ...state, posts: action.payload, isLoading: false }; // Update posts state and set isLoading to false
    case "ADD_POST":
      return {
        ...state,
        posts: [action.payload, ...state.posts], // Add new post to the beginning of the posts array
      };
    case "UPDATE_POST":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post // Update existing post with matching ID
        ),
      };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload), // Remove post with matching ID
      };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload }; // Update categories state
    case "SET_TAGS":
      return { ...state, tags: action.payload }; // Update tags state
    default:
      return state; // Return current state if action type is not recognized
  }
}

// Define the BlogProvider component to provide the blog context
export function BlogProvider({ children }) {
  // Use the useReducer hook to manage the blog state
  const [state, dispatch] = useReducer(blogReducer, initialState);

  // useEffect hook to load initial data and update localStorage
  useEffect(() => {
        // Define a function to load data
    const loadData = () => {
            // Use a try...catch block to handle potential errors during data loading
      try {
        dispatch({ type: "SET_LOADING", payload: true }); // Set isLoading to true

        // Load posts from localStorage, defaulting to an empty array if no data is found
        const savedPosts = JSON.parse(localStorage.getItem("blog_posts")) || [];

                // Determine which posts to use: saved posts if available, otherwise initial posts
        const mergedPosts =
          savedPosts.length > 0 ? savedPosts : [...initialPosts];


        dispatch({ type: "SET_POSTS", payload: mergedPosts }); // Update posts state with loaded or initial data

        // If there were no saved posts, save the initial posts to localStorage.
        if (savedPosts.length === 0) {
          localStorage.setItem("blog_posts", JSON.stringify(mergedPosts));
        }

        // Extract unique categories from posts
        const categories = [
          ...new Set(
            mergedPosts.map((post) => post.category || "Uncategorized") // Default to "Uncategorized" if no category is provided
          ),
        ];

        // Extract unique tags from posts
        const tags = [...new Set(mergedPosts.flatMap((post) => post.tags || []))]; // Use flatMap to handle posts with multiple tags

        dispatch({ type: "SET_CATEGORIES", payload: categories }); // Update categories state
        dispatch({ type: "SET_TAGS", payload: tags }); // Update tags state
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error.message }); // Dispatch error action if an error occurs
      } finally {
        dispatch({ type: "SET_LOADING", payload: false }); // Set isLoading to false in the finally block to ensure it's always reset
      }
    };

    // Call the loadData function
    loadData();
  }, []);


  // useEffect hook to synchronize posts with localStorage whenever the posts state changes
  useEffect(() => {
    // Log saved posts and current state posts for debugging
    const savedPosts = JSON.parse(localStorage.getItem("blog_posts"));
    console.log(savedPosts, 'savedPosts - blogcontext', state.posts);
    // Save the current posts state to localStorage
    localStorage.setItem("blog_posts", JSON.stringify(state.posts));
        // Trigger the effect whenever `state.posts` changes
  }, [state.posts]);

    // Render the BlogContext provider with the state and dispatch values
  return (
    <BlogContext.Provider value={{ state, dispatch }}>
      {children} {/* Render the children components within the provider */}
    </BlogContext.Provider>
  );
}

// Define propTypes for the BlogProvider component
BlogProvider.propTypes = {
  children: PropTypes.node.isRequired, // Children prop is required and must be a React node
};

// Define a custom hook to access the blog context
export const useBlog = () => {
  const context = useContext(BlogContext); // Get the context value using useContext hook
    // Throw an error if the hook is used outside of a BlogProvider
  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context; // Return the context value
};
