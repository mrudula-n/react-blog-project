// src/App.jsx
// Imports initial post data from a local data file.
import { posts as initialPosts } from './data/posts';
// Imports the RouterProvider component from React Router for rendering the router.
import { RouterProvider } from 'react-router-dom';
// Imports the AuthProvider component from a custom context for managing authentication.
import { AuthProvider } from "./Context/AuthContext";
// Imports the router configuration from the router file.
import { router } from './router/index';
// Imports the main CSS file for the application.
import './App.css';
// Imports the useState hook from React, but it's not used in this component.
import { useState } from 'react';

// Defines the main App component.
function App() {
  // Returns the JSX to render the application.
  return (
    <div> {/* A root div container for the app */}
      {/* Wraps the application with the AuthProvider to provide authentication context to all child components. */}
      <AuthProvider>
        {/* Renders the router using RouterProvider, making the defined routes available for navigation. */}
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

// Exports the App component as the default export, making it available for other modules to import.
export default App;
