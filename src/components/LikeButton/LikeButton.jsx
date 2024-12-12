import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaHeart } from 'react-icons/fa'; // Import the heart icon
import styles from './LikeButton.module.css'; // Import CSS styles

function LikeButton({ postId, initialLikes, onLikeChange, isDarkMode }) {
    // Unique keys for localStorage to store likes for each post separately
  const likeCountKey = `likes-${postId}`;
  const likeStatusKey = `isLiked-${postId}`;

    // Initialize like count using localStorage or initialLikes prop
  const [likes, setLikes] = useState(() => {
    const storedLikes = localStorage.getItem(likeCountKey);
    return storedLikes ? parseInt(storedLikes, 10) : initialLikes;
  });

    // Initialize liked status using localStorage, defaults to false if no stored value
  const [isLiked, setIsLiked] = useState(() => {
    const storedLiked = localStorage.getItem(likeStatusKey);
    return storedLiked ? JSON.parse(storedLiked) : false;
  });

    // Update localStorage whenever likes or isLiked changes
  useEffect(() => {
    localStorage.setItem(likeCountKey, likes);
    localStorage.setItem(likeStatusKey, JSON.stringify(isLiked));
  }, [likes, isLiked, likeCountKey, likeStatusKey]);

  const handleLikeClick = () => {
        // Toggle the liked state
    setIsLiked((prevIsLiked) => {
      const newIsLiked = !prevIsLiked;
            // Update the like count based on the new liked state
      setLikes((prevLikes) => {
        const newLikes = newIsLiked ? prevLikes + 1 : prevLikes - 1;
                // Callback function to notify parent component about like count changes
        onLikeChange?.(newLikes);  //the ?. is optional chaining: if onLikeChange is not provided it does nothing preventing errors
        return newLikes;
      });
      return newIsLiked;
    });
  };

  return (
        //like button with conditional styling based on liked state and dark mode
    <button
      className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}
      onClick={handleLikeClick}
      aria-label={isLiked ? 'Unlike post' : 'Like post'} //sets aria-label for accesibility
    >
            {/* Container for the heart icon */}
      <div className={`${styles.iconContainer} ${isDarkMode ? styles.darkIconContainer : ''}`}>
                {/* Heart icon with conditional styling */}
        <FaHeart
          className={`${styles.likeIcon} ${
            isLiked ? styles.likedIcon : styles.unlikedIcon
          } ${isDarkMode && !isLiked ? styles.darkUnlikedIcon : ''}`}
        />
      </div>
            {/* Display the like count */}
      <span className={`${styles.likeCount} ${isDarkMode ? styles.darkLikeCount : ''}`}>
        {likes}
      </span>
    </button>
  );
}

// PropTypes for prop validation
LikeButton.propTypes = {
  postId: PropTypes.number.isRequired,  //postId is required and must be a number
  initialLikes: PropTypes.number.isRequired, //initial like count
  onLikeChange: PropTypes.func, // Callback function for like changes, can be omitted
  isDarkMode: PropTypes.bool.isRequired, //dark mode status
};

export default LikeButton; // Export the LikeButton component
