import { useState, useEffect } from "react"; // Import necessary React hooks for managing state and side effects.
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for programmatic navigation.
import PropTypes from "prop-types"; // Import PropTypes for defining data types of the component's props.
import TagInput from "../TagInput/TagInput"; // Import TagInput component.
import styles from "./PostEditor.module.css"; // Import CSS modules for styling.
import BlogPost from "../BlogPost/BlogPost"; // Import BlogPost component.
import RichTextEditor from "../RichTextEditor/RichTextEditor"; // Import RichTextEditor component.

function PostEditor({ post = {}, isDarkMode }) { // Component function for the post editor.

  const [formData, setFormData] = useState({  // Initialize formData state with default values or values from the 'post' prop if provided.
    id: undefined,
    title: "",
    content: "",
    author: "",
    tags: [],
    category: "general",
    isPublished: false,
    image: null,
  });

  const [errors, setErrors] = useState({}); // State variable for storing validation errors.
  const [isDirty, setIsDirty] = useState(false); // State variable to track if the form has been modified.
  const navigate = useNavigate(); // Get navigation function for programmatic routing.

  useEffect(() => { // Effect hook to load saved draft or initialize form data based on 'post' prop.
    const savedDraft = JSON.parse(localStorage.getItem("postDraft")); // Retrieve saved draft from localStorage.

    if (savedDraft) {  //check if savedDraft exists in local storage
      setFormData(savedDraft);   //if it exists set formData to savedDraft
    } else if (post) {  //check if post prop is passed, used for edit functionality
      setFormData({  //populate the form data with the fields from post prop
        id: post.id,
        title: post.title || "",
        content: post.content || "",
        author: post.author || "",
        tags: post.tags || [],
        category: post.category || "general",
        isPublished: post.isPublished || false,
        image: post.image || null,
      });
    }
  }, []); //empty dependency array so this useEffect will only run once

  const validateField = (name, value) => { // Function to validate individual form fields.
    switch (name) {
      case "title":
        return value.trim().length < 5  //check if title length is less than 5
          ? "Title must be at least 5 characters" //if yes return error message
          : "";  //else return empty string
      case "author":
        return value.trim().length < 3  //check if author length is less than 3
          ? "Author name must be at least 3 characters"   //if yes return error message
          : "";    //else return empty string
      case "content":
        return value.trim().length < 100   //check if content length is less than 100
          ? "Content must be at least 100 characters"   //if yes return error message
          : "";   //else return empty string
      case "tags":
        return value.length === 0   //check if tags length is 0
          ? "At least one tag is required" //if yes return error message
          : "";   //else return empty string
      default:
        return "";  //for other fields return empty string
    }
  };

  const handleChange = (e) => { // Function to handle changes in form fields.
    const { name, value, type, checked, files } = e.target; //destructure the properties from event target
    let newValue = type === "checkbox" ? checked : value;  //determine newValue based on input type

    if (type === "file" && files[0]) {   //check if input type is file and a file is selected
      const file = files[0];   
      if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {   //check if selected file is of allowed type
        setErrors((prev) => ({  //if not allowed type set error message
          ...prev,
          image: "Only JPEG, PNG, and GIF images are allowed",
        }));
        return;
      }
      newValue = URL.createObjectURL(file); //if file type is allowed create a temporary url for the file and assign it to newValue
    }

    setFormData((prev) => ({   //update formData state with new value
      ...prev,
      [name]: newValue,
    }));

    setIsDirty(true);   //set isDirty to true indicating the form is modified
  };

  const handleBlur = (e) => { // Function to handle blur events on form fields for validation.
    const { name, value } = e.target;  // Get name and value of the blurred field.
    setErrors((prev) => ({    // Update errors state with validation result for the blurred field.
      ...prev,
      [name]: validateField(name, value),  //call validateField function to validate the field
    }));
  };

  const saveAsDraft = () => { // Function to save the current form data as a draft.
    localStorage.setItem("postDraft", JSON.stringify(formData)); // Save form data to localStorage as "postDraft".
    alert("Draft saved!");   //display alert message
    navigate("/"); // Navigate to the home page after saving the draft.
  };

  const handleSubmit = (e) => {  //function to handle form submit
    e.preventDefault();  // Prevent default form submission behavior.
    const newErrors = {};   // Create an empty object to store new errors.
    Object.keys(formData).forEach((key) => {  // Iterate over form data keys to validate each field.
      const error = validateField(key, formData[key]);  //validate each field by calling validateField function
      if (error) newErrors[key] = error;   //if error exists for a field, add it to newErrors object
    });
    setErrors(newErrors);   // Update errors state with new errors.

    if (Object.keys(newErrors).length === 0) { // Check if there are any validation errors. If no errors
      const savedPosts = JSON.parse(localStorage.getItem("posts")) || []; // Retrieve saved posts from localStorage or initialize an empty array

      const existingPostIndex = savedPosts.findIndex((p) => p.id === formData.id);  //check if post already exists by comparing with id
      console.log(JSON.stringify(formData, null, 2), existingPostIndex, '7483', JSON.stringify(savedPosts, null, 2)) //log for debugging

      if (existingPostIndex !== -1) {  // If post exists, update it
        savedPosts[existingPostIndex] = {    
          ...savedPosts[existingPostIndex], //retain the original properties
          ...formData,   //update with form data
          date: new Date().toISOString(),   //update the date to current date
        };
      } else {  // If post doesn't exist, add a new post
        savedPosts.push({
          ...formData,  
          id: formData.id || Date.now(), //assign id if doesnt exist
          date: new Date().toISOString(),   //set current date
        });
      }

      localStorage.setItem("posts", JSON.stringify(savedPosts));  //save updated posts to local storage
      localStorage.removeItem("postDraft"); //remove postDraft from local storage

      alert(    //display a success alert message
        existingPostIndex !== -1
          ? "Post updated successfully!"
          : "Post published successfully!"
      );
      navigate("/");  //navigate to home page
    } else {
      alert("Please fix the errors before publishing."); //if validation errors exist display alert message
    }
  };

  return (
    <div className={styles.post_editor_container}> {/* Main container for the post editor. */}
      <form    // Form for creating/editing a post.
        onSubmit={handleSubmit}   //call handleSubmit function when form is submitted
        className={`${styles.post_editor} ${isDarkMode ? styles.dark : ""}`}  //conditional styling for dark mode
      >
        <div className={styles.form_group}>   {/* Container for title input field. */}
          <label htmlFor="title" className={styles.form_label}>  {/*label for title input*/}
            Title *  {/* * indicates required field */}
          </label>
          <input   // Input field for post title.
            type="text"  
            id="title"   
            name="title"
            value={formData.title}    
            onChange={handleChange}  //call handleChange function when input value changes
            onBlur={handleBlur}   //call handleBlur function when input loses focus
            className={`${styles.input_field} ${
              errors.title ? styles.error : ""  //conditional styling for error
            }`}
            placeholder="Enter post title..."
          />
          {errors.title && (   //display error message if error exists for title field
            <span className={styles.error_message}>{errors.title}</span>
          )}
        </div>

        {/*input field for author similar to title input*/}
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

        <div className={styles.form_group}>  {/*container for content input field*/}
          <label htmlFor="content" className={styles.form_label}>  {/*label for content*/}
            Content *  
          </label>
          <RichTextEditor    // Rich text editor for post content.
            id="content"
            name="content"
            value={formData.content}  
            onChange={(value) =>    //update formData when content changes
              setFormData((prev) => ({
                ...prev,
                content: value,
              }))
            }
            className={`${styles.input_field} ${
              errors.content ? styles.error : ""   //conditional styling for error
            }`}
          />
          {errors.content && (   //display error message if content has errors
            <span className={styles.error_message}>{errors.content}</span>
          )}
        </div>

        <TagInput   
          tags={formData.tags}  //pass tags to TagInput component
          onChange={(tags) =>   //update tags in formData when tags change in TagInput
            setFormData((prev) => ({
              ...prev,
              tags,
            }))
          }
        />

        <div className={styles.form_group}>  {/*container for category dropdown*/}
          <label htmlFor="category" className={styles.form_label}>    {/*label for category*/}
            Category
          </label>
          <select    // Dropdown for selecting post category.
            id="category"
            name="category"
            value={formData.category}   
            onChange={handleChange}   //call handleChange function when category selection changes
            className={styles.input_field}
          >
            <option value="general">General</option>
            <option value="technology">Technology</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="travel">Travel</option>
          </select>
        </div>

        {/* Image upload section similar to previous examples */}
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

        <div className={styles.actions}>   {/*container for action buttons*/}
          <button     // Button to save the post as a draft.
            type="button"
            onClick={saveAsDraft}  //call saveAsDraft function when clicked
            className={styles.draft_button}   
          >
            Save as Draft  
          </button>
          <button type="submit" className={styles.submit_button}>   {/* Button to submit the post. */}
            Publish Post   
          </button>
        </div>
      </form>

      <div style={{ display: "flex", flex: 1 }}>    {/*container to display the blog post preview*/}
        <BlogPost   //preview of the blog post being edited
          key={formData?.id}  
          id={formData?.id}
          title={formData?.title}
          content={formData?.content}
          author={formData?.author}
          date={formData?.date}
          image={formData?.image}
          isDarkMode={isDarkMode}  
          isPreview={true}   //sets the BlogPost component to preview mode
        />
      </div>
    </div>
  );
}

PostEditor.propTypes = {  // Define PropTypes for the component's props.
  post: PropTypes.object,  
  isDarkMode: PropTypes.bool.isRequired,
};

export default PostEditor;  // Export the PostEditor component as the default export.
