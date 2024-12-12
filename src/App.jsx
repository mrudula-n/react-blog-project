// Import the Header component.
import Header from "./components/Header";
// Import the BlogList component.
import BlogList from "./components/BlogList/BlogList";
// Import the PostEditor component.
import PostEditor from "./components/PostEditor/PostEditor";
// Import initial post data from the data/posts file.
import { posts as initialPosts } from "./data/posts";
// Import the main CSS file for the app.
import "./App.css";
// Import the useState hook for managing state.
import { useState } from "react";

// Define the main App component.
function App() {
  // Initialize state variables using the useState hook:
  // posts: An array to store the blog posts. Initialized with initialPosts.
  const [posts, setPosts] = useState(initialPosts);
  // isDarkMode: A boolean to track whether dark mode is enabled. Initialized based on localStorage or defaults to false.
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  // isEditing: A boolean to track whether the post editor is open. Initialized with false.
  const [isEditing, setIsEditing] = useState(false);
  // editingPost: The post object currently being edited. Initialized with null.
  const [editingPost, setEditingPost] = useState(null);

  // Function to toggle dark mode on or off.
  const toggleDarkMode = () => {
    const newMode = !isDarkMode; // Toggle the current dark mode state.
    setIsDarkMode(newMode); //Update the isDarkMode state
    document.body.classList.toggle("dark-mode", newMode); // Toggle the "dark-mode" class on the body element.
    localStorage.setItem("theme", newMode ? "dark" : "light"); // Store the new theme preference in localStorage.
  };

  // Function to handle saving a new or updated post.
  const handleSavePost = (updatedPost) => {
    // Update the posts state based on whether it's a new post or an existing one being updated.
    setPosts((prevPosts) =>
      updatedPost.id // Check if updatedPost has an ID. If it does, it's an existing post being updated.
        ? prevPosts.map(
            (
              post // Map over the previous posts.
            ) => (post.id === updatedPost.id ? updatedPost : post) // Replace the matching post with the updatedPost, otherwise keep the original post.
          )
        : [
            //if the post does not have an id then its a new post hence add it to the array
            ...prevPosts, // Keep the existing posts
            {
              ...updatedPost, // Add the new post object with
              id: Date.now(), // a new ID.
              date: new Date().toISOString(), // a new date
            },
          ]
    );
    //after saving the post close the editor and reset to null
    setIsEditing(false);
    setEditingPost(null);
  };

  // Function to handle editing an existing post or creating a new one.
  const handleEdit = (post = null) => {
    setEditingPost(post); // Set the editingPost state to the post to be edited (or null for a new post).
    setIsEditing(true); // Set the isEditing state to true to open the post editor.
  };

  // Return the JSX to render the component.
  return (
    <div className="app">
      {/* Render the Header component. */}
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <div className="new-post-container">
        {/* Button to create a new post. */}
        <button onClick={() => handleEdit()} className="new-post-button">
          + New post
        </button>
      </div>
      {/* Main content area. */}
      <main className="main-content">
        {/* Conditionally render either the PostEditor or the BlogList. */}
        {isEditing ? ( // If isEditing is true, render the PostEditor.
          <PostEditor post={editingPost} onSave={handleSavePost} />
        ) : (
          // Otherwise, render the BlogList.
          <BlogList posts={posts} isDarkMode={isDarkMode} onEdit={handleEdit} />
        )}
      </main>
    </div>
  );
}

// Export the App component as the default export.
export default App;
