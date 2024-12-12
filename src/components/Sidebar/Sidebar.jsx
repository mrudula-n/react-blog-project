// Import necessary hooks from React library
import { useState } from "react";
// Import useNavigate hook from react-router-dom for programmatic navigation
import { useNavigate } from "react-router-dom";
// Import NavLink component from react-router-dom for navigation links
import { NavLink } from "react-router-dom";
// Import post data from the data/posts file
import { posts } from "../../data/posts";
// Import CSS styles for the component
import styles from "./Sidebar.module.css";
// Import the useTheme hook to access the theme context
import { useTheme } from "../../contexts/ThemeContext";

// Define the Sidebar functional component
function Sidebar() {
    // Initialize state for sidebar open/close state using useState hook, initially set to false
  const [isOpen, setIsOpen] = useState(false);
    // Get the navigate function from useNavigate hook for programmatic navigation
  const navigate = useNavigate();
    // Access the theme context using the useTheme hook
  const { theme } = useTheme();

    // Extract unique categories from the posts data
  const categories = Array.from(new Set(posts.map((post) => post.category)));

    // Get the 5 most recent posts sorted by date in descending order
  const recentPosts = posts
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  // Define an array of navigation items with paths and labels
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/posts", label: "Blog" },
    { path: "/posts/new", label: "New Post" },
    { path: "/profile", label: "Profile" },
  ];

  // Function to toggle the sidebar open/close state
  const toggleSidebar = () => {
    setIsOpen((prev) => !prev); // Toggle the isOpen state
  };

    // Render the component JSX
  return (
    <>
      {/* Button to toggle the sidebar */}
      <button
        className={styles.sidebarToggle} // Apply styles for the sidebar toggle button
        onClick={toggleSidebar} // Call toggleSidebar function when clicked
        aria-label="Toggle Sidebar" // Add an accessible label for screen readers
      >
        ☰ {/* Use a hamburger icon for the button */}
      </button>

            {/* Sidebar container */}
      <aside
        className={`${styles.sidebar} ${isOpen ? styles["sidebar--open"] : ""} ${
          theme === "dark" ? styles["sidebar--dark"] : "" // Apply dark theme styles if theme is dark
        }`}
      >
        {/* Button to close the sidebar (visible when sidebar is open) */}
        {isOpen && (
          <button
            className={styles.sidebarClose} // Apply styles for the sidebar close button
            onClick={toggleSidebar} // Call toggleSidebar function when clicked
            aria-label="Close Sidebar" // Add an accessible label for screen readers
          >
            × {/* Use a close icon for the button */}
          </button>
        )}

                {/* Navigation links */}
        {isOpen && // Render navigation links only when sidebar is open
          navItems.map((item) => (
            <section key={item.path} className={styles.sidebar__section}>
              {/* Use NavLink to render navigation links with active styling */}
              <NavLink
                to={item.path} // Set the link path
                className={({ isActive }) => // Apply active class if the link is currently active
                  `${styles.navigation__link} ${
                    isActive ? styles["is-active"] : ""
                  }`
                }
              >
                {item.label} {/* Display the link label */}
              </NavLink>
            </section>
          ))}

        {/* Categories section */}
        <section className={styles.sidebar__section}>
          <h3 className={styles.sidebar__title}>Categories</h3> {/* Categories title */}
          <ul className={styles.sidebar__list}>
            {/* Render list of categories */}
            {categories.map((category) => (
              <li key={category} className={styles.sidebar__item}>
                <button
                  onClick={() => {
                                        // Generate a slug from the category name for the URL
                    const slug = category.toLowerCase().replace(/\s+/g, "-");
                                        // Navigate to the blog post list page with the selected category as a query parameter
                    navigate(`/posts?category=${category}`);
                    setIsOpen(false); // Close the sidebar after navigation
                  }}
                  className={styles.sidebar__link}
                >
                  {category} {/* Display the category name */}
                </button>
              </li>
            ))}
          </ul>
        </section>


        {/* Recent posts section */}
        <section className={styles.sidebar__section}>
          <h3 className={styles.sidebar__title}>Recent Posts</h3> {/* Recent posts title */}
          <ul className={styles.sidebar__list}>
                        {/* Render list of recent posts */}
            {recentPosts.map((post) => (
              <li key={post.id} className={styles.sidebar__item}>
                <button
                  onClick={() => {
                                        // Navigate to the post detail page for the selected post
                    navigate(`/posts/${post.id}`);
                    setIsOpen(false); // Close the sidebar after navigation
                  }}
                  className={styles.sidebar__link}
                >
                  {post.title} {/* Display the post title */}
                </button>
              </li>
            ))}
          </ul>
        </section>
      </aside>

            {/* Overlay to close sidebar when it's open */}
      {isOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>} {/* Overlay is visible when sidebar is open */}
    </>
  );
}

// Export the Sidebar component as the default export
export default Sidebar;
