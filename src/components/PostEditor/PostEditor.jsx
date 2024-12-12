// Import necessary hooks for state management and side effects.
import { useState, useEffect } from "react";
// Import PropTypes for prop type checking.
import PropTypes from "prop-types";
// Import custom components.
import TagInput from "../TagInput/TagInput";
import BlogPost from "../BlogPost/BlogPost";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
// Import CSS styles specific to this component.
import styles from "./PostEditor.module.css";

// Define the functional component PostEditor, which takes post, onSave, and isDarkMode as props.
function PostEditor({ post = {}, onSave, isDarkMode }) {
  // Initialize state variables using the useState hook:
  // formData: An object to store the form data for the post. Initialized with default values or values from the post prop.
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    tags: [],
    category: "general",
    isPublished: false,
    image: null,
  });
  // errors: An object to store validation errors for each field. Initialized with an empty object.
  const [errors, setErrors] = useState({});
  // isDirty: An object to track whether each field has been touched by the user. Initialized with an empty object.
  const [isDirty, setIsDirty] = useState({});

  // useEffect hook to load draft data from localStorage or initialize formData with the post prop if available.
  useEffect(() => {
    // Retrieve saved draft data from localStorage.
    const savedData = JSON.parse(localStorage.getItem("postDraft"));
    //if there is a saved data in local storage then set it to form data
    if (savedData) {
      console.log("savedData if condition");
      setFormData(savedData);
      //if there is no saved data then check if post prop has data. this happens when editing an existing post
    } else if (post) {
      console.log("savedData else condition");
      setFormData({
        title: post.title || "",
        content: post.content || "",
        author: post.author || "",
        tags: post.tags || [],
        category: post.category || "general",
        isPublished: post.isPublished || false,
        image: post.image || null,
      });
    }
  }, [post]);

  // Define a function to validate a specific field based on its name and value.
  const validateField = (name, value) => {
    switch (name) {
      case "title":
        // Title must be at least 5 characters long.
        return value.trim().length < 5
          ? "Title must be at least 5 characters"
          : "";
      case "author":
        // Author name must be at least 3 characters long.
        return value.trim().length < 3
          ? "Author name must be at least 3 characters"
          : "";
      case "content":
        // Content must be at least 100 characters long.
        return value.trim().length < 100
          ? "Content must be at least 100 characters"
          : "";
      case "tags":
        // At least one tag is required.
        return value.length === 0 ? "At least one tag is required" : "";
      case "image":
        // if there is an image then it must be a blob. this check is done for preview images in the editor
        return value && !value.startsWith("blob:")
          ? "Invalid image format"
          : "";
      default:
        return "";
    }
  };

  // Define a function to handle changes in the form inputs.
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    let newValue = type === "checkbox" ? checked : value; // Determine the new value based on input type.

    if (type === "file" && files[0]) {
      const file = files[0];
      // Validate the uploaded image type.
      if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          image: "Only JPEG, PNG, and GIF images are allowed",
        }));
        return;
      }
      // Create a temporary URL for the uploaded image.
      newValue = URL.createObjectURL(file);
    }

    // Update the formData state with the new value.
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Mark the field as dirty.
    setIsDirty((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Validate the field if it's dirty.
    if (isDirty[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, newValue),
      }));
    }
  };

  // Define a function to handle blur events on the form inputs.
  const handleBlur = (e) => {
    const { name, value } = e.target;
    // Validate the field on blur.
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  // Define a function to handle form submission.
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior.

    const newErrors = {}; //create an empty object to store the errors
    // Validate all fields.
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    // Update the errors state.
    setErrors(newErrors);

    // If there are no errors, call the onSave prop with the formData and clear the draft from localStorage.
    if (Object.keys(newErrors).length === 0) {
      const postId = post?.id ?? null; //if post has id then use it else it will be null. this happens during post creation
      // Call the onSave prop with the formData, including the post ID if available.
      onSave({ ...formData, id: postId });
      // Remove the draft from localStorage after saving.
      localStorage.removeItem("postDraft");
      // If there are errors, save the formData to localStorage as a draft.
    } else {
      localStorage.setItem("postDraft", JSON.stringify(formData));
    }
  };

  // Return the JSX to render the component.
  return (
    <div className={styles.post_editor_container}>
      <form
        onSubmit={handleSubmit}
        className={`${styles.post_editor} ${isDarkMode ? styles.dark : ""}`}
      >
        {/* Input field for post title. */}
        <div className={styles.form_group}>
          <label htmlFor="title" className={styles.form_label}>
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${styles.input_field} ${
              errors.title ? styles.error : ""
            }`}
            placeholder="Enter post title..."
          />
          {/* Display error message for title if there is one. */}
          {errors.title && (
            <span className={styles.error_message}>{errors.title}</span>
          )}
        </div>
        {/* Input field for post author. */}
        <div className={styles.form_group}>
          <label htmlFor="title" className={styles.form_label}>
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
          {/* Display error message for author if there is one. */}
          {errors.author && (
            <span className={styles.error_message}>{errors.author}</span>
          )}
        </div>

        {/* Rich text editor for post content. */}
        <div className={styles.form_group}>
          <label htmlFor="content" className={styles.form_label}>
            Content *
          </label>
          <RichTextEditor
            id="content"
            name="content"
            value={formData.content}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, content: value }))
            }
            onBlur={(e) => handleBlur(e)}
            className={`${styles.input_field} ${
              errors.content ? styles.error : ""
            }`}
            placeholder="Write your content here..."
            rows="10"
            error={errors.content}
          />
          {/* Display error message for content if there is one. */}
          {errors.content && (
            <span className={styles.error_message}>{errors.content}</span>
          )}
        </div>

        <TagInput
          tags={formData.tags}
          onChange={(tags) =>
            handleChange({ target: { name: "tags", value: tags } })
          }
          onBlur={() =>
            handleBlur({ target: { name: "tags", value: formData.tags } })
          }
          error={errors.tags}
        />
        {/* dropdown for selecting post category. */}
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
        {/* Input for uploading an image. */}
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
          {/* Display error message for image if there is one. */}
          {errors.image && (
            <span className={styles.error_message}>{errors.image}</span>
          )}
          {/* Display image preview if an image is selected. */}
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              className={styles.image_preview}
            />
          )}
        </div>

        {/* Checkbox to publish the post immediately. */}
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

        {/* Submit button. */}
        <button type="submit" className={styles.submit_button}>
          {formData.isPublished ? "Publish Post" : "Save Draft"}
        </button>
      </form>
      {/* preview of the post */}
      <div style={{ display: "flex", flex: 1 }}>
        <BlogPost
          key={formData?.id}
          id={formData?.id}
          title={formData?.title}
          content={formData?.content}
          author={formData?.author}
          date={formData?.date}
          image={formData?.image}
          isDarkMode={isDarkMode}
          isPreview={true}
        />
      </div>
    </div>
  );
}

// Define PropTypes for the component's props.
PostEditor.propTypes = {
  post: PropTypes.object, //post is optional and must be an object
  onSave: PropTypes.func.isRequired, //onSave is required and must be a function
  isDarkMode: PropTypes.bool.isRequired, //isDarkMode is required and must be a boolean value
};

// Export the PostEditor component as the default export.
export default PostEditor;
