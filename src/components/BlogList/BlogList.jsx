// Import PropTypes for prop type checking.
import PropTypes from "prop-types";
// Import the BlogPost component.
import BlogPost from "../BlogPost/BlogPost";
// Import CSS styles specific to this component.
import styles from "./BlogList.module.css";

// Define the functional component BlogList, which takes posts, isDarkMode, and onEdit as props.
function BlogList({ posts, isDarkMode, onEdit }) {
  // Return the JSX to render the component.
  return (
    <div className={styles.blogList}>
      {/* Map over the posts array to render a BlogPost component for each post. */}
      {posts.map((post) => (
        <BlogPost
          key={post.id} // Assign a unique key to each BlogPost component using the post's ID.
          id={post.id} // Pass the post's ID to the BlogPost component.
          title={post.title} // Pass the post's title to the BlogPost component.
          content={post.content} // Pass the post's content to the BlogPost component.
          author={post.author} // Pass the post's author to the BlogPost component.
          date={post.date} // Pass the post's date to the BlogPost component.
          image={post.image} // Pass the post's image to the BlogPost component.
          isDarkMode={isDarkMode} // Pass the isDarkMode prop to the BlogPost component.
          onEdit={() => onEdit(post)} // Pass a function to the onEdit prop of BlogPost, which calls the onEdit function with the current post.
        />
      ))}
    </div>
  );
}

// Define PropTypes for the component's props.
BlogList.propTypes = {
  posts: PropTypes.arrayOf(
    // posts prop is required and must be an array.
    PropTypes.shape({
      // Each element in the array must be an object with the following shape.
      id: PropTypes.number.isRequired, // id is required and must be a number.
      title: PropTypes.string.isRequired, // title is required and must be a string.
      content: PropTypes.string.isRequired, // content is required and must be a string.
      author: PropTypes.string.isRequired, // author is required and must be a string.
      date: PropTypes.string.isRequired, // date is required and must be a string.
      image: PropTypes.string, // image is optional and must be a string if provided.
    })
  ).isRequired,
  isDarkMode: PropTypes.bool.isRequired, // isDarkMode is required and must be a boolean.
  onEdit: PropTypes.func.isRequired, // onEdit is required and must be a function.
};

// Export the BlogList component as the default export.
export default BlogList;
