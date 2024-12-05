import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TagInput from "../TagInput/TagInput";
import styles from "./PostEditor.module.css";
import BlogPost from "../BlogPost/BlogPost";
import RichTextEditor from "../RichTextEditor/RichTextEditor";

function PostEditor({ post = {}, onSave, isDarkMode }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    tags: [],
    category: "general",
    isPublished: false,
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState({});

  // Load draft data from localStorage if available; else load from post prop
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("postDraft"));
    if (savedData) {
      console.log('savedData if condition');
      setFormData(savedData);
    } else if (post) {
      console.log('savedData else condition');
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
      case "image":
        return value
          ? "Invalid image format"
          : "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
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
      newValue = URL.createObjectURL(file);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    setIsDirty((prev) => ({
      ...prev,
      [name]: true,
    }));

    if (isDirty[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, newValue),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const postId = post?.id ?? null;
      onSave({ ...formData, id: postId });
      localStorage.removeItem("postDraft");
    } else {
      localStorage.setItem("postDraft", JSON.stringify(formData));
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
            className={`${styles.input_field} ${errors.title ? styles.error : ""}`}
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
            className={`${styles.input_field} ${errors.author ? styles.error : ""}`}
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
              setFormData((prev) => ({ ...prev, content: value }))
            }
            onBlur={handleBlur}
            className={`${styles.input_field} ${errors.content ? styles.error : ""}`}
            placeholder="Write your content here..."
            rows="10"
            error={errors.content}
          />
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
            <img src={formData.image} alt="Preview" className={styles.image_preview} />
          )}
        </div>

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

        <button type="submit" className={styles.submit_button}>
          {formData.isPublished ? "Publish Post" : "Save Draft"}
        </button>
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
  onSave: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default PostEditor;
