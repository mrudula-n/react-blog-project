// src/router/index.jsx
// Imports necessary components from React Router for creating routes and navigation.
import { createBrowserRouter, Navigate } from "react-router-dom";
// Imports various page components and layout components.
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

// Defines a higher-order component (HOC) for protecting routes that require authentication.
// If the user is not authenticated (isAuthenticated is false), it redirects to the login page.
const requireAuth = (element, isAuthenticated) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return element;
};

// Creates a router instance using createBrowserRouter and defines the application's routes.
export const router = createBrowserRouter([
  {
    path: "/", // The root path of the application.
    element: <Layout />, // The main layout component that wraps all other components.
    errorElement: <NotFound />, // The component to display if a route is not found.  a catch all route
    children: [ // Child routes nested within the root path.
      {
        index: true, // Indicates that this route should be rendered when the parent path matches exactly.
        element: <Home />, // The component for the home page.
      },
      { path: "login", element: <Login /> }, // The route for the login page.
      {
        path: "posts", // The parent route for blog posts.
        children: [// Child routes related to blog posts, nested under the "posts" path.
          {
            index: true, // Indicates that this route should render the BlogList component when the "/posts" path is matched exactly.
            element: <BlogList />, // The component that displays a list of blog posts.
          },
          {
            path: ":id", // A dynamic route that matches any post ID.  this is how you make dynamic routes, use : and then the name of the parameter
            element: <PostDetail />, // The component that displays details for a specific post.
          },
          {
            path: "new", // The route for creating a new post.
            element: <NewPost />, // The component for creating a new post.
          },
          {
            path: ":id/edit", // A dynamic route for editing a specific post.
            element: <EditPost />, // The component for editing a post.
          },
        ],
      },
      {
        path: "profile", // The route for the user's profile.
        element: <Profile />, // The component for displaying the user's profile.
      },
      {
        path: "settings", // The route for the settings page.
        element: <Settings />, // The component for the settings page.
      },
    ],
  },
]);
