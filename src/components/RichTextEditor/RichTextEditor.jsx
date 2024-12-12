import { useState } from "react";
import PropTypes from "prop-types";
import "./RichTextEditor.module.css"; // Import CSS styles for the component

// Define the RichTextEditor functional component
function RichTextEditor({ value, onChange, error, ...props }) {
  // State for storing the current text selection
  const [selection, setSelection] = useState(null);

  // Function to handle formatting the selected text
  const handleFormat = (format) => {
    if (!selection) return; // Do nothing if there's no text selected

    const { start, end } = selection; // Get the start and end indices of the selection
    const text = value; // Get the current text value

    // Determine the new text based on the selected format
    let newText;
    switch (format) {
      case "bold":
        newText = `${text.slice(0, start)}**${text.slice(
          start,
          end
        )}**${text.slice(end)}`; // **bold**
        break;
      case "italic":
        newText = `${text.slice(0, start)}_${text.slice(
          start,
          end
        )}_${text.slice(end)}`; // _italic_
        break;
      case "heading1":
        newText = `${text.slice(0, start)}# ${text.slice(
          start,
          end
        )}${text.slice(end)}`; // # Heading 1
        break;
      // ... other formatting cases ...

      default:
        return; // Do nothing if the format is not recognized
    }

    // Update the text value with the formatted text
    onChange(newText);
  };

  // Function to handle text selection changes
  const handleSelect = (e) => {
    // Update the selection state with the start and end indices of the selection
    setSelection({
      start: e.target.selectionStart,
      end: e.target.selectionEnd,
    });
  };

  return (
    <div className="rich-editor">
      {" "}
      {/* Container for the entire rich text editor */}
      {/*toolbar for formatting options */}
      <div className="rich-editor__toolbar">
        {/*formatting buttons */}
        <button
          type="button"
          onClick={() => handleFormat("bold")}
          className="toolbar-button"
        >
          B {/*bold*/}
        </button>
        {/*other formatting buttons..*/}
      </div>
      {/* Text area for editing content */}
      <textarea
        className={`rich-editor__content ${error ? "error" : ""}`} // Apply error styles if there's an error
        value={value} // Bind the textarea value to the `value` prop
        onChange={(e) => onChange(e.target.value)} // Call `onChange` with the updated text on every change
        onSelect={handleSelect} // Call `handleSelect` to update selection state when text is selected
        {...props} // Pass any other props to the textarea
      />
      {/* Display error message if there is an error */}
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}

// PropTypes for prop validation
RichTextEditor.propTypes = {
  value: PropTypes.string.isRequired, //value is required and must be a string
  onChange: PropTypes.func.isRequired, //onChange is required and must be a function
  error: PropTypes.string, //error can be a string or undefined/null
};

export default RichTextEditor; // Export the RichTextEditor component
