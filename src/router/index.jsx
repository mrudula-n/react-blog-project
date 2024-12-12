// src/router/index.jsx
import { createBrowserRouter, Navigate } from "react-router-dom";
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


const requireAuth = (element, isAuthenticated) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return element;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "login", element: <Login /> },
      {
        path: "posts",
        children: [
          {
            index: true,
            element: <BlogList />,
          },
          {
            path: ":id",
            element: <PostDetail />,
          },
          {
            path: "new",
            element: <NewPost />,
          },
          {
            path: ":id/edit",
            element: <EditPost />,
          },
        ],
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "settings", // Add route for Settings page
        element: <Settings />,
      },

      {
        path: "post-manager",
        element: <PostManagerPage />,
      },
      // Add route for FormExample page
      {
        path: "form",
        element: <FormExamplePage />,
      },
    ],
  },
]);
