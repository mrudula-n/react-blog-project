import { useEffect, useState } from "react"; // Import necessary hooks from React library

function Header() {
  // Use useState to manage the dark mode state. Initially set to false (light mode).
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Use useEffect to run code only once after the component mounts.
  useEffect(() => {
    // Retrieve the saved theme preference from local storage.
    const savedTheme = localStorage.getItem("theme");

    // If the saved theme is 'dark', set the dark mode state to true and add the 'dark-mode' class to the body.
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark-mode");
    } else {
      // Otherwise, set the dark mode state to false and remove the 'dark-mode' class from the body.  This ensures the initial theme is correct
      setIsDarkMode(false);
      document.body.classList.remove("dark-mode");
    }
    //The empty dependency array [] ensures this effect only runs once
  }, []);

  // Function to toggle the dark mode state and update local storage
  const toggleDarkMode = () => {
    const newMode = !isDarkMode; // Toggle the current isDarkMode state
    setIsDarkMode(newMode); // Update state with the new mode

    if (newMode) {
      //if newMode is true (dark mode)
      document.body.classList.add("dark-mode"); // Add the 'dark-mode' class to the body element
      localStorage.setItem("theme", "dark"); // Save 'dark' to local storage
    } else {
      //if newMode is false (light mode)
      document.body.classList.remove("dark-mode"); // Remove the 'dark-mode' class
      localStorage.setItem("theme", "light"); // Save 'light' to local storage
    }
  };

  return (
    <header className="blog-header">
      {" "}
      {/*header element for the blog */}
      <h1>My Awesome Blog</h1> {/* Title of the blog */}
      <nav>
        {" "}
        {/* Navigation links */}
        <ul>
          <li>
            <a href="#home">Home</a>
          </li>{" "}
          {/* Link to home section */}
          <li>
            <a href="#about">About</a>
          </li>{" "}
          {/* Link to about section */}
        </ul>
      </nav>
      {/* Toggle switch for dark mode */}
      <div className="toggle-switch" onClick={toggleDarkMode}>
        {" "}
        {/* Container for the toggle switch, calls toggleDarkMode when clicked */}
        {/* Slider element with conditional class for dark mode styling */}
        <div className={`slider ${isDarkMode ? "dark" : ""}`}></div>{" "}
        {/* The slider element, dynamically adds the 'dark' class if isDarkMode is true */}
      </div>
    </header>
  );
}

export default Header; // Export the Header component to be used in other parts of the application
