import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaWhatsapp, FaLinkedin, FaInstagram } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import styles from "./BlogPost.module.css";
import LikeButton from "../LikeButton/LikeButton";
import CommentSection from "../CommentSection/CommentSection";
import { calculateReadTime } from "../../utils/readTime";

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
  const [isExpanded, setIsExpanded] = useState(false);
  const [readTime, setReadTime] = useState(0);

  useEffect(() => {
    setReadTime(calculateReadTime(content));
  }, [content]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Only render a truncated version if not expanded
  const displayContent = isExpanded
    ? content
    : content.slice(0, 200) + (content.length > 200 ? "..." : "");

  return (
    <article className={`${styles.blogPost} ${isDarkMode ? styles.dark : ""}`}>
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
        <ReactMarkdown>{displayContent}</ReactMarkdown>
      </div>
      <button
        className={styles.toggleButton}
        onClick={toggleExpanded}
        aria-expanded={isExpanded}
      >
        {isExpanded ? "Read Less" : "Read More"}
      </button>
      {!isPreview && (
        <>
          <LikeButton postId={id} initialLikes={0} isDarkMode={isDarkMode} />
          <CommentSection postId={id} />
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

export default BlogPost;
