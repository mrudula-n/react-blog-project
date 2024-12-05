import Header from "./components/Header";
import BlogList from "./components/BlogList/BlogList";
import PostEditor from "./components/PostEditor/PostEditor";
import { posts as initialPosts } from "./data/posts";
import "./App.css";
import { useState } from "react";

function App() {
  const [posts, setPosts] = useState(initialPosts);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.body.classList.toggle("dark-mode", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  const handleSavePost = (updatedPost) => {
    setPosts((prevPosts) =>
      updatedPost.id
        ? prevPosts.map((post) =>
            post.id === updatedPost.id ? updatedPost : post,
          )
        : [
            ...prevPosts,
            { ...updatedPost, id: Date.now(), date: new Date().toISOString() },
          ],
    );
    setIsEditing(false);
    setEditingPost(null);
  };

  const handleEdit = (post = null) => {
    setEditingPost(post);
    setIsEditing(true);
  };

  return (
    <div className="app">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <div className="new-post-container">
        <button onClick={() => handleEdit()} className="new-post-button">
          + New post
        </button>
      </div>
      <main className="main-content">
        {isEditing ? (
          <PostEditor post={editingPost} onSave={handleSavePost} />
        ) : (
          <BlogList posts={posts} isDarkMode={isDarkMode} onEdit={handleEdit} />
        )}
      </main>
    </div>
  );
}

export default App;
