// Import necessary components and data
import Header from "./components/Header"; // Import the Header component
import BlogList from "./components/BlogList/BlogList"; // Import the BlogList component
import { posts } from "./data/posts"; // Import blog post data
import "./App.css"; // Import the main CSS file for styling

// Define the App component, a functional component
function App() {
  return (
    // Outermost div container for the entire app
    <div className="app">
      {/* Include the Header component */}
      <Header />

      {/* Main content area */}
      <main className="main-content">
        {/* Render the BlogList component, passing the 'posts' data as a prop */}
        <BlogList posts={posts} />
      </main>
    </div>
  );
}

// Export the App component as the default export, making it available for other modules to import
export default App;
