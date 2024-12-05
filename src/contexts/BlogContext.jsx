import { createContext, useContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import { posts as initialPosts } from "../data/posts";

const BlogContext = createContext();

const initialState = {
  posts: [...initialPosts],
  categories: [],
  tags: [],
  isLoading: false,
  error: null,
};

function blogReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, isLoading: false };
    case "SET_POSTS":
      return { ...state, posts: action.payload, isLoading: false };
    case "ADD_POST":
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case "UPDATE_POST":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post
        ),
      };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_TAGS":
      return { ...state, tags: action.payload };
    default:
      return state;
  }
}

export function BlogProvider({ children }) {
  const [state, dispatch] = useReducer(blogReducer, initialState);

  // Load initial data from localStorage
  useEffect(() => {
    const loadData = () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });

        // Load posts from localStorage
        const savedPosts = JSON.parse(localStorage.getItem("blog_posts")) || [];

        // If `savedPosts` exists, use it; otherwise, fall back to `initialPosts`
        const mergedPosts =
          savedPosts.length > 0 ? savedPosts : [...initialPosts];

        // Update state with merged posts
        dispatch({ type: "SET_POSTS", payload: mergedPosts });

        // Save initial posts to localStorage only if it is the first load
        if (savedPosts.length === 0) {
          localStorage.setItem("blog_posts", JSON.stringify(mergedPosts));
        }

        // Extract unique categories and tags
        const categories = [
          ...new Set(
            mergedPosts.map((post) => post.category || "Uncategorized")
          ),
        ];
        const tags = [
          ...new Set(mergedPosts.flatMap((post) => post.tags || [])),
        ];

        dispatch({ type: "SET_CATEGORIES", payload: categories });
        dispatch({ type: "SET_TAGS", payload: tags });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error.message });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("blog_posts"));
    console.log(savedPosts, 'savedPosts - blogcontext', state.posts);
    localStorage.setItem("blog_posts", JSON.stringify(state.posts));
  }, [state.posts]);

  return (
    <BlogContext.Provider value={{ state, dispatch }}>
      {children}
    </BlogContext.Provider>
  );
}

BlogProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
};
