// src/pages/BlogList.jsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BlogList from "../components/BlogList/BlogList";
import { posts as initialPosts } from "../data/posts";
import styles from "./Home.module.css";

function Bloglist() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const location = useLocation();
  const navigate = useNavigate();

  // Load posts from localStorage or initialize with default posts
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const mergedPosts = [
      ...savedPosts,
      ...initialPosts.filter(
        (initialPost) =>
          !savedPosts.some((savedPost) => savedPost.id === initialPost.id)
      ),
    ];
    localStorage.setItem("posts", JSON.stringify(mergedPosts));
    setPosts(mergedPosts);
  }, []);

  // Sync filtered posts with query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const filters = {
      category: queryParams.get("category") || "",
      author: queryParams.get("author") || "",
      tag: queryParams.get("tag") || "",
      search: queryParams.get("search") || "",
    };

    const filtered = posts.filter((post) => {
      const matchesCategory = filters.category
        ? post.category === filters.category
        : true;
      const matchesAuthor = filters.author
        ? post.author === filters.author
        : true;
      const matchesTag = filters.tag ? post.tags?.includes(filters.tag) : true;
      const matchesSearch = filters.search
        ? post.title.includes(filters.search) ||
          post.content.includes(filters.search)
        : true;

      return matchesCategory && matchesAuthor && matchesTag && matchesSearch;
    });

    setFilteredPosts(filtered);
  }, [location.search, posts]);

  // Update query parameters when filters change
  const handleFilterChange = (updatedFilters) => {
    const queryParams = new URLSearchParams(location.search);

    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value) {
        queryParams.set(key, value);
      } else {
        queryParams.delete(key);
      }
    });

    navigate(`?${queryParams.toString()}`);
  };

  return (
    <div className={styles.home}>
      <main className={styles.mainContent}>
        <BlogList
          posts={filteredPosts}
          isDarkMode={isDarkMode}
          onFilterChange={handleFilterChange}
        />
      </main>
    </div>
  );
}

export default Bloglist;
