// Import necessary hooks from React library
import { useState } from "react";
// Import the usePosts custom hook for managing posts
import { usePosts } from "../../hooks/usePosts";
// Import CSS styles for the component
import styles from "./PostManager.module.css";

// Define the PostManager functional component
function PostManager() {
  // Access post management functions from the usePosts hook
  const {
    posts, // Array of posts
    addPost, // Function to add a new post
    deletePost, // Function to delete a post
    likePost, // Function to like a post
    updatePost, // Function to update a post
    addComment, // Function to add a comment to a post
  } = usePosts();

  // Initialize state variables using useState hook
  const [newPostTitle, setNewPostTitle] = useState(""); // State for the title of a new post
  const [isEditing, setIsEditing] = useState(false); // State for toggling edit mode
  const [editPostId, setEditPostId] = useState(null); // State for the ID of the post being edited
  const [editPostTitle, setEditPostTitle] = useState(""); // State for the title of the post being edited
  const [editPostContent, setEditPostContent] = useState(""); // State for the content of the post being edited
  const [newComment, setNewComment] = useState(""); // State for the text of a new comment


  // Function to handle adding a new post
  const handleAddPost = () => {
    // Check if the new post title is not empty
    if (newPostTitle.trim()) {
            // Call the addPost function with the new post data
      addPost({
        title: newPostTitle, // Title of the new post
        content: "This is a new post.", // Default content for the new post
      });
            // Clear the new post title input field
      setNewPostTitle("");
    }
  };

    // Function to start editing an existing post
  const startEditing = (post) => {
        // Enable edit mode
    setIsEditing(true);
        // Set the ID of the post being edited
    setEditPostId(post.id);
        // Set the initial values for the edit form
    setEditPostTitle(post.title);
    setEditPostContent(post.content);
  };

    // Function to handle updating an existing post
  const handleUpdatePost = () => {
        // Check if the edited post title and content are not empty
    if (editPostTitle.trim() && editPostContent.trim()) {
            // Call the updatePost function with the updated post data
      updatePost(editPostId, {
        title: editPostTitle,
        content: editPostContent,
      });
            // Disable edit mode and clear the edit form
      setIsEditing(false);
      setEditPostId(null);
      setEditPostTitle("");
      setEditPostContent("");
    }
  };

  // Function to handle adding a new comment to a post
  const handleAddComment = (postId) => {
    // Check if the new comment text is not empty
    if (newComment.trim()) {
            // Call the addComment function with the post ID and comment text
      addComment(postId, { text: newComment });
            // Clear the new comment input field
      setNewComment("");
    }
  };


  // Render the component JSX
  return (
        // Container for the PostManager component with styles
    <div className={styles.postManager}>
      <h2>Post Manager</h2> {/* Title */}

            {/* Form for adding a new post */}
      <div className={styles.postForm}>
        <input // Input field for the new post title
          type="text"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)} // Update newPostTitle state when input changes
          placeholder="Enter post title"
        />
        <button onClick={handleAddPost}>Add Post</button> {/* Button to add the new post */}
      </div>

            {/* Form for editing an existing post (conditionally rendered) */}
      {isEditing && ( // Render only if isEditing is true
        <div className={styles.editForm}>
          <h2>Edit Post</h2> {/* Title */}
          <input // Input field for editing the post title
            type="text"
            value={editPostTitle}
            onChange={(e) => setEditPostTitle(e.target.value)} // Update editPostTitle state when input changes
            placeholder="Edit post title"
          />
          <textarea // Textarea for editing the post content
            value={editPostContent}
            onChange={(e) => setEditPostContent(e.target.value)} // Update editPostContent state when input changes
            placeholder="Edit post content"
          ></textarea>
          <button onClick={handleUpdatePost}>Update Post</button> {/* Button to update the post */}
          <button onClick={() => setIsEditing(false)}>Cancel</button> {/* Button to cancel editing */}
        </div>
      )}


      {/* List of posts */}
      <ul className={styles.postList}>
        {/* Conditionally render posts or a message if there are no posts */}
        {posts.length > 0 ? ( // Check if there are any posts
                  
          posts.map((post) => (
            <li key={post.id} className={styles.postItem}> {/* Use post.id as the key for each list item */}
              <h2>{post.title}</h2> {/* Display post title */}
              <p>{post.content}</p> {/* Display post content */}

              <button // Button to like a post
                className={styles.like}
                onClick={() => likePost(post.id)} // Call likePost function with post ID when clicked
              >
                Like ({post.likes}) {/* Display like count */}
              </button>

              <button // Button to edit a post
                className={styles.edit}
                onClick={() => startEditing(post)} // Call startEditing function with the post object when clicked
              >
                Edit
              </button>
              <button // Button to delete a post
                className={styles.delete}
                onClick={() => deletePost(post.id)} // Call deletePost function with post ID when clicked
              >
                Delete
              </button>

                            {/* Comments section for the post */}
              <div className={styles.comments}>
                <h3>Comments</h3>
                                {/* List of comments for the post */}
                <ul>
                  {post?.comments?.map((comment) => (
                    <li key={comment.id}> {/* Use comment.id as the key for each list item */}
                      {comment.text} -{" "} {/* Display comment text */}
                      <small> {/* Display comment timestamp */}
                        {new Date(comment.createdAt).toLocaleString()}
                      </small>
                    </li>
                  ))}
                </ul>

                                {/* Form for adding a new comment to the post */}
                <div className={styles.commentForm}>
                  <input  // Input field for the new comment text
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)} // Update newComment state when input changes
                    placeholder="Add a comment"
                  />
                  <button onClick={() => handleAddComment(post.id)}> {/* Button to add the new comment */}
                    Add Comment
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : ( // If there are no posts
          <p>No posts available. Start by adding a new post!</p> // Display a message
        )}
      </ul>
    </div>
  );
}


// Export the PostManager component as the default export
export default PostManager;
