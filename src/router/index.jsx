// src/router/index.jsx
// Imports necessary components from React Router for creating a router and handling navigation.
import { createBrowserRouter, Navigate } from "react-router-dom";
// Imports components representing different pages or layouts in the application.
import Layout from "../components/Layout/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import BlogList from "../pages/BlogList";
import PostDetail from "../pages/PostDetail";
import NewPost from "../pages/NewPost";
import EditPost from "../pages/EditPost";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import Settings from "../components/Settings/Settings";
import PostManagerPage from "../pages/PostManagerPage";
import FormExamplePage from "../pages/FormExamplePage";

// Defines a higher-order component (HOC) that checks for authentication before rendering a protected route.
// If the user is not authenticated, it redirects to the "/login" page.  this is how you protect routes in react
const requireAuth = (element, isAuthenticated) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return element;
};

// Creates a browser router using createBrowserRouter and defines the application's routes.
export const router = createBrowserRouter([
  {
    path: "/", // The root path of the application
    element: <Layout />, // The main layout component that wraps all other components
    errorElement: <NotFound />, // The component to display if a route is not found
    children: [ // Child routes nested within the root path
      {
        index: true,  // Indicates that this route should render when the parent path matches exactly
        element: <Home />,  // The component for the home page
      },
      { path: "login", element: <Login /> }, // The route for the login page
      {
        path: "posts", // The parent route for blog posts
        children: [ // Child routes related to blog posts
          {
            index: true,  // Indicates that this route should render when the parent path matches exactly
            element: <BlogList />,   // The component for displaying a list of blog posts
          },
          {
            path: ":id",  // Dynamic route for a specific post detail, using :id as a placeholder for the post ID
            element: <PostDetail />,  // The component for displaying details of a specific post
          },
          {
            path: "new",   // The route for creating a new post
            element: <NewPost />,  // The component for creating a new post
          },
          {
            path: ":id/edit", // Dynamic route for editing a specific post
            element: <EditPost />, // The component for editing a post
          },
        ],
      },
      {
        path: "profile", // Route for user profile
        element: <Profile />,  // The component for user profile
      },
      {
        path: "settings",  // Route for settings page
        element: <Settings />,  // The component for settings
      },
      {
        path: "post-manager",    //route for post manager
        element: <PostManagerPage />,    // The component for managing posts
      },
      {
        path: "form",   // Route for a form example page
        element: <FormExamplePage />,    // The component containing a form example
      },
    ],
  },
]);
