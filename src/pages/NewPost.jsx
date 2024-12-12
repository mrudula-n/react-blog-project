// src/pages/NewPost.jsx
// Imports the PostEditor component, which is assumed to handle the creation of new blog posts.
import PostEditor from "../components/PostEditor/PostEditor";

// Defines the functional component NewPost.
function NewPost() {
  // Returns the PostEditor component with the isDarkMode prop set to false.
  // This suggests that the PostEditor component might have a dark mode feature that is disabled here.
  return <PostEditor isDarkMode={false} />;
}

// Exports the NewPost component as the default export, making it available for use in other parts of the application.
export default NewPost;
