// src/pages/EditPost.jsx
// Import necessary hooks from React library
import { useState, useEffect } from "react";
// Import useParams and useNavigate hooks from react-router-dom for routing
import { useParams, useNavigate } from "react-router-dom";
// Import the PostEditor component for editing posts
import PostEditor from "../components/PostEditor/PostEditor";
// Import the useBlog hook to access blog data from context
import { useBlog } from "../contexts/BlogContext";

// Define the EditPost functional component
function EditPost() {
  // Extract the id parameter from the URL using useParams
  const { id } = useParams();
  // Access the blog context state using the useBlog hook
  const { state } = useBlog();
  // Destructure posts, isLoading, and error from the blog context state
  const { posts, isLoading, error } = state;
  // Initialize the post state with useState, initially set to null
  const [post, setPost] = useState(null);
  // Get the navigate function from useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  // Use the useEffect hook to fetch the post to edit when the id parameter changes
  useEffect(() => {
    // Use an empty array as a default for posts to handle cases where it might be undefined
    const savedPosts = posts || [];
    // Find the post with the matching id from the posts array, parsing id to an integer
    const foundPost = savedPosts.find((p) => p.id === parseInt(id, 10));
      // Log the found post for debugging
    console.log('found post', id,  foundPost, JSON.stringify(savedPosts, null, 2))
    // If a post is found, update the post state with the found post
    if (foundPost) {
      setPost(foundPost);
    // If no post is found, display an alert and navigate to the home page
    } else {
      alert("Post not found");
      navigate("/");
    }
  // Specify the dependency array for the useEffect to run only when id or navigate changes
  }, [id, navigate, posts]);

  // Render the component JSX
  return (
    // Container div for the component
    <div>
      {/* Conditionally render the PostEditor or a loading message */}
      {post ? (
        // If post is not null, render the PostEditor with the post and dark mode setting
        <PostEditor post={post} isDarkMode={false} />
      ) : (
        // If post is null, display a loading message
        <p>Loading...</p>
      )}
    </div>
  );
}

// Export the EditPost component as the default export
export default EditPost;
