import { useEffect, useState } from "react"; // Import necessary hooks from React library

// Define the Header functional component
function Header() {
  // Use the useState hook to manage the dark mode state.
  // Initially, set isDarkMode to false (light mode).
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Use the useEffect hook to run code only once after the component mounts.
  useEffect(() => {
    // Retrieve the saved theme preference from local storage.
    const savedTheme = localStorage.getItem("theme");

    // If the saved theme is 'dark', set dark mode and update the body class.
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark-mode");
    } else {
      // Otherwise, ensure light mode is set and remove the 'dark-mode' class.
      setIsDarkMode(false);
      document.body.classList.remove("dark-mode");
    }
  }, []); // The empty dependency array [] ensures this effect runs only once.

  // Function to toggle dark mode on/off
  const toggleDarkMode = () => {
    // Toggle the isDarkMode state.
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    // Update the body class and local storage based on the new mode.
    if (newMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  };

  //header element for the blog
  return (
    <header className="blog-header">
      <h1>My Awesome Blog</h1> {/* Title of the blog */}
      <nav>
        {" "}
        {/* Navigation links */}
        <ul>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
        </ul>
      </nav>
      {/* Toggle switch for dark mode */}
      <div className="toggle-switch" onClick={toggleDarkMode}>
        {/* Dynamically apply the 'dark' class to the slider based on isDarkMode */}
        <div className={`slider ${isDarkMode ? "dark" : ""}`}></div>
      </div>
    </header>
  );
}

export default Header; // Export the Header component
