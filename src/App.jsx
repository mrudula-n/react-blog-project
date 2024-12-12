// Import necessary components, data, and hooks
import Header from "./components/Header"; // Import the Header component
import BlogList from "./components/BlogList/BlogList"; // Import the BlogList component
import { posts } from "./data/posts"; // Import the blog post data
import "./App.css"; // Import the main CSS file for styling.
import { useState, useEffect } from "react"; // Import useState and useEffect hooks

// Define the App functional component
function App() {
  // Initialize state for dark mode, retrieving saved preference from local storage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark"; //checks if the saved theme is dark
  });

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode; // Inverts the current dark mode state
    setIsDarkMode(newMode); //sets the new mode

    // Apply or remove the 'dark-mode' class to the body and update local storage
    if (newMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  };

  //UseEffect hook to apply/remove dark mode class based on isDarkMode state
  useEffect(() => {
    //this effect runs whenever the value of isDarkMode changes
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <div className="app">
      {/* Pass isDarkMode and toggleDarkMode as props to the Header */}
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="main-content">
        {/* Pass posts and isDarkMode as props to the BlogList */}
        <BlogList posts={posts} isDarkMode={isDarkMode} />
      </main>
    </div>
  );
}

export default App; // Export the App component as the default export
