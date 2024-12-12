/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment"; // Library for formatting dates and times
import "./CommentSection.module.css"; // Import CSS styles for the component

function CommentSection({ postId }) {
    // States for managing comments
  const [comments, setComments] = useState([]); // Array to store comments for the post
  const [newComment, setNewComment] = useState(""); // Input value for new comment
  const [hideComment, setHideComment] = useState(false); // Whether to show or hide comments
    // States for comment editing and replying
  const [editCommentId, setEditCommentId] = useState(null); // ID of comment being edited
  const [replyCommentId, setReplyCommentId] = useState(null);  // ID of comment being replied to
    //state for sorting comments
  const [sortOption, setSortOption] = useState("newest"); //current sorting option


    //localStorage key to store comments for this post
  const localStorageKey = `comments-${postId}`;

    // Load comments from localStorage when the component mounts or postId changes
  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    setComments(storedComments);
  }, [localStorageKey]);

    //save comments to localStorage when comments state changes
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(comments));
  }, [comments, localStorageKey]);


    //handles submitting a new comment, editing a comment, or replying to a comment
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    if (!newComment.trim()) return; // Ignore empty comments

    if (editCommentId) {
            // Edit an existing comment
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === editCommentId // Find the comment to edit by ID
            ? { ...comment, text: newComment } // Update the comment text
            : comment // Keep other comments unchanged
        )
      );
      setEditCommentId(null); // Clear the editCommentId state after editing
    } else if (replyCommentId) {
      // Reply to a comment
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === replyCommentId
            ? {   // Find the comment to reply to
                ...comment,
                replies: [ //add new reply to replies array
                  ...comment.replies,
                  {
                    id: Date.now(), //unique id for the reply
                    text: newComment, //text of the reply
                    timestamp: new Date().toISOString(), //timestamp of the reply
                  },
                ],
              }
            : comment
        )
      );
      setReplyCommentId(null);//clear replyCommentId after replying
    } else {
            // Add a new comment
      setComments((prevComments) => [
        ...prevComments, // Keep existing comments
        {
          id: Date.now(), // Unique ID for the new comment
          text: newComment, // Text of the new comment
          timestamp: new Date().toISOString(), // Timestamp of the new comment
          replies: [], // Initialize replies array as empty
        },
      ]);
    }

    setNewComment(""); // Clear the input field after submitting
  };

    //toggles the visibility of comments
  const toggleShowComments = () => {
    setHideComment(!hideComment);
  };

    //sets the comment to edit and populates the input field with its text
  const handleEdit = (id, text) => {
    setEditCommentId(id);
    setNewComment(text);
  };


    //sets the comment to reply to and clears the input field
  const handleReply = (id) => {
    setReplyCommentId(id);
    setNewComment("");
  };

  
  const sortedComments = comments.slice().sort((a, b) => {
        // Sorts comments based on selected sort option
    if (sortOption === "newest") {
            // Sort by newest first
      return new Date(b.timestamp) - new Date(a.timestamp);
    } else if (sortOption === "oldest") {
            // Sort by oldest first
      return new Date(a.timestamp) - new Date(b.timestamp);
    } else if (sortOption === "mostReplies") {
            //sort by most replies first
      return b.replies.length - a.replies.length;
    }
    return 0;
  });

    //renders the comment list with replies
  const renderComments = () => {
    return sortedComments.map((comment) => (
      <div key={comment.id} className="comment">
        <p>{comment.text}</p> {/* Comment text */}
        <span className="comment__timestamp"> {/* Timestamp of the comment */}
          {moment(comment.timestamp).format("Do MMM YYYY HH:mm:ss")}
        </span>
                {/*button to edit comment*/}
        <button onClick={() => handleEdit(comment.id, comment.text)}>
          Edit
        </button>
                {/*button to reply to a comment*/}
        <button onClick={() => handleReply(comment.id)}>Reply</button>

        {/* Render replies for the comment */}
        <div className="replies">
          {comment.replies &&  //checks if comment has replies
            comment.replies.map((reply) => ( //map over replies array to render each reply
              <div key={reply.id} className="reply">
                <p>{reply.text}</p> {/*reply text*/}
                <span className="comment__timestamp"> {/* Timestamp of the reply */}
                  {moment(reply.timestamp).format("Do MMM YYYY HH:mm:ss")}
                </span>
              </div>
            ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="comment-section">
      <h3>Leave a comment</h3>

            {/*form for submitting new comments/editing comments/replying*/}
      <form onSubmit={handleSubmit} className="comment-form">
        <div className="textarea-container">
                    {/*text area for writing comment*/}
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
                        //sets placeholder based on action being performed
            placeholder={
              editCommentId
                ? "Edit your comment..."
                : replyCommentId
                ? "Write a reply..."
                : "Write a comment..."
            }
            className="comment-form__input"
            rows="4"
          />
        </div>
                {/*button to submit comment/reply/update*/}
        <button
          type="submit"
          disabled={!newComment.trim()}
          className="comment-form__submit"
        >
                    {/*sets button text based on action being performed*/}
          {editCommentId ? "Update" : replyCommentId ? "Reply" : "Comment"}
        </button>
      </form>

            {/*options for sorting comments*/}
      <div className="sort-options">
        <label>Sort by: </label>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="mostReplies">Most Replies</option>
        </select>
      </div>

            {/*button to toggle comment visibility*/}
      <button onClick={toggleShowComments} className="toggle-comments-btn">
        {hideComment ? "Show comments" : "Hide comments"}
      </button>

            {/*render comments if they are not hidden*/}
      {!hideComment && <div className="comments-list">{renderComments()}</div>}
    </div>
  );
}

//proptypes validation
CommentSection.propTypes = {
  postId: PropTypes.number.isRequired, //postId is required and should be a number
};

export default CommentSection; //default export for the comment section component. Used in other modules
