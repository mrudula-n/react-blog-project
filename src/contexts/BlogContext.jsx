// Imports necessary hooks from React for creating context, managing state, and side effects.
import { createContext, useContext, useReducer, useEffect } from 'react';
// Imports PropTypes for prop validation.
import PropTypes from 'prop-types';

// Creates a context object for managing blog-related data.
const BlogContext = createContext();

// Defines the initial state for the blog context.
const initialState = {
  posts: [], // An empty array to store blog posts.
  categories: [], // An empty array to store post categories.
  tags: [], // An empty array to store post tags.
  isLoading: false, // A boolean indicating whether data is currently being loaded.
  error: null // Stores any error messages during data loading.
};

// Defines a reducer function that updates the state based on dispatched actions.
function blogReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }; // Updates the isLoading state.
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false }; // Sets an error message and resets isLoading.
    case 'SET_POSTS':
      return { ...state, posts: action.payload, isLoading: false }; // Sets the posts data and resets isLoading.
    case 'ADD_POST':
      return { ...state, posts: [action.payload, ...state.posts] }; // Adds a new post to the beginning of the posts array.
    case 'UPDATE_POST':
      return {
        ...state,
        posts: state.posts.map(post => (post.id === action.payload.id ? action.payload : post)) // Updates an existing post.
      };
    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload) // Removes a post from the array.
      };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload }; // Set categories
    case 'SET_TAGS':
      return { ...state, tags: action.payload }; // Set tags
    default:
      return state; // Returns the current state if the action type is not recognized.
  }
}

// Defines a context provider component for managing the blog data.
export function BlogProvider({ children }) {
  // Uses the useReducer hook to manage the state and dispatch actions.
  const [state, dispatch] = useReducer(blogReducer, initialState);

  // useEffect hook to load initial data when the component mounts.
  useEffect(() => {
    const loadData = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true }); // Sets isLoading to true while loading data.

        // Retrieves saved posts from localStorage.
        const savedPosts = localStorage.getItem('blog_posts');
        if (savedPosts) {
          dispatch({ type: 'SET_POSTS', payload: JSON.parse(savedPosts) }); // Sets the posts from localStorage if available.
        }

        const posts = JSON.parse(savedPosts || '[]');
        const categories = [...new Set(posts.map(post => post.category))]; // adding unique categories
        const tags = [...new Set(posts.flatMap(post => post.tags))]; // adding unique tags


        dispatch({ type: 'SET_CATEGORIES', payload: categories });
        dispatch({ type: 'SET_TAGS', payload: tags });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message }); // Dispatches an error action if an error occurs.
      }
    };

    loadData(); // Calls the loadData function to initiate data loading.
  }, []); // The empty dependency array ensures this effect runs only once on mount.

    // useEffect hook to save posts to localStorage whenever the state.posts value changes.
  useEffect(() => {
    localStorage.setItem('blog_posts', JSON.stringify(state.posts)); // Saves the current posts to localStorage.
  }, [state.posts]); // The dependency array ensures this effect runs only when state.posts changes.


  // Provides the state and dispatch function to all child components through the BlogContext.Provider.
  return (
    <BlogContext.Provider value={{ state, dispatch }}>
      {children}
    </BlogContext.Provider>
  );
}

// Defines propTypes for the BlogProvider component to ensure the children prop is a valid React node.
BlogProvider.propTypes = {
  children: PropTypes.node.isRequired
};

// Defines a custom hook called useBlog for easy access to the BlogContext value.
export const useBlog = () => {
    // Uses the useContext hook to retrieve the BlogContext value.
  const context = useContext(BlogContext);
  // Throws an error if the hook is used outside of a BlogProvider.
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;  // returns the context which includes state and dispatch
};
