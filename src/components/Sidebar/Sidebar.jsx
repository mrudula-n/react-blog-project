import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [recentPosts, setRecentPosts] = useState([]);
  const navigate = useNavigate();

  const categories = ["Technology", "Lifestyle", "Travel"];

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/posts", label: "Blog" },
    { path: "/posts/new", label: "New Post" },
    { path: "/profile", label: "Profile" },
  ];

  // Load the latest posts from localStorage when the component mounts
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const sortedPosts = savedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    setRecentPosts(sortedPosts.slice(0, 5)); // Limit to the 5 most recent posts
  }, []);

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
        className={`${styles.sidebar} ${isOpen ? styles["sidebar--open"] : ""}`}
      >
        {isOpen && <button
          className={styles.sidebarClose}
          onClick={toggleSidebar}
          aria-label="Close Sidebar"
        >
          ×
        </button> }
        {isOpen &&
          navItems.map((item) => (
            <section key={item.path} className={styles.sidebar__section} >
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

        <section className={styles.sidebar__section}>
          <h3 className={styles.sidebar__title}>Categories</h3>
          <ul className={styles.sidebar__list}>
            {categories.map((category) => (
              <li key={category} className={styles.sidebar__item}>
                <button
                  onClick={() => {
                    navigate(`/posts?category=${category.toLowerCase()}`);
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
