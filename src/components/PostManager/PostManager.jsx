import { useState } from "react";
import { usePosts } from "../../hooks/usePosts";
import styles from "./PostManager.module.css";

function PostManager() {
  const {
    posts,
    addPost,
    deletePost,
    likePost,
    updatePost,
    addComment,
  } = usePosts();

  const [newPostTitle, setNewPostTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editPostId, setEditPostId] = useState(null);
  const [editPostTitle, setEditPostTitle] = useState("");
  const [editPostContent, setEditPostContent] = useState("");
  const [newComment, setNewComment] = useState("");

  const handleAddPost = () => {
    if (newPostTitle.trim()) {
      addPost({
        title: newPostTitle,
        content: "This is a new post.",
      });
      setNewPostTitle("");
    }
  };

  const startEditing = (post) => {
    setIsEditing(true);
    setEditPostId(post.id);
    setEditPostTitle(post.title);
    setEditPostContent(post.content);
  };

  const handleUpdatePost = () => {
    if (editPostTitle.trim() && editPostContent.trim()) {
      updatePost(editPostId, {
        title: editPostTitle,
        content: editPostContent,
      });
      setIsEditing(false);
      setEditPostId(null);
      setEditPostTitle("");
      setEditPostContent("");
    }
  };

  const handleAddComment = (postId) => {
    if (newComment.trim()) {
      addComment(postId, { text: newComment });
      setNewComment("");
    }
  };

  return (
    <div className={styles.postManager}>
      <h2>Post Manager</h2>

      {/* Add Post */}
      <div className={styles.postForm}>
        <input
          type="text"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
          placeholder="Enter post title"
        />
        <button onClick={handleAddPost}>Add Post</button>
      </div>

      {/* Edit Post */}
      {isEditing && (
        <div className={styles.editForm}>
          <h2>Edit Post</h2>
          <input
            type="text"
            value={editPostTitle}
            onChange={(e) => setEditPostTitle(e.target.value)}
            placeholder="Edit post title"
          />
          <textarea
            value={editPostContent}
            onChange={(e) => setEditPostContent(e.target.value)}
            placeholder="Edit post content"
          ></textarea>
          <button onClick={handleUpdatePost}>Update Post</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      )}

      {/* List Posts */}
      <ul className={styles.postList}>
        {posts.map((post) => (
          <li key={post.id} className={styles.postItem}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <button
              className={styles.like}
              onClick={() => likePost(post.id)}
            >
              Like ({post.likes})
            </button>
            <button
              className={styles.edit}
              onClick={() => startEditing(post)}
            >
              Edit
            </button>
            <button
              className={styles.delete}
              onClick={() => deletePost(post.id)}
            >
              Delete
            </button>

            {/* Comments */}
            <div className={styles.comments}>
              <h3>Comments</h3>
              <ul>
                {post?.comments?.map((comment) => (
                  <li key={comment.id}>
                    {comment.text} -{" "}
                    <small>{new Date(comment.createdAt).toLocaleString()}</small>
                  </li>
                ))}
              </ul>
              <div className={styles.commentForm}>
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment"
                />
                <button onClick={() => handleAddComment(post.id)}>
                  Add Comment
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostManager;
