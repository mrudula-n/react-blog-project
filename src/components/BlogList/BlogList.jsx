import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import BlogPost from '../BlogPost/BlogPost'; // Import the BlogPost component
import './BlogList.module.css'; // Import CSS styles for the BlogList component (though not used directly in this example)

// Define the BlogList functional component
function BlogList({ posts, isDarkMode }) {
  return (
    <div className="blog-list">
      {/* Map over the posts array to render a BlogPost for each one */}
      {posts.map(post => (
        <BlogPost
          key={post.id}       // Unique key for each list item (required by React)
          id={post.id}         // Pass the post ID to the BlogPost component
          title={post.title}    // Pass the post title
          content={post.content} // Pass the post content
          author={post.author}   // Pass the post author
          date={post.date}      // Pass the post date
          readTime={post.readTime} // Pass the post read time
          image={post.image}    // Pass the post image URL
          isDarkMode={isDarkMode} // Pass the dark mode state
        />
      ))}
    </div>
  );
}

// Define PropTypes for the component's props
BlogList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({  // Validate 'posts' as an array of objects
    id: PropTypes.number.isRequired,           // Each object must have a required number 'id'
    title: PropTypes.string.isRequired,        // ...and a required string 'title'
    content: PropTypes.string.isRequired,     // ...and a required string 'content'
    author: PropTypes.string.isRequired,      // ...and a required string 'author'
    date: PropTypes.string.isRequired,       // ...and a required string 'date'
    readTime: PropTypes.number.isRequired,    // ...and a required number 'readTime'  
    image: PropTypes.string,                  // ...and an optional string 'image'
  })).isRequired,                                // The 'posts' prop itself is required
  isDarkMode: PropTypes.bool.isRequired,         // 'isDarkMode' must be a boolean and is required
};

export default BlogList; // Export the BlogList component as the default export
