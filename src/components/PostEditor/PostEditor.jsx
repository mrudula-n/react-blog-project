// Import necessary modules and components
import { useState, useEffect } from "react"; // Import useState and useEffect hooks for managing state and side effects
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import TagInput from "../TagInput/TagInput"; // Import the TagInput component for tag management
import styles from "./PostEditor.module.css";  // Import CSS Modules styles for styling the component
import BlogPost from "../BlogPost/BlogPost";  // Import the BlogPost component for previewing the post
import RichTextEditor from "../RichTextEditor/RichTextEditor"; // Import RichTextEditor for content editing

// Define the PostEditor functional component. Takes 'post', 'onSave', and 'isDarkMode' as props.
function PostEditor({ post = {}, onSave, isDarkMode }) {
    // Initialize state for form data using useState hook.  Defaults to an empty post object if no 'post' prop is provided.
  const [formData, setFormData] = useState({
    title: "", //title of the post
    content: "", // Post content
    author: "", //author of the post
    tags: [], //array of tags for the post
    category: "general", //category of the post, defaults to general
    isPublished: false, // Whether the post is published or saved as a draft, defaults to false
    image: null, // Image for the post
  });

    // Initialize state for form validation errors. Initially an empty object.
  const [errors, setErrors] = useState({});
    // Initialize state for tracking which fields have been modified. Initially an empty object.
  const [isDirty, setIsDirty] = useState({});

  // useEffect hook to load saved draft data from localStorage or initialize form data with existing post data.  Runs only once on mount or when 'post' prop changes.
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("postDraft")); // Try to parse saved draft data from localStorage

    if (savedData) {
      console.log("savedData if condition"); // Log indicating loading from saved data (for debugging)
      setFormData(savedData); //set form data to retrieved saved data
    } else if (post) {
      console.log("savedData else condition"); // Log indicating loading from existing post data (for debugging)
      // Initialize formData with existing post data if available
      setFormData({
        title: post.title || "", // Set title from post, default to empty string
        content: post.content || "", // Set content from post, default to empty string
        author: post.author || "", // Set author from post, default to empty string
        tags: post.tags || [],  // Set tags from post, default to empty array
        category: post.category || "general", // Set category from post, default to 'general'
        isPublished: post.isPublished || false, // Set isPublished from post, default to false
        image: post.image || null,  // Set image from post, default to null
      });
    }
  }, [post]); // The dependency array ensures this effect runs only when the 'post' prop changes


  // Function to validate individual form fields. Takes the field name and value as arguments.
  const validateField = (name, value) => {
    switch (name) {
      case "title":
                //title should be at least 5 characters long
        return value.trim().length < 5
          ? "Title must be at least 5 characters"
          : "";
      case "author":
                //author name should be at least 3 characters long
        return value.trim().length < 3
          ? "Author name must be at least 3 characters"
          : "";
      case "content":
                // Content should be at least 100 characters long
        return value.trim().length < 100
          ? "Content must be at least 100 characters"
          : "";
      case "tags":
                 //at least one tag is required
        return value.length === 0 ? "At least one tag is required" : "";
      case "image":
                // Check if the image value is valid (starts with "blob:" or "data:image/")
        return value &&
          !value.startsWith("blob:") &&
          !value.startsWith("data:image/")
          ? "Invalid image format"
          : "";
      default:
        return ""; // Return empty string (no error) for other fields
    }
  };

  // Function to handle changes in form fields, including file uploads.
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target; //destructure properties from event target
    let newValue = type === "checkbox" ? checked : value; //determine new value based on input type

    if (type === "file" && files[0]) {
            //handle file uploads for images
      const file = files[0];
            //validate uploaded file type. only jpeg, png, and gif allowed
      if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
                //set error message if invalid file type
        setErrors((prev) => ({ ...prev, image: "Only JPEG, PNG, and GIF images are allowed" }));
        return; //stop further handling if file is invalid
      }
            //create a temporary url for the uploaded image to display a preview
      newValue = URL.createObjectURL(file);
      setErrors((prev) => ({ ...prev, image: "" })); // Clear any previous image errors
    }

    // Update form data with the new value
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));


    // Mark the field as dirty (touched)
    setIsDirty((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Validate the field if it has been modified/touched
    if (isDirty[name]) {
      setErrors((prev) => ({
        ...prev, //spread previous errors
        [name]: validateField(name, newValue), //validate current field and update errors
      }));
    }
  };

  // Handles blur events (when a field loses focus) on form fields for validation.
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) })); //validate field and set/clear error message
  };


  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior


    const newErrors = {}; //create new errors object
    // Validate all fields
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);  //validate each field in formdata
      if (error) newErrors[key] = error; // If there's an error, add it to newErrors
    });
    setErrors(newErrors);  // Update the errors state


    // If there are no errors, proceed with saving
    if (Object.keys(newErrors).length === 0) {
      const postId = post?.id ?? null; // If editing an existing post, use its ID; otherwise, set to null for a new post. the ?? is called nullish coalescing operator: returns right hand side if left hand side is null or undefined
      onSave({ ...formData, id: postId });  // Call the onSave function with the form data and post ID
      localStorage.removeItem("postDraft");  // Remove any saved draft from localStorage since the post is being saved
    } else {
      // If there are validation errors, save the current form data to localStorage as a draft
      localStorage.setItem("postDraft", JSON.stringify(formData));
    }
  };

  return (
      //main container for the post editor
    <div className={styles.post_editor_container}>
        {/*form for creating/editing blog post*/}
      <form
        onSubmit={handleSubmit}
        className={`${styles.post_editor} ${isDarkMode ? styles.dark : ""}`} // Apply dark mode styles if isDarkMode is true
      >
        {/*form group for title input*/}
        <div className={styles.form_group}>
          <label htmlFor="title" className={styles.form_label}> {/*label for title input*/}
            Title * {/*indicates required field*/}
          </label>
                {/*input field for post title*/}
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            onBlur={handleBlur}
                        //sets input field class based on whether there is an error for the field. if error exists apply error styles
            className={`${styles.input_field} ${
              errors.title ? styles.error : ""
            }`}
            placeholder="Enter post title..."
          />
                    {/*displays error message if there is an error for title field*/}
          {errors.title && (
            <span className={styles.error_message}>{errors.title}</span>
          )}
        </div>

        {/*form group for author input. similar structure to title input*/}
        <div className={styles.form_group}>
          <label htmlFor="author" className={styles.form_label}>
            Author *
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${styles.input_field} ${
              errors.author ? styles.error : ""
            }`}
            placeholder="Enter post author..."
          />
          {errors.author && (
            <span className={styles.error_message}>{errors.author}</span>
          )}
        </div>

        {/*form group for content input using rich text editor.*/}
        <div className={styles.form_group}>
          <label htmlFor="content" className={styles.form_label}>
            Content *  {/*indicates required field*/}
          </label>
          <RichTextEditor 
            id="content"
            name="content"
            value={formData.content}
            onChange={(value) =>   //handles content change in rich text editor. updates form data with new content.
              setFormData((prev) => ({ ...prev, content: value }))
            }
            onBlur={handleBlur}
            className={`${styles.input_field} ${
              errors.content ? styles.error : ""  //sets class name based on error status
            }`}
            placeholder="Write your content here..."
            rows="10"   //sets number of rows for text area
            error={errors.content}   //pass error message to display under the editor  
          />

          {/*error message for content*/}
          {errors.content && (
            <span className={styles.error_message}>{errors.content}</span>
          )}
        </div>

        {/* Tag input component for adding and removing tags */}
        <TagInput
          tags={formData.tags}
          onChange={(tags) =>   //handles changes in tags. updates formdata with new tags.
            handleChange({ target: { name: "tags", value: tags } })
          }
          onBlur={() =>   //handles blur event for tag input to trigger validation
            handleBlur({ target: { name: "tags", value: formData.tags } })
          }
          error={errors.tags}   //passes any tag related errors to taginput component
        />

        {/*form group for category selection*/}
        <div className={styles.form_group}>
          <label htmlFor="category" className={styles.form_label}>
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={styles.input_field}
          >
            <option value="general">General</option>
            <option value="technology">Technology</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="travel">Travel</option>
          </select>
        </div>

          {/*form group for image upload*/}
        <div className={styles.form_group}>
          <label htmlFor="image" className={styles.form_label}>
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/jpeg, image/png, image/gif"
            onChange={handleChange}
            className={styles.input_field}
          />
          {errors.image && (
            <span className={styles.error_message}>{errors.image}</span>
          )}
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              className={styles.image_preview}
            />
          )}
        </div>

        {/*checkbox for publishing immediately*/}
        <div className={`${styles.form_group} ${styles.checkbox}`}>
          <label>
            <input
              type="checkbox"
              name="isPublished"
              checked={formData.isPublished}
              onChange={handleChange}
            />
            Publish immediately
          </label>
        </div>

        {/* Submit button */}
        <button type="submit" className={styles.submit_button}>
          {formData.isPublished ? "Publish Post" : "Save Draft"} {/*button text changes based on whether the post should be published immediately or saved as a draft*/}
        </button>
      </form>

      {/*preview section. displays a preview of the blog post being edited*/}
      <div style={{ display: "flex", flex: 1 }}>
        <BlogPost
          key={formData?.id} //key prop for react rendering. should be unique. uses post id if available or null
          id={formData?.id}  //id of the post. might be null for new posts
          title={formData?.title} //title from formdata
          content={formData?.content} //content from formdata
          author={formData?.author}
          date={formData?.date}
          image={formData?.image}
          isDarkMode={isDarkMode}  //passes isDarkMode prop to blogpost component
          isPreview={true} //indicates that this is a preview, not an actual post
        />
      </div>
    </div>
  );
}

//PropTypes for validating props passed to the component
PostEditor.propTypes = {
  post: PropTypes.object,  //post object for editing. can be omitted for new posts
  onSave: PropTypes.func.isRequired, //onSave function is required for saving the post data. must be a function
  isDarkMode: PropTypes.bool.isRequired,  //isDarkMode is required and must be a boolean value
};

export default PostEditor;  //export the posteditor component as the default exportF
