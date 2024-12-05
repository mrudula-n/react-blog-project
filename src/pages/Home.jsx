import { useState, useEffect } from 'react';
import BlogList from '../components/BlogList/BlogList';
import { posts as initialPosts } from '../data/posts';
import styles from './Home.module.css';

function Home() {
  const [posts, setPosts] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
  
    let mergedPosts;
  
    if (savedPosts.length === 0) {
      mergedPosts = initialPosts;
    } else {
      mergedPosts = savedPosts;
    }
  
    localStorage.setItem("posts", JSON.stringify(mergedPosts));
  
    setPosts(mergedPosts);
  }, []);
  

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.body.classList.toggle('dark-mode', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const handleSavePost = (updatedPost) => {
    const updatedPosts = updatedPost.id
      ? posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
      : [...posts, { ...updatedPost, id: Date.now(), date: new Date().toISOString() }];

    // Update localStorage
    localStorage.setItem("posts", JSON.stringify(updatedPosts));

    // Update state
    setPosts(updatedPosts);
    setIsEditing(false);
    setEditingPost(null);
  };

  const handleEdit = (post = null) => {
    setEditingPost(post);
    setIsEditing(true);
  };

  return (
    <div className={styles.home}>
      <main className={styles.mainContent}>
        <BlogList posts={posts} isDarkMode={isDarkMode} />
      </main>
    </div>
  );
}

export default Home;
