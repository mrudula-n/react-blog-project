import PropTypes from "prop-types"; // Import the PropTypes library for prop type validation
import styles from "./BlogPost.module.css"; // Import CSS styles specific to the BlogPost component

// Define the BlogPost functional component
function BlogPost({ title, content, author, date, readTime }) {
  // This component receives individual post data as props

  return (
    //article element represents a self-contained composition in a document
    <article className={styles.blogPost}>
      {/* Header section of the blog post */}
      <div className={styles.blogPost__header}>
        {/* Title of the blog post */}
        <h2 className={styles.blogPost__title}>{title}</h2>
        {/* Meta information about the blog post */}
        <div className={styles.blogPost__meta}>
          {/*author of the blog post */}
          <span className={styles.blogPost__author}>By {author}</span>
          {/* Date of the blog post */}
          <time className={styles.blogPost__date}>{date}</time>
          {/* Estimated read time of the blog post */}
          <span className={styles.blogPost__readTime}>{readTime} min read</span>
        </div>
      </div>
      {/*content of the blog post */}
      <div className={styles.blogPost__content}>{content}</div>
    </article>
  );
}

// Define propTypes for the BlogPost component to ensure correct data types are passed as props
BlogPost.propTypes = {
  title: PropTypes.string.isRequired, // Title must be a string and is required
  content: PropTypes.string.isRequired, // Content must be a string and is required
  author: PropTypes.string.isRequired, // Author must be a string and is required
  date: PropTypes.string.isRequired, // Date must be a string and is required
  readTime: PropTypes.number.isRequired, // Read time must be a number and is required
};

export default BlogPost; // Export the BlogPost component as the default export
