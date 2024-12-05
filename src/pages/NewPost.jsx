// src/pages/NewPost.jsx
import { useState, useEffect } from "react";
import PostEditor from "../components/PostEditor/PostEditor";

function NewPost() {
    const [post, setPost] = useState(null);

    useEffect(() => {
        const savedDraft = JSON.parse(localStorage.getItem("postDraft"));
        if (savedDraft) {
            setPost(savedDraft);
        }
      }, []);

    return <PostEditor post={post} isDarkMode={false} />
}

export default NewPost;