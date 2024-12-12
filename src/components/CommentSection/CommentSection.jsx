/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"; // Import necessary React hooks for state management and side effects.
import PropTypes from "prop-types"; // Import PropTypes for prop type checking.
import moment from "moment"; // Import moment.js for date and time formatting
import styles from "./CommentSection.module.css"; // Import CSS styles specific to this component.

// Define the functional component CommentSection, which takes postId as a prop.
function CommentSection({ postId }) {
  // Initialize state variables using useState hook:
  // comments: An array to store the comments. Initialized with an empty array.
  const [comments, setComments] = useState([]);
  // newComment: A string to store the text of the new comment being entered. Initialized with an empty string.
  const [newComment, setNewComment] = useState("");
  // hideComment: A boolean to control the visibility of the comments section. Initialized with false (comments are shown by default).
  const [hideComment, setHideComment] = useState(false);
  // editCommentId: Stores the ID of the comment being edited. Initialized with null (no comment is being edited initially).
  const [editCommentId, setEditCommentId] = useState(null);
  // replyCommentId: Stores the ID of the comment to which a reply is being added. Initialized with null.
  const [replyCommentId, setReplyCommentId] = useState(null);
  // sortOption: Stores the current sorting option for comments. Initialized with "newest".
  const [sortOption, setSortOption] = useState("newest");

  // Define a key for storing comments in localStorage specific to the postId.
  const localStorageKey = `comments-${postId}`;

  // useEffect hook to load comments from localStorage when the component mounts or when localStorageKey changes.
  useEffect(() => {
    // Try to parse comments from localStorage. If not found, initialize with an empty array.
    const storedComments =
      JSON.parse(localStorage.getItem(localStorageKey)) || [];
    // Update the comments state with the retrieved comments.
    setComments(storedComments);
  }, [localStorageKey]);

  // useEffect hook to save comments to localStorage whenever the comments state changes or when localStorageKey changes.
  useEffect(() => {
    // Store the comments in localStorage, stringifying the array.
    localStorage.setItem(localStorageKey, JSON.stringify(comments));
  }, [comments, localStorageKey]);

  // Event handler for form submission.
  const handleSubmit = (e) => {
    // Prevent default form submission behavior.
    e.preventDefault();
    // If the new comment is empty or contains only whitespace, do nothing.
    if (!newComment.trim()) return;

    // Check if editCommentId is not null, indicating an edit operation.
    if (editCommentId) {
      // Update the existing comment with the new text.
      setComments((prevComments) =>
        prevComments.map(
          (comment) =>
            comment.id === editCommentId
              ? { ...comment, text: newComment } // Update the text if the ID matches.
              : comment // Otherwise, return the comment unchanged.
        )
      );
      // Reset editCommentId to null after editing.
      setEditCommentId(null);
    } else if (replyCommentId) {
      // Add a new reply to the specified comment.
      setComments((prevComments) =>
        prevComments.map(
          (comment) =>
            comment.id === replyCommentId
              ? {
                  ...comment,
                  replies: [
                    ...comment.replies, // Keep existing replies.
                    {
                      // Add the new reply object.
                      id: Date.now(),
                      text: newComment,
                      timestamp: new Date().toISOString(),
                    },
                  ],
                }
              : comment // Return the comment unchanged if it's not the one being replied to.
        )
      );

      // Reset replyCommentId to null after replying.
      setReplyCommentId(null);
    } else {
      // Add a new comment.
      setComments((prevComments) => [
        ...prevComments, // Keep existing comments.
        {
          // Add the new comment object.
          id: Date.now(),
          text: newComment,
          timestamp: new Date().toISOString(),
          replies: [], // Initialize replies array for the new comment.
        },
      ]);
    }
    // Clear the newComment input field.
    setNewComment("");
  };

  // Function to toggle the visibility of the comments section.
  const toggleShowComments = () => {
    // Invert the value of hideComment.
    setHideComment(!hideComment);
  };

  // Function to handle editing a comment.
  const handleEdit = (id, text) => {
    // Set the editCommentId to the ID of the comment to be edited.
    setEditCommentId(id);
    // Set the newComment to the text of the comment being edited.
    setNewComment(text);
  };

  // Function to handle replying to a comment.
  const handleReply = (id) => {
    // Set the replyCommentId to the ID of the comment to be replied to.
    setReplyCommentId(id);
    // Clear the newComment input field.
    setNewComment("");
  };

  // Create a sorted copy of the comments array based on the selected sort option.
  const sortedComments = comments.slice().sort((a, b) => {
    if (sortOption === "newest") {
      // Sort by newest timestamp (descending).
      return new Date(b.timestamp) - new Date(a.timestamp);
    } else if (sortOption === "oldest") {
      // Sort by oldest timestamp (ascending).
      return new Date(a.timestamp) - new Date(b.timestamp);
    } else if (sortOption === "mostReplies") {
      // Sort by number of replies (descending).
      return b.replies.length - a.replies.length;
    }
    return 0;
  });

  // Function to render the comments.
  const renderComments = () => {
    return sortedComments.map((comment) => (
      <div key={comment.id} className={styles.comment}>
        {/* Display the comment text. */}
        <p>{comment.text}</p>
        {/* Display the comment timestamp using moment.js for formatting. */}
        <span className={styles.comment__timestamp}>
          {moment(comment.timestamp).format("Do MMM YYYY HH:mm:ss")}
        </span>
        {/* Button to trigger editing of the comment. */}
        <button onClick={() => handleEdit(comment.id, comment.text)}>
          Edit
        </button>
        {/* Button to trigger replying to the comment. */}
        <button onClick={() => handleReply(comment.id)}>Reply</button>

        {/* Render replies for the current comment. */}
        <div className={styles.replies}>
          {comment.replies && //check if a comment has replies
            comment.replies.map((reply) => (
              <div key={reply.id} className={styles.reply}>
                {/* Display the reply text. */}
                <p>{reply.text}</p>
                {/* Display the reply timestamp using moment.js for formatting. */}
                <span className={styles.comment__timestamp}>
                  {moment(reply.timestamp).format("Do MMM YYYY HH:mm:ss")}
                </span>
              </div>
            ))}
        </div>
      </div>
    ));
  };

  // Return the JSX to render the component.
  return (
    <div className={styles.commentSection}>
      {/* Heading for the comment section. */}
      <h3>Leave a comment</h3>

      {/* Form for submitting new comments. */}
      <form onSubmit={handleSubmit}>
        <div className={styles.textareaContainer}>
          {/* Textarea for entering new comments. */}
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)} // Update newComment state when the textarea value changes.
            placeholder={
              // Set different placeholders based on whether it's a new comment, edit or a reply.
              editCommentId
                ? "Edit your comment..."
                : replyCommentId
                ? "Write a reply..."
                : "Write a comment..."
            }
            className={styles.commentForm__input}
            rows="3"
          />
        </div>
        {/* Submit button for the form. */}
        <button
          type="submit"
          disabled={!newComment.trim()} // Disable the button if newComment is empty or contains only whitespace.
          className={styles.commentForm__submit}
        >
          {/* Change the button text based on whether it's a new comment, edit or a reply. */}
          {editCommentId ? "Update" : replyCommentId ? "Reply" : "Comment"}
        </button>
      </form>

      {/* Sorting options for comments. */}
      <div className={styles.sortOptions}>
        <label>Sort by: </label>
        {/* Dropdown to select sorting option. */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)} // Update sortOption state when the selection changes.
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="mostReplies">Most Replies</option>
        </select>
      </div>

      {/* Button to toggle showing/hiding comments. */}
      <button onClick={toggleShowComments} className={styles.toggleCommentsBtn}>
        {/* Change button text based on whether comments are currently hidden or shown. */}
        {hideComment ? "Show comments" : "Hide comments"}
      </button>

      {/* Conditionally render the comments list  if hideComment is false*/}
      {!hideComment && (
        <div className={styles.commentsList}>{renderComments()}</div>
      )}
    </div>
  );
}

// Define PropTypes for the component's props.
CommentSection.propTypes = {
  postId: PropTypes.number.isRequired, // postId is required and must be a number.
};

// Export the CommentSection component as the default export.
export default CommentSection;
