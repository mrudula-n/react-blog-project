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
        )}**${text.slice(end)}`;
        break;
      case "italic":
        newText = `${text.slice(0, start)}_${text.slice(
          start,
          end
        )}_${text.slice(end)}`;
        break;
      case "heading1":
        newText = `${text.slice(0, start)}# ${text.slice(
          start,
          end
        )}${text.slice(end)}`;
        break;
      case "heading2":
        newText = `${text.slice(0, start)}## ${text.slice(
          start,
          end
        )}${text.slice(end)}`;
        break;
      case "heading3":
        newText = `${text.slice(0, start)}### ${text.slice(
          start,
          end
        )}${text.slice(end)}`;
        break;
      case "list":
        newText = `${text.slice(0, start)}- ${text.slice(
          start,
          end
        )}\n${text.slice(end)}`;
        break;
      case "code":
        newText = `${text.slice(0, start)}\`\`\`javascript\n${text.slice(
          start,
          end
        )}\n\`\`\`${text.slice(end)}`;
        break;
      case "blockquote":
        newText = `${text.slice(0, start)}> ${text.slice(
          start,
          end
        )}${text.slice(end)}`;
        break;
      case "image":
        newText = `${text.slice(0, start)}![alt text](url)${text.slice(end)}`;
        break;
      case "link":
        newText = `${text.slice(0, start)}[text](url)${text.slice(end)}`;
        break;
      default:
        return;
    }

    onChange(newText);
  };

  const handleSelect = (e) => {
    setSelection({
      start: e.target.selectionStart,
      end: e.target.selectionEnd,
    });
  };

  return (
    <div className="rich-editor">
      <div className="rich-editor__toolbar">
        <button
          type="button"
          onClick={() => handleFormat("bold")}
          className="toolbar-button"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => handleFormat("italic")}
          className="toolbar-button"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => handleFormat("heading1")}
          className="toolbar-button"
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => handleFormat("heading2")}
          className="toolbar-button"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => handleFormat("heading3")}
          className="toolbar-button"
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => handleFormat("list")}
          className="toolbar-button"
        >
          List
        </button>
        <button
          type="button"
          onClick={() => handleFormat("code")}
          className="toolbar-button"
        >
          Code
        </button>
        <button
          type="button"
          onClick={() => handleFormat("blockquote")}
          className="toolbar-button"
        >
          Quote
        </button>
        <button
          type="button"
          onClick={() => handleFormat("image")}
          className="toolbar-button"
        >
          Image
        </button>
        <button
          type="button"
          onClick={() => handleFormat("link")}
          className="toolbar-button"
        >
          Link
        </button>
      </div>
      <textarea
        className={`rich-editor__content ${error ? "error" : ""}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onSelect={handleSelect}
        {...props}
      />
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
