import { useEffect, useState } from "react"; // Import necessary hooks for state management and side effects
import PropTypes from "prop-types";  // Import PropTypes for prop validation
import { FaWhatsapp, FaLinkedin, FaInstagram } from "react-icons/fa"; // Import social media icons from react-icons
import styles from "./BlogPost.module.css"; // Import CSS Modules styles specific to this component
import LikeButton from "../LikeButton/LikeButton"; // Import the LikeButton component
import CommentSection from "../CommentSection/CommentSection"; // Import the CommentSection component
import { calculateReadTime } from "../../utils/readTime"; // Import the readTime calculation utility function

// Define the BlogPost functional component
function BlogPost({ id, title, content, author, date, image, isDarkMode }) {
    // State for managing whether the post content is expanded or not
  const [isExpanded, setIsExpanded] = useState(false);
    // State for storing the calculated read time of the post
  const [readTime, setReadTime] = useState(0);

    // useEffect hook to calculate read time when the content changes
  useEffect(() => {
    setReadTime(calculateReadTime(content));
  }, [content]);

    // Function to toggle the expanded state of the post content
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

    // Determine the content to display based on the expanded state
  const displayContent = isExpanded
    ? content  //show full content if expanded
    : content.slice(0, 200) + (content.length > 200 ? "..." : ""); //show limited content if not expanded


  return (
    <article
      className={`${styles.blogPost} ${isDarkMode ? styles.dark : ""}`} // Apply base styles and dark mode styles conditionally
    >
            {/* Display the image if provided */}
      {image && ( 
        <img src={image} alt={title} className={styles.blogPostImage} />
      )}
      <div className={styles.blogPost__header}>
        <h2 className={styles.blogPost__title}>{title}</h2>{/*title of the post*/}
        <div className={styles.blogPost__meta}>{/*meta information about the post*/}
          <span className={styles.blogPost__author}>By {author}</span> {/* Author of the post */}
          <time className={styles.blogPost__date}>{date}</time> {/* Date of the post */}
          <span className={styles.blogPost__readTime}>
            {readTime} min read {/*read time of the post*/}
          </span>
        </div>
      </div>
            {/*content of the post which can be expanded or collapsed*/}
      <div
        className={`${styles.blogPost__content} ${
          isExpanded ? styles.expanded : ""
        }`}
      >
        {displayContent}
      </div>
            {/*button to toggle between "Read More" and "Read Less" */}
      <button
        className={styles.toggleButton}
        onClick={toggleExpanded}
        aria-expanded={isExpanded}
      >
        {isExpanded ? "Read Less" : "Read More"}
      </button>

      {/*like button component for the post*/}
      <LikeButton postId={id} initialLikes={0} isDarkMode={isDarkMode} />

      {/*comment section for the post*/}
      <CommentSection postId={id} /> 

            {/* Social media sharing icons */}
      <div className={styles.socialShare}>
        <a
          href="https://www.whatsapp.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on WhatsApp"
        >
          <FaWhatsapp className={styles.shareIcon} /> {/*whatsapp icon*/}
        </a>
        <a
          href="https://in.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
        >
                    {/*linkedin icon*/}
          <FaLinkedin className={styles.shareIcon} /> 
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Instagram"
        >
                    {/*instagram icon*/}
          <FaInstagram className={styles.shareIcon} />
        </a>
      </div>
    </article>
  );
}


// PropTypes for validating the props passed to the component
BlogPost.propTypes = {
  id: PropTypes.number.isRequired, //id of the post, required
  title: PropTypes.string.isRequired, //title of the post, required
  content: PropTypes.string.isRequired, //content of the post, required
  author: PropTypes.string.isRequired,  //author of the post, required
  date: PropTypes.string.isRequired, //date of the post, required
  image: PropTypes.string, // Optional image URL for the post
  isDarkMode: PropTypes.bool.isRequired, // Whether dark mode is enabled, required
};

export default BlogPost; // Export the BlogPost component as the default export
