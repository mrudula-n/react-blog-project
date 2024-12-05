/* eslint-disable no-unused-vars */
// src/components/Navigation
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import styles from "./Navigation.module.css";

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/posts", label: "Blog" },
    { path: "/posts/new", label: "New Post" },
    { path: "/profile", label: "Profile" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navigation}>
      <div className={styles.navigation__brand}>MyBlog</div>

      <button
        className={styles.navigation__toggle}
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-label="Toggle navigation"
      >
        <span className={styles.navigation__toggleIcon}></span>
      </button>

      <ul
        className={`${styles.navigation__menu} ${
          isMenuOpen ? styles["is-open"] : ""
        }`}
      >
        {navItems.map((item) => (
          <li key={item.path} className={styles.navigation__item}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `${styles.navigation__link} ${
                  isActive ? styles["is-active"] : ""
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
