import { NavLink, useLocation } from "react-router-dom"; // Import NavLink for navigation links and useLocation to get the current path.
import { useState } from "react"; // Import useState for managing component state.
import styles from "./Navigation.module.css"; // Import CSS styles specific to this component.

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State variable to track whether the navigation menu is open (for mobile). Initialized to false.
  const location = useLocation(); // Get the current location (path) using the useLocation hook.  Not used in this specific component but often useful in navigation.

  const navItems = [ // Array of navigation items, each with a path and label.
    { path: "/", label: "Home" },
    { path: "/posts", label: "Blog" },
    { path: "/posts/new", label: "New Post" },
    { path: "/profile", label: "Profile" },
  ];

  const toggleMenu = () => { // Function to toggle the isMenuOpen state.
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navigation}> {/* Main navigation container */}
      <div className={styles.navigation__brand}>MyBlog</div> {/* Brand/logo for the blog */}

      <button  // Hamburger menu button for mobile view
        className={styles.navigation__toggle}
        onClick={toggleMenu} // Call toggleMenu when clicked
        aria-expanded={isMenuOpen} // Set aria-expanded attribute for accessibility
        aria-label="Toggle navigation"  //accessible label
      >
        <span className={styles.navigation__toggleIcon}></span> {/* Icon for the hamburger menu (usually three lines) */}
      </button>

      <ul  //unordered list for navigation items
        className={`${styles.navigation__menu} ${  //base class for the menu and adds is-open class if isMenuOpen is true which applies styles for open menu
          isMenuOpen ? styles["is-open"] : ""
        }`}
      >
        {navItems.map((item) => (  // Map over the navItems array to create list items
          <li key={item.path} className={styles.navigation__item}> {/* List item for each navigation link */}
            <NavLink    //NavLink component for navigation
              to={item.path}   //path for the link
              className={({ isActive }) =>  //className function to apply active class if the link is active
                `${styles.navigation__link} ${
                  isActive ? styles["is-active"] : ""
                }`
              }
              onClick={() => setIsMenuOpen(false)}  //close the menu on click in mobile view
            >
              {item.label}  {/**display label of the navigation item */}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;  //export the navigation component
