// src/router/index.jsx
// Imports the createBrowserRouter function from React Router for creating a router instance.
import { createBrowserRouter } from "react-router-dom";
// Imports various components that represent different pages or layouts.
import Layout from "../components/Layout/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Bloglist from "../pages/BlogList";
import PostDetail from "../pages/PostDetail";
import NewPost from "../pages/NewPost";
import EditPost from "../pages/EditPost";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";


//This is a higher order component that takes an element and isAuthenticated prop.
const requireAuth = (element, isAuthenticated) => {
  // If not authenticated it will redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  //If authenticated it will return the element
  return element;
};

// Creates a router instance using createBrowserRouter.
export const router = createBrowserRouter([
  {
    path: "/", // Base path for the layout
    element: <Layout />, // Layout component that wraps other components
    errorElement: <NotFound />, // Component to display for routes not found under this path
    children: [ // Child routes nested within the layout
      {
        index: true, // Renders this route when the parent path matches exactly
        element: <Home />, // Component for the home page
      },
      { path: "login", element: <Login /> }, // Route for the login page

      {
        path: "posts", // Parent route for blog posts
        children: [ // Nested routes related to blog posts
          {
            index: true,  // Renders when the 'posts' path matches exactly
            element: <Bloglist />,  // Component to list blog posts
          },
          {
            path: ":id", // Dynamic route for a specific post's details
            element: <PostDetail />, // Component to display post details
          },
          {
            path: "new", // Route for creating a new post
            element: <NewPost />,  // Component for creating a new post
          },
          {
            path: ":id/edit",  // Dynamic route for editing a specific post
            element: <EditPost />, // Component for editing a post
          },
        ],
      },
      {
        path: "profile",  // Route for the user profile
        element: <Profile />, //Component for user profile
      },
    ],
  },
]);
