import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const categories = [
    "Technology",
    "Lifestyle",
    "Travel",
    "Food",
    "Programming",
  ];

  const recentPosts = [
    { id: 1, title: "Getting Started with React" },
    { id: 2, title: "Understanding React Router" },
    { id: 3, title: "Mastering CSS Grid" },
  ];

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
