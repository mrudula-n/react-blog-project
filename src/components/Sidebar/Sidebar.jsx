import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { posts } from "../../data/posts";
import styles from "./Sidebar.module.css";
import { useTheme } from "../../contexts/ThemeContext"; // Import the useTheme hook

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme(); // Get the current theme from context

  // Extract unique categories dynamically
  const categories = Array.from(new Set(posts.map((post) => post.category)));

  // Get the 5 most recent posts sorted by date
  const recentPosts = posts
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/posts", label: "Blog" },
    { path: "/posts/new", label: "New Post" },
    { path: "/profile", label: "Profile" },
  ];

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        className={styles.sidebarToggle}
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        ☰
      </button>

      {/* Sidebar Drawer */}
      <aside
        className={`${styles.sidebar} ${isOpen ? styles["sidebar--open"] : ""} ${
          theme === "dark" ? styles["sidebar--dark"] : ""
        }`}
      >
        {isOpen && (
          <button
            className={styles.sidebarClose}
            onClick={toggleSidebar}
            aria-label="Close Sidebar"
          >
            ×
          </button>
        )}
        {isOpen &&
          navItems.map((item) => (
            <section key={item.path} className={styles.sidebar__section}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `${styles.navigation__link} ${
                    isActive ? styles["is-active"] : ""
                  }`
                }
              >
                {item.label}
              </NavLink>
            </section>
          ))}

        {/* Categories Section */}
        <section className={styles.sidebar__section}>
          <h3 className={styles.sidebar__title}>Categories</h3>
          <ul className={styles.sidebar__list}>
            {categories.map((category) => (
              <li key={category} className={styles.sidebar__item}>
                <button
                  onClick={() => {
                    const slug = category.toLowerCase().replace(/\s+/g, "-");
                    navigate(`/posts?category=${category}`);
                    setIsOpen(false);
                  }}
                  className={styles.sidebar__link}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Recent Posts Section */}
        <section className={styles.sidebar__section}>
          <h3 className={styles.sidebar__title}>Recent Posts</h3>
          <ul className={styles.sidebar__list}>
            {recentPosts.map((post) => (
              <li key={post.id} className={styles.sidebar__item}>
                <button
                  onClick={() => {
                    navigate(`/posts/${post.id}`);
                    setIsOpen(false);
                  }}
                  className={styles.sidebar__link}
                >
                  {post.title}
                </button>
              </li>
            ))}
          </ul>
        </section>
      </aside>

      {/* Overlay to close sidebar */}
      {isOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>}
    </>
  );
}

export default Sidebar;
