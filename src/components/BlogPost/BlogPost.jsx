import React, { useEffect, useState } from "react"; // Import necessary React hooks for managing state and side effects.
import PropTypes from "prop-types"; // Import PropTypes for defining data types of the component's props.
import { FaWhatsapp, FaLinkedin, FaInstagram } from "react-icons/fa"; // Import icons from react-icons library.
import ReactMarkdown from "react-markdown"; // Import ReactMarkdown for rendering Markdown content.
import styles from "./BlogPost.module.css"; // Import CSS modules for styling.
import LikeButton from "../LikeButton/LikeButton"; // Import LikeButton component.
import CommentSection from "../CommentSection/CommentSection"; // Import CommentSection component.
import { calculateReadTime } from "../../utils/readTime"; // Import calculateReadTime utility function.

function BlogPost({
  id, // Unique identifier for the blog post.
  title, // Title of the blog post.
  content, // Content of the blog post in Markdown format.
  author, // Author of the blog post.
  date, // Date of the blog post.
  image, // Optional image URL for the blog post.
  isDarkMode, // Flag indicating whether dark mode is enabled.
  // onEdit, // Function to handle editing the blog post (commented out).
  isPreview = false, // Flag indicating whether the blog post is in preview mode.
  searchTerm, // Search term for highlighting matching text.
}) {
  const [isExpanded, setIsExpanded] = useState(false); // State variable to track whether the blog post content is expanded.
  const [readTime, setReadTime] = useState(0); // State variable to store the calculated read time.

  useEffect(() => {
    setReadTime(calculateReadTime(content)); // Calculate read time based on content length when content changes.
  }, [content]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded); // Toggle the isExpanded state variable.
  };

  const displayContent = isExpanded
    ? content // If expanded, display the full content.
    : content.slice(0, 200) + (content.length > 200 ? "..." : ""); // Otherwise, display a truncated version with ellipsis.

  const highlightText = (text, term) => {
    // Function to highlight matching search terms in plain text.
    if (!term || !text) return text;
    const regex = new RegExp(`(${term})`, "gi"); // Create a regular expression for matching the search term.
    return text.split(regex).map((part, index) =>
      regex.test(part) ? ( // If the part matches the regex, wrap it in a span with highlight class.
        <span key={index} className={styles.highlight}>
          {part}
        </span>
      ) : (
        part // Otherwise, return the part as is.
      )
    );
  };

  const highlightMarkdownText = (text, term) => {
    // Function to highlight matching search terms in Markdown text.
    if (!term) return text; //if no search term return the text as is
    const regex = new RegExp(`(${term})`, "gi"); // Create a regular expression for matching the search term.
    return text.replace(regex, "<mark>$1</mark>"); // Replace matching parts with <mark> tags.
  };

  const childrenToString = (children) => {
    // Function to convert React children to a string.
    if (Array.isArray(children)) {
      //check if children is an array
      return children
        .map((child) => (typeof child === "string" ? child : "")) //map through and return only string children
        .join(""); //join the array to form a string
    }
    return typeof children === "string" ? children : ""; //if not array return children if it is string
  };

  return (
    <article className={`${styles.blogPost} ${isDarkMode ? styles.dark : ""}`}>
      {" "}
      {/* Main article element with conditional dark mode styling. */}
      {image && ( // Conditionally render the image if available
        <img src={image} alt={title} className={styles.blogPostImage} />
      )}
      <div className={styles.blogPost__header}>
        {" "}
        {/* Header section containing title and meta information. */}
        <h2 className={styles.blogPost__title}>
          {" "}
          {/* Title with highlighted search terms. */}
          {highlightText(title, searchTerm)}
        </h2>
        <div className={styles.blogPost__meta}>
          {" "}
          {/* Meta information section. */}
          <span className={styles.blogPost__author}>
            {" "}
            {/* Author with highlighted search terms. */}
            By {highlightText(author, searchTerm)}
          </span>
          <time className={styles.blogPost__date}>{date}</time>{" "}
          {/* Date of the blog post. */}
          <span className={styles.blogPost__readTime}>{readTime} min read</span>
        </div>
      </div>
      <div
        className={`${styles.blogPost__content} ${
          isExpanded ? styles.expanded : ""
        }`}
      >
        {isPreview ? ( // Conditionally render content based on preview mode.
          <ReactMarkdown>{displayContent}</ReactMarkdown>
        ) : (
          <ReactMarkdown
            components={Object.fromEntries(
              [
                // Array of Markdown element tags to customize.
                "p",
                "h1",
                "h2",
                "h3",
                "li",
                "strong",
                "em",
                "blockquote",
                "code",
                "a",
              ].map((tag) => [
                // Map each tag to a custom rendering function.
                tag,
                tag === "a"
                  ? (
                      { href, children } // Render anchor tags with target="_blank" and highlighted text.
                    ) => (
                      <a
                        href={href}
                        dangerouslySetInnerHTML={{
                          // Use dangerouslySetInnerHTML to render highlighted HTML.
                          __html: highlightMarkdownText(
                            // Highlight search terms in the link text.
                            childrenToString(children),
                            searchTerm
                          ),
                        }}
                        target="_blank" // Open link in a new tab.
                        rel="noopener noreferrer"
                        className={styles.link}
                      />
                    )
                  : ({ children }) => {
                      // Rendering function for other tags.
                      const additionalProps =
                        tag === "blockquote"
                          ? { className: styles.blockquote }
                          : {};
                      const additionalCodeProps = // Add class for blockquote
                        tag === "code" ? { className: styles.code } : {};

                      return React.createElement(tag, {
                        // Create a React element for the current tag.
                        dangerouslySetInnerHTML: {
                          __html: highlightMarkdownText(
                            childrenToString(children),
                            searchTerm
                          ),
                        },
                        ...additionalProps, //spread the addtional props
                        ...additionalCodeProps, //spread the code props
                      });
                    },
              ])
            )}
          >
            {displayContent}
          </ReactMarkdown>
        )}
      </div>
      <button
        className={styles.toggleButton}
        onClick={toggleExpanded}
        aria-expanded={isExpanded} // Set aria-expanded attribute for accessibility.
      >
        {isExpanded ? "Read Less" : "Read More"}
      </button>
      {!isPreview && (
        <>
          <LikeButton postId={id} initialLikes={0} isDarkMode={isDarkMode} />{" "}
          <CommentSection postId={id} />
          <div className={styles.socialShare}>
            <a // WhatsApp share link.
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
  searchTerm: PropTypes.string,
};

export default BlogPost;
