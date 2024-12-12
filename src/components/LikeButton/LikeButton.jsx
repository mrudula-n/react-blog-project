// Import necessary hooks for state management and side effects.
import { useState, useEffect } from "react";
// Import PropTypes for prop type checking.
import PropTypes from "prop-types";
// Import the heart icon from react-icons.
import { FaHeart } from "react-icons/fa";
// Import CSS styles specific to this component.
import styles from "./LikeButton.module.css";

// Define the functional component LikeButton, which takes postId, initialLikes, onLikeChange, and isDarkMode as props.
function LikeButton({ postId, initialLikes, onLikeChange, isDarkMode }) {
  // Define unique keys for storing like count and like status in localStorage for each post.
  const likeCountKey = `likes-${postId}`;
  const likeStatusKey = `isLiked-${postId}`;

  // Initialize state variables using the useState hook:
  // likes: The number of likes for the post. Initialized with the value from localStorage or the initialLikes prop.
  const [likes, setLikes] = useState(() => {
    const storedLikes = localStorage.getItem(likeCountKey);
    return storedLikes ? parseInt(storedLikes, 10) : initialLikes;
  });
  // isLiked: A boolean indicating whether the current user has liked the post. Initialized with the value from localStorage or false.
  const [isLiked, setIsLiked] = useState(() => {
    const storedLiked = localStorage.getItem(likeStatusKey);
    return storedLiked ? JSON.parse(storedLiked) : false;
  });

  // useEffect hook to synchronize likes and isLiked with localStorage whenever they change.
  useEffect(() => {
    localStorage.setItem(likeCountKey, likes);
    localStorage.setItem(likeStatusKey, JSON.stringify(isLiked));
  }, [likes, isLiked, likeCountKey, likeStatusKey]);

  // Define a function to handle clicks on the like button.
  const handleLikeClick = () => {
    // Toggle the isLiked state.
    setIsLiked((prevIsLiked) => {
      const newIsLiked = !prevIsLiked;
      // Update the likes count based on the new isLiked state.
      setLikes((prevLikes) => {
        const newLikes = newIsLiked ? prevLikes + 1 : prevLikes - 1;
        // Call the onLikeChange prop with the new likes count if it's provided.
        onLikeChange?.(newLikes);
        return newLikes;
      });
      return newIsLiked;
    });
  };

  // Return the JSX to render the component.
  return (
    <button
      className={`${styles.likeButton} ${isLiked ? styles.liked : ""}`}
      onClick={handleLikeClick}
      aria-label={isLiked ? "Unlike post" : "Like post"}
    >
      {/* Container for the heart icon. */}
      <div
        className={`${styles.iconContainer} ${
          isDarkMode ? styles.darkIconContainer : ""
        }`}
      >
        {/* Heart icon with conditional styling based on like status and dark mode. */}
        <FaHeart
          className={`${styles.likeIcon} ${
            isLiked ? styles.likedIcon : styles.unlikedIcon
          } ${isDarkMode && !isLiked ? styles.darkUnlikedIcon : ""}`}
        />
      </div>
      {/* Display the number of likes. */}
      <span
        className={`${styles.likeCount} ${
          isDarkMode ? styles.darkLikeCount : ""
        }`}
      >
        {likes}
      </span>
    </button>
  );
}

// Define PropTypes for the component's props.
LikeButton.propTypes = {
  postId: PropTypes.number.isRequired, // postId is required and must be a number (unique for each post).
  initialLikes: PropTypes.number.isRequired, // initialLikes is required and must be a number.
  onLikeChange: PropTypes.func, // onLikeChange is optional and must be a function if provided.
  isDarkMode: PropTypes.bool.isRequired, // isDarkMode is required and must be a boolean.
};

// Export the LikeButton component as the default export.
export default LikeButton;
