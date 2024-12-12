import { useState, useEffect } from "react"; // Import necessary React hooks for managing state and side effects.
import { useParams, useNavigate } from "react-router-dom"; // Import hooks for interacting with routing.
import PostEditor from "../components/PostEditor/PostEditor"; // Import PostEditor component.

function EditPost() {
  const { id } = useParams(); // Extract the post ID from the URL parameters.
  const [post, setPost] = useState(null); // State variable for storing the post to be edited. Initialized to null.
  const navigate = useNavigate(); // Get navigation function for programmatic routing.

  useEffect(() => { // Effect hook to fetch the post data when the component mounts or the ID changes.
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || []; // Retrieve saved posts from localStorage.
    const foundPost = savedPosts.find((p) => p.id === parseInt(id, 10)); // Find the post with matching ID.
    if (foundPost) {  //check if post is found
      setPost(foundPost); // Set the found post to the state variable.
    } else {
      alert("Post not found"); // Display an alert if post is not found.
      navigate("/");  // Navigate to the home page.
    }
  }, [id, navigate]); // Dependency array ensures this effect runs when id or navigate changes.

  return (
    <div>
      {post ? ( // Conditionally render PostEditor or loading message.
        <PostEditor post={post} isDarkMode={false} /> // Render PostEditor with the found post if available. isDarkMode is set to false explicitly
      ) : (
        <p>Loading...</p> // Render loading message while post data is being fetched.
      )}
    </div>
  );
}

export default EditPost; // Export the EditPost component as the default export.
