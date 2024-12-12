import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { posts } from "../../data/posts";
import styles from "./Sidebar.module.css";
import { useTheme } from "../../contexts/ThemeContext"; // Import the useTheme hook

function Sidebar() {
  // State to manage whether the sidebar is open or closed
  const [isOpen, setIsOpen] = useState(false);
  // Hook for programmatic navigation
  const navigate = useNavigate();
  // Get the current theme from the ThemeContext
  const { theme } = useTheme();

  // Extract unique categories from the posts data
  const categories = Array.from(new Set(posts.map((post) => post.category)));

  // Get the 5 most recent posts, sorted by date in descending order
  const recentPosts = posts
    .slice() // Create a copy of the posts array to avoid modifying the original
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date
    .slice(0, 5); // Take the first 5 elements

    // Define an array of navigation items for the sidebar
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/posts", label: "Blog" },
    { path: "/posts/new", label: "New Post" },
    { path: "/profile", label: "Profile" },
  ];

    // Function to toggle the sidebar's open/closed state
  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);  //sets isOpen to the opposite of what it currently is
  };

  return (
    <>
      {/* Button to toggle the sidebar */}
      <button
        className={styles.sidebarToggle}
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        ☰ {/* Hamburger icon for the button */}
      </button>

      {/* Sidebar content */}
      <aside
        className={`${styles.sidebar} ${isOpen ? styles["sidebar--open"] : ""} ${  // this will add sidebar--open class to the sidebar when isOpen is true otherwise removes it, this class will be responsible for showing and hiding the sidebar
          theme === "dark" ? styles["sidebar--dark"] : ""   //if theme is dark, add sidebar--dark class
        }`}
      >
        {/* Close button inside the sidebar (visible when open) */}
        {isOpen && (
          <button
            className={styles.sidebarClose}
            onClick={toggleSidebar}
            aria-label="Close Sidebar"
          >
            × {/* Close icon for the button */}
          </button>
        )}

        {/* Navigation links */}
        {isOpen &&  //render the navItems only when isOpen is true
          navItems.map((item) => (
            <section key={item.path} className={styles.sidebar__section}>  {/* using section tag for each nav item */}
              <NavLink    //NavLink component is used to navigate to different routes
                to={item.path}
                className={({ isActive }) =>   //className prop is a function that returns a string of classes, isActive is true when the current route matches the to prop
                  `${styles.navigation__link} ${
                    isActive ? styles["is-active"] : ""  //if isActive is true then add is-active class
                  }`
                }
              >
                {item.label}  {/* display the label of the nav item */}
              </NavLink>
            </section>
          ))}

        {/* Categories section */}
        <section className={styles.sidebar__section}>
          <h3 className={styles.sidebar__title}>Categories</h3>
          <ul className={styles.sidebar__list}>
            {categories.map((category) => (
              <li key={category} className={styles.sidebar__item}>
                <button    //onClick will navigate to /posts?category=${category} route
                  onClick={() => {
                    const slug = category.toLowerCase().replace(/\s+/g, "-");   //convert category to lowercase and replace spaces with -
                    navigate(`/posts?category=${category}`);  //navigate to the /posts route with category as query parameter, setIsOpen to false to close the sidebar
                    setIsOpen(false);
                  }}
                  className={styles.sidebar__link}
                >
                  {category}    {/* display category name */}
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Recent posts section */}
        <section className={styles.sidebar__section}>
          <h3 className={styles.sidebar__title}>Recent Posts</h3>
          <ul className={styles.sidebar__list}>
            {recentPosts.map((post) => (
              <li key={post.id} className={styles.sidebar__item}>  {/* loop through recentPosts array */}
                <button        //onClick navigates to /posts/${post.id}
                  onClick={() => {
                    navigate(`/posts/${post.id}`);  //navigate to /posts/${post.id} route, setting setIsOpen to false to close the sidebar
                    setIsOpen(false);
                  }}
                  className={styles.sidebar__link}
                >
                  {post.title}   {/* display post title */}
                </button>
              </li>
            ))}
          </ul>
        </section>
      </aside>

      {/* Overlay to close the sidebar when it's open */}
      {isOpen && (    //render overlay only when isOpen is true
        <div className={styles.overlay} onClick={toggleSidebar}></div>  //clicking on overlay will call toggleSidebar function
      )}
    </>
  );
}

export default Sidebar;
