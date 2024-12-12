// Import necessary hooks for state management and side effects.
import { useEffect, useState } from "react";
// Import PropTypes for prop type checking.
import PropTypes from "prop-types";
// Import icons from react-icons library for social media sharing.
import { FaWhatsapp, FaLinkedin, FaInstagram } from "react-icons/fa";
// Import ReactMarkdown for rendering Markdown content.
import ReactMarkdown from "react-markdown";
// Import CSS styles specific to this component.
import styles from "./BlogPost.module.css";
// Import the LikeButton component.
import LikeButton from "../LikeButton/LikeButton";
// Import the CommentSection component.
import CommentSection from "../CommentSection/CommentSection";
// Import the calculateReadTime utility function.
import { calculateReadTime } from "../../utils/readTime";

// Define the functional component BlogPost, which takes various props related to a blog post.
function BlogPost({
  id,
  title,
  content,
  author,
  date,
  image,
  isDarkMode,
  onEdit,
  isPreview = false,
}) {
  // Initialize state variables using useState hook:
  // isExpanded: A boolean to control whether the blog post content is fully expanded or truncated. Initialized with false (truncated).
  const [isExpanded, setIsExpanded] = useState(false);
  // readTime: A number to store the calculated read time of the blog post. Initialized with 0.
  const [readTime, setReadTime] = useState(0);

  // useEffect hook to calculate and update the read time whenever the content prop changes.
  useEffect(() => {
    // Call the calculateReadTime function with the content and update the readTime state.
    setReadTime(calculateReadTime(content));
  }, [content]);

  // Function to toggle the isExpanded state.
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Determine the content to display based on the isExpanded state.
  // If isExpanded is true, display the full content.
  // Otherwise, display a truncated version with "..." if the content exceeds 200 characters.
  const displayContent = isExpanded
    ? content
    : content.slice(0, 200) + (content.length > 200 ? "..." : "");

  // Return the JSX to render the component.
  return (
    <article className={`${styles.blogPost} ${isDarkMode ? styles.dark : ""}`}>
      {/* Conditionally render the image if it exists. */}
      {image && (
        <img src={image} alt={title} className={styles.blogPostImage} />
      )}
      <div className={styles.blogPost__header}>
        <h2 className={styles.blogPost__title}>{title}</h2>
        <div className={styles.blogPost__meta}>
          <span className={styles.blogPost__author}>By {author}</span>
          <time className={styles.blogPost__date}>{date}</time>
          <span className={styles.blogPost__readTime}>{readTime} min read</span>
        </div>
        {/* {onEdit && (
          <button onClick={onEdit} className={styles.editPostButton}>
            Edit Post
          </button>
        )} */}
      </div>
      <div
        className={`${styles.blogPost__content} ${
          isExpanded ? styles.expanded : ""
        }`}
      >
        {/* Render the displayContent as Markdown using ReactMarkdown. */}
        <ReactMarkdown>{displayContent}</ReactMarkdown>
      </div>
      {/* Button to toggle between "Read More" and "Read Less". */}
      <button
        className={styles.toggleButton}
        onClick={toggleExpanded}
        aria-expanded={isExpanded}
      >
        {isExpanded ? "Read Less" : "Read More"}
      </button>

      {/* Conditionally render elements when it's not a preview. */}
      {!isPreview && (
        <>
          {/* Render the LikeButton component. */}
          <LikeButton postId={id} initialLikes={0} isDarkMode={isDarkMode} />
          {/* Render the CommentSection component. */}
          <CommentSection postId={id} />
          {/* Social media sharing links. */}
          <div className={styles.socialShare}>
            <a
              href="https://www.whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on WhatsApp"
            >
              <FaWhatsapp className={styles.shareIcon} />
            </a>
            <a
              href="https://in.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on LinkedIn"
            >
              <FaLinkedin className={styles.shareIcon} />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Instagram"
            >
              <FaInstagram className={styles.shareIcon} />
            </a>
          </div>
        </>
      )}
    </article>
  );
}

// Define PropTypes for the component's props.
BlogPost.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string,
  isDarkMode: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  isPreview: PropTypes.bool,
};

// Export the BlogPost component as the default export.
export default BlogPost;
