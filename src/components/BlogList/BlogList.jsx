import PropTypes from "prop-types"; // Import the PropTypes library for prop type validation
import BlogPost from "../BlogPost/BlogPost"; // Import the BlogPost component
import styles from "./BlogList.module.css"; // Import CSS styles specific to the BlogList component

// Define the BlogList functional component
function BlogList({ posts }) {
  //this component takes an array of posts as a prop
  return (
    <div className={styles.blogList}>
      {" "}
      {/* Container for the list of blog posts */}
      {/* Map over the posts array to render a BlogPost component for each post */}
      {posts.map((post) => (
        <BlogPost
          //key prop is required for React to efficiently update the list
          key={post.id}
          // Pass individual post data as props to the BlogPost component
          title={post.title}
          content={post.content}
          author={post.author}
          date={post.date}
          readTime={post.readTime}
        />
      ))}
    </div>
  );
}

// Define propTypes for the BlogList component to ensure correct data types are passed as props
BlogList.propTypes = {
  posts: PropTypes.arrayOf(
    //posts prop is required and should be an array
    PropTypes.shape({
      // Each element should be an object with specific properties
      id: PropTypes.number.isRequired, // id is a required number
      title: PropTypes.string.isRequired, // title is a required string
      content: PropTypes.string.isRequired, // content is a required string
      author: PropTypes.string.isRequired, //  author is a required string
      date: PropTypes.string.isRequired, // date is a required string
      readTime: PropTypes.number.isRequired, // readTime is a required number
    })
  ).isRequired,
};

//default export for the component to be used in other modules
export default BlogList;
