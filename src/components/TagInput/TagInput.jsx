import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './TagInput.module.css'; // Import CSS styles

// Define the TagInput functional component
function TagInput({ tags, onChange, onBlur, error }) {
    // State for managing the input value
  const [inputValue, setInputValue] = useState('');

  // Event handler for handling key presses in the input field
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') { // Check if the pressed key is 'Enter'
      e.preventDefault(); // Prevent default form submission behavior
      const newTag = inputValue.trim().toLowerCase(); // Trim whitespace and convert to lowercase

      // Add the new tag only if it's not empty and not already present in the tags array
      if (newTag && !tags.includes(newTag)) {
        onChange([...tags, newTag]); // Call the onChange function with the updated tags array
        setInputValue(''); // Clear the input field
      }
    }
  };

    //function to remove a tag from the list
  const removeTag = (tagToRemove) => {
    onChange(tags.filter(tag => tag !== tagToRemove)); //filter out the tag to be removed and update the tags array
  };

  return (
    <div className={styles.form_group}> {/* Container for the entire tag input component */}
      <label className={styles.label}>Tags *</label> {/* Label for the tag input */}
            {/* Container for the tag input field and tag list */}
      <div className={`${styles.tag_input} ${error ? styles.error : ''}`}>  {/* Apply error styles if there's an error */}
                {/*container for displaying added tags */}
        <div className={styles.tag_list}>
                    {/*map over tags array to display each tag*/}
          {tags.map(tag => (
            <span key={tag} className={styles.tag}> {/*tag element*/}
              {tag} {/* Display the tag text */}
                            {/*button to remove the tag*/}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className={styles.tag_remove}
              >
                × {/* Close button for removing the tag */}
              </button>
            </span>
          ))}
        </div>
                {/* Input field for adding new tags */}
        <input
          type="text"
          value={inputValue} //bind input value to the state
          onChange={e => setInputValue(e.target.value)} //updates input value state when input changes
          onKeyDown={handleKeyDown} //calls handleKeyDown when a key is pressed
          onBlur={onBlur}  //calls onBlur when the input loses focus. onBlur is for handling validation or other actions when the user leaves the input
          placeholder="Type and press Enter to add tags"
          className={styles.input_field}
        />
      </div>
            {/* Display error message if there's an error */}
      {error && <span className={styles.error_message}>{error}</span>} 
    </div>
  );
}

// PropTypes for prop validation
TagInput.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,  // Tags must be an array of strings and is required
  onChange: PropTypes.func.isRequired, //onChange function is required for updating tags, must be a function
  onBlur: PropTypes.func.isRequired, //onBlur function is required, must be a function
  error: PropTypes.string //error message, can be a string or null/undefined
};

export default TagInput; // Export the TagInput component as the default export
