import { useState, useEffect } from "react"; // Import necessary React hooks for managing state and side effects.
import BlogPost from "../components/BlogPost/BlogPost"; // Import BlogPost component.
import { useParams, useNavigate } from "react-router-dom"; // Import hooks for interacting with routing.
import styles from "./Home.module.css"; // Import CSS modules for styling.

function PostDetail() {
  const { id } = useParams(); // Extract the post ID from the URL parameters.
  const [post, setPost] = useState(null); // State variable for storing the post to be displayed. Initialized to null.
  const navigate = useNavigate(); // Get navigation function for programmatic routing.

  useEffect(() => { // Effect hook to fetch the post data when the component mounts or the ID changes.
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || []; // Retrieve saved posts from localStorage.
    const foundPost = savedPosts.find((p) => p.id === parseInt(id, 10)); // Find the post with matching ID.
    console.log('found post', id,  foundPost, JSON.stringify(savedPosts, null, 2))  // Log details for debugging.
    if (foundPost) {  //check if post is found
      setPost(foundPost); // Set the found post to the state variable.
    } else {
      alert("Post not found"); // Display an alert if post is not found.
      navigate("/"); // Navigate to the home page.
    }
  }, [id, navigate]); // Dependency array ensures this effect runs when id or navigate changes.

  return (
    <div className={styles.home}> {/* Main container for the post detail page. */}
      <main className={styles.mainContent}> {/* Main content area. */}
        <BlogPost // Render the BlogPost component with the found post data.
          key={post?.id} // Key prop for efficient rendering updates.
          id={post?.id} // Pass the post ID.
          title={post?.title} // Pass the post title.
          content={post?.content}  // Pass the post content.
          author={post?.author}  // Pass the post author.
          date={post?.date}  // Pass the post date.
          image={post?.image}   // Pass the post image.
          isDarkMode={false}   // Set isDarkMode to false.
          isPreview={false}  // Set isPreview to false.
        />
      </main>
    </div>
  );
}

export default PostDetail;  // Export the PostDetail component as the default export.
