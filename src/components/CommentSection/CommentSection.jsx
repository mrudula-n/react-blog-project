// src/components/CommentSection
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import styles from "./CommentSection.module.css";

function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [hideComment, setHideComment] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const [replyCommentId, setReplyCommentId] = useState(null);
  const [sortOption, setSortOption] = useState("newest");

  const localStorageKey = `comments-${postId}`;

  // Load comments from localStorage on mount
  useEffect(() => {
    const storedComments =
      JSON.parse(localStorage.getItem(localStorageKey)) || [];
    setComments(storedComments);
  }, [localStorageKey]);

  // Save comments to localStorage whenever they change
  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem(localStorageKey, JSON.stringify(comments));
    }
  }, [comments, localStorageKey]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (editCommentId) {
      // Edit existing comment
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === editCommentId
            ? { ...comment, text: newComment }
            : comment
        )
      );
      setEditCommentId(null);
    } else if (replyCommentId) {
      // Add reply to a comment
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === replyCommentId
            ? {
                ...comment,
                replies: [
                  ...comment.replies,
                  {
                    id: Date.now(),
                    text: newComment,
                    timestamp: new Date().toISOString(),
                  },
                ],
              }
            : comment
        )
      );
      setReplyCommentId(null);
    } else {
      // Add new comment
      setComments((prevComments) => [
        ...prevComments,
        {
          id: Date.now(),
          text: newComment,
          timestamp: new Date().toISOString(),
          replies: [],
        },
      ]);
    }
    setNewComment("");
  };

  const toggleShowComments = () => {
    setHideComment(!hideComment);
  };

  const handleEdit = (id, text) => {
    setEditCommentId(id);
    setNewComment(text);
  };

  const handleReply = (id) => {
    setReplyCommentId(id);
    setNewComment("");
  };

  const sortedComments = comments.slice().sort((a, b) => {
    if (sortOption === "newest") {
      return new Date(b.timestamp) - new Date(a.timestamp);
    } else if (sortOption === "oldest") {
      return new Date(a.timestamp) - new Date(b.timestamp);
    } else if (sortOption === "mostReplies") {
      return b.replies.length - a.replies.length;
    }
    return 0;
  });

  const renderComments = () => {
    return sortedComments.map((comment) => (
      <div key={comment.id} className={styles.comment}>
        <p>{comment.text}</p>
        <span className={styles.comment__timestamp}>
          {moment(comment.timestamp).format("Do MMM YYYY HH:mm:ss")}
        </span>
        <button onClick={() => handleEdit(comment.id, comment.text)}>
          Edit
        </button>
        <button onClick={() => handleReply(comment.id)}>Reply</button>

        {/* Render replies */}
        <div className={styles.replies}>
          {comment.replies &&
            comment.replies.map((reply) => (
              <div key={reply.id} className={styles.reply}>
                <p>{reply.text}</p>
                <span className={styles.comment__timestamp}>
                  {moment(reply.timestamp).format("Do MMM YYYY HH:mm:ss")}
                </span>
              </div>
            ))}
        </div>
      </div>
    ));
  };

  return (
    <div className={styles.commentSection}>
      <h3>Leave a comment</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.textareaContainer}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={
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
        <button
          type="submit"
          disabled={!newComment.trim()}
          className={styles.commentForm__submit}
        >
          {editCommentId ? "Update" : replyCommentId ? "Reply" : "Comment"}
        </button>
      </form>

      <div className={styles.sortOptions}>
        <label>Sort by: </label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="mostReplies">Most Replies</option>
        </select>
      </div>

      <button onClick={toggleShowComments} className={styles.toggleCommentsBtn}>
        {hideComment ? "Show comments" : "Hide comments"}
      </button>

      {!hideComment && (
        <div className={styles.commentsList}>{renderComments()}</div>
      )}
    </div>
  );
}

CommentSection.propTypes = {
  postId: PropTypes.number.isRequired,
};

export default CommentSection;
