import PostEditor from "../components/PostEditor/PostEditor"; // Import the PostEditor component.

function NewPost() { // Component function for creating a new post.
  return <PostEditor isDarkMode={false} />; // Render the PostEditor component with dark mode disabled.
}

export default NewPost; // Export the NewPost component as the default export.
