import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaHeart } from 'react-icons/fa';
import styles from './LikeButton.module.css';

function LikeButton({ postId, initialLikes, onLikeChange, isDarkMode }) {
  const likeCountKey = `likes-${postId}`;  // Unique key for the likes count of each post
  const likeStatusKey = `isLiked-${postId}`;  // Unique key for the like status of each post

  // Retrieve persisted like state for this specific postId from localStorage
  const [likes, setLikes] = useState(() => {
    const storedLikes = localStorage.getItem(likeCountKey);
    return storedLikes ? parseInt(storedLikes, 10) : initialLikes;
  });

  const [isLiked, setIsLiked] = useState(() => {
    const storedLiked = localStorage.getItem(likeStatusKey);
    return storedLiked ? JSON.parse(storedLiked) : false;
  });

  // Sync likes and isLiked status to localStorage whenever they change for this specific post
  useEffect(() => {
    localStorage.setItem(likeCountKey, likes);
    localStorage.setItem(likeStatusKey, JSON.stringify(isLiked));
  }, [likes, isLiked, likeCountKey, likeStatusKey]);

  const handleLikeClick = () => {
    setIsLiked((prevIsLiked) => {
      const newIsLiked = !prevIsLiked;
      setLikes((prevLikes) => {
        const newLikes = newIsLiked ? prevLikes + 1 : prevLikes - 1;
        onLikeChange?.(newLikes);
        return newLikes;
      });
      return newIsLiked;
    });
  };

  return (
    <button
      className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}
      onClick={handleLikeClick}
      aria-label={isLiked ? 'Unlike post' : 'Like post'}
    >
      <div className={`${styles.iconContainer} ${isDarkMode ? styles.darkIconContainer : ''}`}>
        <FaHeart
          className={`${styles.likeIcon} ${
            isLiked ? styles.likedIcon : styles.unlikedIcon
          } ${isDarkMode && !isLiked ? styles.darkUnlikedIcon : ''}`}
        />
      </div>
      <span className={`${styles.likeCount} ${isDarkMode ? styles.darkLikeCount : ''}`}>
        {likes}
      </span>
    </button>
  );
}

LikeButton.propTypes = {
  postId: PropTypes.number.isRequired, // Ensure postId is unique per blog post
  initialLikes: PropTypes.number.isRequired,
  onLikeChange: PropTypes.func,
  isDarkMode: PropTypes.bool.isRequired,
};

export default LikeButton;
