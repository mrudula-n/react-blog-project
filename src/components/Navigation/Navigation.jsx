/* eslint-disable no-unused-vars */
// src/components/Navigation
// Import necessary components from React Router
import { NavLink, useLocation } from "react-router-dom";
// Import useState hook from React
import { useState } from "react";
// Import CSS styles for the component
import styles from "./Navigation.module.css";

// Define the Navigation functional component
function Navigation() {
  // Initialize state for menu open/close state using useState hook, initially set to false
  const [isMenuOpen, setIsMenuOpen] = useState(false);
    // Get the current location object using useLocation hook (not used in this component but present in the code)
  const location = useLocation();


  // Define an array of navigation items with paths and labels
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/posts", label: "Blog" },
    { path: "/post-manager", label: "Posts" },
    { path: "/form", label: "Form" },
    { path: "/posts/new", label: "New Blog" },
    { path: "/profile", label: "Profile" },
    { path: "/settings", label: "Settings" },
  ];

  // Function to toggle the menu open/close state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the isMenuOpen state
  };

    // Render the component JSX
  return (
        // Navigation container with styles
    <nav className={styles.navigation}>
            {/* Brand/logo container */}
      <div className={styles.navigation__brand}>MyBlog</div> {/* Replace with your blog's name or logo */}

            {/* Button to toggle the mobile menu */}
      <button
        className={styles.navigation__toggle} // Apply styles for the toggle button
        onClick={toggleMenu} // Call the toggleMenu function when clicked
        aria-expanded={isMenuOpen} // Set aria-expanded attribute to indicate menu state for accessibility
        aria-label="Toggle navigation" // Set aria-label for accessibility
      >
        <span className={styles.navigation__toggleIcon}></span> {/* Placeholder for the toggle icon (e.g., hamburger icon) */}
      </button>

            {/* Navigation menu (unordered list) */}
      <ul
        className={`${styles.navigation__menu} ${
          isMenuOpen ? styles["is-open"] : "" // Apply "is-open" class if the menu is open
        }`}
      >
        {/* Render navigation items */}
        {navItems.map((item) => (
          <li key={item.path} className={styles.navigation__item}> {/* Use unique key for each list item */}
                        {/* Use NavLink to render navigation links with active styling */}
            <NavLink
              to={item.path}  // Set the link path
              className={({ isActive }) => // Apply active class if the link is currently active
                `${styles.navigation__link} ${
                  isActive ? styles["is-active"] : ""
                }`
              }
              onClick={() => setIsMenuOpen(false)} // Close the menu when a link is clicked
            >
              {item.label} {/* Display the link label */}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Export the Navigation component as the default export
export default Navigation;
