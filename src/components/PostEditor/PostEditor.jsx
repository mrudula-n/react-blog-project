// src/components/PostEditor
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import TagInput from "../TagInput/TagInput";
import styles from "./PostEditor.module.css";
import BlogPost from "../BlogPost/BlogPost";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import { useBlog } from "../../contexts/BlogContext";

const initialState = {
  id: undefined,
    title: "",
    content: "",
    author: "",
    tags: [],
    category: "general",
    isPublished: false,
    image: null,
};

function PostEditor({ post = {}, isDarkMode }) {
  const [formData, setFormData] = useState({
    ...initialState
  });
  const { state } = useBlog();
  const { posts, isLoading, error } = state;

  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useBlog();

  console.log(post, 'posts');

  useEffect(() => {
    if (post) {
      setFormData({
        id: post?.id,
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

  const validateField = (name, value) => {
    switch (name) {
      case "title":
        return value.trim().length < 5
          ? "Title must be at least 5 characters"
          : "";
      case "author":
        return value.trim().length < 3
          ? "Author name must be at least 3 characters"
          : "";
      case "content":
        return value.trim().length < 100
          ? "Content must be at least 100 characters"
          : "";
      case "tags":
        return value.length === 0 ? "At least one tag is required" : "";
      default:
        return "";
    }
  };

  const handleChange = async (e) => {
    const { name, value, type, checked, files } = e.target;
    let newValue = type === "checkbox" ? checked : value;
  
    if (type === "file" && files[0]) {
      const file = files[0];
      if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          image: "Only JPEG, PNG, and GIF images are allowed",
        }));
        return;
      }
      newValue = await convertToBase64(file);
    }
  
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  
    setIsDirty(true);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const saveAsDraft = () => {
    localStorage.setItem("postDraft", JSON.stringify(formData));
    alert("Draft saved!");
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
  
    // Validate all fields
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      // Check if the post exists
      if (formData.id) {
        // Update existing post
        dispatch({
          type: "UPDATE_POST",
          payload: {
            ...formData,
            date: new Date().toISOString(),
          },
        });
        alert("Post updated successfully!");
      } else {
        // Add new post
        dispatch({
          type: "ADD_POST",
          payload: {
            ...formData,
            id: Date.now(), // Generate an ID for new posts
            date: new Date().toISOString(),
          },
        });
        alert("Post published successfully!");
      }
  
      // Remove the draft and navigate
      localStorage.removeItem("postDraft");
      navigate("/");
    } else {
      alert("Please fix the errors before publishing.");
    }
  };

  return (
    <div className={styles.post_editor_container}>
      <form
        onSubmit={handleSubmit}
        className={`${styles.post_editor} ${isDarkMode ? styles.dark : ""}`}
      >
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
          {errors.title && (
            <span className={styles.error_message}>{errors.title}</span>
          )}
        </div>

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

        <div className={styles.form_group}>
          <label htmlFor="content" className={styles.form_label}>
            Content *
          </label>
          <RichTextEditor
            id="content"
            name="content"
            value={formData.content}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                content: value,
              }))
            }
            className={`${styles.input_field} ${
              errors.content ? styles.error : ""
            }`}
          />
          {errors.content && (
            <span className={styles.error_message}>{errors.content}</span>
          )}
        </div>

        <TagInput
          tags={formData.tags}
          onChange={(tags) =>
            setFormData((prev) => ({
              ...prev,
              tags,
            }))
          }
        />

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

        <div className={styles.actions}>
          <button
            type="button"
            onClick={saveAsDraft}
            className={styles.draft_button}
          >
            Save as Draft
          </button>
          <button type="submit" className={styles.submit_button}>
            Publish Post
          </button>
        </div>
      </form>

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

PostEditor.propTypes = {
  post: PropTypes.object,
  isDarkMode: PropTypes.bool.isRequired,
};

export default PostEditor;
