import Header from "./components/Header"; // Import the Header component
import BlogList from "./components/BlogList/BlogList"; // Import the BlogList component
import PostEditor from "./components/PostEditor/PostEditor"; // Import the PostEditor component
import { posts as initialPosts } from "./data/posts"; // Import initial post data
import "./App.css"; // Import CSS styles for the app
import { useState } from "react"; // Import the useState hook for managing state

// Define the App functional component
function App() {
    // Initialize state variables using useState hook

    //posts: array of blog posts, initially set to initialPosts.  setPosts is the function used to update this state.
  const [posts, setPosts] = useState(initialPosts);

    // isDarkMode: boolean, indicates if dark mode is enabled, defaults to the value stored in localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

    // isEditing: boolean, indicates if the post editor is currently open
  const [isEditing, setIsEditing] = useState(false);
    // editingPost: object or null. Stores the post currently being edited, null if no post is being edited
  const [editingPost, setEditingPost] = useState(null);


    // Function to toggle dark mode on/off
  const toggleDarkMode = () => {
    const newMode = !isDarkMode; // Toggle the current dark mode state
    setIsDarkMode(newMode); // Update isDarkMode state
    document.body.classList.toggle("dark-mode", newMode); // Toggle the "dark-mode" class on the body element
    localStorage.setItem("theme", newMode ? "dark" : "light"); // Store the new theme preference in localStorage
  };


    // Function to handle saving a new or updated post
  const handleSavePost = (updatedPost) => {
        // Update the posts state.  Uses a callback function to access the previous state.
    setPosts((prevPosts) =>
      updatedPost.id // Check if updatedPost has an id property (existing post)
        ? prevPosts.map((post) => //if it's an existing post, update the post with matching id in the array
            post.id === updatedPost.id ? updatedPost : post
          )
        : [ //if it's a new post, add it to the array. Date.now() is used to create unique ids
            ...prevPosts, //spread operator used to create new array containing all the previous posts
            { ...updatedPost, id: Date.now(), date: new Date().toISOString() }, //add new post with id and date properties
          ]
    );

    setIsEditing(false); // Close the post editor after saving
    setEditingPost(null); // Clear the editingPost state
  };

    // Function to open the post editor for creating a new post or editing existing one
  const handleEdit = (post = null) => { // If post is null, it means creating a new post
    setEditingPost(post);  //sets the post to be edited or null for a new post
    setIsEditing(true); //open the post editor
  };

  return (
    <div className="app">
            {/* Header component with dark mode toggle */}
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

            {/*"new post" button container */}
      <div className="new-post-container">
                {/* Button to open the post editor for a new post */}
        <button onClick={() => handleEdit()} className="new-post-button">
          + New post
        </button>
      </div>

      {/*main content area of the app */}
      <main className="main-content">
                {/* Conditionally render either PostEditor or BlogList */}
        {isEditing ? ( // If isEditing is true, render the PostEditor
          <PostEditor post={editingPost} onSave={handleSavePost} />
        ) : ( // If isEditing is false, render the BlogList
          <BlogList posts={posts} isDarkMode={isDarkMode} onEdit={handleEdit} />
        )}
      </main>
    </div>
  );
}

export default App; // Export the App component as the default export
