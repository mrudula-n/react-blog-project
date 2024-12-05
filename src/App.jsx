// src/App.jsx
import { posts as initialPosts } from './data/posts';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from "./Context/AuthContext";
import { router } from './router/index';
import './App.css';
import { useState } from 'react';

function App() {
  const [posts, setPosts] = useState(initialPosts);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.body.classList.toggle('dark-mode', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const handleSavePost = (updatedPost) => {
    setPosts((prevPosts) =>
      updatedPost.id
        ? prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
        : [...prevPosts, { ...updatedPost, id: Date.now(), date: new Date().toISOString() }]
    );
    setIsEditing(false);
    setEditingPost(null);
  };

  const handleEdit = (post = null) => {
    setEditingPost(post);
    setIsEditing(true);
  };

  return (
    <div>
      <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    </div>
  );
}

export default App;
