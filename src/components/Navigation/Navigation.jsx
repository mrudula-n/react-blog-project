/* eslint-disable no-unused-vars */
// src/components/Navigation
// Imports necessary components from React Router for navigation and accessing location information.
import { NavLink, useLocation } from "react-router-dom";
// Imports the useState hook from React for managing component state.
import { useState } from "react";
// Imports CSS styles specific to the Navigation component.
import styles from "./Navigation.module.css";

function Navigation() {
    // Initializes state for managing the open/closed state of the navigation menu, defaulting to closed.
  const [isMenuOpen, setIsMenuOpen] = useState(false);
    // Accesses the current location using the useLocation hook, but it's not used in this component.
  const location = useLocation();

    // Defines an array of navigation items, each with a path and label.
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/posts", label: "Blog" },
    { path: "/posts/new", label: "New Post" },
    { path: "/profile", label: "Profile" },
    { path: "/settings", label: "Settings" },
  ];

    // Function to toggle the navigation menu's open/closed state.
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); //sets isMenuOpen to the opposite of its current value. If it's true, it becomes false, and vice versa
  };

  return (
    <nav className={styles.navigation}> {/* The main navigation container */}
      <div className={styles.navigation__brand}>MyBlog</div> {/* The brand/logo of the blog */}

      {/* Button to toggle the navigation menu */}
      <button
        className={styles.navigation__toggle}
        onClick={toggleMenu} // Calls the toggleMenu function when clicked
        aria-expanded={isMenuOpen} // Sets the aria-expanded attribute for accessibility, indicating whether the menu is open or closed
        aria-label="Toggle navigation" // Provides an accessible label for the button
      >
        <span className={styles.navigation__toggleIcon}></span> {/* Placeholder for the menu icon (usually three horizontal lines) */}
      </button>

      {/* List of navigation items */}
      <ul
        className={`${styles.navigation__menu} ${  //base styles for the navigation menu
          isMenuOpen ? styles["is-open"] : ""   // if isMenuOpen is true then apply styles["is-open"], this class will be responsible for visually opening and closing the menu
        }`}
      >
        {/* Maps over the navItems array to render each navigation link */}
        {navItems.map((item) => (
          <li key={item.path} className={styles.navigation__item}>    {/* each navigation item */}
            <NavLink     //NavLink component for navigation, renders as an anchor tag
              to={item.path} //sets the link's destination to the item's path
              className={({ isActive }) =>    //dynamically sets the class name based on whether the link is active  If isActive is true styles['is-active'] will be applied
                `${styles.navigation__link} ${
                  isActive ? styles["is-active"] : ""
                }`
              }
              onClick={() => setIsMenuOpen(false)}    //sets isMenuOpen to false when a link is clicked, closing the menu after navigation. This is commonly used for mobile or responsive navigation menus
            >
              {item.label}     {/* display the nav item label */}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
