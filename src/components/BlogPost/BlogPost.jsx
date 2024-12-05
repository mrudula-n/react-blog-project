import React, { useEffect, useState } from "react";
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
  // onEdit,
  isPreview = false,
  searchTerm,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [readTime, setReadTime] = useState(0);

  useEffect(() => {
    setReadTime(calculateReadTime(content));
  }, [content]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const displayContent = isExpanded
    ? content
    : content.slice(0, 200) + (content.length > 200 ? "..." : "");

  const highlightText = (text, term) => {
    if (!term || !text) return text;
    const regex = new RegExp(`(${term})`, "gi");
    return text.split(regex).map((part, index) =>
      regex.test(part) ? (
        <span key={index} className={styles.highlight}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const highlightMarkdownText = (text, term) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  const childrenToString = (children) => {
    if (Array.isArray(children)) {
      return children
        .map((child) => (typeof child === "string" ? child : ""))
        .join("");
    }
    return typeof children === "string" ? children : "";
  };

  return (
    <article className={`${styles.blogPost} ${isDarkMode ? styles.dark : ""}`}>
      {image && (
        <img src={image} alt={title} className={styles.blogPostImage} />
      )}
      <div className={styles.blogPost__header}>
        <h2 className={styles.blogPost__title}>
          {highlightText(title, searchTerm)}
        </h2>
        <div className={styles.blogPost__meta}>
          <span className={styles.blogPost__author}>
            By {highlightText(author, searchTerm)}
          </span>
          <time className={styles.blogPost__date}>{date}</time>
          <span className={styles.blogPost__readTime}>{readTime} min read</span>
        </div>
      </div>
      <div
        className={`${styles.blogPost__content} ${
          isExpanded ? styles.expanded : ""
        }`}
      >
        {isPreview ? (
          <ReactMarkdown>{displayContent}</ReactMarkdown>
        ) : (
          <ReactMarkdown
            components={Object.fromEntries(
              [
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
                tag,
                tag === "a"
                  ? ({ href, children }) => (
                      <a
                        href={href}
                        dangerouslySetInnerHTML={{
                          __html: highlightMarkdownText(
                            childrenToString(children),
                            searchTerm
                          ),
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                      />
                    )
                  : ({ children }) => {
                      const additionalProps =
                        tag === "blockquote"
                          ? { className: styles.blockquote }
                          : {};
                      const additionalCodeProps =
                        tag === "code" ? { className: styles.code } : {};

                      return React.createElement(tag, {
                        dangerouslySetInnerHTML: {
                          __html: highlightMarkdownText(
                            childrenToString(children),
                            searchTerm
                          ),
                        },
                        ...additionalProps,
                        ...additionalCodeProps,
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
  searchTerm: PropTypes.string,
};

export default BlogPost;
