// src/pages/EditPost.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostEditor from "../components/PostEditor/PostEditor";

function EditPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const foundPost = savedPosts.find((p) => p.id === parseInt(id, 10));
    if (foundPost) {
      setPost(foundPost);
    } else {
      alert("Post not found");
      navigate("/");
    }
  }, [id, navigate]);

  return (
    <div>
      {post ? (
        <PostEditor post={post} isDarkMode={false} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default EditPost;
