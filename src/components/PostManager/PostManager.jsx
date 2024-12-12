import { useState } from "react"; // Import useState for managing component state.
import { usePosts } from "../../hooks/usePosts"; // Import a custom hook for managing posts.
import styles from "./PostManager.module.css"; // Import CSS styles specific to this component.

function PostManager() {
  const {
    posts, // An array of post objects.
    addPost, // Function to add a new post.
    deletePost, // Function to delete a post.
    likePost, // Function to like a post.
    updatePost, // Function to update a post.
    addComment, // Function to add a comment to a post.
  } = usePosts(); // Call the custom usePosts hook to get posts and post management functions.

  const [newPostTitle, setNewPostTitle] = useState(""); // State for the title of a new post.
  const [isEditing, setIsEditing] = useState(false); // State to track whether a post is being edited.
  const [editPostId, setEditPostId] = useState(null); // State for the ID of the post being edited.
  const [editPostTitle, setEditPostTitle] = useState(""); // State for the edited title of a post.
  const [editPostContent, setEditPostContent] = useState(""); // State for the edited content of a post.
  const [newComment, setNewComment] = useState(""); // State for the text of a new comment.

  const handleAddPost = () => { // Function to handle adding a new post.
    if (newPostTitle.trim()) { // Check if the title is not empty or whitespace.
      addPost({   //call the addPost function from usePosts hook to add a new post
        title: newPostTitle,  //title of new post
        content: "This is a new post.",  //default content for new post
      });
      setNewPostTitle("");   // Clear the new post title input field.
    }
  };

  const startEditing = (post) => {  //function to start editing an existing post
    setIsEditing(true);  //set isEditing to true to show edit form
    setEditPostId(post.id);  //set editPostId to the id of the post to be edited
    setEditPostTitle(post.title);  //set editPostTitle to the title of the post to be edited
    setEditPostContent(post.content);  //set editPostContent to the content of the post to be edited
  };

  const handleUpdatePost = () => { //function to handle updating a post
    if (editPostTitle.trim() && editPostContent.trim()) { //check if title and content are not empty
      updatePost(editPostId, {   //call updatePost function from usePosts hook to update the post
        title: editPostTitle,   
        content: editPostContent,
      });
      setIsEditing(false);  // Set isEditing to false to hide the edit form.
      setEditPostId(null);  // Clear the editPostId.
      setEditPostTitle(""); // Clear the editPostTitle input field.
      setEditPostContent(""); // Clear the editPostContent input field.
    }
  };

  const handleAddComment = (postId) => {  //function to handle adding a new comment to a post
    if (newComment.trim()) {  // Check if the comment text is not empty or whitespace.
      addComment(postId, { text: newComment });  //call addComment function from usePosts hook to add comment to the post
      setNewComment("");  // Clear the new comment input field.
    }
  };

  return (
    <div className={styles.postManager}>  {/* Main container for the PostManager component */}
      <h2>Post Manager</h2>   {/*title of the component */}

      {/* Add Post Section */}
      <div className={styles.postForm}>   {/*form to add a new post */}
        <input      //input field for new post title
          type="text"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}  //update newPostTitle state when input changes
          placeholder="Enter post title"
        />
        <button onClick={handleAddPost}>Add Post</button>  {/*button to add post, calls handleAddPost function when clicked */}
      </div>

      {/* Edit Post Section */}
      {isEditing && (    //if isEditing is true,render edit form
        <div className={styles.editForm}>  {/* form to edit post */}
          <h2>Edit Post</h2>
          <input     //input field for editing post title
            type="text"
            value={editPostTitle}
            onChange={(e) => setEditPostTitle(e.target.value)}   //update editPostTitle when input changes
            placeholder="Edit post title"
          />
          <textarea    //textarea for editing post content
            value={editPostContent}
            onChange={(e) => setEditPostContent(e.target.value)}  //update editPostContent when input changes
            placeholder="Edit post content"
          ></textarea>
          <button onClick={handleUpdatePost}>Update Post</button>  {/* button to update post */}
          <button onClick={() => setIsEditing(false)}>Cancel</button>  {/*button to cancel edit, sets isEditing to false */}
        </div>
      )}

      {/* List Posts Section */}
      <ul className={styles.postList}>    {/*unordered list to display posts */}
        {posts.map((post) => (   //map through posts array to render each post
          <li key={post.id} className={styles.postItem}>   {/*list item for each post */}
            <h2>{post.title}</h2>   {/*display post title */}
            <p>{post.content}</p>    {/* display post content */}
            <button        //button to like a post
              className={styles.like}
              onClick={() => likePost(post.id)}   //call likePost function when clicked
            >
              Like ({post.likes})    {/*display number of likes */}
            </button>
            <button     //button to edit a post
              className={styles.edit}
              onClick={() => startEditing(post)}  //call startEditing function when clicked
            >
              Edit
            </button>
            <button      //button to delete a post
              className={styles.delete}
              onClick={() => deletePost(post.id)}  //call deletePost function when clicked
            >
              Delete
            </button>

            {/* Comments Section for each post */}
            <div className={styles.comments}>
              <h3>Comments</h3>
              <ul>        {/*unordered list to display comments */}
                {post.comments.map((comment) => (  //map through comments array to render each comment
                  <li key={comment.id}>    {/* list item for each comment */}
                    {comment.text} -{" "}     {/*display comment text */}
                    <small>{new Date(comment.createdAt).toLocaleString()}</small>  {/*display comment created at time */}
                  </li>
                ))}
              </ul>
              {/*form to add a new comment  */}
              <div className={styles.commentForm}>
                <input     //input field for new comment text
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)} // Update newComment state when input changes.
                  placeholder="Add a comment"  // Placeholder text for the comment input field.
                />
                <button onClick={() => handleAddComment(post.id)}> {/* Button to add a comment to the current post. */}
                  Add Comment
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostManager;
