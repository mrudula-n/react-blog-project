// src/pages/PostDetail.jsx
import { useState, useEffect } from "react";
import BlogPost from "../components/BlogPost/BlogPost";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import { useBlog } from "../contexts/BlogContext";

function PostDetail() {
  const { id } = useParams();
  const { state } = useBlog();
  const { posts, isLoading, error } = state;
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const foundPost = posts.find((p) => p.id === parseInt(id, 10));
    console.log('found post', id,  foundPost, JSON.stringify(posts, null, 2))
    if (foundPost) {
      setPost(foundPost);
    } else {
      alert("Post not found");
      navigate("/");
    }
  }, [id, navigate]);

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
            post.id === updatedPost.id ? updatedPost : post
          )
        : [
            ...prevPosts,
            { ...updatedPost, id: Date.now(), date: new Date().toISOString() },
          ]
    );
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
        <BlogPost
          key={post?.id}
          id={post?.id}
          title={post?.title}
          content={post?.content}
          author={post?.author}
          date={post?.date}
          image={post?.image}
          isDarkMode={false}
          isPreview={false}
        />
      </main>
    </div>
  );
}

export default PostDetail;
