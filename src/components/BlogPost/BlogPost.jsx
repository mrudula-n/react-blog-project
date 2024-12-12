import React, { useEffect, useState } from "react"; // Imports necessary React components: useEffect for side effects and useState for managing state.
import PropTypes from "prop-types"; // Imports PropTypes for defining data types of the component's props.
import { FaWhatsapp, FaLinkedin, FaInstagram } from "react-icons/fa"; // Imports icons from react-icons library for social media sharing.
import { useNavigate } from "react-router-dom"; // Imports useNavigate for programmatic navigation.
import ReactMarkdown from "react-markdown"; // Imports ReactMarkdown for rendering Markdown content.
import styles from "./BlogPost.module.css"; // Imports CSS styles specific to this component.
import LikeButton from "../LikeButton/LikeButton"; // Imports a custom LikeButton component.
import CommentSection from "../CommentSection/CommentSection"; // Imports a custom CommentSection component.
import { calculateReadTime } from "../../utils/readTime"; // Imports a utility function to calculate read time.
import OptimizedImage from "../OptimizedImage/OptimizedImage";

function BlogPost({
  id, // Unique identifier for the blog post.
  title, // Title of the blog post.
  content = "", // Content of the blog post, defaults to an empty string.
  author, // Author of the blog post.
  date, // Date of the blog post.
  image, // Optional image for the blog post.
  isDarkMode, // Flag indicating whether dark mode is enabled.
  isPreview = false, // Flag indicating whether the post is in preview mode.
  searchTerm, // Search term used for highlighting matching text.
}) {
  const [isExpanded, setIsExpanded] = useState(false); // State variable to track whether the post content is expanded. Initialized to false.
  const [readTime, setReadTime] = useState(0); // State variable to store the calculated read time. Initialized to 0.
  const navigate = useNavigate(); // Hook for navigating programmatically.

  useEffect(() => {
    // Effect hook to calculate read time whenever the content changes.
    setReadTime(calculateReadTime(content)); // Sets the readTime state variable using the calculateReadTime utility function.
  }, [content]); // Dependency array ensures the effect runs only when the content changes.

  const toggleExpanded = () => {
    // Function to toggle the isExpanded state variable.
    setIsExpanded(!isExpanded);
  };

  const displayContent = isExpanded
    ? content // If isExpanded is true, display the full content.
    : content?.slice(0, 200) + (content?.length > 200 ? "..." : ""); // Otherwise, display a truncated version with ellipsis if the content is longer than 200 characters.


  const highlightText = (text, term) => { //function to highlight the searched text
    if (!term || !text) return text; // If search term is empty or text is empty or null, return the original text.
    const regex = new RegExp(`(${term})`, "gi");  // Create a regular expression to match the search term (case-insensitive and globally).
    return text.split(regex).map((part, index) =>   //splits the text by search term matches
      regex.test(part) ? (     //check if the current part matches the search term
        <span key={index} className={styles.highlight}>
          {part}
        </span>
      ) : (
        part  //if not matched return the original part
      )
    );
  };

  const highlightMarkdownText = (text, term) => { //function to highlight the matched search terms in markdown
    if (!term) return text;  //if the search term is empty return original text
    const regex = new RegExp(`(${term})`, "gi");  // Create a regular expression to match the search term (case-insensitive and globally).
    return text.replace(regex, "<mark>$1</mark>");  // Replace all matches with the text wrapped in a <mark> tag for highlighting.
  };

  const childrenToString = (children) => {  //function to recursively convert react children to string
    if (Array.isArray(children)) {   // Check if children is an array
      return children      
        .map((child) => (typeof child === "string" ? child : ""))  //map over the children and recursively call itself if not string
        .join("");   //join the strings
    }
    return typeof children === "string" ? children : "";  //if its string return string otherwise empty string
  };

  return (
    <article className={`${styles.blogPost} ${isDarkMode ? styles.dark : ""}`}>
      {image && (
        <OptimizedImage
          src={image}
          alt={title}
          width={600}
          height={400}
        />
      )}
      <div className={styles.blogPost__header}>  {/* header div for blogpost */}
        <h2 className={styles.blogPost__title}> {/* title of blogpost */}
          {highlightText(title, searchTerm)}  {/* highlight the title if there is a search term match */}
        </h2>
        <div className={styles.blogPost__meta}> {/* meta information about the blogpost like author date and read time */}
          <span className={styles.blogPost__author}> {/* author name with highlight */}
            By {highlightText(author, searchTerm)} 
          </span>
          <time className={styles.blogPost__date}>{date}</time> {/* date of the blogpost */}
          <span className={styles.blogPost__readTime}>{readTime} min read</span> {/* read time of the blogpost */}
        </div>
      </div>
      {!isPreview && (  //if not in preview mode show the edit button
        <button
          className={styles.toggleButton}
          onClick={() => navigate(`/posts/${id}/edit`)} //navigates to edit page when clicked
          aria-expanded={isExpanded}
        >
          Edit
        </button>
      )}
      <div
        className={`${styles.blogPost__content} ${
          isExpanded ? styles.expanded : ""  //applies expanded class when isExpanded is true
        }`}
      >
        {isPreview ? ( //if its in preview mode render markdown directly otherwise highlight the search terms
          <ReactMarkdown>{displayContent}</ReactMarkdown>
        ) : (
          <ReactMarkdown  //render markdown content with highlighted search terms
            components={Object.fromEntries(  //custom components for different html tags to highlight search terms
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
                tag === "a"  //if tag is a then render anchor tag with href and highlighted children
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
                  : ({ children }) => { //for other tags render the tag with highlighted children
                      const additionalProps =
                        tag === "blockquote" //if its blockquote apply styles.blockquote class
                          ? { className: styles.blockquote }
                          : {};
                      const additionalCodeProps =
                        tag === "code"  //if its code tag apply styles.code class
                          ? { className: styles.code }
                          : {};

                      return React.createElement(tag, {  //create the react element with highlighted children
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
      <button  //read more/read less toggle button
        className={styles.toggleButton}
        onClick={toggleExpanded}
        aria-expanded={isExpanded}
      >
        {isExpanded ? "Read Less" : "Read More"}
      </button>
      {!isPreview && (  //if not in preview mode show like button,comment section and social share icons
        <>
          <LikeButton postId={id} initialLikes={0} isDarkMode={isDarkMode} /> 
          <CommentSection postId={id} />   
          <div className={styles.socialShare}>  
            <a     //whatsapp share link
              href="https://www.whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on WhatsApp"
            >
              <FaWhatsapp className={styles.shareIcon} />
            </a>
            <a     //linkedin share link
              href="https://in.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on LinkedIn"
            >
              <FaLinkedin className={styles.shareIcon} />
            </a>
            <a    //instagram link
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

BlogPost.propTypes = {  //proptypes for the component
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string,
  isDarkMode: PropTypes.bool.isRequired,
  isPreview: PropTypes.bool,
  searchTerm: PropTypes.string,
};

export default BlogPost;  //export the blogpost component
