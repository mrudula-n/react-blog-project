// Import necessary modules
import { useState, useEffect } from "react"; // Import useState and useEffect hooks for managing state and side effects
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import { FaHeart } from "react-icons/fa"; // Import the heart icon from react-icons library
import styles from "./LikeButton.module.css"; // Import CSS styles specific to this component using CSS Modules

// Define the functional component LikeButton, accepting props for post ID, initial likes, like change callback, and dark mode status.
function LikeButton({ postId, initialLikes, onLikeChange, isDarkMode }) {
  // Define unique keys for storing like count and like status in localStorage for each post.
  const likeCountKey = `likes-${postId}`; //key for storing the like count in local storage
  const likeStatusKey = `isLiked-${postId}`; //key for storing like status in local storage

  // Initialize state for the number of likes using useState hook.
  // It tries to retrieve the like count from localStorage. If not found, it uses the initialLikes prop.
  const [likes, setLikes] = useState(() => {
    const storedLikes = localStorage.getItem(likeCountKey); //retrieve stored likes from local storage
    return storedLikes ? parseInt(storedLikes, 10) : initialLikes; //return stored likes if found otherwise initalLikes
  });

  // Initialize state for whether the post is liked or not using useState hook
  // It tries to retrieve the liked status from localStorage; If not found, defaults to false.
  const [isLiked, setIsLiked] = useState(() => {
    const storedLiked = localStorage.getItem(likeStatusKey); //retrieve liked status for the post from local storage
    return storedLiked ? JSON.parse(storedLiked) : false; //parse the stored value. returns false if nothing found in local storage
  });

  // Sync likes and isLiked status to localStorage whenever they change for this specific post
  //useEffect hook to synchronize like count and liked status with localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(likeCountKey, likes); // Store the current like count in localStorage
    localStorage.setItem(likeStatusKey, JSON.stringify(isLiked)); //store the current like status in local storage
  }, [likes, isLiked, likeCountKey, likeStatusKey]); //dependency array. effect runs when any of these values change.

  // Event handler function for when the like button is clicked.
  const handleLikeClick = () => {
    // Update the isLiked state using a functional update to correctly toggle the liked status
    setIsLiked((prevIsLiked) => {
      const newIsLiked = !prevIsLiked; //toggle the liked state
      // Update the like count based on the new liked state.
      setLikes((prevLikes) => {
        const newLikes = newIsLiked ? prevLikes + 1 : prevLikes - 1; //increment like if newIsLiked is true, otherwise decrement
        onLikeChange?.(newLikes); // Call the onLikeChange callback function with the updated like count if it exists. optional chaining is used here ?.
        return newLikes; //return the updated like count
      });
      return newIsLiked; //return updated like status
    });
  };

  return (
    <button
      className={`${styles.likeButton} ${isLiked ? styles.liked : ""}`} //sets the classname of button. if liked apply liked styles too.
      onClick={handleLikeClick} //call handleLikeClick when button is clicked.
      aria-label={isLiked ? "Unlike post" : "Like post"} //sets the accessible label for the button depending on like status. helps screen readers
    >
      <div
        className={`${styles.iconContainer} ${
          isDarkMode ? styles.darkIconContainer : ""
        }`} //applies dark mode styles to icon container if isDarkMode is true
      >
        {/*heart icon*/}
        <FaHeart
          className={`${styles.likeIcon} ${
            //base styles for like icon
            isLiked ? styles.likedIcon : styles.unlikedIcon //applies liked or unliked styles based on isLiked status
          } ${isDarkMode && !isLiked ? styles.darkUnlikedIcon : ""}`} //applies dark mode styles to unliked icon
        />
      </div>

      {/*display like count*/}
      <span
        className={`${styles.likeCount} ${
          //applies base styles for like count
          isDarkMode ? styles.darkLikeCount : ""
        }`} //applies dark mode styles if isDarkMode is true
      >
        {likes} {/*display the number of likes*/}
      </span>
    </button>
  );
}

//PropTypes for prop validation
LikeButton.propTypes = {
  postId: PropTypes.number.isRequired, //postId is required and must be a number. unique for each post
  initialLikes: PropTypes.number.isRequired, //initialLikes is required and must be a number
  onLikeChange: PropTypes.func, //onLikeChange is a function but is not required. it's used to update the parent component about like changes
  isDarkMode: PropTypes.bool.isRequired, //isDarkMode is required and must be a boolean
};

export default LikeButton; //export the like button component as the default export
