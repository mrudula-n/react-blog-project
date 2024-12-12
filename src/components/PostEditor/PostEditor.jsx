import { useState, useEffect } from "react";  // Import useState for managing component state and useEffect for side effects.
import { useNavigate } from "react-router-dom";  // Import useNavigate for programmatic navigation.
import PropTypes from "prop-types"; // Import PropTypes for prop type checking.
import TagInput from "../TagInput/TagInput";  // Import a custom TagInput component.
import styles from "./PostEditor.module.css"; // Import CSS styles specific to this component.
import BlogPost from "../BlogPost/BlogPost"; // Import BlogPost component for preview
import RichTextEditor from "../RichTextEditor/RichTextEditor"; // Import a rich text editor component.

function PostEditor({ post = {}, isDarkMode }) {  //post is the post object to edit, isDarkMode is a boolean for dark mode
  const [formData, setFormData] = useState({  //formData state with initial values for the form
    id: undefined,
    title: "",
    content: "",
    author: "",
    tags: [],
    category: "general",
    isPublished: false,
    image: null,
  });

  const [errors, setErrors] = useState({});  // State for storing validation errors.
  const [isDirty, setIsDirty] = useState(false); // State to track if the form has been modified.  Not used in current code
  const navigate = useNavigate(); // Hook for navigating programmatically.

  useEffect(() => {  //useEffect hook to load saved draft from localStorage or initialize formData with the post prop
    const savedDraft = JSON.parse(localStorage.getItem("postDraft"));  //get saved draft from localStorage
    if (savedDraft) {  //if savedDraft exists, set formData to savedDraft
      setFormData(savedDraft);
    } else if (post) {   //else if post prop exists,set FormData with post prop values
      setFormData({
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
  }, []);   //empty dependency array ensures this runs only once on component mount

  const validateField = (name, value) => {   //function to validate individual fields
    switch (name) {  //switch case for different field validations
      case "title":
        return value.trim().length < 5  //if title is less than 5 characters return error message
          ? "Title must be at least 5 characters"
          : "";   //else return empty string
      case "author":
        return value.trim().length < 3   //if author is less than 3 characters return error message
          ? "Author name must be at least 3 characters"
          : "";  //else return empty string
      case "content":
        return value.trim().length < 100  //if content is less than 100 characters return error message
          ? "Content must be at least 100 characters"
          : "";  //else return empty string
      case "tags":
        return value.length === 0    //if no tags are selected return error message
          ? "At least one tag is required"
          : "";  //else return empty string
      default:
        return "";    //default return empty string
    }
  };

  const handleChange = async (e) => {    //function to handle changes in form fields
    const { name, value, type, checked, files } = e.target;  //destructure event target properties
    let newValue = type === "checkbox" ? checked : value;  //if checkbox set newValue to checked else value
  
    if (type === "file" && files[0]) {  // If a file is uploaded
      const file = files[0];
      if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) { //check for allowed file types
        setErrors((prev) => ({   //set error message if file type is not allowed
          ...prev,
          image: "Only JPEG, PNG, and GIF images are allowed",
        }));
        return;  //return early if file type is not allowed
      }
      newValue = await convertToBase64(file);  //convert image to base64
    }
  
    setFormData((prev) => ({   //update formData with new value
      ...prev,
      [name]: newValue,
    }));
  
    setIsDirty(true);  //set isDirty to true indicating form is modified.
  };

  const convertToBase64 = (file) => {    //function to convert file to base64 string using FileReader API
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);  //resolve with base64 string when file is loaded
      reader.onerror = (error) => reject(error);     //reject if error occurs
      reader.readAsDataURL(file);     //read file as data url
    });
  };

  const handleBlur = (e) => {  // Function to handle blur event on form fields  (when the user clicks outside of the field)
    const { name, value } = e.target;
    setErrors((prev) => ({  // Update the errors state with the validation result for the blurred field.
      ...prev,
      [name]: validateField(name, value), // Call validateField to get the error message.
    }));
  };

  const saveAsDraft = () => {  // Function to save the current form data as a draft in localStorage.
    localStorage.setItem("postDraft", JSON.stringify(formData));  //save formData to localStorage
    alert("Draft saved!");    //show alert message
    navigate("/");   //navigate to home page
  };

  const handleSubmit = (e) => {  //function to handle form submission
    e.preventDefault();   //prevent default form submission behaviour
    const newErrors = {};    //create an empty object to store errors
    Object.keys(formData).forEach((key) => {   //loop through each key in formData
      const error = validateField(key, formData[key]);  //validate each field
      if (error) newErrors[key] = error;    //if error exists,add it to newErrors object
    });
    setErrors(newErrors);   //set errors state with newErrors
  
    if (Object.keys(newErrors).length === 0) {  //if no errors exist
      const savedPosts = JSON.parse(localStorage.getItem("posts")) || []; // Get saved posts from localStorage or initialize an empty array.
  
      // Check if the post exists based on its id
      const existingPostIndex = savedPosts.findIndex((p) => p.id === formData.id);  //check if post already exists
      console.log(JSON.stringify(formData, null, 2), existingPostIndex, '7483', JSON.stringify(savedPosts, null, 2)) // Log data for debugging
  
      if (existingPostIndex !== -1) {  //if post exists
        // Update the existing post
        savedPosts[existingPostIndex] = {   //update existing post with formData
          ...savedPosts[existingPostIndex], //retain original properties
          ...formData,
          date: new Date().toISOString(),    //update date
        };
      } else {   //if post doesn't exist
        // Add a new post
        savedPosts.push({   //add new post to savedPosts array
          ...formData,       
          id: formData.id || Date.now(),   //set id if it doesn't exist
          date: new Date().toISOString(),   //set date
        });
      }
  
      // Save updated posts to localStorage
      localStorage.setItem("posts", JSON.stringify(savedPosts));  //save updated posts to localStorage
      localStorage.removeItem("postDraft");   //remove draft from localStorage
  
      alert(   //show alert message based on whether post was updated or created
        existingPostIndex !== -1
          ? "Post updated successfully!"
          : "Post published successfully!"
      );
      navigate("/");    //navigate to home page
    } else {
      alert("Please fix the errors before publishing.");   //show alert message to fix errors
    }
  };
  

  return (
    <div className={styles.post_editor_container}>   {/* main container for post editor */}
      <form   //form element with onSubmit handler
        onSubmit={handleSubmit}
        className={`${styles.post_editor} ${isDarkMode ? styles.dark : ""}`}  //apply dark class if isDarkMode is true
      >
        <div className={styles.form_group}> {/*form group for title input */}
          <label htmlFor="title" className={styles.form_label}> {/*label for title input */}
            Title *
          </label>
          <input    //title input field
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}     //call handleChange on input change
            onBlur={handleBlur}       //call handleBlur when input loses focus
            className={`${styles.input_field} ${ //apply error class if error exists for title
              errors.title ? styles.error : ""
            }`}
            placeholder="Enter post title..."    //placeholder for title input
          />
          {errors.title && (     //display error message if error exists for title
            <span className={styles.error_message}>{errors.title}</span>
          )}
        </div>

          {/*form group for author input, similar structure as title input */}
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

        {/*form group for content input using RichTextEditor component */}
        <div className={styles.form_group}>
          <label htmlFor="content" className={styles.form_label}>
            Content *
          </label>
          <RichTextEditor     //RichTextEditor component for content
            id="content"
            name="content"
            value={formData.content}
            onChange={(value) =>      //update formData.content when content changes
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

        <TagInput     //TagInput component for tags
          tags={formData.tags}
          onChange={(tags) =>     //update formData.tags when tags change
            setFormData((prev) => ({
              ...prev,
              tags,
            }))
          }
        />

        {/* Form group for category select */}
        <div className={styles.form_group}>
          <label htmlFor="category" className={styles.form_label}>
            Category
          </label>
          <select      //category select dropdown
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

        {/*form group for image upload  */}
        <div className={styles.form_group}>
          <label htmlFor="image" className={styles.form_label}>
            Upload Image
          </label>
          <input    //image upload input
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
