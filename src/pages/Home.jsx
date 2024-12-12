import { useState, useEffect } from 'react'; // Import necessary React hooks for managing state and side effects.
import BlogList from '../components/BlogList/BlogList'; // Import BlogList component.
import { posts as initialPosts } from '../data/posts'; // Import initial post data.
import styles from './Home.module.css'; // Import CSS modules for styling.

function Home() {
  const [posts, setPosts] = useState([]); // State variable for storing blog posts.
  const [isDarkMode, setIsDarkMode] = useState(() => { // State variable for tracking dark mode, initialized from localStorage.
    return localStorage.getItem('theme') === 'dark';
  });
  const [isEditing, setIsEditing] = useState(false); // State variable for tracking edit mode (not used in this version).
  const [editingPost, setEditingPost] = useState(null); // State variable for storing the post being edited (not used in this version).

  useEffect(() => {  //runs only once after the initial render
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || []; // Retrieve saved posts from localStorage or initialize as empty array if nothing is stored

    let mergedPosts; //intialize mergedPosts variable

    if (savedPosts.length === 0) {  //check if there are any saved posts in local storage
      mergedPosts = initialPosts; // If no saved posts, use initialPosts.
    } else {
      mergedPosts = savedPosts; //otherwise use the savedPosts
    }

    localStorage.setItem("posts", JSON.stringify(mergedPosts)); // Store the merged posts in localStorage.

    setPosts(mergedPosts); // Update the posts state with merged posts.
  }, []);

  const toggleDarkMode = () => { // Function to toggle dark mode.
    const newMode = !isDarkMode; // Toggle the current dark mode state.
    setIsDarkMode(newMode); // Update the isDarkMode state variable.
    document.body.classList.toggle('dark-mode', newMode); // Toggle the 'dark-mode' class on the body element.
    localStorage.setItem('theme', newMode ? 'dark' : 'light'); // Store the new theme preference in localStorage.
  };

  const handleSavePost = (updatedPost) => { // Function to handle saving a new or updated post (not used in this version).
    const updatedPosts = updatedPost.id  //check if the post id exists
      ? posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)) //if post id exists update the existing post
      : [...posts, { ...updatedPost, id: Date.now(), date: new Date().toISOString() }]; //if post id doesnt exist create a new post and add it to posts array

    // Update localStorage
    localStorage.setItem("posts", JSON.stringify(updatedPosts));  //update the local storage

    // Update state
    setPosts(updatedPosts);  //update the posts state
    setIsEditing(false);  
    setEditingPost(null); 
  };

  const handleEdit = (post = null) => { // Function to handle editing a post (not used in this version).
    setEditingPost(post);
    setIsEditing(true);
  };

  return (
    <div className={styles.home}>  {/* Main container for the home page. */}
      <main className={styles.mainContent}>  {/* Main content area. */}
        <BlogList posts={posts} isDarkMode={isDarkMode} />  {/* Render BlogList component with posts and dark mode state. */}
      </main>
    </div>
  );
}

export default Home;  // Export the Home component as the default export.
